import Head from 'next/head';
import { useEffect } from 'react';
import useProductRequest from '@/hooks/useProductRequest';
import { useRouter } from 'next/router';

import useProductsRequest from '@/hooks/useProductsRequest';
import ProductCard from '@/components/Product/Card';

export default function Test() {
  const router = useRouter();
  const product = useProductRequest();

  const relateds = useProductsRequest({
    params: { q: 'Automóveis', limit: 6 },
  });

  
  useEffect(() => {
    if (!router.query.id) return;

    (async () => {
      const data = await product.load(router.query.id);
      relateds.paramsUpdate({ q: data.title });
      relateds.submit();
    })();
  }, [router, router.query]);

  return (
    <>
      <Head>
        <title>Produto</title>
      </Head>

      <main className="container mx-auto">
        <div className="border p-4 max-w-sm w-full mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-200 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-200 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {!product.busy && !product.response && (
          <div>Produto não encontrado</div>
        )}
        
        {!product.busy && product.response && (
          <div>
            <h1>{product.response.title}</h1>
            
            {/* <pre dangerouslySetInnerHTML={{ __html: JSON.stringify(relateds, null, 2) }} /> */}
          </div>
        )}

        <br />
        <h2 className="font-bold mb-3">Relacionados</h2>
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

        <pre dangerouslySetInnerHTML={{ __html: JSON.stringify(product, null, 2) }} />
      </main>
    </>
  );
}
