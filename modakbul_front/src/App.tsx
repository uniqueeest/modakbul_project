import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Login from "./pages/login/Login";
import AdminLogin from "./pages/login/admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin/ >} />
      </Routes>
    </Router>
  );
}

export default App;
