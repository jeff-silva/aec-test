import { useState } from 'react';
import axios from 'axios';

import { ProductInterface } from '@/contexts/CartContext';

export interface OptionsInterface {
  params?: object;
};

export interface OptionsParamsInterface {
  q: string;
  limit: number;
};

const useProductsRequest = (options:  { params?: OptionsParamsInterface } = {}) => {
  const optionsParamsDefault: OptionsParamsInterface = {
    q: '',
    limit: 20,
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

  options = {
    params: optionsParamsDefault,
    ...options
  };

  options.params = {
    ...optionsParamsDefault,
    ...options.params
  };

  const [busy, setBusy] = useState(false);
  const [params, setParams] = useState<OptionsParamsInterface>(options.params);
  const [response, setResponse] = useState(responseDafault);

  const paramsUpdate = (paramsNew: object) => {
    setParams((paramsOld) => ({ ...paramsOld, ...paramsNew }));
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
          description: '',
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
