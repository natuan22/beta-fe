import { useState, useEffect } from "react";

const useQueryApi = (codeUrl) => {
  const [queryApi, setQueryApi] = useState({
    stock: codeUrl.split("-")[0],
    type: codeUrl.split("-")[1],
    order: 0,
  });

  const [queryApiSameIndustry, setQueryApiSameIndustry] = useState({
    stock: codeUrl.split("-")[0],
    exchange: "hose",
  });

  const [queryApiNewsEvents, setQueryApiNewsEvents] = useState({
    stock: codeUrl.split("-")[0],
    type: 0,
  });

  const [queryApiBusinessFinance, setQueryApiBusinessFinance] = useState({
    stock: codeUrl.split("-")[0],
    type: codeUrl.split("-")[1],
    order: "0",
    unit: 1000000000,
  });

  const handleQueryApiOrder = (order) => {
    setQueryApi((prev) => ({ ...prev, order }));
  };

  const handleQueryApiExchange = (exchange) => {
    setQueryApiSameIndustry((prev) => ({ ...prev, exchange }));
  };

  const handleQueryApiNewsEvents = (type) => {
    setQueryApiNewsEvents((prev) => ({ ...prev, type }));
  };

  const handleQueryApiBusinessFinanceOrder = (order) => {
    setQueryApiBusinessFinance((prev) => ({ ...prev, order }));
  };

  const handleQueryApiBusinessFinanceUnit = (unit) => {
    setQueryApiBusinessFinance((prev) => ({ ...prev, unit }));
  };

  useEffect(() => {
    setQueryApi({
      stock: codeUrl.split("-")[0],
      type: codeUrl.split("-")[1],
      order: 0,
    });
    setQueryApiSameIndustry({
      stock: codeUrl.split("-")[0],
      exchange: "hose",
    });
    setQueryApiNewsEvents({
      stock: codeUrl.split("-")[0],
      type: 0,
    });
    setQueryApiBusinessFinance({
      stock: codeUrl.split("-")[0],
      type: codeUrl.split("-")[1],
      order: "0",
      unit: 1000000000,
    });
  }, [codeUrl]);

  return {
    queryApi,
    queryApiSameIndustry,
    queryApiNewsEvents,
    queryApiBusinessFinance,
    handleQueryApiBusinessFinanceOrder,
    handleQueryApiBusinessFinanceUnit,
    handleQueryApiOrder,
    handleQueryApiExchange,
    handleQueryApiNewsEvents,
  };
};

export default useQueryApi;
