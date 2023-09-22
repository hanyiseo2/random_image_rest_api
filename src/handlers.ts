import { NextFunction, Request, Response } from "express";
import {
  Color,
  getRandomUnsplashImageUrl,
  getUnsplashSearchImageUrl,
  isColor,
} from "./unsplash";

export async function getRandomImage(req: Request, res: Response) {
  const { width, height } = req.query;
  if (width && height) {
    if (isNaN(Number(width)) || isNaN(Number(height))) {
      return res
        .status(400)
        .json("The value of width and height should be a number");
    }
    if (Number(width) > 2000 || Number(height) > 2000) {
      return res
        .status(400)
        .json("The value of width and height should be smaller than 2000");
    }
    if (Number(width) <= 0 || Number(height) <= 0) {
      return res
        .status(400)
        .json("The value of width and height should be bigger than 0");
    }
  }

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
  if (Object.keys(params).length === 0) return url;

  let paramsStr = "";
  const keys = Object.keys(params);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (params[key] === undefined) continue;
    if (
      (i == 0 && url.slice(-1)[0] !== "?") ||
      paramsStr.slice(-1)[0] !== "&"
    ) {
      paramsStr += "&";
    }
    paramsStr += `${key}=${params[key]}`;
  }
  if (url.includes("?")) {
    return url + paramsStr;
  }
  return url + "?" + paramsStr;
}
