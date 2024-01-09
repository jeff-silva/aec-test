import React, { useContext } from "react";
import { CartContext } from '@/contexts/CartContext';
import { Icon } from '@iconify/react';

const ProductCard = ({ product }) => {
  const cart = useContext(CartContext);
  const cartItem = cart.itemFind(product);

  return (
    <div
      key={product.id}
      className="flex flex-col rounded border overflow-hidden"
      style={{
        height: '350px',
      }}
    >
      <div className="grow mx-auto" style={{
        width: '160px',
        height: '200px',
        background: `url(${product.thumbnail}) center center no-repeat`,
        backgroundSize: 'contain',
      }} />

      <div className="p-3">{product.title}</div>

      {cartItem && (
        <div className="flex border">
          <input
            type="number"
            value={cartItem.quantity}
            onChange={(ev) => {
              cartItem.quantity = ev.target.value;
              cart.itemUpdate(cartItem);
            }}
          />
          <button
            className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4"
            onClick={(ev) => cart.itemRemove(product)}
          >
            <Icon icon="material-symbols:delete-forever" height="23" className="mx-auto" />
          </button>
        </div>
      )}

      {!cartItem && (
        <button
          className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4"
          onClick={(ev) => cart.itemAdd(product)}
        >
          <span>Add</span>
        </button>
      )}
    </div>
  );
};

export default ProductCard;