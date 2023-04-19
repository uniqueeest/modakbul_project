const express = require("express");
const config = require("./src/config");
const cors = require("cors");

// --- test 용 --- commit X 끝나면 지우기 //
const productRouter = require("./src/routes/product-router");

const mongoose = require("mongoose");

mongoose.connection.on("connected", () => {
  console.log("MONGODB SERVER START!");
})

mongoose.connect(config.mongoDBUri);
// --- test 용 --- commit X 끝나면 지우기 //

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors 방지
app.use(cors()); 

app.get("/", (req, res) => {
  res.send("root page");
});

// --- test 용 --- commit X 끝나면 지우기 //
app.use("/", productRouter);
// --- test 용 --- commit X 끝나면 지우기 //

app.listen(config.port, () => {
  console.log(`SERVER START 5000`);
})