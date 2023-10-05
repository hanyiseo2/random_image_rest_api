import app from "./app";
import request from "supertest";
import nock from "nock";
import { globalConfig } from "./config";

import randomSuccessResponse_01 from "./testing_assets/json/random_success_01.json";
import randomSuccessResponse_02 from "./testing_assets/json/random_success_02.json";

describe("GET /random", () => {
  it("must response with a random image", async () => {
    // mocking response from unsplash api
    nock(globalConfig.unsplash.apiBaseUrl)
      .get(`/photos/random?client_id=${globalConfig.unsplash.apiAccessKey}`)
      .reply(200, randomSuccessResponse_01);

    // request and getting response from the app
    const response = await request(app).get("/random");
    expect(response.status).toBe(302);

    // Testing on redirect url
    expect(response.header.location).toEqual(
      "https://images.unsplash.com/photo-1692278265511-7c884556cd74?crop=entropy&cs=srgb&fm=jpg&ixid=M3w0OTU5Mzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTUxMTYxNzh8&ixlib=rb-4.0.3&q=85"
    );
  });

  it("must response with a random image with size of 400X600", async () => {
    // mocking response from unsplash api
    nock(globalConfig.unsplash.apiBaseUrl)
      .get(`/photos/random?client_id=${globalConfig.unsplash.apiAccessKey}`)
      .reply(200, randomSuccessResponse_01);

    // request and getting response from the app
    const response = await request(app).get("/random?width=400&height=600");
    expect(response.status).toBe(302);

    // Testing on redirect url
    expect(response.header.location).toEqual(
      "https://images.unsplash.com/photo-1692278265511-7c884556cd74?crop=entropy&cs=srgb&fm=jpg&ixid=M3w0OTU5Mzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTUxMTYxNzh8&ixlib=rb-4.0.3&q=85&w=400&h=600"
    );
  });

  it("must response 400(Bad Request) when width is not a number", async () => {
    // mocking response from unsplash api
    nock(globalConfig.unsplash.apiBaseUrl)
      .get(`/photos/random?client_id=${globalConfig.unsplash.apiAccessKey}`)
      .reply(200, randomSuccessResponse_01);

    // request and getting response from the app
    const response = await request(app).get("/random?width=hihi&height=600");
    expect(response.status).toBe(400);

    // Testing on redirect url
    expect(JSON.parse(response.text)).toEqual({
      message: "width and height must be a number",
    });
  });

  it("must response 400(Bad Request) when width is not in the range of number(w > 2000)", async () => {
    // mocking response from unsplash api
    nock(globalConfig.unsplash.apiBaseUrl)
      .get(`/photos/random?client_id=${globalConfig.unsplash.apiAccessKey}`)
      .reply(200, randomSuccessResponse_01);

    // request and getting response from the app
    const response = await request(app).get("/random?width=3000&height=600");
    expect(response.status).toBe(400);

    // Testing on redirect url
    expect(JSON.parse(response.text)).toEqual({
      message: "width and height must be a number between 1 and 2000",
    });
  });

  it("must response 400(Bad Request) when height is not in the range of number(h <= 0)", async () => {
    // mocking response from unsplash api
    nock(globalConfig.unsplash.apiBaseUrl)
      .get(`/photos/random?client_id=${globalConfig.unsplash.apiAccessKey}`)
      .reply(200, randomSuccessResponse_01);

    // request and getting response from the app
    const response = await request(app).get("/random?width=1000&height=-200");
    expect(response.status).toBe(400);

    // Testing on redirect url
    expect(JSON.parse(response.text)).toEqual({
      message: "width and height must be a number between 1 and 2000",
    });
  });

  it("must response 400(Bad Request) when height is not a number", async () => {
    // mocking response from unsplash api
    nock(globalConfig.unsplash.apiBaseUrl)
      .get(`/photos/random?client_id=${globalConfig.unsplash.apiAccessKey}`)
      .reply(200, randomSuccessResponse_01);

    // request and getting response from the app
    const response = await request(app).get("/random?width=400&height=hello");
    expect(response.status).toBe(400);

    // Testing on redirect url
    expect(JSON.parse(response.text)).toEqual({
      message: "width and height must be a number",
    });
  });
});

describe("GET /search/[keyword]", () => {
  it("must response with a random image with keyword", async () => {
    // mocking response from unsplash api
    nock(globalConfig.unsplash.apiBaseUrl)
      .get(
        `/search/photos?query=elephant&client_id=${globalConfig.unsplash.apiAccessKey}`
      )
      .reply(200, randomSuccessResponse_02);

    // request and getting response from the app
    const response = await request(app).get("/search/elephant");
    expect(response.status).toBe(302);

    // Testing on redirect url
    expect(response.header.location).toEqual(
      "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?crop=entropy&cs=srgb&fm=jpg&ixid=M3w0OTU5Mzh8MHwxfHNlYXJjaHwxfHxlbGVwaGFudHxlbnwwfHx8fDE2OTUyMDU4MzJ8MA&ixlib=rb-4.0.3&q=85"
    );
  });

  it("must response with a random image with keyword", async () => {
    // mocking response from unsplash api
    nock(globalConfig.unsplash.apiBaseUrl)
      .get(
        `/search/photos?query=elephant&client_id=${globalConfig.unsplash.apiAccessKey}`
      )
      .reply(200, randomSuccessResponse_02);

    // request and getting response from the app
    const response = await request(app).get(
      "/search/elephant?width=400&height=800"
    );
    expect(response.status).toBe(302);

    // Testing on redirect url
    expect(response.header.location).toEqual(
      "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?crop=entropy&cs=srgb&fm=jpg&ixid=M3w0OTU5Mzh8MHwxfHNlYXJjaHwxfHxlbGVwaGFudHxlbnwwfHx8fDE2OTUyMDU4MzJ8MA&ixlib=rb-4.0.3&q=85&w=400&h=800"
    );
  });

  it("must response 400(Bad Request) when height is not a number", async () => {
    // mocking response from unsplash api
    nock(globalConfig.unsplash.apiBaseUrl)
      .get(
        `/search/photos?query=elephant&client_id=${globalConfig.unsplash.apiAccessKey}`
      )
      .reply(200, randomSuccessResponse_02);

    // request and getting response from the app
    const response = await request(app).get(
      "/search/elephant?width=400&height=hello"
    );
    expect(response.status).toBe(400);

    // Testing on redirect url
    expect(JSON.parse(response.text)).toEqual({
      message: "width and height must be a number",
    });
  });

  it("must response 400(Bad Request) when height is not in the range of number(h <= 0)", async () => {
    // mocking response from unsplash api
    nock(globalConfig.unsplash.apiBaseUrl)
      .get(
        `/search/photos?query=elephant&client_id=${globalConfig.unsplash.apiAccessKey}`
      )
      .reply(200, randomSuccessResponse_02);

    // request and getting response from the app
    const response = await request(app).get(
      "/search/elephant?width=-200&height=300"
    );
    expect(response.status).toBe(400);

    // Testing on redirect url
    expect(JSON.parse(response.text)).toEqual({
      message: "width and height must be a number between 1 and 2000",
    });
  });
});
