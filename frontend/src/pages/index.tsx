import Head from 'next/head';
import Link from 'next/link';

import { useEffect } from 'react';

import useProductsRequest from '@/hooks/useProductsRequest';
import ProductCard from '@/components/Product/Card';
import { ProductInterface } from '@/contexts/CartContext';
import { Icon } from '@iconify/react';

export default function Test() {

  const lists = [
    {
      title: 'Computadores',
      href: '/product?q=Computadores',
      request: useProductsRequest({
        params: { limit: 10, q: 'Computadores' },
      }),
    },
    {
      title: 'Brinquedos',
      href: '/product?q=Brinquedos',
      request: useProductsRequest({
        params: { limit: 10, q: 'Brinquedos' },
      }),
    },
    {
      title: 'Imóveis',
      href: '/product?q=Imóveis',
      request: useProductsRequest({
        params: { limit: 10, q: 'Imóveis' },
      }),
    },
    {
      title: 'Veículos',
      href: '/product?q=Veículos',
      request: useProductsRequest({
        params: { limit: 10, q: 'Veículos' },
      }),
    },
  ];

  useEffect(() => {
    const t = setTimeout(() => {
      lists.map((list) => {
        list.request.submit();
      });
    }, 1000);

    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Head>
        <title>Test</title>
      </Head>

      <main>
        <div className="container mx-auto">

          <div className="flex flex-col gap-10">
            {lists.map((list, listIndex) => (
              <div
                key={listIndex}
                className=""
              >
                <div className="text-gray-600 text-3xl font-bold uppercase mb-2">{list.title}</div>

                <div className="flex gap-3 overflow-auto mb-2">
                  {list.request.response.results.map((prod: ProductInterface) => (
                    <div
                      key={prod.id}
                      style={{
                        minWidth: 200,
                        maxWidth: 200,
                      }}
                    >
                      <ProductCard product={prod} height="250px" />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Link href={list.href} style={{ minWidth: 120 }} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center gap-1">
                    <span>Ver mais</span>
                    <Icon icon="ic:baseline-keyboard-double-arrow-right" height="20" />
                  </Link>
                </div>

                
              </div>
            ))}
          </div>

          {/* <pre dangerouslySetInnerHTML={{ __html: JSON.stringify(lists, null, 2) }} /> */}
        </div>
      </main>
    </>
  );
}
