import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataStatisticsByYear } from '../../thunk';

const StatisticsByYear = ({ stock }) => {
  const dispatch = useDispatch();
  const { dataStatisticsByYear } = useSelector(state => state.stock)

  useEffect(() => {
    dispatch(fetchDataStatisticsByYear(stock));
  }, [dispatch, stock]);

  return (
    <div className='dark:text-white text-black'>StatisticsByYear</div>
  )
}

export default StatisticsByYear