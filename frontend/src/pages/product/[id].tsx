import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import useProductRequest from '@/hooks/useProductRequest';
import { useRouter } from 'next/router';
import Image from 'next/image';

import useProductsRequest from '@/hooks/useProductsRequest';
import useFormat from '@/hooks/useFormat';
import ProductCard from '@/components/Product/Card';
import { CartContext } from '@/contexts/CartContext';

import { CartItemInterface } from '@/contexts/CartContext';

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
      const data = await product.load(productId);
      setCartItem(cart.itemFind(data));
      relateds.paramsUpdate({ q: data.title });
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);
  
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

        {!product.busy && !product.response && (
          <div>Produto não encontrado</div>
        )}
        
        {!product.busy && product.response && (
          <div>
            <h1 className="font-bold text-3xl">{product.response.title}</h1>
            <h1 className="font-bold text-2xl text-green-600">{format.money(product.response.price)}</h1>
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

              {!cartItem && (
                <button
                  type="button"
                  className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4"
                  onClick={() => {
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
                        cartItem.quantity = parseInt(ev.target.value);
                        cart.itemUpdate(cartItem);
                      }}
                    />
                  </div>

                  <button
                    type="button"
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4"
                    onClick={async () => {
                      await cart.itemRemove(cartItem.product);
                      setCartItem(false);
                    }}
                  >
                    Remover
                  </button>
                </div>
              )}
            </div>
            
            {/* <pre dangerouslySetInnerHTML={{ __html: JSON.stringify(cartItem, null, 2) }} /> */}
          </div>
        )}

        <br />
        <h2 className="text-2xl font-bold mb-3">Relacionados</h2>

        <div
          className="flex gap-3 overflow-auto"
        >
          {relateds.response.results.map((prod) => (
            <div
              key={prod.id}
              style={{
                minWidth: 250,
                maxWidth: 250,
              }}
            >
              <ProductCard product={prod} />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
