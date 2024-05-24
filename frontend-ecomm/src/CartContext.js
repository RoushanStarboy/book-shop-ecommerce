import React, { createContext, useState, useEffect } from 'react';

// Create Context
export const CartContext = createContext();

// Create Provider Component
export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(() => {
    const savedCount = localStorage.getItem('cartCount');
    return !isNaN(savedCount) && savedCount !== null ? parseInt(savedCount, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('cartCount', cartCount);
  }, [cartCount]);

  const handleAddToCart = () => {
    setCartCount((prevCount) => {
      const newCount = prevCount + 1;
      localStorage.setItem('cartCount', newCount);
      return newCount;
    });
  };

  const handleRemoveToCart = () => {
    setCartCount((prevCount) => {
      const newCount = prevCount > 0 ? prevCount - 1 : 0;
      localStorage.setItem('cartCount', newCount);
      return newCount;
    });
  };

  return (
    <CartContext.Provider value={{ cartCount, handleAddToCart, handleRemoveToCart }}>
      {children}
    </CartContext.Provider>
  );
};
