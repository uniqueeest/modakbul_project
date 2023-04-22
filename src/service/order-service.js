const {Order} = require("../db/models/order-model");
const {User} = require("../db/models/user-model");

//주문 내역 확인
const findOrder = async(userId) => {

  const getUserOrders = await Order.find({userId}).populate("customerId");

  if (!getUserOrders) {
    throw new Error("주문 내역이 없습니다.");
  }

  return getUserOrders;
};

//새로운 주문 추가
const addOrder = async(orderInfo) => {
  try {
    const {customerId, customerPhoneNumber, customerAddress, cart, orderStatus, total} = orderInfo;
    const order = await User.findOne({customerId})
    
    //하나라도 없을 시 error (orderStatus는 default이므로 넣지 않음)
    if (!customerPhoneNumber|| !customerAddress || !cart || !total) {
      throw new Error("정보를 모두 입력해주세요.");
    }

    //주문번호 생성 함수 구현
    const createDateYYMMDD = () => {
      //
      const date = new Date();
      const year = String(date.getFullYear() - 2000);
      const month = String(date.getMonth() + 1).padStart(2, 0);
      const day = String(date.getDate()).padStart(2, 0);
      
      //랜덤 함수
      const randomNum = () => {
        const rdNum = String(Math.floor(Math.random() * 99999));
      
        if (rdNum.length < 5) {
          return rdNum.padStart(5, "0");
        }
        return rdNum;
      }

      return `${year}${month}${day}${randomNum()}`;
    }

    const newOrder = new Order ({
      customerId: order._id, //user의 ID를 받아옴
      customerPhoneNumber,
      customerAddress,
      cart,
      orderStatus,
      total,
      orderNumber: createDateYYMMDD(),
    });

    const savedOrder = newOrder.save();

    return savedOrder;
  } catch(err) {
    throw new Error(`주문이 실패하였습니다. ${err}`);
  }
}

//주문 정보 업데이트
const updateOrder = async(userId, orderInfo) => {
  try {
    const user = await Order.findById({_id: userId});

    if (!user) {
      throw new Error("주문 정보가 없습니다.");
    }

    await Order.updateOne({userId}, orderInfo);
  } catch(err) {
    throw err;
  }

}

//주문 취소
const deletedOrder = async(userId) => {
  try {
    await Order.deleteOne({_id:userId});
  } catch(err) {
    throw err;
  }
}

module.exports = {findOrder, addOrder, updateOrder, deletedOrder};