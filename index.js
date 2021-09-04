import http from "http";
import fs from "fs";

const hostname = "127.0.0.1";
const port = 2001; // a space odyssey

const server = http.createServer((req, res) => {
  const html = fs.readFileSync("./index.html", "utf-8");

  res.statusCode = 200;
  res.writeHeader(200, { "Content-Type": "text/html" });
  res.write(html);
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
});
