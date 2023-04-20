const {Router} = require("express");
const OrderService = require("../service/order-service");
const orderRouter = Router();

//주문 정보 조회 라우터
orderRouter.get("/:userId", async(req, res, next) => {
  try {
    const {userId} = req.params;
    const orderInfo = OrderService.findOrder(userId);

    res.status(200).json({orderInfo});
  } catch(err){
    next(err);
  }
});

orderRouter.post("/", async(req, res, next) => {
  try {
    const orderInfo = req.body;
    await OrderService.addOrder(orderInfo);

    res.status(200).send("주문이 완료되었습니다.");
  } catch(err) {
    next(err);
  }
});

orderRouter.patch("/:userId", async(req, res, next) => {
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

orderRouter.delete("/:userId", async(req, res, next) => {
  try {
    const {userId} = req.params;
    await OrderService.deletedOrder(userId);

    res.status(200).send("주문이 취소되었습니다!");
  } catch(err) {
    next(err);
  }
});

module.exports = orderRouter;
