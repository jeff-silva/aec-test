import Head from 'next/head';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import useProductRequest from '@/hooks/useProductRequest';
import { useRouter } from 'next/router';

export default function Test() {
  const router = useRouter();
  const params = useParams();
  const product = useProductRequest();

  
  useEffect(() => {
    // console.log('params:', params);
    // console.log('query:', router.query.id);
    product.load(router.query.id);
  }, [router]);

  return (
    <>
      <Head>
        <title>Produto</title>
      </Head>

      <main className="container mx-auto border">
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
            <pre dangerouslySetInnerHTML={{ __html: JSON.stringify(product, null, 2) }} />
          </div>
        )}
      </main>
    </>
  );
}
