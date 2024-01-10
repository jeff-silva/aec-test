import { useState } from 'react';
import axios from 'axios';

import { ProductInterface } from '@/contexts/CartContext';

const useProductRequest = () => {
  const [busy, setBusy] = useState(false);
  const [response, setResponse] = useState<ProductInterface | null>(null);

  const load = async (id: number | string | null = null): Promise<ProductInterface | null> => {
    if (!id) return null;
    setBusy(true);

    try {
      let { data } = await axios({
        method: 'get',
        url: `https://api.mercadolibre.com/items`,
        params: { ids: id },
      });

      if (typeof data[0] != 'undefined') {
        if (!data[0].body.error) {
          let product = data[0].body;

          let description: string[] = [];

          product.attributes.map((attr: { values: any[]; name: any; }) => {
            const values = attr.values.map(value => value.name).join(', ');
            description.push(`<p>${attr.name}: ${values}</p>`);
          });

          product = {
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            description: description.join('<br />'),
          };
          setResponse(product);
          setBusy(false);
          return product;
        }
      }

      return null;
    } catch (error) {
      setResponse(null);
    } finally {
      setBusy(false);
    }

    return null;
  };

  return {
    busy,
    response,
    load,
  };
};

export default useProductRequest;
