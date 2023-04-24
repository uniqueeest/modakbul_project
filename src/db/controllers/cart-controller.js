const cartservice = require('../service/cart-service');

const cartController = {
    //장바구니 추가 컨트롤러
    async cartPost (req, res) {
        try{
            const userIdKey = req.user.id;
            const cartAdd = req.body;

            await cartservice.postCart(userIdKey, cartAdd);
            res.status(200).send('장바구니에 등록되었습니다.');
        } catch (err) {
            res.status(500).send(`${err}`);
        };
    },
    //장바구니 조회 컨트롤러
    async cartGet (req, res) {
        try{
            const userIdKey = req.user.id;
            const cartItems = await cartservice.presentCart(userIdKey);
            res.status(200).send(cartItems);
        } catch (err) {
            netx (err);
        };
    },
    //장바구니 개별 삭제 컨트롤러
    async cartDeleteOne (req, res) {
        try {
            const userIdKey = req.user.id;
            const cartId = req.params;

            await cartservice.removeCart(userIdKey, cartId);
            res.status(200).send('장바구니 삭제에 성공했습니다.');
        } catch (err) {
            res.status(500).send(`${err}`);
        }
    },
    //장바구니 전체 삭제 컨트롤러
    async cartDeleteAll (req, res) {
        try {
            const userIdKey = req.user.id;

            await cartservice.removeAllCart(userIdKey);
            res.status(200).send('장바구니 전체 삭제에 성공했습니다.');
        } catch (err) {
            res.status(500).send(`${err}`);
        }
    }
};

module.exports = cartController;