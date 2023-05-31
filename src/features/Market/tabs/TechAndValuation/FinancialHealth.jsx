import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Checkbox from '../../HOCs/Checkbox';

const FinancialHealth = () => {
  const [exchange, setExchange] = useState("all")
  const [timeFrame, setTimeFrame] = useState("8")
  const [order, setOrder] = useState("0")
  const [industryQuery, setIndustryQuery] = useState('batDongSan,taiChinh,hangHoa,nganHang,taiNguyen,xayDung')
  const { dataQuery } = useSelector(state => state.market)

  useEffect(() => {
    if (dataQuery) {
      setExchange(dataQuery.exchange)
      setTimeFrame(dataQuery.timeFrame)
      setOrder(dataQuery.order)
      setIndustryQuery(dataQuery.industryQuery)
    }
  }, [dataQuery])

  return (
    <div className='container mx-auto mt-2'>
      <Checkbox />
      <h1>chart ở đây</h1>
    </div>
  );
};

export default FinancialHealth;
