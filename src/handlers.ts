import { NextFunction, Request, Response } from "express";
import {
  getRandomUnsplashImageUrl,
  getRandomUnsplashImageUrlBySearch,
} from "./unsplash";

import { isNumberInRange } from "./util";
import { ClientError } from "./error";

/**
 * @swagger
 * /random:
 *   get:
 *     summary: Get a random image
 *     description: Send a reqeust to unsplash api with width and height query
 *     parameters:
 *       - in: query
 *         name: width
 *         description: width of random image
 *         type: string
 *         example: 1500
 *       - in: query
 *         name: height
 *         description: height of random image
 *         type: string
 *         example: 1000
 *     responses:
 *       200:
 *         description: Successfully get the response with an image
 *       400:
 *         description: Client error
 */

export async function getRandomImage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const width = req.query.width;
  const height = req.query.height;

  if ((width && isNaN(Number(width))) || (height && isNaN(Number(height)))) {
    return next(new ClientError(400, "width and height must be a number"));
  }
  if (
    (width && !isNumberInRange(Number(width), 1, 2000)) ||
    (height && !isNumberInRange(Number(height), 1, 2000))
  ) {
    return next(
      new ClientError(
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

/**
 * @swagger
 * /search/{keyword}:
 *   get:
 *     summary: Get a random image with query for search keyword
 *     description: Send a reqeust to unsplash api with keyword params and width and height query
 *     parameters:
 *       - in: params
 *         name: keyword
 *         required: true
 *         description: keyword for search
 *         type: string
 *         example: elephant
 *       - in: query
 *         name: width
 *         description: width of random image
 *         type: string
 *         example: 1500
 *       - in: query
 *         name: height
 *         description: height of random image
 *         type: string
 *         example: 1000
 *     responses:
 *       200:
 *         description: Successfully get the response with an image
 *       400:
 *         description: Client error
 */

export async function getRandomSearchImage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const keyword = req.params.keyword;
  const width = req.query.width;
  const height = req.query.height;

  if ((width && isNaN(Number(width))) || (height && isNaN(Number(height)))) {
    return next(new ClientError(400, "width and height must be a number"));
  }
  if (
    (width && !isNumberInRange(Number(width), 1, 2000)) ||
    (height && !isNumberInRange(Number(height), 1, 2000))
  ) {
    return next(
      new ClientError(
        400,
        "width and height must be a number between 1 and 2000"
      )
    );
  }

  const randomSearchImageUrl = await getRandomUnsplashImageUrlBySearch(
    keyword,
    {
      width: width ? Number(width) : undefined,
      height: height ? Number(height) : undefined,
    }
  );
  res.redirect(randomSearchImageUrl);
}
