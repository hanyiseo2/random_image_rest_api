import axios from "axios";
import { globalConfig } from "./config";
import { createUrlWithParams } from "./handlers";

export async function getRandomUnsplashImageUrl(
  width: number,
  height: number
): Promise<string> {
  const randomImageUrl = `${globalConfig.unsplash.apiBaseUrl}/photos/random?client_id=${globalConfig.unsplash.apiAccessKey}`;
  const { data } = await axios.get(randomImageUrl);
  let url = data.urls.full;

  let params: any = {};
  if (!isNaN(width)) params.w = width;
  if (!isNaN(height)) params.h = height;

  const imageUrl = createUrlWithParams(url, params);
  return imageUrl;
}

export async function getUnsplashSearchImageUrl(
  keyword: string,
  width: number,
  height: number,
  color?: Color
): Promise<string> {
  let searchImageUrlBase = `${globalConfig.unsplash.apiBaseUrl}/search/photos`;
  const searchImageUrl = createUrlWithParams(searchImageUrlBase, {
    query: keyword ? keyword : "",
    client_id: globalConfig.unsplash.apiAccessKey,
    color,
  });

  const { data } = await axios.get(searchImageUrl);
  let randomNumber = Math.floor(Math.random() * 10);
  let url = data.results[randomNumber].urls.full;
  let params: any = {};
  if (!isNaN(width)) params.w = width;
  if (!isNaN(height)) params.h = height;

  const imageUrl = createUrlWithParams(url, params);
  return imageUrl;
}

export function isColor(color: string): boolean {
  const colorList: Color[] = [
    "black_and_white",
    "black",
    "white",
    "yellow",
    "orange",
    "red",
    "purple",
    "magenta",
    "green",
    "teal",
    "blue",
  ];
  return colorList.findIndex((c) => color == c) > -1;
}

export type Color =
  | "black_and_white"
  | "black"
  | "white"
  | "yellow"
  | "orange"
  | "red"
  | "purple"
  | "magenta"
  | "green"
  | "teal"
  | "blue";
