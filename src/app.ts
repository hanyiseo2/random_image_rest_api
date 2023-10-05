import { ClientError } from "./error";
import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import { init } from "./config";
import { swaggerSpec } from "./swagger";
import { getRandomImage, getRandomSearchImage } from "./handlers";

init(); // initialize config(env vars)
const app = express();

app.use(morgan("dev"));
app.get("/random", getRandomImage);
app.get("/search/:keyword", getRandomSearchImage);
app.use("/", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use((err: ClientError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status).json({ message: err.message });
});

export default app;
