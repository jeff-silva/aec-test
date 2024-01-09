import Head from 'next/head';

import { useContext, useEffect } from 'react';
import { CartContext } from '@/contexts/CartContext';
import useProductsRequest from '@/hooks/useProductsRequest';
import Image from 'next/image';

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
          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <div className="grid grid-cols-3 gap-4">
                {products.response.results.map((prod) => (
                  <div className="border rounded overflow-hidden" key={prod.id}>
                    <div className="mx-5" style={{
                      height: '200px',
                      background: `url(${prod.thumbnail}) center center no-repeat`,
                      backgroundSize: 'cover',
                    }} />
                    <div className="p-3">{prod.title}</div>

                    {
                      cart.itemFind(prod) ?
                      (
                        <button
                          className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4"
                          onClick={(ev) => cart.itemAdd(prod)}
                        >
                          Remove
                        </button>
                      ):
                      (
                        <button
                          className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4"
                          onClick={(ev) => cart.itemAdd(prod)}
                        >
                          Add
                        </button>
                      )
                    }
                  </div>
                ))}
              </div>
            </div>

            <div>
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
                            const itemsNew = [...cart.items];
                            itemsNew[itemIndex].quantity = ev.target.value;
                            cart.setItems(itemsNew);
                            cart.totalUpdate();
                          }}
                        />
                      </td>
                      <td className="border px-4 py-2">{item.product.price * item.quantity}</td>
                      <td className="border px-4 py-2">
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={(ev) => cart.itemRemove(item)}
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

          <div className="flex gap-2">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={(ev) => {
              cart.itemAdd({ id: 123, name: '123', price: 123 });
            }}
            >
              add 123
            </button>
            
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={(ev) => {
              cart.itemAdd({ id: 456, name: '456', price: 456 });
            }}
            >
              add 456
            </button>
          </div>
          <br />

          <pre dangerouslySetInnerHTML={{ __html: JSON.stringify(cart, null, 2) }} />
          <pre dangerouslySetInnerHTML={{ __html: JSON.stringify(products, null, 2) }} />
        </div>
      </main>
    </>
  );
}
