import { Request, Response } from "express";
import {
  Color,
  getRandomUnsplashImageUrl,
  getUnsplashSearchImageUrl,
  isColor,
} from "./unsplash";

export async function getRandomImage(req: Request, res: Response) {
  const { width, height } = req.query;
  const randomImageUrl = await getRandomUnsplashImageUrl(
    Number(width),
    Number(height)
  );
  res.redirect(randomImageUrl);
}

export async function getRandomSearchImage(req: Request, res: Response) {
  const { keyword } = req.params;
  const { width, height, color } = req.query;

  const randomSearchImageUrl = await getUnsplashSearchImageUrl(
    keyword,
    Number(width),
    Number(height),
    isColor(String(color)) ? (color as Color) : undefined
  );
  res.redirect(randomSearchImageUrl);
}

export function createUrlWithParams(url: string, params: object) {
  let paramsStr = "";
  const keys = Object.keys(params);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (params[key] === undefined) continue;
    paramsStr += `${key}=${params[key]}`;
    if (i < keys.length - 1) {
      paramsStr += "&";
    }
  }
  return url + "?" + paramsStr;
}
