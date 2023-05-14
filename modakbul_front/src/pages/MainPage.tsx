import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Login from "./login/Login";
import AdminLogin from "./login/admin";
import SignUp from './signUp/SignUp';
import MyPage from './myPage/MyPage';
import MyInfo from './myPage/MyInfo';
import Cart from './cart/Cart';

const MainPage = () => {
  return (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin/ >} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="my-page" element={<MyPage />} />
        <Route path="my-info" element={<MyInfo />} />
        <Route path="cart" element={<Cart />} />
    </Routes>
  )
}
;

export default MainPage;