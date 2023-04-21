const {Router} = require("express");
const OrderService = require("../service/order-service");
const orderRouter = Router();
const authMiddleware = require("../middlewares/login-required");

//주문 정보 조회 라우터
orderRouter.get("/:userId", authMiddleware, async(req, res, next) => {
  try {
    const {userId} = req.params;
    const orderInfo = await OrderService.findOrder(userId);
    console.log(orderInfo);

    res.status(200).send(orderInfo);
  } catch(err){
    next(err);
  }
});

orderRouter.post("/", authMiddleware, async(req, res, next) => {
  try {
    const orderInfo = req.body;
    await OrderService.addOrder(orderInfo);

    res.status(200).send("주문이 완료되었습니다.");
  } catch(err) {
    next(err);
  }
});

orderRouter.patch("/:userId", authMiddleware, async(req, res, next) => {
  try {
    const {userId} = req.params;
    const orderInfo = req.body;
    if (!orderInfo) {
      res.status(400).json({
        message: "변경할 주문이 입력되지 않았습니다."
      });
    }
    OrderService.updateOrder(userId, orderInfo);
    res.status(200).send("주문이 정상적으로 변경되었습니다.");
  } catch(err) {
    next(err);
  }
});

orderRouter.delete("/:userId", authMiddleware, async(req, res, next) => {
  try {
    const {userId} = req.params;
    await OrderService.deletedOrder(userId);

    res.status(200).send("주문이 취소되었습니다!");
  } catch(err) {
    next(err);
  }
});

module.exports = orderRouter;
