const express = require("express");
const { writeCSV } = require("./src/service/crawl/function");
const { GetCatologe } = require("./src/service/crawl/catologe");
const { HomeCrawl } = require("./src/service/crawl/Home");
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

HomeCrawl

app.listen(PORT, () => {
    console.log(`Listening at ${PORT} port`)
})