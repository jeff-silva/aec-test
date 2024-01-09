import { useState } from 'react';
import axios from 'axios';

const useProductsRequest = () => {
  const [busy, setBusy] = useState(false);

  const [params, setParams] = useState({
    q: 'notebook',
    limit: 6,
  });

  const [response, setResponse] = useState({
    paging: {
      total: 0,
      primary_results: 0,
      offset: 0,
      limit: 0,
    },
    results: [],
  });

  const submit = async () => {
    setBusy(true);

    try {
      let { data } = await axios({
        method: 'get',
        url: 'https://api.mercadolibre.com/sites/MLB/search',
        params,
      });

      data.results = data.results.map((prod) => {
        return {
          id: prod.id,
          title: prod.title,
          price: prod.price,
          thumbnail: prod.thumbnail,
        };
      });

      setResponse(data);
    } catch (error) {
      setResponse({});
    } finally {
      setBusy(false);
    }
  };

  return {
    busy,
    params,
    setParams,
    response,
    submit,
  };
};

export default useProductsRequest;
