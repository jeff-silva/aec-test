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

  const responseDafault = {
    paging: {
      total: 0,
      primary_results: 0,
      offset: 0,
      limit: 0,
    },
    results: [],
  };

  const [busy, setBusy] = useState(false);
  const [params, setParams] = useState({ ...options.params });

  const [response, setResponse] = useState(responseDafault);

  const paramsUpdate = (paramsNew) => {
    for(let attr in paramsNew) {
      params[attr] = paramsNew[attr];
    }

    setParams({ ...params });
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
        };
      });

      setResponse(data);
      return data;
    } catch (error) {
      setResponse(responseDafault);
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
