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
import Product from "./product/product";
import LayoutComponent from "../LayoutComponent";
import OrderPage from "./OrderPage/orderpage";
import { CartProvider } from '../CartContext';
import Preloader from "./Preloader/preloader";



function Main() {
  return (

    <>
    <Preloader /> {/* Add Preloader */}
    <main>
    <LayoutComponent>  {/* Wrap all content in LayoutComponent */}
    <CartProvider>
    <Navbar/>
    <Routes>
      <Route path="/" element={<><HomePage /> <Footer/></>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/allbooks" element={<AllBooks/>}/>
      <Route path="/about-us" element={<><Aboutus/><Footer/></>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path='/products' element={<Product/>}/>
      <Route path='/orderpage' element={<OrderPage/>}/>
    </Routes>
    </CartProvider>
    </LayoutComponent>
    </main>
    </>
  );
}

export default Main;