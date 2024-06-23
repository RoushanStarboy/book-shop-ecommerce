import React, { createContext, useState, useEffect } from 'react';

// Create Context
export const CartContext = createContext();

// Create Provider Component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedItems = localStorage.getItem('cartItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (book) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(item => item.title === book.title);
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        return [...prevItems, { ...book, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (index) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].quantity -= 1;
      if (updatedItems[index].quantity <= 0) {
        return updatedItems.filter((_, i) => i !== index);
      }
      return updatedItems;
    });
  };

  const getCartItemCount = (title) => {
    const item = cartItems.find(item => item.title === title);
    return item ? item.quantity : 0;
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, cartCount, handleAddToCart, handleRemoveFromCart, getCartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};
