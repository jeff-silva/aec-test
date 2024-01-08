import Head from 'next/head';

import { CartContext } from '@/contexts/CartContext';
import { useContext } from 'react';

export default function Test() {
  const cart = useContext(CartContext);

  return (
    <>
      <Head>
        <title>Test</title>
      </Head>

      <main>
        <br />
        <div className="container mx-auto">
          <table className="table-auto">
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
              {cart.items.map((item) => (
                <tr key={item.product.id}>
                  <td className="border px-4 py-2">{item.product.name}</td>
                  <td className="border px-4 py-2">{item.product.price}</td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(ev) => {
                        const find = cart.itemFind(item);
                        console.log(find, prod);
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
          <br />
          
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={(ev) => {
            cart.itemAdd({ id: 123, name: '123', price: 123 });
          }}
          >
            add
          </button>
          
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={(ev) => {
            cart.itemAdd({ id: 456, name: '456', price: 456 });
          }}
          >
            add
          </button>
          <br />

          <pre dangerouslySetInnerHTML={{ __html: JSON.stringify(cart, null, 2) }} />
        </div>
      </main>
    </>
  );
}
