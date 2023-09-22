import express from "express";
import { getRandomImage, getRandomSearchImage } from "./handlers";

import { init } from "./config";
init();

const app = express();

app.get("/", getRandomImage);
app.get("/:keyword", getRandomSearchImage);

export default app;
