const { spawnSync } = require("node:child_process");
const { readFileSync } = require("node:fs");
const { resolve } = require("node:path");

if (require.main === module) {
  main();
}

function main(argv = process.argv.slice(2), env = process.env) {
  const pkg = JSON.parse(readFileSync(resolve(__dirname, "..", "package.json"), "utf8"));

  const awsRegion = env.AWS_REGION || "ap-southeast-1";
  const codeArtifactDomain = env.CODEARTIFACT_DOMAIN || "cwncollab";
  const codeArtifactDomainOwner = env.CODEARTIFACT_DOMAIN_OWNER || "619005574504";
  const codeArtifactRepository = env.CODEARTIFACT_REPOSITORY || "cwncollab";
  const defaultNpmRegistry = env.DEFAULT_NPM_REGISTRY || "https://registry.npmjs.org/";
  const codeArtifactRegistry =
    env.CODEARTIFACT_REGISTRY ||
    pkg.publishConfig?.registry ||
    `https://${codeArtifactDomain}-${codeArtifactDomainOwner}.d.codeartifact.${awsRegion}.amazonaws.com/npm/${codeArtifactRepository}/`;

  const awsVersion = capture("aws", ["--version"], { env });
  const awsVersionText = `${awsVersion.stdout}${awsVersion.stderr}`.trim();

  if (!awsVersionText.startsWith("aws-cli/2")) {
    fail(`AWS CLI v2 is required. Found: ${awsVersionText || "unknown"}`);
  }

  const loginArgs = [
    "codeartifact",
    "login",
    "--tool",
    "npm",
    "--domain",
    codeArtifactDomain,
    "--domain-owner",
    codeArtifactDomainOwner,
    "--repository",
    codeArtifactRepository,
    "--region",
    awsRegion,
  ];

  if (env.AWS_PROFILE) {
    loginArgs.push("--profile", env.AWS_PROFILE);
  }

  run("aws", loginArgs, { env });

  // `aws codeartifact login` changes the user-level default registry to CodeArtifact.
  // Reset it so unrelated npm commands still use the public registry.
  runNpm(["config", "set", "registry", defaultNpmRegistry, "--location=user"], env);

  // Auto-tag by major.minor (e.g. "v1.1" for 1.1.x) unless the caller
  // already passed an explicit --tag flag.
  const publishArgs = ["publish", "--registry", codeArtifactRegistry, ...argv];
  if (!argv.some((a) => a === "--tag" || a.startsWith("--tag="))) {
    const [major, minor] = (pkg.version || "0.0.0").split(".");
    publishArgs.push("--tag", `v${major}-${minor}`);
  }

  runNpm(publishArgs, env);
}

function npmCommand() {
  return "npm";
}

function npmSpawnOptions(env = process.env) {
  return {
    env,
    ...(process.platform === "win32" ? { shell: true } : {}),
  };
}

function runNpm(args, env = process.env) {
  run(npmCommand(), args, npmSpawnOptions(env));
}

function capture(command, args, options = {}) {
  const result = spawnSync(command, args, {
    encoding: "utf8",
    env: process.env,
    ...options,
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }

  return result;
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    env: process.env,
    ...options,
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

module.exports = {
  main,
  npmCommand,
  npmSpawnOptions,
};
