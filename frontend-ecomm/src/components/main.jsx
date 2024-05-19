import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './home/home';
import LoginPage from '../login/LoginPage';
import AllBooks from './all books/allbooks';
import Aboutus from './aboutus/Aboutus';
import Cart from './cart/cart';
import Navbar from "./Nav/navbar";
import Footer from "./footer/footer";
import './main.css';




function Main() {
  return (
    <><main>
    <Navbar/>
    <Routes>
      <Route path="/" element={<><HomePage /> <Footer/></>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/allbooks" element={<AllBooks/>}/>
      <Route path="/about-us" element={<Aboutus/>}/>
      <Route path="/cart" element={<Cart/>}/>
    </Routes>
    </main></>
  );
}

export default Main;