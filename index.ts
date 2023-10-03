import app from "./src/app";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`The server is listening to the port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
  console.log(`http://localhost:${PORT}?width=300&height=200`);
  console.log(`http://localhost:${PORT}?width=hello&height=200`);
  console.log(`http://localhost:${PORT}?color=green`);
  console.log(`http://localhost:${PORT}/cat?color=green`);
  console.log(`http://localhost:${PORT}/cat?color=black_and_white`);
  console.log(`http://localhost:${PORT}/cat?width=300&height=200`);
});
