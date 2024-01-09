import Head from 'next/head';

import { useContext, useEffect } from 'react';
import Image from 'next/image';

import { CartContext } from '@/contexts/CartContext';
import useProductsRequest from '@/hooks/useProductsRequest';
import ProductCard from '@/components/Product/Card';

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
              <ProductCard
                key={prod.id}
                product={prod}
                layout={'vertical'}
              />
            ))}
          </div>

          {/* <pre dangerouslySetInnerHTML={{ __html: JSON.stringify(cart, null, 2) }} /> */}
          {/* <pre dangerouslySetInnerHTML={{ __html: JSON.stringify(products, null, 2) }} /> */}
        </div>
      </main>
    </>
  );
}
