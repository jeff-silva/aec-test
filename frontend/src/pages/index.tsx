import Head from 'next/head';
import Link from 'next/link';

import { useEffect } from 'react';

import useProductsRequest from '@/hooks/useProductsRequest';
import ProductCard from '@/components/Product/Card';

export default function Test() {

  const lists = [
    {
      title: 'Imóveis',
      href: '/product?q=Imóveis',
      params: { limit: 10, q: 'Imóveis' },
    },
    {
      title: 'Veículos',
      href: '/product?q=Veículos',
      params: { limit: 10, q: 'Veículos' },
    },
    {
      title: 'Brinquedos',
      href: '/product?q=Brinquedos',
      params: { limit: 10, q: 'Brinquedos' },
    },
  ].map((list) => {
    list.request = useProductsRequest({
      params: list.params,
    });
    return list;
  });

  useEffect(() => {
    lists.map((list) => {
      list.request.submit();
    });
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
                <Link href={list.href} className="text-xl font-bold uppercase">{list.title}</Link>
                <br /><br />

                <div className="flex gap-3 overflow-auto">
                  {list.request.response.results.map((prod) => (
                    <div
                      key={prod.id}
                      style={{ minWidth: 250 }}
                    >
                      <ProductCard product={prod} />
                    </div>
                  ))}
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
