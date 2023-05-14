import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';

import Header from "./components/Header";
import Footer from './components/Footers';
import MainPage from './pages/MainPage';



function App() {
  return (
    <Router>
      <Header></Header>
      <MainPage />
      <Footer></Footer>
    </Router>
  );
}

export default App;
