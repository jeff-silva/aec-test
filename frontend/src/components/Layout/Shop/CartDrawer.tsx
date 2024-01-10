import React, { useContext } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';

import { CartContext } from '@/contexts/CartContext';
import ProductCard from '@/components/Product/Card';
import useFormat from '@/hooks/useFormat';

const ShopCartDrawer = ({ }) => {
  const cart = useContext(CartContext);
  const format = useFormat();
  const drawerWidth = 400;

  return (
    <div>
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9,
          cursor: 'pointer',
          visibility: cart.drawer ? 'visible' : 'hidden',
          opacity: cart.drawer ? 1 : 0,
          transition: 'all 300ms ease',
        }}
      >
        {/* Overlay */}
        <div
          className="opacity-25 bg-green-600"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%',
            cursor: 'pointer',
            zIndex: 1,
          }}
          onClick={(ev) => {
            if (ev.currentTarget != ev.target) return;
            cart.drawerToggle(false);
          }}
        />

        {/* Content */}
        <div
          className="bg-white shadow-2xl flex flex-col"
          style={{
            position: 'fixed',
            top: 0,
            right: cart.drawer ? 0 : -drawerWidth,
            width: `${drawerWidth}px`,
            height: '100vh',
            maxWidth: '90vw',
            cursor: 'default',
            transition: 'all 300ms ease',
            zIndex: 2,
          }}
        >
          <div className="p-3 bg-green-600 text-white flex items-center">
            <div className="grow flex items-center gap-3">
              <Icon icon="tabler:shopping-bag-plus" height="28" />
              <span className="font-bold uppercase">Meu Carrinho</span>
            </div>
            <button type="button" onClick={() => cart.drawerToggle()}>
              <Icon icon="material-symbols:close" />
            </button>
          </div>

          <div className="p-3 grow overflow-auto">
            <div className="flex flex-col gap-6">

              {cart.items.length==0 && (
                <div className="text-center text-gray-500 py-2">
                  Nenhum inserido
                </div>
              )}

              {cart.items.map((item, itemIndex) => (
                <div className="" key={item.product.id}>
                  <ProductCard
                    key={item.product.id}
                    product={item.product}
                    layout={'horizontal'}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 border-t flex items-center">
            <div className="grow font-bold">
              Total: {format.money(cart.total)}
            </div>

            <Link
              href="/product/finish"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => cart.drawerToggle(false)}
            >
              Finalizar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCartDrawer;
