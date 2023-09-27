import axios from "axios";
import { globalConfig } from "./config";
import { createUrlWithParams } from "./util";

type UnsplashImageOptions = {
  width?: number;
  height?: number;
};

export async function getRandomUnsplashImageUrl(
  options: UnsplashImageOptions = {}
): Promise<string> {
  const randomImageUrl = `${globalConfig.unsplash.apiBaseUrl}/photos/random?client_id=${globalConfig.unsplash.apiAccessKey}`;
  const { data } = await axios.get(randomImageUrl);
  let url = data.urls.full;

  const imageUrl = createUrlWithParams(url, {
    w: options.width,
    h: options.height,
  });

  return imageUrl;
}

export async function getRandomUnsplashImageUrlBySearch(
  keyword: string,
  options: UnsplashImageOptions = {}
): Promise<string> {
  let searchImageUrlBase = `${globalConfig.unsplash.apiBaseUrl}/search/photos`;
  const searchImageUrl = createUrlWithParams(searchImageUrlBase, {
    query: keyword ? keyword : "",
    client_id: globalConfig.unsplash.apiAccessKey,
  });

  const { data } = await axios.get(searchImageUrl);
  const results = data.results;

  // Lets consider the first image url to be most relevant result(for consistency in testing)
  let url = results[0].urls.full;

  const imageUrl = createUrlWithParams(url, {
    w: options.width,
    h: options.height,
  });
  return imageUrl;
}
