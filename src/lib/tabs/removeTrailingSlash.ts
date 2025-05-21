/**
 * Removes trailing slashes from a string
 * @param str The string to remove trailing slashes from
 * @returns The string with trailing slashes removed
 */
export function removeTrailingSlash(str: string): string {
  return str.replace(/\/+$/, '')
}
