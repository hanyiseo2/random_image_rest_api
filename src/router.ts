import express from "express";
import { getRandomImage, getRandomSearchImage } from "./handlers";
const router = express.Router();

/**
 * @swagger
 * /random:
 *   get:
 *     summary: Get a random image
 *     parameters:
 *       - in: query
 *         name: width
 *         description: width of random image
 *         type: string
 *       - in: query
 *         name: height
 *         description: height of random image
 *         type: string
 *     responses:
 *       302:
 *         description: Successfully send the response
 *       400:
 *         description: Client error
 */
router.get("/", getRandomImage);

/**
 * @swagger
 * /random/{keyword}:
 *   get:
 *     summary: Get a query image
 *     parameters:
 *       - in: params
 *         name: keyword
 *         required: true
 *         description: keyword for search
 *         type: string
 *       - in: query
 *         name: width
 *         description: width of random image
 *         type: string
 *       - in: query
 *         name: height
 *         description: height of random image
 *         type: string
 *     responses:
 *       302:
 *         description: Successfully send the response
 *       400:
 *         description: Client error
 */
router.get("/:keyword", getRandomSearchImage);

export default router;
