import { Request, Response } from "express"

export async function getRandomImage(req: Request, res: Response)  {
    const unsplashURL = 'https://api.unsplash.com/photos/random'
    // fetch with access key
    
    const { w, h } = req.query
    if(w && h){
        return res.redirect(`${unsplashURL}?w=${w}&h=${h}`)
    }
    return res.redirect('https://api.unsplash.com/random')
}