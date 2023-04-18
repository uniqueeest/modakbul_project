import mongoose from 'mongoose';
import { cartSchema } from '../schemas/cart'

//Cart 모델 생성
const Cart = mongoose.model('Cart', cartSchema);

export { Cart };