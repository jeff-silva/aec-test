import React, { useContext } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';

import ShopCartDrawer from './CartDrawer';
import { CartContext } from '@/contexts/CartContext';

const ShopLayout = ({ children }: { children: React.ReactNode }) => {
  const cart = useContext(CartContext);

  return (
    <div>
      <div className="shadow-lg">
        <div className="container mx-auto py-3 flex items-center gap-3">
          <Link href="/">Shop</Link>

          <div className="grow"></div>

          <button
            type="button"
            onClick={() => cart.drawerToggle()}
          >
            <Icon icon="material-symbols-light:shopping-bag" height="30" />
          </button>
        </div>
      </div>
      <br />

      <main>{children}</main>

      <ShopCartDrawer />
    </div>
  );
};

export default ShopLayout;
