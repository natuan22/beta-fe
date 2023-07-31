import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataAverageTradingVolume } from '../../thunk';

const AverageTradingVolume = ({ stock }) => {
    const dispatch = useDispatch();
    const { dataAverageTradingVolume } = useSelector(state => state.stock)

    useEffect(() => {
        dispatch(fetchDataAverageTradingVolume(stock));
    }, [dispatch, stock]);

    return (
        <div className='mt-4'>
            <div className='flex items-center justify-between border-solid border-[#D9D9D9] border-b-2 border-t-0 border-x-0 border-opacity-50'>
                <span className='dark:text-white text-black'>Khối lượng giao dịch/Ngày (1 tuần)</span>
                <span className='dark:text-white text-black'>{dataAverageTradingVolume.week && dataAverageTradingVolume.week.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
            </div>
            <div className='flex items-center justify-between border-solid border-[#D9D9D9] border-b-2 border-t-0 border-x-0 border-opacity-50 mt-4'>
                <div className='dark:text-white text-black'>Khối lượng giao dịch/Ngày (1 tháng)</div>
                <span className='dark:text-white text-black'>{dataAverageTradingVolume.month && dataAverageTradingVolume.month.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
            </div>
            <div className='flex items-center justify-between border-solid border-[#D9D9D9] border-b-2 border-t-0 border-x-0 border-opacity-50 mt-4'>
                <div className='dark:text-white text-black'>Khối lượng giao dịch/Ngày (1 quý)</div>
                <span className='dark:text-white text-black'>{dataAverageTradingVolume.quarter && dataAverageTradingVolume.quarter.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
            </div>
            <div className='flex items-center justify-between border-solid border-[#D9D9D9] border-b-2 border-t-0 border-x-0 border-opacity-50 mt-4'>
                <div className='dark:text-white text-black'>Khối lượng giao dịch/Ngày (1 năm)</div>
                <span className='dark:text-white text-black'>{dataAverageTradingVolume.year && dataAverageTradingVolume.year.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
            </div>
            <div className='flex items-center justify-between border-solid border-[#D9D9D9] border-b-2 border-t-0 border-x-0 border-opacity-50 mt-4'>
                <div className='dark:text-white text-black'>Nhiều nhất 52 tuần</div>
                <span className='dark:text-white text-black'>{dataAverageTradingVolume.max && dataAverageTradingVolume.max.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
            </div>
            <div className='flex items-center justify-between border-solid border-[#D9D9D9] border-b-2 border-t-0 border-x-0 border-opacity-50 mt-4'>
                <div className='dark:text-white text-black'>Ít nhất 52 tuần</div>
                <span className='dark:text-white text-black'>{dataAverageTradingVolume.min && dataAverageTradingVolume.min.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
            </div>
        </div>
    )
}

export default AverageTradingVolume