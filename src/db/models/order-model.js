const mongoose = require("mongoose");
const OrderSchema = require("../schemas/order");

exports.Order = mongoose.model("Order", OrderSchema);