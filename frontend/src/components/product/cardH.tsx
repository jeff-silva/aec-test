import React, { useContext } from "react";
import { CartContext } from '@/contexts/CartContext';
import { Icon } from '@iconify/react';
import useFormat from "@/hooks/useFormat";

const ProductCardH = ({ product }) => {
  const cart = useContext(CartContext);
  const cartItem = cart.itemFind(product);
  const format = useFormat();

  return (
    <div
      key={product.id}
      className="flex items-center gap-3 rounded overflow-hidden"
    >
      <div style={{
        minWidth: '80px',
        maxWidth: '80px',
        height: '130px',
        background: `url(${product.thumbnail}) center center no-repeat`,
        backgroundSize: 'contain',
      }} />

      <div className="grow">
        <div className="font-bold">{product.title}</div>
        <div className="">{format.money(product.price)}</div>
      </div>
    </div>
  );
};

export default ProductCardH;