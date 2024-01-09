import { useState } from 'react';
import axios from 'axios';

const useProductsRequest = (options = {}) => {
  options = {
    params: {},
    ...options
  };

  options.params = {
    q: '',
    limit: 20,
    ...options.params
  };

  const [busy, setBusy] = useState(false);
  const [params, setParams] = useState(options.params);

  const [response, setResponse] = useState({
    paging: {
      total: 0,
      primary_results: 0,
      offset: 0,
      limit: 0,
    },
    results: [],
  });

  const paramsUpdate = (paramsNew) => {
    setParams({ ...params, ...paramsNew });
  };

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
          pictures: prod.pictures,
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
    paramsUpdate,
    setParams,
    response,
    submit,
  };
};

export default useProductsRequest;
