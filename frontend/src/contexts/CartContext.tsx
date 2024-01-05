import React, { createContext, useState } from 'react';

const CartContext = createContext({
  products: [],
  total: 0,
});

export default CartContext;

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const productAdd = (product, quantity=1) => {
    const find = products.find((prod) => prod.id == product.id);
    console.log(find);
  };

  const productRemove = (productId) => {};

  const productClear = () => {
    setProducts([]);
  };


  return (
    <CartContext.Provider value={{
      products,
      productAdd,
      productRemove,
      productClear,
    }}>
      {children}
    </CartContext.Provider>
  );
};
