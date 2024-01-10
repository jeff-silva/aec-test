import React, { useContext, useState } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import ShopCartDrawer from './CartDrawer';
import { CartContext } from '@/contexts/CartContext';

const ShopLayout = ({ children }: { children: React.ReactNode }) => {
  const cart = useContext(CartContext);
  const router = useRouter();
  const [search, setSearch] = useState({ q: '', limit: 20 });

  return (
    <div>
      <div
        className="shadow-lg bg-white"
        style={{
          position: 'sticky',
          top: 0,
          width: '100vw',
        }}
      >
        <div className="container mx-auto py-3 px-4 lg:px-0 flex items-center gap-3">
          <Link href="/">Home</Link>

          <div className="grow"></div>

          <form
            className="border flex items-center gap-3 grow"
            onSubmit={(ev) => {
              ev.preventDefault();
              if (!search.q) return;
              router.push({
                pathname: '/product',
                query: search,
              });
            }}
          >
            <input
              type="text"
              className="p-2 w-full"
              placeholder="Pesquisar"
              onInput={(ev) => {
                setSearch({ ...search, q: (ev.target as HTMLInputElement).value });
              }}
            />
            <button
              type="submit"
              className="p-2"
            >
              <Icon icon="majesticons:search-line" />
            </button>
          </form>

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
        style={{ marginTop: 40, minHeight: '85vh' }}
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
