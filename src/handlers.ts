import { Request, Response } from "express"
import axios from "axios"
import { globalConfig } from "./config"

export async function getRandomUnsplashImageUrl(width: number, height: number): Promise<string> {
    const randomImageUrl = 
        `${globalConfig.unsplash.apiBaseUrl}/photos/random?client_id=${globalConfig.unsplash.apiAccessKey}`
    const { data } = await axios.get(randomImageUrl)
    let url = data.urls.full
    if(isNaN(width) || isNaN(height)) return url
    return `${url}${width ? `&w=${width}` : ""}${height ? `&h=${height}` : ""}`
}

export async function getRandomImage(req: Request, res: Response) {
    // localhost:3000/?width=200&height=300
    const { width, height } = req.query
    const randomImageUrl = await getRandomUnsplashImageUrl(Number(width), Number(height))
    res.redirect(randomImageUrl)
}