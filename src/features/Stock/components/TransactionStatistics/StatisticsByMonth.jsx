import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataStatisticsByMonth } from '../../thunk';

const StatisticsByMonth = ({ stock }) => {
    const dispatch = useDispatch();
    const { dataStatisticsByMonth } = useSelector(state => state.stock)

    useEffect(() => {
        dispatch(fetchDataStatisticsByMonth(stock));
    }, [dispatch, stock]);

    return (
        <div className='dark:text-white text-black uppercase'>Statistics_By_Month</div>
    )
}

export default StatisticsByMonth