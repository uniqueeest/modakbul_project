const OrderService = require("../service/order-service");
const utils = require("../misc/utils");

const getOrder = async(req, res, next) => {
  try {
    const {userId} = req.params;
    const orderInfo = await OrderService.findOrder(userId);
    if (!orderInfo) {
      res.status(400).json({
        message: "주문이 존재하지 않습니다."
      });
    }

    res.status(200).json(utils.buildResponse(orderInfo));
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

    res.status(200).json(utils.buildResponse(orderInfo));
  } catch(err) {
    next(err);
  }
};

const nonMemberGetOrder = async(req, res, next) => {
  try {
    const {orderNumber} = req.params;
    const orderInfo = await OrderService.nonMemberFindOrder(orderNumber);
    if (!orderInfo) {
      res.status(400).json({
        message: "주문이 존재하지 않습니다."
      });
    }

    res.status(200).json(utils.buildResponse(orderInfo));
  } catch(err) {
    next(err);
  }
};

const createOrder = async(req, res, next) => {
  try {
    const orderInfo = req.body;
    const orderData = await OrderService.addOrder(orderInfo);

    res.status(200).json(utils.buildResponse(orderData));
  } catch(err) {
    next(err);
  }
};

const createNonMemberOrder = async(req, res, next) => {
  try {
    const orderInfo = req.body;
    const orderData = await OrderService.nonMemberAddOrder(orderInfo);

    res.status(200).json(utils.buildResponse(orderData));
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
    const OrderData = await OrderService.updateOrder(orderId, orderInfo);
    res.status(200).json(utils.buildResponse(OrderData));
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
    const orderData = await OrderService.updateOrder(orderId, orderInfo);
    res.status(200).json(utils.buildResponse(orderData));
  } catch(err) {
    next(err);
  }
};

const deleteOrder = async(req, res, next) => {
  try {
    const {orderId} = req.params;
    const orderData = await OrderService.deletedOrder(orderId);
    if (!orderInfo) {
      res.status(400).json({
        message: "주문 정보가 없습니다."
      });
    }

    res.status(200).json(utils.buildResponse(orderData));
  } catch(err) {
    next(err);
  }
};

const adminDeleteOrder = async(req, res, next) => {
  try {
    const {orderId} = req.params;
    const orderData = await OrderService.deletedOrder(orderId);
    if (!orderInfo) {
      res.status(400).json({
        message: "주문 정보가 없습니다."
      });
    }

    res.status(200).json(utils.buildResponse(orderData));
  } catch(err) {
    next(err);
  }
};

const orderController = {
  getOrder,
  adminGetOrder,
  nonMemberGetOrder,
  createOrder,
  createNonMemberOrder,
  updateOrder,
  adminUpdateOrder,
  deleteOrder,
  adminDeleteOrder,
};

module.exports = orderController;