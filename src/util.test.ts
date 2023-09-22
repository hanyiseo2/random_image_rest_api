import { createUrlWithParams } from "./util";

describe("createUrlWithParams", () => {
  it("must correctly parse params into url", () => {
    const url = createUrlWithParams("https://www.google.com", {
      query: "hello",
      width: 400,
    });
    expect(url).toBe("https://www.google.com?query=hello&width=400");
  });
  it("must return url only if there is no params", () => {
    const url = createUrlWithParams("https://www.google.com", {});
    expect(url).toBe("https://www.google.com");
  });
  it("must correctly parse params if there are url params already in the base url", () => {
    const url = createUrlWithParams("https://www.google.com?query=hello", {
      width: 400,
    });
    expect(url).toBe("https://www.google.com?query=hello&width=400");
  });
  it("must correctly parse params into url if there is undefined params in function parameter ", () => {
    const url = createUrlWithParams("https://www.google.com", {
      width: 400,
      height: undefined,
      color: "green",
    });
    expect(url).toBe("https://www.google.com?width=400&color=green");
  });
});
