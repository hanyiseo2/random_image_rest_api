import express, { Request, Response, NextFunction } from "express";
import { ClientError } from "./error";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { init } from "./config";
import router from "./router";
init();

const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Random-Image-API",
      version: "1.0.0",
      description: "creating random_image with query function",
    },
    basePath: "/",
  },
  apis: ["src/router.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use(morgan("dev"));
app.use("/random", router);
app.use("/", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use((err: ClientError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status).json({ message: err.message });
});

export default app;
