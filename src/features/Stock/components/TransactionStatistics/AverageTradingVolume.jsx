import React, { useEffect } from 'react'
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
            <div>
                <div className='flex items-center justify-between border-solid border-[#D9D9D9] border-b-2 border-t-0 border-x-0 border-opacity-50'>
                    <span className='dark:text-white text-black xs:text-base xxs:text-xs'>Khối lượng giao dịch/Ngày (1 tuần)</span>
                    <span className='dark:text-white text-black xs:text-base xxs:text-xs'>{dataAverageTradingVolume.week && dataAverageTradingVolume.week.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
                </div>
                <div className='flex items-center justify-between border-solid border-[#D9D9D9] border-b-2 border-t-0 border-x-0 border-opacity-50 mt-4'>
                    <div className='dark:text-white text-black xs:text-base xxs:text-xs'>Khối lượng giao dịch/Ngày (1 tháng)</div>
                    <span className='dark:text-white text-black xs:text-base xxs:text-xs'>{dataAverageTradingVolume.month && dataAverageTradingVolume.month.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
                </div>
                <div className='flex items-center justify-between border-solid border-[#D9D9D9] border-b-2 border-t-0 border-x-0 border-opacity-50 mt-4'>
                    <div className='dark:text-white text-black xs:text-base xxs:text-xs'>Khối lượng giao dịch/Ngày (1 quý)</div>
                    <span className='dark:text-white text-black xs:text-base xxs:text-xs'>{dataAverageTradingVolume.quarter && dataAverageTradingVolume.quarter.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
                </div>
                <div className='flex items-center justify-between border-solid border-[#D9D9D9] border-b-2 border-t-0 border-x-0 border-opacity-50 mt-4'>
                    <div className='dark:text-white text-black xs:text-base xxs:text-xs'>Khối lượng giao dịch/Ngày (1 năm)</div>
                    <span className='dark:text-white text-black xs:text-base xxs:text-xs'>{dataAverageTradingVolume.year && dataAverageTradingVolume.year.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
                </div>
                <div className='flex items-center justify-between border-solid border-[#D9D9D9] border-b-2 border-t-0 border-x-0 border-opacity-50 mt-4'>
                    <div className='dark:text-white text-black xs:text-base xxs:text-xs'>Nhiều nhất 52 tuần</div>
                    <span className='dark:text-white text-black xs:text-base xxs:text-xs'>{dataAverageTradingVolume.max && dataAverageTradingVolume.max.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
                </div>
                <div className='flex items-center justify-between border-solid border-[#D9D9D9] border-b-2 border-t-0 border-x-0 border-opacity-50 mt-4'>
                    <div className='dark:text-white text-black xs:text-base xxs:text-xs'>Ít nhất 52 tuần</div>
                    <span className='dark:text-white text-black xs:text-base xxs:text-xs'>{dataAverageTradingVolume.min && dataAverageTradingVolume.min.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
                </div>
            </div>
        </div>
    )
}

export default AverageTradingVolume