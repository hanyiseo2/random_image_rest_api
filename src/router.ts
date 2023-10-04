import express from "express";
import { getRandomImage, getRandomSearchImage } from "./handlers";
const router = express.Router();

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
router.get("/", getRandomImage);

/**
 * @swagger
 * /random/{keyword}:
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
router.get("/:keyword", getRandomSearchImage);

export default router;
