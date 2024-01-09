import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import ShopCartDrawer from './CartDrawer';

const ShopLayout = ({ children }: { children: React.ReactNode }) => {
  const [ open, setOpen ] = useState(true);

  return (
    <div>
      <div className="shadow-lg">
        <div className="container mx-auto py-3 flex items-center gap-3">
          <div>Shop</div>

          <div className="grow"></div>

          <button
            type="button"
            onClick={() => setOpen(!open)}
          >
            <Icon icon="material-symbols-light:shopping-bag" height="30" />
          </button>
        </div>
      </div>
      <br />

      <main>{children}</main>

      <ShopCartDrawer
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default ShopLayout;
