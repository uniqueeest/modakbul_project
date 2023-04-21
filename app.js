const express = require("express");
const config = require("./src/config");
const cors = require("cors");

const cartRouter = require('./src/routes/cart-router');
const productRouter = require("./src/routes/product-router");
const userRouter = require("./src/routes/user-router");
const orderRouter = require("./src/routes/order-router");
// const categoryRouter = require("./src/routes/category-router");

const mongoose = require("mongoose");

mongoose.connection.on("connected", () => {
  console.log("MONGODB SERVER START!");
})

mongoose.connect(config.mongoDBUri);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //headers 값을 읽으려면 true로 

// cors 방지
app.use(cors()); 

app.get("/", (req, res) => {
  res.send("root page");
});

app.use('/api/carts', cartRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
// app.use("/api/categories", categoryRouter);


app.listen(config.port, () => {
  console.log(`SERVER START 5000`);
})