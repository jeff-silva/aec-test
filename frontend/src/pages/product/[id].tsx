import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import useProductRequest from '@/hooks/useProductRequest';
import { useRouter } from 'next/router';

import useProductsRequest from '@/hooks/useProductsRequest';
import useFormat from '@/hooks/useFormat';
import ProductCard from '@/components/Product/Card';
import { CartContext } from '@/contexts/CartContext';

import { CartItemInterface, ProductInterface } from '@/contexts/CartContext';

export default function Test() {
  const format = useFormat();
  const router = useRouter();
  const product = useProductRequest();
  const productImageSize = 250;
  
  const cart = useContext(CartContext);
  const [cartItem, setCartItem] = useState<CartItemInterface | null >(null);

  const relateds = useProductsRequest({
    params: { q: 'Automóveis', limit: 6 },
  });

  useEffect(() => {
    if (!router.query.id) return;

    (async () => {
      const productId = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;
      const data: ProductInterface | null = await product.load(productId);
      if (!data) return;
      setCartItem(cart.itemFind(data));
      relateds.paramsUpdate({ q: data.title });
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);
  
  useEffect(() => {
    let t = setTimeout(() => {
      relateds.submit();
    }, 1000);

    return () => {
      clearTimeout(t);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [relateds.params]);

  return (
    <>
      <Head>
        <title>Produto</title>
      </Head>

      <main className="container mx-auto">

        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-12">
            {!product.busy && !product.response && (
              <div>Produto não encontrado</div>
            )}
            
            {!product.busy && product.response && (
              <div>
                <h1 className="font-bold text-3xl">{product.response.title}</h1>
                <br />

                <div className="border rounded-md overflow-hidden" style={{ maxWidth: productImageSize }}>
                  <div
                    style={{
                      minWidth: productImageSize,
                      maxWidth: productImageSize,
                      height: productImageSize,
                      background: `url(${product.response.thumbnail}) center center no-repeat`,
                    }}
                  />

                  <div className="font-bold text-2xl text-center py-3 text-green-600 bg-green-100">{format.money(product.response.price)}</div>

                  {!cartItem && (
                    <button
                      type="button"
                      className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4"
                      onClick={() => {
                        if (!product.response) return;
                        cart.itemAdd(product.response);
                        setCartItem(cart.itemFind(product.response));
                      }}
                    >
                      Adicionar ao carrinho
                    </button>
                  )}
                  
                  {cartItem && (
                    <div className="flex border-t">
                      <div className="grow">
                        <input
                          type="number"
                          className="w-full p-2"
                          value={cartItem.quantity}
                          onInput={(ev) => {
                            const target = ev.target as HTMLInputElement;
                            cartItem.quantity = +target.value;
                            cart.itemUpdate(cartItem);
                          }}
                        />
                      </div>

                      <button
                        type="button"
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4"
                        onClick={async () => {
                          await cart.itemRemove(cartItem.product);
                          setCartItem(null);
                        }}
                      >
                        Remover
                      </button>
                    </div>
                  )}
                </div>
                <br />

                <div dangerouslySetInnerHTML={{ __html: product.response.description }}></div>
                <br />
                {/* <pre dangerouslySetInnerHTML={{ __html: JSON.stringify(product, null, 2) }} /> */}
              </div>
            )}
          </div>
          
          <div className="col-span-12">
            <h2 className="font-bold text-3xl mb-3">Relacionados</h2>
            <div className="flex gap-6 border-gray-200 overflow-auto">

              {relateds.response.busy && [...new Array(10)].map((n, i) => (
                <div
                  key={i}
                  className="rounded-lg overflow-hidden border mx-auto lg:mx-0 flex flex-col"
                  style={{
                    minWidth: 250,
                    maxWidth: 250,
                  }}
                >
                  <div className="bg-gray-200" style={{ minHeight: 200, maxHeight: 200 }}></div>
                  <div className="grow">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mt-5 mx-2"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mt-5 mx-4"></div>
                  </div>
                  <div className="bg-gray-200 dark:bg-gray-700 mt-4" style={{ minHeight: 50, maxHeight: 50 }}></div>
                </div>
              ))}

              {relateds.response.results.map((prod: ProductInterface) => (
                <div key={prod.id} style={{ maxWidth: 250 }} className="mx-auto lg:mx-0">
                  <ProductCard product={prod} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
