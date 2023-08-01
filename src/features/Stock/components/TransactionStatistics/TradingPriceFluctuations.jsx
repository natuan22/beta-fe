import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getColor } from '../../../Chart/utils/utils';
import { fetchDataTradingPriceFluctuations } from '../../thunk';

const TradingPriceFluctuations = ({ stock }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([])
  const { dataTradingPriceFluctuations } = useSelector(state => state.stock)

  useEffect(() => {
    dispatch(fetchDataTradingPriceFluctuations(stock));
  }, [dispatch, stock]);

  return (
    <div className='mt-4'>
      <div className='flex items-center justify-between border-solid border-[#D9D9D9] border-b-2 border-t-0 border-x-0 border-opacity-50'>
        <span className='dark:text-white text-black'>+/- Qua 1 tuần</span>
        <span className={`${getColor(dataTradingPriceFluctuations.p_week)}`}>{dataTradingPriceFluctuations.p_week && dataTradingPriceFluctuations.p_week.toLocaleString('en-US', { maximumFractionDigits: 2 })}%</span>
      </div>
      <div className='flex items-center justify-between border-solid border-[#D9D9D9] border-b-2 border-t-0 border-x-0 border-opacity-50 mt-4'>
        <div className='dark:text-white text-black'>+/- Qua 1 tháng</div>
        <span className={`${getColor(dataTradingPriceFluctuations.p_month)}`}>{dataTradingPriceFluctuations.p_month && dataTradingPriceFluctuations.p_month.toLocaleString('en-US', { maximumFractionDigits: 2 })}%</span>
      </div>
      <div className='flex items-center justify-between border-solid border-[#D9D9D9] border-b-2 border-t-0 border-x-0 border-opacity-50 mt-4'>
        <div className='dark:text-white text-black'>+/- Qua 1 quý</div>
        <span className={`${getColor(dataTradingPriceFluctuations.p_quarter)}`}>{dataTradingPriceFluctuations.p_quarter && dataTradingPriceFluctuations.p_quarter.toLocaleString('en-US', { maximumFractionDigits: 2 })}%</span>
      </div>
      <div className='flex items-center justify-between border-solid border-[#D9D9D9] border-b-2 border-t-0 border-x-0 border-opacity-50 mt-4'>
        <div className='dark:text-white text-black'>+/- Qua 1 năm</div>
        <span className={`${getColor(dataTradingPriceFluctuations.p_year)}`}>{dataTradingPriceFluctuations.p_year && dataTradingPriceFluctuations.p_year.toLocaleString('en-US', { maximumFractionDigits: 2 })}%</span>
      </div>
      <div className='flex items-center justify-between border-solid border-[#D9D9D9] border-b-2 border-t-0 border-x-0 border-opacity-50 mt-4'>
        <div className='dark:text-white text-black'>Cao nhất 52 tuần</div>
        <span className='dark:text-white text-black'>{dataTradingPriceFluctuations.max_price && (dataTradingPriceFluctuations.max_price * 1000).toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
      </div>
      <div className='flex items-center justify-between border-solid border-[#D9D9D9] border-b-2 border-t-0 border-x-0 border-opacity-50 mt-4'>
        <div className='dark:text-white text-black'>Thấp nhất 52 tuần</div>
        <span className='dark:text-white text-black'>{dataTradingPriceFluctuations.min_price && (dataTradingPriceFluctuations.min_price * 1000).toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
      </div>
    </div>
  )
}

export default TradingPriceFluctuations