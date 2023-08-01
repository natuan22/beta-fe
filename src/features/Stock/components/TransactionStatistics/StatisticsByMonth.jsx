import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataStatisticsByMonth } from '../../thunk';
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import Loading from '../../../Chart/utils/Loading';

const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // Lấy tháng (từ 0 đến 11) và cộng thêm 1 để chuyển thành tháng số từ 1 đến 12
    const year = date.getFullYear();
    return `Tháng ${month} năm ${year}`;
};

const StatisticsByMonth = ({ stock }) => {
    const dispatch = useDispatch();
    const { dataStatisticsByMonth } = useSelector(state => state.stock);
    const [currentMonthIndex, setCurrentMonthIndex] = useState(0); // Tháng hiện tại đang hiển thị
    const [currentDate, setCurrentDate] = useState(''); // Ngày hiện tại đang hiển thị

    console.log(dataStatisticsByMonth);

    useEffect(() => {
        dispatch(fetchDataStatisticsByMonth(stock));
    }, [dispatch, stock]);

    useEffect(() => {
        if (dataStatisticsByMonth.length > 0) {
            setCurrentDate(getFormattedDate(dataStatisticsByMonth[currentMonthIndex].date));
        }
    }, [dataStatisticsByMonth, currentMonthIndex]);

    const handleNextMonth = () => {
        if (currentMonthIndex > 0) {
            setCurrentMonthIndex(currentMonthIndex - 1);
        }
    };

    const handlePreMonth = () => {
        if (currentMonthIndex < dataStatisticsByMonth.length - 1) {
            setCurrentMonthIndex(currentMonthIndex + 1);
        }
    };

    // Lấy thông tin tháng hiện tại từ mảng dữ liệu
    const currentMonthData = dataStatisticsByMonth[currentMonthIndex];

    return (
        <div>
            {dataStatisticsByMonth?.length > 0 ?
                <div className='dark:text-white text-black uppercase'>
                    <div className='w-[411px] '>
                        <div className='bg-[#0055B6] w-full h-[44px] flex justify-evenly items-center'>
                            <BiSolidLeftArrow onClick={handlePreMonth} className='cursor-pointer' />
                            <span className='date'> {currentDate}</span>
                            <BiSolidRightArrow onClick={handleNextMonth} className='cursor-pointer' />
                        </div>
                        <div className='w-[90%] '>
                            <div className='total flex justify-between '>
                                <span>Tổng số phiên</span>
                                <span>{currentMonthData.total}</span>
                            </div>
                            <div className='omVol flex justify-between '>
                                <span>Tổng KL khớp lệnh</span>
                                <span>{currentMonthData.omVol}</span>
                            </div>
                            <div className=' omVal  flex justify-between '>
                                <span>Tổng GT khớp lệnh</span>
                                <span>{currentMonthData.omVal}</span>
                            </div>
                            <div className='ptVol flex justify-between '>
                                <span>Tổng KL thỏa thuận</span>
                                <span>{currentMonthData.ptVol}</span>
                            </div>
                            <div className='flex ptVal justify-between '>
                                <span>Tổng GT thỏa thuận</span>
                                <span>{currentMonthData.ptVal}</span>
                            </div>
                        </div>
                    </div>
                </div>
                : <div><Loading /></div>}
        </div>
    )
}

export default StatisticsByMonth;
