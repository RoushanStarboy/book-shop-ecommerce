import React, {useContext} from 'react';
import { CartContext } from '../../CartContext';



function Cart(){
    const { cartCount, handleAddToCart, handleRemoveToCart } = useContext(CartContext);
    return<>
    <div>
      <h2>Cart Count: {cartCount}</h2>
      <button onClick={handleRemoveToCart}>-</button> <button onClick={handleAddToCart}>+</button>
    </div>
    </>

}
export default Cart;