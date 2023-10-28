# Random_image_api

---

### Development

베포 서버: [https://random-image-rest-api-6id3udqf7q-df.a.run.app](https://random-image-rest-api-6id3udqf7q-df.a.run.app/)

### Description of random_image_api

- This repository contains a random image API designed to simplify the process of obtaining images for various purposes, such as profile settings on websites. Leveraging the Unsplash API, this project offers the capability to fetch both random images and images based on keywords, along with a resizing function for added flexibility

## Get Started

---

### Requirements

- For building and running the application you need:
    - [Node.js 16.17.0](https://nodejs.org/en/blog/release/v16.17.0)
    - [npm 8.18.0](https://www.npmjs.com/package/npm/v/8.18.0)

### Installation

```jsx
$ git clone https://github.com/hanyiseo2/random_image_rest_api.git

$ npm use v.16.17.0
$ npm install
$ npm run dev
```

## Stacks

---

### Testing

JEST, Supertest, nock

### Deployment

Cloud run, Docker

## Main function

---

1. Generate a Random image
    - You can use this API to generate a random image. To generate a random image, make a ‘GET’ request to the following endpoint:
    - GET /random
2. Generate an image by Keyword
    - You can generate image based on spefic keywords or thems. To generate a image by keyword, make a ‘GET’ request to the following endpoint:
    - GET /search/:keyword
    
    example
    
    - GET /search/elephant
3. Resize an image
    - The API allows you to resize the avatars according to your application’s requirements. It can change by specifying the dimensions by adding query parameters to the request URL
    
    example
    
    - GET /avatar/keyword/cat?width=100&height=100
