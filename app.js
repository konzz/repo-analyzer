import express from "express";
import fs from "fs";
import { Analyzer } from "./Analyzer";

const app = express();
const port = process.env.PORT || 2001; // a space odyssey

app.use(express.static("public"));

const analyzer = new Analyzer();

app.get("/", async (req, res) => {
  const data = await analyzer.main();
  const template = fs.readFileSync("./index.html", "utf-8");
  const html = template
    .replace(/{{data}}/, `<script>data = ${JSON.stringify(data)}</script>`)
    .replace(/{{(.*?)}}/g, (match, prop) => {
      return data[prop];
    });

  res.send(html);
});

app.listen(port, () => {
  console.log(`Analyzer app listening at http://localhost:${port}`);
});
