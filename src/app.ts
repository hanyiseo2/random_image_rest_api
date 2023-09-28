import express, { Request, Response, NextFunction } from "express";
import { getRandomImage, getRandomSearchImage } from "./handlers";
import { ClientError } from "./error";
import morgan from "morgan";

import { init } from "./config";
init();

const app = express();

app.use(morgan("dev"));

app.get("/", getRandomImage);
app.get("/:keyword", getRandomSearchImage);

app.use((err: ClientError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status).json({ message: err.message });
});

export default app;
