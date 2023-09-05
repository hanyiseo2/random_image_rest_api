import express from "express"
import { getRandomImage,getRandomSearchImage } from "./handlers"

const app = express()

app.get("/", getRandomImage)
app.get("/search/:keyword", getRandomSearchImage)

export default app