import app from "./app"
import request from "supertest"

describe("GET /", () => {
    it("must response with hello world", async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.body.data).toEqual("HELLO WORLD");
    })
    // must response with random image - fixed image
    // must response with resized image when width and height is specified
    // must response with image which is corresponding with the random seed
})

// Grayscale
// Blur
// 

// hanyi.com/?width=300&height=200&seed=abcd
// https://fastly.picsum.photos/id/127/200/300.jpg?hmac=H0aErkmw8FxF1Tp7uFj4cV-aVMxDDjOVKTwGwS6REXw
// https://picsum.photos/id/237/200/300
// https://picsum.photos/id/238/200/300