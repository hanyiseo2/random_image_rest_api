import { config } from "dotenv";

if (process.env.NODE_ENV === "local") {
  config({ path: "./.env.local" });
} else if (process.env.NODE_ENV === "prod") {
  config({ path: "./.env.prod" });
} else if (process.env.NODE_ENV === "test") {
  config({ path: "./.env.test" });
}

type GlobalConfig = {
  unsplash: {
    apiBaseUrl: string;
    apiAccessKey: string;
  };
};

export let globalConfig: GlobalConfig = {
  unsplash: {
    apiAccessKey: "",
    apiBaseUrl: "",
  },
};

export function init() {
  if (!process.env.UNSPLASH_API_BASE_URL)
    throw `cannot find unsplash base url from env`;
  globalConfig.unsplash.apiBaseUrl = process.env.UNSPLASH_API_BASE_URL;

  if (!process.env.UNSPLASH_ACCESS_KEY)
    throw `cannot find unsplash api access key from env`;
  globalConfig.unsplash.apiAccessKey = process.env.UNSPLASH_ACCESS_KEY;
}
