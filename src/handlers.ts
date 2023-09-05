import { Request, Response } from "express"
import axios from "axios"
import { globalConfig } from "./config"

export async function getRandomUnsplashImageUrl(width: number, height: number): Promise<string> {
    // localhost:3000/?width=200&height=300
    const randomImageUrl = 
        `${globalConfig.unsplash.apiBaseUrl}/photos/random?client_id=${globalConfig.unsplash.apiAccessKey}`
    const { data } = await axios.get(randomImageUrl)
    let url = data.urls.full

    const imageUrl = checkWidthAndHeight(width,height,url)
    return imageUrl
}

export async function getRandomImage(req: Request, res: Response) {
    const {width,height} =req.query
    const randomImageUrl = await getRandomUnsplashImageUrl(Number(width), Number(height))
    res.redirect(randomImageUrl)
}

export async function getRandomSearchImageUrl(keyword:string, color:string, width:number, height:number): Promise<string>{
    // localhost:3000/search/:keyword
    let randomSearchImageUrl = 
        `${globalConfig.unsplash.apiBaseUrl}/search/photos?query=${keyword}&client_id=${globalConfig.unsplash.apiAccessKey}`
    if(color){
        randomSearchImageUrl = 
        `${globalConfig.unsplash.apiBaseUrl}/search/photos?query=${keyword}&color=${color}&client_id=${globalConfig.unsplash.apiAccessKey}`
    }
    
    const { data } = await axios.get(randomSearchImageUrl)
    let randomNumber = Math.floor(Math.random() * 10)
    let url = data.results[randomNumber].urls.full
    
    const imageUrl = checkWidthAndHeight(width,height,url)
    return imageUrl
}

export async function getRandomSearchImage(req:Request, res:Response){
    const { keyword} = req.params
    const {width, height, color}= req.query
    const randomSearchImageUrl = await getRandomSearchImageUrl(keyword as string, color as string, Number(width), Number(height))
    res.redirect(randomSearchImageUrl)
}

export function checkWidthAndHeight(width:number, height:number, url:string){
    if(isNaN(width) || isNaN(height)) return url
    return (`${url}${width ? `&w=${width}` : ""}${height ? `&h=${height}` : ""}`)
}