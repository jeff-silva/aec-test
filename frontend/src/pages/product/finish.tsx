import { CartContext } from '@/contexts/CartContext';
import Head from 'next/head';
import { useContext } from 'react';
import Swal from 'sweetalert2';

import ProductCard from '@/components/Product/Card';
import useFormat from '@/hooks/useFormat';

export default function Test() {
  const cart = useContext(CartContext);
  const format = useFormat();

  const cartFinalize = async () => {
    const resp = await Swal.fire({
      icon: "warning",
      html: `Confirmar sua compra no valor de <br /><strong>${format.money(cart.total)}</strong>?`,
      confirmButtonText: 'Confirmar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'font-bold mx-1 py-2 px-4 rounded text-white bg-green-500 hover:bg-green-700',
        cancelButton:  'font-bold mx-1 py-2 px-4 rounded bg-gray-200 hover:bg-gray-300',
      },
    });
  
    
    if (resp.isConfirmed) {
      cart.itemsClear();
      
      Swal.fire({
        icon: "success",
        html: `Compra concluída! Obrigado por comprar conosco.`,
        confirmButtonText: 'Ok',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'font-bold mx-1 py-2 px-4 rounded text-white bg-green-500 hover:bg-green-700',
        },
      });
    }
  };

  return (
    <>
      <Head>
        <title>Produto</title>
      </Head>

      <main className="container mx-auto">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-3">
            {cart.items.map((item) => (
              <div key={item.product.id} className="border px-3 rounded-md">
                <ProductCard product={item.product} layout="horizontal" />
              </div>
            ))}

            <div className="text-green-600 font-bold text-4xl text-end">
              {format.money(cart.total)}
            </div>
          </div>

          <div className="">
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-12 font-bold">
                Dados do comprador
              </div>

              <div className="col-span-6 border">
                <input type="text" placeholder="Nome" className="w-full p-3" />
              </div>

              <div className="col-span-6 border">
                <input type="text" placeholder="Sobrenome" className="w-full p-3" />
              </div>
              
              <div className="col-span-6 border">
                <input type="text" placeholder="RG" className="w-full p-3" />
              </div>

              <div className="col-span-6 border">
                <input type="text" placeholder="CPF" className="w-full p-3" />
              </div>

              <div className="col-span-12 font-bold">
                Residência
              </div>

              <div className="col-span-9 border">
                <input type="text" placeholder="Rua" className="w-full p-3" />
              </div>

              <div className="col-span-3 border">
                <input type="text" placeholder="Nº" className="w-full p-3" />
              </div>
              
              <div className="col-span-6 border">
                <input type="text" placeholder="Bairro" className="w-full p-3" />
              </div>
              
              <div className="col-span-6 border">
                <input type="text" placeholder="CEP" className="w-full p-3" />
              </div>
              
              <div className="col-span-6 border">
                <input type="text" placeholder="Cidade" className="w-full p-3" />
              </div>
              
              <div className="col-span-6 border">
                <input type="text" placeholder="Estado" className="w-full p-3" />
              </div>

              <div className="col-span-12 font-bold">
                Cartão
              </div>

              <div className="col-span-12 border">
                <input type="text" placeholder="Nome do titular" className="w-full p-3" />
              </div>
              
              <div className="col-span-8 border">
                <input type="text" placeholder="Número" className="w-full p-3" />
              </div>
              
              <div className="col-span-4 border">
                <input type="text" placeholder="CVC" className="w-full p-3" />
              </div>
              
              <div className="col-span-12 flex justify-end mt-3">
                <button
                  type="button"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => cartFinalize()}
                >
                  Finalizar compra
                </button>
              </div>
            </div>
          </div>
        </div>

        

        {/* <pre dangerouslySetInnerHTML={{ __html: JSON.stringify(cart, null, 2) }} /> */}
      </main>
    </>
  );
}
