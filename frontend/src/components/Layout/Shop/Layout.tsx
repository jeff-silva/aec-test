import React, { useContext } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';

import ShopCartDrawer from './CartDrawer';
import { CartContext } from '@/contexts/CartContext';

const ShopLayout = ({ children }: { children: React.ReactNode }) => {
  const cart = useContext(CartContext);

  return (
    <div>
      <div
        className="shadow-lg bg-white"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
        }}
      >
        <div className="container mx-auto py-3 px-4 lg:px-0 flex items-center gap-3">
          <Link href="/">Home</Link>

          <div className="grow"></div>

          <button
            type="button"
            onClick={() => cart.drawerToggle()}
          >
            <Icon icon="material-symbols-light:shopping-bag" height="30" />
          </button>
        </div>
      </div>

      <main
        style={{ marginTop: 70, minHeight: '85vh' }}
        className="px-4 lg:px-0"
      >
        {children}
      </main>

      <br /><br />

      <div className="bg-gray-800 text-white">
        <div className="container mx-auto py-6 px-4 lg:px-0">
          &copy; 2024 - Todos os direitos reservados
        </div>
      </div>

      <ShopCartDrawer />
    </div>
  );
};

export default ShopLayout;
