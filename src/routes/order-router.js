const {Router} = require("express");
const OrderService = require("../service/order-service");
const orderRouter = Router();
const authMiddleware = require("../middlewares/login-required");

//주문 정보 조회
orderRouter.get("/:userId", authMiddleware, async(req, res, next) => {
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
});

//관리자 주문 정보 조회
orderRouter.get("/:adminId", authMiddleware, async(req, res, next) => {
  try {
    const {adminId} = req.params;
    const orderInfo = await OrderService.adminFindOrder(adminId);
    if (!orderInfo) {
      res.status(400).json({
        message: "주문이 존재하지 않습니다."
      });
    }

    res.status(200).send(orderInfo);
  } catch(err) {
    next(err);
  }
})

//새로운 주문 추가
orderRouter.post("/", authMiddleware, async(req, res, next) => {
  try {
    const orderInfo = req.body;
    await OrderService.addOrder(orderInfo);

    res.status(200).send("주문이 완료되었습니다.");
  } catch(err) {
    next(err);
  }
});

//주문 수정
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

//주문 삭제
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
