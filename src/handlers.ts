import { Request, Response } from "express"
import axios from "axios"
import { globalConfig } from "./config"

export async function getRandomUnsplashImageUrl(): Promise<string> {
    const randomImageUrl = 
        `${globalConfig.unsplash.apiBaseUrl}/photos/random?client_id=${globalConfig.unsplash.apiAccessKey}`
    const { data } = await axios.get(randomImageUrl)
    return data.urls.full
}

export async function getRandomImage(req: Request, res: Response)  {
    const randomImageUrl = await getRandomUnsplashImageUrl()
    res.redirect(randomImageUrl)
}