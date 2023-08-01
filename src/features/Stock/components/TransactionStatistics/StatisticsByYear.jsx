import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataStatisticsByMonth } from '../../thunk';
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import Loading from '../../../Chart/utils/Loading';

const getYearFromDate = (dateString) => {
  const dateParts = dateString.split('/');
  const year = dateParts[0];
  return `Năm ${year}`;
};


const StatisticsByMonth = ({ stock }) => {
  const dispatch = useDispatch();
  const { dataStatisticsByYear } = useSelector(state => state.stock);
  const [currentYearIndex, setCurrentMonthIndex] = useState(0); // Tháng hiện tại đang hiển thị
  const [currentDate, setCurrentDate] = useState(''); // Ngày hiện tại đang hiển thị

  console.log(dataStatisticsByYear);

  useEffect(() => {
    dispatch(fetchDataStatisticsByMonth(stock));
  }, [dispatch, stock]);

  useEffect(() => {
    if (dataStatisticsByYear.length > 0) {
      setCurrentDate(getYearFromDate(dataStatisticsByYear[currentYearIndex].date));
    }
  }, [dataStatisticsByYear, currentYearIndex]);

  const handleNextYear = () => {
    if (currentYearIndex > 0) {
      setCurrentMonthIndex(currentYearIndex - 1);
    } else {
    }
  };

  const handlePreYear = () => {
    if (currentYearIndex < dataStatisticsByYear.length - 1) {
      setCurrentMonthIndex(currentYearIndex + 1);
    }
  };

  // Lấy thông tin tháng hiện tại từ mảng dữ liệu
  const currentMonthData = dataStatisticsByYear[currentYearIndex];

  return (
    <div>
      {dataStatisticsByYear?.length > 0 ?
        <div className='dark:text-white text-black uppercase'>
          <div className='w-[411px] '>
            <div className='bg-[#0055B6] w-full h-[44px] flex justify-evenly items-center'>
              <button className=' bg-transparent border-0 text-xl text-white'>
                <BiSolidLeftArrow onClick={handlePreYear} />
              </button>
              <span className='date'> {currentDate}</span>
              <button className=' bg-transparent border-0 text-xl text-white'>
                <BiSolidRightArrow onClick={handleNextYear} />
              </button>
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
