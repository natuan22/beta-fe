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
    const [currentMonthIndex, setCurrentMonthIndex] = useState(0); // Tháng hiện tại đang hiển thị
    const [currentDate, setCurrentDate] = useState(''); // Ngày hiện tại đang hiển thị

    console.log(dataStatisticsByQuarter);

    useEffect(() => {
        dispatch(fetchDataStatisticsByQuarter(stock));
    }, [dispatch, stock]);

    useEffect(() => {
        if (dataStatisticsByQuarter.length > 0) {
            setCurrentDate(formatDateToQuarter(dataStatisticsByQuarter[currentMonthIndex].date));
        }
    }, [dataStatisticsByQuarter, currentMonthIndex]);

    const handleNextMonth = () => {
        if (currentMonthIndex > 0) {
            setCurrentMonthIndex(currentMonthIndex - 1);
        }
    };

    const handlePreMonth = () => {
        if (currentMonthIndex < dataStatisticsByQuarter.length - 1) {
            setCurrentMonthIndex(currentMonthIndex + 1);
        }
    };

    // Lấy thông tin tháng hiện tại từ mảng dữ liệu
    const currentMonthData = dataStatisticsByQuarter[currentMonthIndex];

    return (
        <div>
            {dataStatisticsByQuarter?.length > 0 ?
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
