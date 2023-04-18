import mongoose from 'mongoose';
import { cartSchema } from '../schemas/cart_schema'

//Cart 모델 생성
const Cart = mongoose.model('Cart', cartSchema);

export { Cart };