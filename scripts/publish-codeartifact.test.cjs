describe("publish-codeartifact script", () => {
  const scriptPath = "./publish-codeartifact.cjs";
  const originalPlatform = Object.getOwnPropertyDescriptor(process, "platform");

  afterEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
    jest.unmock("node:child_process");

    if (originalPlatform) {
      Object.defineProperty(process, "platform", originalPlatform);
    }
  });

  function setPlatform(platform) {
    Object.defineProperty(process, "platform", {
      ...originalPlatform,
      value: platform,
    });
  }

  function loadScriptWithSpawnMock(spawnSync) {
    jest.doMock("node:child_process", () => ({ spawnSync }));

    let script;

    jest.isolateModules(() => {
      script = require(scriptPath);
    });

    return script;
  }

  function successfulSpawnMock() {
    return jest
      .fn()
      .mockReturnValueOnce({
        status: 0,
        stdout: "aws-cli/2.17.0",
        stderr: "",
      })
      .mockReturnValue({
        status: 0,
      });
  }

  it("runs npm through the Windows shell", () => {
    setPlatform("win32");

    const spawnSync = successfulSpawnMock();
    const { main } = loadScriptWithSpawnMock(spawnSync);
    const env = {
      ...process.env,
      AWS_PROFILE: "publish-profile",
    };

    main(["--tag", "beta"], env);

    expect(spawnSync).toHaveBeenCalledTimes(4);
    expect(spawnSync.mock.calls[2]).toEqual([
      "npm",
      [
        "config",
        "set",
        "registry",
        "https://registry.npmjs.org/",
        "--location=user",
      ],
      expect.objectContaining({
        stdio: "inherit",
        env,
        shell: true,
      }),
    ]);
    expect(spawnSync.mock.calls[3]).toEqual([
      "npm",
      [
        "publish",
        "--registry",
        "https://cwncollab-619005574504.d.codeartifact.ap-southeast-1.amazonaws.com/npm/cwncollab/",
        "--tag",
        "beta",
      ],
      expect.objectContaining({
        stdio: "inherit",
        env,
        shell: true,
      }),
    ]);
  });

  it("keeps direct npm spawning on non-Windows platforms", () => {
    setPlatform("linux");

    const spawnSync = successfulSpawnMock();
    const { main } = loadScriptWithSpawnMock(spawnSync);
    const env = { ...process.env };

    main([], env);

    expect(spawnSync).toHaveBeenCalledTimes(4);
    expect(spawnSync.mock.calls[2][0]).toBe("npm");
    expect(spawnSync.mock.calls[2][2]).toEqual(
      expect.objectContaining({
        stdio: "inherit",
        env,
      }),
    );
    expect(spawnSync.mock.calls[2][2]).not.toHaveProperty("shell");
    expect(spawnSync.mock.calls[3][0]).toBe("npm");
    expect(spawnSync.mock.calls[3][2]).toEqual(
      expect.objectContaining({
        stdio: "inherit",
        env,
      }),
    );
    expect(spawnSync.mock.calls[3][2]).not.toHaveProperty("shell");
  });
});
