import React, { useContext } from 'react';
import { CartContext } from '../../CartContext';

function Cart() {
  const { cartItems, cartCount, handleAddToCart, handleRemoveFromCart } = useContext(CartContext);

  return (
    <div>
      <h2>Cart Count: {cartCount}</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            <div>
              <img src={item.image} alt={item.title} style={{ width: '50px', height: '50px' }} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.author}</p>
                <p>Price: {item.price} ₹</p>
                <button onClick={() => handleRemoveFromCart(index)}>-</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={() => handleAddToCart({ title: 'Sample Book', author: 'Author', image: 'sample.jpg', price: 100 })}>Add Sample Book</button>
    </div>
  );
}

export default Cart;
