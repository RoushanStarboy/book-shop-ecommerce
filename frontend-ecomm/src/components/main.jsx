import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './home/home';
import LoginPage from '../login/LoginPage';

function Main() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage/>} />
    </Routes>
  );
}

export default Main;