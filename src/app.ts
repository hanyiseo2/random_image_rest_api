import express from "express"
import { getRandomImage } from "./handlers"

const app = express()

app.get("/", getRandomImage)

export default app