import { useState, useEffect } from 'react';

const useQueryApi = (codeUrl) => {
  const [queryApi, setQueryApi] = useState({
    stock: codeUrl.split('-')[0],
    type: codeUrl.split('-')[1],
    order: 0
  });

  const [queryApiSameIndustry, setQueryApiSameIndustry] = useState({
    stock: codeUrl.split('-')[0],
    exchange: 'hose'
  });

  const handleQueryApiOrder = (order) => {
    setQueryApi((prev) => ({ ...prev, order }));
  };

  const handleQueryApiExchange = (exchange) => {
    setQueryApiSameIndustry((prev) => ({ ...prev, exchange }));
  };

  useEffect(() => {
    setQueryApi({
      stock: codeUrl.split('-')[0],
      type: codeUrl.split('-')[1],
      order: 0
    });
    setQueryApiSameIndustry({
      stock: codeUrl.split('-')[0],
      exchange: 'hose'
    });
  }, [codeUrl]);

  return { queryApi, queryApiSameIndustry, handleQueryApiOrder, handleQueryApiExchange };
};

export default useQueryApi;
