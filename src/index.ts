import express, { Request, Response } from "express"

const PORT = 3000
const app = express()

app.get("/", (req: Request, res: Response) => {
    res.send("HELLO WORLD")
})

app.listen(PORT, () => {
    console.log(`The server is listening to the port ${PORT}`)
})