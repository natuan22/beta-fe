import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataStatisticsByQuarter } from '../../thunk';
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import Loading from '../../../Chart/utils/Loading';

const formatDateToQuarter = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const quarter = Math.ceil((date.getMonth() + 1) / 3); // Tính quý từ tháng
    return `Quý ${quarter}/${year}`;
};

const StatisticsByMonth = ({ stock }) => {
    const dispatch = useDispatch();
    const { dataStatisticsByQuarter } = useSelector(state => state.stock);
    const [currentQuarterIndex, setCurrentQuaterIndex] = useState(0); // Tháng hiện tại đang hiển thị
    const [currentDate, setCurrentDate] = useState(''); // Ngày hiện tại đang hiển thị

    // console.log(dataStatisticsByQuarter);

    useEffect(() => {
        dispatch(fetchDataStatisticsByQuarter(stock));
    }, [dispatch, stock]);

    useEffect(() => {
        if (dataStatisticsByQuarter.length > 0) {
            setCurrentDate(formatDateToQuarter(dataStatisticsByQuarter[currentQuarterIndex].date));
        }
    }, [dataStatisticsByQuarter, currentQuarterIndex]);

    const handleNextMonth = () => {
        if (currentQuarterIndex > 0) {
            setCurrentQuaterIndex(currentQuarterIndex - 1);
        }
    };

    const handlePreMonth = () => {
        if (currentQuarterIndex < dataStatisticsByQuarter.length - 1) {
            setCurrentQuaterIndex(currentQuarterIndex + 1);
        }
    };

    // Lấy thông tin tháng hiện tại từ mảng dữ liệu
    const currentMonthData = dataStatisticsByQuarter[currentQuarterIndex];

    return (
        <div className='flex justify-center'>
            {dataStatisticsByQuarter?.length > 0 ? (
                <div className='mt-4 xl:w-full lg:w-[411px] md:w-full sm:w-full xs:w-full xxs:w-full'>
                    <div className='bg-[#0055B6] w-full h-[44px] flex justify-evenly items-center'>
                        <button className={` ${currentQuarterIndex === dataStatisticsByQuarter.length - 1 ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'} bg-transparent border-0 text-xl text-white `}>
                            <BiSolidLeftArrow onClick={handlePreMonth} />
                        </button>
                        <span className='date text-white'> {currentDate}</span>
                        <button className={` ${currentQuarterIndex === 0 ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'} bg-transparent border-0 text-xl text-white `}>
                            <BiSolidRightArrow onClick={handleNextMonth} />
                        </button>
                    </div>
                    <div className='dark:text-white text-black xl:text-base lg:text-sm md:text-base xs:text-base xxs:text-sm'>
                        <div className='total flex justify-between mt-4'>
                            <span>Tổng số phiên</span>
                            <span>{currentMonthData.total.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
                        </div>
                        <div className='omVol flex justify-between mt-4'>
                            <span>Tổng KL khớp lệnh</span>
                            <span>{currentMonthData.omVol.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
                        </div>
                        <div className=' omVal  flex justify-between mt-4'>
                            <span>Tổng GT khớp lệnh</span>
                            <span>{currentMonthData.omVal.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
                        </div>
                        <div className='ptVol flex justify-between mt-4'>
                            <span>Tổng KL thỏa thuận</span>
                            <span>{currentMonthData.ptVol.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
                        </div>
                        <div className='flex ptVal justify-between mt-4'>
                            <span>Tổng GT thỏa thuận</span>
                            <span>{currentMonthData.ptVal.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='h-[244px] flex items-center justify-center'><Loading /></div>
            )}
        </div>
    )
}

export default StatisticsByMonth;
