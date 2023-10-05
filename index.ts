import app from "./src/app";

const PORT = 8080;

app.listen(PORT, () => {
  const baseUrl = `http://localhost:${PORT}`;
  console.log(`The server is listening to the port ${PORT}`);

  console.log(`Docs: ${baseUrl}`);
  console.log(`Random: ${baseUrl}/random`);
  console.log(`Search: ${baseUrl}/search/elephant`);
});
