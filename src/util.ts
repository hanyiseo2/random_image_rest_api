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

export function isNumberInRange(width: number, height: number) {
  const max = 2000,
    min = 0;
  if (isNaN(Number(width)) || isNaN(Number(height)))
    return "The value of width and height should be a number";
  if (Number(width) > max || Number(height) > max)
    return "The value of width and height should be smaller than 2000";
  if (Number(width) <= min || Number(height) <= min)
    return "The value of width and height should be bigger than 0";
}
