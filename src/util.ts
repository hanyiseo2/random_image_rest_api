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
