const OrderService = require("../service/order-service");

const getOrder = async(req, res, next) => {
  try {
    const {userId} = req.params;
    const orderInfo = await OrderService.findOrder(userId);
    if (!orderInfo) {
      res.status(400).json({
        message: "주문이 존재하지 않습니다."
      });
    }

    res.status(200).send(orderInfo);
  } catch(err){
    next(err);
  }
};

const adminGetOrder = async(req, res, next) => {
  try {
    const orderInfo = await OrderService.adminFindOrder();
    if (!orderInfo) {
      res.status(400).json({
        message: "주문이 존재하지 않습니다."
      });
    }

    res.status(200).send(orderInfo);
  } catch(err) {
    next(err);
  }
};

const createOrder = async(req, res, next) => {
  try {
    const orderInfo = req.body;
    await OrderService.addOrder(orderInfo);

    res.status(200).send("주문이 완료되었습니다.");
  } catch(err) {
    next(err);
  }
};

const updateOrder = async(req, res, next) => {
  try {
    const {orderId} = req.params;
    const orderInfo = req.body;
    if (!orderInfo) {
      res.status(400).json({
        message: "변경할 주문이 입력되지 않았습니다."
      });
    }
    OrderService.updateOrder(orderId, orderInfo);
    res.status(200).send("주문이 정상적으로 변경되었습니다.");
  } catch(err) {
    next(err);
  }
};

const adminUpdateOrder = async(req, res, next) => {
  try {
    const {orderId} = req.params;
    const orderInfo = req.body;
    if (!orderInfo) {
      res.status(400).json({
        message: "변경할 주문이 입력되지 않았습니다."
      });
    }
    OrderService.adminUpdateOrder(orderId, orderInfo);
    res.status(200).send("주문이 정상적으로 변경되었습니다.");
  } catch(err) {
    next(err);
  }
};

const deleteOrder = async(req, res, next) => {
  try {
    const {orderId} = req.params;
    await OrderService.deletedOrder(orderId);

    res.status(200).send("주문이 취소되었습니다!");
  } catch(err) {
    next(err);
  }
};

const adminDeleteOrder = async(req, res, next) => {
  try {
    const {orderId} = req.params;
    await OrderService.deletedOrder(orderId);

    res.status(200).send("주문이 취소되었습니다!");
  } catch(err) {
    next(err);
  }
};

const orderController = {
  getOrder,
  adminGetOrder,
  createOrder,
  updateOrder,
  adminUpdateOrder,
  deleteOrder,
  adminDeleteOrder,
};

module.exports = orderController;