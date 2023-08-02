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

  const [queryApiEvents, setQueryApiEvents] = useState({
    stock: codeUrl.split('-')[0],
    type: 0
  });

  const [queryApiBusinessFinance, setQueryApiBusinessFinance] = useState({
    stock: codeUrl.split('-')[0],
    type: codeUrl.split('-')[1],
    order: '0',
    unit: 1000000000
  });

  const handleQueryApiOrder = (order) => {
    setQueryApi((prev) => ({ ...prev, order }));
  };

  const handleQueryApiExchange = (exchange) => {
    setQueryApiSameIndustry((prev) => ({ ...prev, exchange }));
  };

  const handleQueryApiEvents = (type) => {
    setQueryApiEvents((prev) => ({ ...prev, type }));
  };

  const handleQueryApiBusinessFinanceOrder = (order) => {
    setQueryApiBusinessFinance((prev) => ({ ...prev, order }));
  };

  const handleQueryApiBusinessFinanceUnit = (unit) => {
    setQueryApiBusinessFinance((prev) => ({ ...prev, unit }));
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
    setQueryApiEvents({
      stock: codeUrl.split('-')[0],
      type: 0
    });
    setQueryApiBusinessFinance({
      stock: codeUrl.split('-')[0],
      type: codeUrl.split('-')[1],
      order: '0',
      unit: 1000000000
    });
  }, [codeUrl]);

  return { queryApi, queryApiSameIndustry, queryApiEvents, queryApiBusinessFinance, handleQueryApiBusinessFinanceOrder, handleQueryApiBusinessFinanceUnit, handleQueryApiOrder, handleQueryApiExchange, handleQueryApiEvents };
};

export default useQueryApi;
