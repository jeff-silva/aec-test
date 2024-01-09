import React, { useContext } from 'react';
import { Icon } from '@iconify/react';

import { CartContext } from '@/contexts/CartContext';
import ProductCardH from '@/components/product/cardH';

const ShopCartDrawer = ({ open=false, setOpen=()=>{} }) => {
  const cart = useContext(CartContext);

  return (
    <div>
      <div
        // className={`${open ? 'opacity-100' : 'opacity-0'} transition-opacity ease-in duration-300`}
        style={{
          background: '#00000011',
          position: 'fixed',
          top: 0,
          right: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9,
          cursor: 'pointer',
          visibility: open ? 'visible' : 'hidden',
          opacity: open ? 1 : 0,
          transition: 'all 300ms ease',
        }}
        onClick={(ev) => {
          if (ev.currentTarget != ev.target) return;
          setOpen(false);
        }}
      >
        <div
          className="bg-white shadow-2xl flex flex-col"
          style={{
            position: 'fixed',
            top: 0,
            right: open ? 0 : -300,
            width: '300px',
            height: '100vh',
            cursor: 'default',
            transition: 'all 300ms ease',
          }}
        >
          <div className="p-3 bg-gray-200 flex items-center">
            <div className="grow">Cart</div>
            <button type="button" onClick={() => setOpen(!open)}>
              <Icon icon="material-symbols:close" />
            </button>
          </div>

          <div className="p-3 grow">
            <div className="flex flex-col gap-3">
              {cart.items.map((item, itemIndex) => (
                <div className="" key={item.product.id}>
                  <ProductCardH product={item.product} />
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 border-t">Footer</div>
        </div>
      </div>
      {/* {open && (
      )} */}
    </div>
  );
};

export default ShopCartDrawer;
