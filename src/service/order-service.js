const {Order} = require("../db/models/order-model");

//주문 내역 확인
const findOrder = async(userId) => {
  const findUser = await Order.findOne({_id: userId});

  if (!findUser) {
    throw new Error("주문 내역이 없습니다.");
  }

  return findUser;
};

//새로운 주문 추가
const addOrder = async(orderInfo) => {
  try {
    const {email, fullName, phoneNumber, address, cart, orderStatus, total} = orderInfo;
    
    //하나라도 없을 시 error (orderStatus는 default이므로 넣지 않음)
    if (!email || !fullName || !phoneNumber || !address || !cart || !total) {
      throw new Error("정보를 모두 입력해주세요.");
    }

    const newOrder = new Order ({
      email,
      fullName,
      phoneNumber,
      address,
      cart,
      orderStatus,
      total,
    });

    const savedOrder = newOrder.save();

    return savedOrder;
  } catch(err) {
    throw new Error(`주문이 실패하였습니다. ${err}`);
  }
}

//주문 정보 업데이트
//토의 필요) userId로 주문을 받아올 시, 한 번의 주문밖에 볼 수 없음
//유저가 여러 번 주문 했을 시는 어떻게? user의 email을 사용해서?
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

module.exports = {addOrder, updateOrder, deletedOrder};
