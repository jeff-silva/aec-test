import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import { CartProvider } from '@/contexts/CartContext';
import ShopLayout from '@/components/Layout/Shop/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <ShopLayout>
        <Component {...pageProps} />
      </ShopLayout>
    </CartProvider>
  );
}
