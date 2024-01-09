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
        <div className="container mx-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <div className="grid grid-cols-3 gap-4">
                {products.response.results.map((prod) => (
                  <ProductCardV product={prod} key={prod.id} />
                ))}
              </div>
            </div>

            <div>
              <div className="flex flex-col gap-3">
                {cart.items.map((item, itemIndex) => (
                  <div className="border" key={item.product.id}>
                    <ProductCardH product={item.product} />
                  </div>
                ))}
              </div>

              <br />

              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Produto</th>
                    <th className="border px-4 py-2">Preço</th>
                    <th className="border px-4 py-2">Quant.</th>
                    <th className="border px-4 py-2">Total</th>
                    <th className="border px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.items.map((item, itemIndex) => (
                    <tr key={item.product.id}>
                      <td className="border px-4 py-2">{item.product.title}</td>
                      <td className="border px-4 py-2">{item.product.price}</td>
                      <td className="border px-4 py-2">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(ev) => {
                            item.quantity = ev.target.value;
                            cart.itemUpdate(item);
                          }}
                        />
                      </td>
                      <td className="border px-4 py-2">{item.product.price * item.quantity}</td>
                      <td className="border px-4 py-2">
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={(ev) => cart.itemRemove(item.product)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}

                  <tr>
                    <td className="border px-4 py-2"></td>
                    <td className="border px-4 py-2"></td>
                    <td className="border px-4 py-2"></td>
                    <td className="border px-4 py-2">{cart.total}</td>
                    <td className="border px-4 py-2"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <br />

          <pre dangerouslySetInnerHTML={{ __html: JSON.stringify(cart, null, 2) }} />
          <pre dangerouslySetInnerHTML={{ __html: JSON.stringify(products, null, 2) }} />
        </div>
      </main>
    </>
  );
}
