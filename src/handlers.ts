import { NextFunction, Request, Response } from "express";
import {
  Color,
  getRandomUnsplashImageUrl,
  getRandomUnsplashImageUrlBySearch,
  isColor,
} from "./unsplash";

import { isNumberInRange } from "./util";
import { ServerError } from "./error";

export async function getRandomImage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const width = req.query.width;
  const height = req.query.height;

  if ((width && isNaN(Number(width))) || (height && isNaN(Number(height)))) {
    return next(new ServerError(400, "width and height must be a number"));
  }
  if (
    (width && !isNumberInRange(Number(width), 1, 2000)) ||
    (height && !isNumberInRange(Number(height), 1, 2000))
  ) {
    return next(
      new ServerError(
        400,
        "width and height must be a number between 1 and 2000"
      )
    );
  }

  const randomImageUrl = await getRandomUnsplashImageUrl({
    width: width ? Number(width) : undefined,
    height: height ? Number(height) : undefined,
  });

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
