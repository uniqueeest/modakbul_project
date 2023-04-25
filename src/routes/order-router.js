const {Router} = require("express");
const orderRouter = Router();
const orderController = require("../controller/order-controller");
const authMiddleware = require("../middlewares/login-required");
const adminMiddleware = require("../middlewares/admin-required");

//관리자) 주문 정보 조회
orderRouter.get("/admin", authMiddleware, adminMiddleware, orderController.adminGetOrder);

//주문 정보 조회
orderRouter.get("/:userId", authMiddleware, orderController.getOrder);

//새로운 주문 추가
orderRouter.post("/", authMiddleware, orderController.createOrder);

//주문 수정
orderRouter.patch("/:orderId", authMiddleware, orderController.updateOrder);

//관리자) 주문 수정
orderRouter.patch("/admin/:orderId", authMiddleware, adminMiddleware, orderController.adminUpdateOrder);

//주문 취소
orderRouter.delete("/:orderId", authMiddleware, orderController.deleteOrder);

//관리자) 주문 취소
orderRouter.delete("/admin/:orderId", authMiddleware, adminMiddleware, orderController.adminDeleteOrder);

module.exports = orderRouter;
