import { NextFunction, Request, Response } from "express";
import {
  Color,
  getRandomUnsplashImageUrl,
  getRandomUnsplashImageUrlBySearch,
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

  const randomSearchImageUrl = await getRandomUnsplashImageUrlBySearch(
    keyword,
    Number(width),
    Number(height),
    isColor(String(color)) ? (color as Color) : undefined
  );
  res.redirect(randomSearchImageUrl);
}
