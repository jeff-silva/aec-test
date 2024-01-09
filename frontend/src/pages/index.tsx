import Head from 'next/head';

import { useContext, useEffect } from 'react';
import Image from 'next/image';

import { CartContext } from '@/contexts/CartContext';
import useProductsRequest from '@/hooks/useProductsRequest';
import ProductCardH from '@/components/product/cardH';
import ProductCardV from '@/components/product/cardV';

export default function Test() {
  const cart = useContext(CartContext);

  const products = useProductsRequest();

  useEffect(() => {
    products.submit();
  }, []);

  return (
    <>
      <Head>
        <title>Test</title>
      </Head>

      <main>
        <br />

        <div className="container mx-auto">
          <div className="flex flex-wrap gap-4">
            {products.response.results.map((prod) => (
              <ProductCardV product={prod} key={prod.id} />
            ))}
          </div>

          {/* <pre dangerouslySetInnerHTML={{ __html: JSON.stringify(cart, null, 2) }} /> */}
          {/* <pre dangerouslySetInnerHTML={{ __html: JSON.stringify(products, null, 2) }} /> */}
        </div>
      </main>
    </>
  );
}
