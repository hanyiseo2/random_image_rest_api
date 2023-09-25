import { Request, Response } from "express";
import {
  Color,
  getRandomUnsplashImageUrl,
  getRandomUnsplashImageUrlBySearch,
  isColor,
} from "./unsplash";

import { isNumberInRange } from "./util";

export async function getRandomImage(req: Request, res: Response) {
  const { width, height } = req.query;
  if (width && height) {
    const validationError = isNumberInRange(Number(width), Number(height));
    if (validationError) return res.status(400).json(validationError);
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
