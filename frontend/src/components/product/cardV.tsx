import React, { useContext } from "react";
import Link from 'next/link';

import { CartContext } from '@/contexts/CartContext';
import { Icon } from '@iconify/react';
import useFormat from "@/hooks/useFormat";

const ProductCardV = ({ product }) => {
  const cart = useContext(CartContext);
  const cartItem = cart.itemFind(product);
  const format = useFormat();

  return (
    <div
      key={product.id}
      className="flex flex-col rounded border overflow-hidden"
      style={{
        minWidth: '250px',
        maxWidth: '250px',
        height: '350px',
      }}
    >
      <Link
        href={`/product/${product.id}`}
        className="grow mx-auto"
        style={{
          width: '160px',
          height: '200px',
          background: `url(${product.thumbnail}) center center no-repeat`,
          backgroundSize: 'contain',
        }}
      />

      <Link href={`/product/${product.id}`} className="p-3">{product.title}</Link>
      
      <div className="p-3 text-center">{format.money(product.price)}</div>

      {cartItem && (
        <div className="flex">
          <input
            type="number"
            className="grow w-2/4 border-t px-3"
            value={cartItem.quantity}
            onChange={(ev) => {
              cartItem.quantity = ev.target.value;
              cart.itemUpdate(cartItem);
            }}
          />

          <button
            className="grow w-2/4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4"
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

export default ProductCardV;