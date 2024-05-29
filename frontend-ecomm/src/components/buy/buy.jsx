import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your-stripe-publishable-key');

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/cart/cart'); // Adjust the endpoint as needed
      const data = await response.json();
      setCartItems(data.cart_items);
      setTotalPrice(data.total_price);
      setSessionId(data.session_id);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    if (!sessionId) {
      console.error('No session ID available');
      return;
    }

    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) {
      console.error('Error during checkout:', error.message);
    }
  };

  return (
    <div>
      <h1>Your Cart</h1>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.title} - {item.price} x {item.quantity}
          </li>
        ))}
      </ul>
      <h2>Total: ${totalPrice}</h2>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default CartPage;
