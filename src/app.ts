import express, { Request, Response } from "express"
import sharp from "sharp"
const app = express()

app.get("/", async (req: Request, res: Response) => {
    const {w,h} = req.query
    const unsplashURL = 'https://api.unsplash.com/random'
    if(w&&h){
        return res.redirect(`${unsplashURL}?w=${w}&h=${h}`)
    }
    else{
        return res.redirect('https://api.unsplash.com/random')
    }
    // res.redirect()

    // resize if width and height is specified
    // send random image

    // https://images.unsplash.com/photo-1691147923232-284a3949a72e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=150&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5Mjg5NDc0NQ&ixlib=rb-4.0.3&q=80&w=600
    
    // seed = hello
    // number = hash(seed)
    // number % 100 == 67
    // send image_67
})

export default app