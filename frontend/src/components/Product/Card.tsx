import React, { useContext } from "react";
import { Icon } from '@iconify/react';
import Link from 'next/link';

import { CartContext, ProductInterface } from '@/contexts/CartContext';
import useFormat from "@/hooks/useFormat";
import InputQuantity from "@/components/Ui/InputQuantity";

const ProductCard = ({
    product,
    layout = 'vertical',
    height = '350px',
  }: {
    product: ProductInterface,
    layout?: string,
    height?: string,
  }) => {
  const cart = useContext(CartContext);
  const cartItem = cart.itemFind(product);
  const format = useFormat();

  // Horizontal
  if (layout == 'horizontal') {
    return (
      <div
        key={product.id}
        className="flex items-center gap-3 rounded overflow-hidden"
      >
        <Link
          href={`/product/${product.id}`}
          style={{
            minWidth: '80px',
            maxWidth: '80px',
            height: '130px',
            background: `url(${product.thumbnail}) center center no-repeat`,
            backgroundSize: 'contain',
          }}
        />
  
        <div className="grow">
          <Link
            href={`/product/${product.id}`}
            className="block font-bold text-ellipsis overflow-hidden"
          >
            {product.title}
          </Link>
          
          <div className="flex items-center gap-2">
            <div className="grow text-green-500 font-bold">{format.money(product.price)}</div>

            {cartItem && (
              <div className="grow flex border rounded-md overflow-hidden" style={{ maxWidth: 180 }}>
                {/* <input
                  type="number"
                  className="w-full"
                  value={cartItem.quantity}
                  onChange={(ev) => {
                    cartItem.quantity = +ev.target.value;
                    cart.itemUpdate(cartItem);
                  }}
                /> */}

                <InputQuantity
                  className="w-full"
                  min={1}
                  max={10}
                  value={cartItem.quantity}
                  onInput={(value) => {
                    cartItem.quantity = value;
                    cart.itemUpdate(cartItem);
                  }}
                />

                <button type="button" className="bg-red-600 px-2" onClick={(ev) => cart.itemRemove(product)}>
                  <Icon icon="material-symbols:delete-forever" height="23" className="text-white" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Vertical
  return (
    <div
      key={product.id}
      className="flex flex-col rounded-md shadow-xl overflow-hidden"
      style={{
        height,
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

      <Link
        href={`/product/${product.id}`}
        className="p-3 font-bold text-ellipsis overflow-hidden whitespace-nowrap"
      >
        {product.title}
      </Link>
      
      <div className="p-3 text-center text-green-500 font-bold">{format.money(product.price)}</div>

      {cartItem && (
        <div className="flex">
          {/* <input
            type="number"
            className="grow w-2/4 border-t px-3"
            value={cartItem.quantity}
            onChange={(ev) => {
              cartItem.quantity = +ev.target.value;
              cart.itemUpdate(cartItem);
            }}
          /> */}

          <InputQuantity
            className="grow w-/4"
            min={1}
            max={10}
            value={cartItem.quantity}
            onInput={(value) => {
              cartItem.quantity = value;
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
          className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 flex items-center justify-center gap-3"
          onClick={(ev) => cart.itemAdd(product)}
        >
          <Icon icon="tabler:shopping-bag-plus" height="24" />
        </button>
      )}
    </div>
  );
};

export default ProductCard;