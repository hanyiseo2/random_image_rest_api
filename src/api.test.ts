import app from "./app";
import request from "supertest";
import nock from "nock";

import randomSuccessResponse_01 from "./testing_assets/json/random_success_01.json";
import randomSuccessResponse_02 from "./testing_assets/json/random_success_02.json";

/** 
 Cases to test

 1. Successful cases
    - Random image
    - Random Search Image
    - Width & Height

 2. Error cases
    400(Bad Request) - Wrong Parameter
    - height=hello
    - height=500000000
    - height=-500000000
    - width=hihi

    - 
    404(Not Found)
    - /cat
    - /cat/hello/hi/green/
    
4. Authentication
    403(Unauthenticated)
 5. Performance


 */

describe("GET /", () => {
  it("must response with a random image", async () => {
    // mocking response from unsplash api
    nock("http://localhost:1080")
      .get("/photos/random?client_id=ACCESS_KEY_SAMPLE")
      .reply(200, randomSuccessResponse_01);

    // request and getting response from the app
    const response = await request(app).get("/");
    expect(response.status).toBe(302);

    // Testing on redirect url
    expect(response.header.location).toEqual(
      "https://images.unsplash.com/photo-1692278265511-7c884556cd74?crop=entropy&cs=srgb&fm=jpg&ixid=M3w0OTU5Mzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTUxMTYxNzh8&ixlib=rb-4.0.3&q=85"
    );
  });

  it("must response with a random image with size of 400X600", async () => {
    // mocking response from unsplash api
    nock("http://localhost:1080")
      .get("/photos/random?client_id=ACCESS_KEY_SAMPLE")
      .reply(200, randomSuccessResponse_01);

    // request and getting response from the app
    const response = await request(app).get("/?width=400&height=600");
    expect(response.status).toBe(302);

    // Testing on redirect url
    expect(response.header.location).toEqual(
      "https://images.unsplash.com/photo-1692278265511-7c884556cd74?crop=entropy&cs=srgb&fm=jpg&ixid=M3w0OTU5Mzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTUxMTYxNzh8&ixlib=rb-4.0.3&q=85&w=400&h=600"
    );
  });

  it("must response 400(Bad Request) when width is not a number", async () => {
    // mocking response from unsplash api
    nock("http://localhost:1080")
      .get("/photos/random?client_id=ACCESS_KEY_SAMPLE")
      .reply(200, randomSuccessResponse_01);

    // request and getting response from the app
    const response = await request(app).get("/?width=hihi&height=600");
    expect(response.status).toBe(400);

    // Testing on redirect url
    expect(response.text).toEqual(
      '"The value of width and height should be a number"'
    );
  });

  it("must response 400(Bad Request) when width is not in the range of number(w > 2000)", async () => {
    // mocking response from unsplash api
    nock("http://localhost:1080")
      .get("/photos/random?client_id=ACCESS_KEY_SAMPLE")
      .reply(200, randomSuccessResponse_01);

    // request and getting response from the app
    const response = await request(app).get("/?width=3000&height=600");
    expect(response.status).toBe(400);

    // Testing on redirect url
    expect(response.text).toEqual(
      '"The value of width and height should be smaller than 2000"'
    );
  });

  it("must response 400(Bad Request) when height is not in the range of number(h <= 0)", async () => {
    // mocking response from unsplash api
    nock("http://localhost:1080")
      .get("/photos/random?client_id=ACCESS_KEY_SAMPLE")
      .reply(200, randomSuccessResponse_01);

    // request and getting response from the app
    const response = await request(app).get("/?width=1000&height=-200");
    expect(response.status).toBe(400);

    // Testing on redirect url
    expect(response.text).toEqual(
      '"The value of width and height should be bigger than 0"'
    );
  });

  it("must response 400(Bad Request) when height is not a number", async () => {
    // mocking response from unsplash api
    nock("http://localhost:1080")
      .get("/photos/random?client_id=ACCESS_KEY_SAMPLE")
      .reply(200, randomSuccessResponse_01);

    // request and getting response from the app
    const response = await request(app).get("/?width=400&height=hello");
    expect(response.status).toBe(400);

    // Testing on redirect url
    expect(response.text).toEqual(
      '"The value of width and height should be a number"'
    );
  });
});

describe("GET /[query]", () => {
  it("must response with a random image with query", async () => {
    // mocking response from unsplash api
    nock("http://localhost:1080")
      .get("/search/photos?query=elephant&client_id=ACCESS_KEY_SAMPLE")
      .reply(200, randomSuccessResponse_02);

    // request and getting response from the app
    const response = await request(app).get("/elephant");
    expect(response.status).toBe(302);

    // Testing on redirect url
    expect(response.header.location).toEqual(
      "https://images.unsplash.com/photo-1692278265511-7c884556cd74?crop=entropy&cs=srgb&fm=jpg&ixid=M3w0OTU5Mzh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTUxMTYxNzh8&ixlib=rb-4.0.3&q=85"
    );
  });
});
