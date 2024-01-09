import { useState } from 'react';
import axios from 'axios';

const useProductRequest = () => {
  const [busy, setBusy] = useState(false);
  const [response, setResponse] = useState(false);

  const load = async (id = null) => {
    if (!id) return;
    setBusy(true);

    try {
      let { data } = await axios({
        method: 'get',
        url: `https://api.mercadolibre.com/items`,
        params: { ids: id },
      });

      if (typeof data[0] != 'undefined') {
        const product = data[0].body;
        if (!product.error) {
          setResponse({
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            pictures: product.pictures,
          });
        }
      }
    } catch (error) {
      setResponse({});
    } finally {
      setBusy(false);
    }
  };

  return {
    busy,
    response,
    load,
  };
};

export default useProductRequest;