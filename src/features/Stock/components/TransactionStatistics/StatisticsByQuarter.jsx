import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataStatisticsByQuarter } from '../../thunk';

const StatisticsByQuarter = ({ stock }) => {
    const dispatch = useDispatch();
    const { dataStatisticsByQuarter } = useSelector(state => state.stock)

    useEffect(() => {
        dispatch(fetchDataStatisticsByQuarter(stock));
    }, [dispatch, stock]);

    return (
        <div className='dark:text-white text-black'>StatisticsByQuarter</div>
    )
}

export default StatisticsByQuarter