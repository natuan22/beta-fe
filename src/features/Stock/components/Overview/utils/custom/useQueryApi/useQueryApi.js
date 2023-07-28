import { useState, useEffect, useMemo } from 'react';

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
    // Cập nhật lại props cho các component con khi codeUrl thay đổi
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

  // Sử dụng useMemo để lưu giá trị và hàm của custom hook
  const memoizedHook = useMemo(() => ({
    queryApi,
    queryApiSameIndustry,
    handleQueryApiOrder,
    handleQueryApiExchange
  }), [queryApi, queryApiSameIndustry, handleQueryApiOrder, handleQueryApiExchange]);

  return memoizedHook;
};

export default useQueryApi;
