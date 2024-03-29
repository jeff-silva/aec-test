import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import useProductRequest from '@/hooks/useProductRequest';
import { useRouter } from 'next/router';

import useProductsRequest from '@/hooks/useProductsRequest';
import useFormat from '@/hooks/useFormat';
import ProductCard from '@/components/Product/Card';
import { CartContext } from '@/contexts/CartContext';
import { CartItemInterface, ProductInterface } from '@/contexts/CartContext';
import InputQuantity from '@/components/Ui/InputQuantity';
import { Icon } from '@iconify/react';

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

      const randomTerm = data.title.split(' ').filter(() => 0 == Math.round(Math.random() * 1)).join(' ');
      relateds.paramsUpdate({ q: randomTerm });
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
        <title>{product.response ? product.response.title : 'Produto não encontrado'}</title>
      </Head>

      <main className="container mx-auto">

        {!product.busy && !product.response && (
          <div>Produto não encontrado</div>
        )}

        {!product.busy && product.response && (
          <div className="grid grid-cols-12 gap-6">

            {/* Small Details */}
            <div className="col-span-12 lg:col-span-6 flex flex-col">
              <div
                className="border rounded-lg overflow-hidden grow"
                style={{
                  width: '100%',
                  minHeight: 300,
                  background: `url(${product.response.thumbnail}) center center no-repeat`,
                  backgroundSize: 300,
                }}
              />

              <div className="flex gap-3 mt-3 overflow-auto">
                {[...new Array(10)].map((n, i) => (
                  <div
                    key={i}
                    className="border rounded-lg overflow-hidden"
                    style={{
                      minWidth: 150,
                      maxWidth: 150,
                      height: 150,
                      background: `url(${product.response?.thumbnail}) center center no-repeat`,
                      backgroundSize: 120,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="col-span-12 lg:col-span-6">
              <h1 className="font-bold text-3xl">{product.response.title}</h1>
              <br />

              <div className="flex gap-2">
                {[
                  'fluent:star-24-filled',
                  'fluent:star-24-filled',
                  'fluent:star-24-filled',
                  'fluent:star-half-24-regular',
                  'fluent:star-24-regular',
                ].map((icon, iconIndex) => (
                  <Icon
                    key={iconIndex}
                    className="text-yellow-400 cursor-pointer"
                    height="30"
                    icon={icon}
                  />
                ))}
              </div>
              <br />

              <div
                dangerouslySetInnerHTML={{ __html: product.response.description }}
                className="overflow-auto"
                style={{ maxHeight: 400 }}
              />
              <br />

              <div className="font-bold text-2xl text-center py-3 text-green-600 bg-green-100">{format.money(product.response.price)}</div>
              <br />

              {cartItem && (
                <div className="flex gap-3" style={{ maxWidth: 400 }}>
                  <InputQuantity
                    className="border rounded"
                    value={cartItem.quantity}
                    onInput={(value) => {
                      cartItem.quantity = value;
                      cart.itemUpdate(cartItem);
                    }}
                  />

                  <button
                    type="button"
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={async () => {
                      await cart.itemRemove(cartItem.product);
                      setCartItem(null);
                    }}
                  >
                    Remover
                  </button>
                </div>
              )}

              {!cartItem && (
                <div>
                  <button
                    type="button"
                    className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    style={{ maxWidth: 400 }}
                    onClick={() => {
                      if (!product.response) return;
                      cart.itemAdd(product.response);
                      setCartItem(cart.itemFind(product.response));
                    }}
                  >
                    Adicionar
                  </button>
                </div>
              )}

              <br />
              <div className="flex gap-3">
                <button type="button" className="flex items-center gap-2 py-1 px-3 rounded border border-green-600 text-green-600 hover:bg-green-500 hover:text-white transition duration-500">
                  <Icon icon="mdi:heart" />
                  <span>Lista de desejos</span>
                </button>

                <button type="button" className="flex items-center gap-2 py-1 px-3 rounded border border-green-600 text-green-600 hover:bg-green-500 hover:text-white transition duration-500">
                  <Icon icon="mdi:share-variant" />
                  <span>Compartilhar</span>
                </button>
              </div>

              {/* <pre dangerouslySetInnerHTML={{ __html: JSON.stringify(cartItem, null, 2) }} /> */}
            </div>

            <div className="col-span-12">
              <h2 className="font-bold text-3xl mb-3">Relacionados</h2>
              <div className="flex gap-6 border-gray-200 overflow-auto">

                {relateds.busy && [...new Array(10)].map((n, i) => (
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

                {!relateds.busy && relateds.response.results.map((prod: ProductInterface) => (
                  <div key={prod.id} style={{ maxWidth: 250 }} className="mx-auto lg:mx-0">
                    <ProductCard product={prod} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
