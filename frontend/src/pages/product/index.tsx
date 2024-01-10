import Head from 'next/head';

import { useContext, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/router';

import { CartContext } from '@/contexts/CartContext';
import useProductsRequest from '@/hooks/useProductsRequest';
import ProductCard from '@/components/Product/Card';

export default function Test() {
  const cart = useContext(CartContext);
  const router = useRouter();
  const products = useProductsRequest({
    params: router.query,
  });

  useEffect(() => {
    // products.paramsUpdate(router.query);
    products.submit();
  }, [ router ]);

  return (
    <>
      <Head>
        <title>Test</title>
      </Head>

      <main>
        <br />

        <div className="container mx-auto">
          <div className="grid grid-cols-4 gap-3">
            
            {/* Search Results */}
            <div className="col-span-3">
              <div className="grid grid-cols-4 gap-3">

                {/* Skeleton */}
                {products.busy && (
                  <>
                    {[...new Array(6)].map((n, i) => (
                      <div
                        key={i}
                        className="border p-3 animate-pulse"
                        style={{
                          height: 350,
                        }}
                      >
                        <Icon icon="material-symbols:image-rounded" className="mx-auto text-gray-200" height="140" />
                        <br />
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        <br />
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                      </div>
                    ))}
                  </>
                )}

                {/* Products List */}
                {products.response.results.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                  />
                ))}
              </div>
            </div>

            {/* Search Filters */}
            <div className="col-span-1">
              <form
                onSubmit={(ev) => {
                  ev.preventDefault();
                  products.submit();
                  router.push({ query: products.params });
                }}
              >
                <div className="flex items-center border">
                  <input
                    type="text"
                    className="grow p-3"
                    value={products.params.q}
                    onInput={(ev) => {
                      products.paramsUpdate({
                        q: ev.target.value,
                      });
                    }}
                  />
                  <button type="button" className="px-2">
                    <Icon icon={ products.busy ? 'line-md:loading-loop' : 'material-symbols:search' } height="30" />
                  </button>
                </div>
              </form>

              {/* <pre dangerouslySetInnerHTML={{ __html: JSON.stringify(products, null, 2) }} /> */}
            </div>
          </div>

          

          {/* <pre dangerouslySetInnerHTML={{ __html: JSON.stringify(cart, null, 2) }} /> */}
        </div>
      </main>
    </>
  );
}
