const https = require("https");
const express = require("express");
const config = require("./config");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// cors 방지
app.use(cors()); 

app.get("/", (req, res) => {
  res.send("root page");
});

app.listen(config.port, () => {
  console.log(`SERVER START 5000`);
})