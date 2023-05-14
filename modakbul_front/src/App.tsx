import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import Footer from './components/Footers';
import Login from "./pages/login/Login";
import AdminLogin from "./pages/login/admin";
import SignUp from './pages/signUp/SignUp';
import MyPage from './pages/myPage/MyPage';
import MyInfo from './pages/myPage/MyInfo';


function App() {
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin/ >} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="my-page" element={<MyPage />} />
        <Route path="my-info" element={<MyInfo />} />
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;
