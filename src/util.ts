/**
 *
 * @param url - The url to append the params to.
 * @param params - The params to append to the url.
 * @returns The url with the params appended.
 */
export function createUrlWithParams(url: string, params: object) {
  const keys = Object.keys(params);
  if (keys.length === 0) return url;

  const urlBase = url.split("?")[0];
  const existingParamStr = url.split("?")[1];

  const paramsList = [];

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = params[key];

    if (value === undefined) continue;
    paramsList.push(`${key}=${value}`);
  }

  return (
    urlBase +
    "?" +
    (existingParamStr ? existingParamStr + "&" : "") +
    paramsList.join("&")
  );
}

/**
 * Checks if a number is within a specified range.
 * @param n - The number to check.
 * @param min - The minimum value of the range(inclusive).
 * @param max - The maximum value of the range(inclusive).
 * @returns A boolean indicating whether the number is within the range.
 */
export function isNumberInRange(n: number, min: number, max: number): boolean {
  return n >= min && n <= max;
}

export function createWidthHeightObejct(width: number, height: number) {
  let params: any = {};
  if (!isNaN(width)) params.w = width;
  if (!isNaN(height)) params.h = height;

  return params;
}
