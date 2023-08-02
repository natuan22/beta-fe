import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataStatisticsByYear } from '../../thunk';
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import Loading from '../../../Chart/utils/Loading';

const getYearFromDate = (dateString) => {
  const dateParts = dateString.split('/');
  const year = dateParts[0];
  return `Năm ${year}`;
};


const StatisticsByYear = ({ stock }) => {
  const dispatch = useDispatch();
  const { dataStatisticsByYear } = useSelector(state => state.stock);
  const [currentYearIndex, setCurrentYearIndex] = useState(0); // Tháng hiện tại đang hiển thị
  const [currentDate, setCurrentDate] = useState(''); // Ngày hiện tại đang hiển thị

  // console.log(dataStatisticsByYear);

  useEffect(() => {
    dispatch(fetchDataStatisticsByYear(stock));
  }, [dispatch, stock]);

  useEffect(() => {
    if (dataStatisticsByYear.length > 0) {
      setCurrentDate(getYearFromDate(dataStatisticsByYear[currentYearIndex].date));
    }
  }, [dataStatisticsByYear, currentYearIndex]);

  const handleNextYear = () => {
    if (currentYearIndex > 0) {
      setCurrentYearIndex(currentYearIndex - 1);
    } else {
    }
  };

  const handlePreYear = () => {
    if (currentYearIndex < dataStatisticsByYear.length - 1) {
      setCurrentYearIndex(currentYearIndex + 1);
    }
  };

  // Lấy thông tin tháng hiện tại từ mảng dữ liệu
  const currentYearData = dataStatisticsByYear[currentYearIndex];

  return (
    <div className='flex justify-center'>
      {dataStatisticsByYear?.length > 0 ? (
        <div className='mt-4 xl:w-full lg:w-[411px] md:w-full sm:w-full xs:w-full xxs:w-full'>
          <div className='bg-[#0055B6] w-full h-[44px] flex justify-evenly items-center'>
            <button className='bg-transparent border-0 text-xl text-white'>
              <BiSolidLeftArrow onClick={handlePreYear} />
            </button>
            <span className='date text-white'>{currentDate}</span>
            <button className='bg-transparent border-0 text-xl text-white'>
              <BiSolidRightArrow onClick={handleNextYear} />
            </button>
          </div>
          <div className='dark:text-white text-black xl:text-base lg:text-sm md:text-base xs:text-base xxs:text-sm'>
            <div className='total flex justify-between mt-4'>
              <span>Tổng số phiên</span>
              <span>{currentYearData.total.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
            </div>
            <div className='omVol flex justify-between mt-4'>
              <span>Tổng KL khớp lệnh</span>
              <span>{currentYearData.omVol.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
            </div>
            <div className=' omVal  flex justify-between mt-4'>
              <span>Tổng GT khớp lệnh</span>
              <span>{currentYearData.omVal.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
            </div>
            <div className='ptVol flex justify-between mt-4'>
              <span>Tổng KL thỏa thuận</span>
              <span>{currentYearData.ptVol.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
            </div>
            <div className='flex ptVal justify-between mt-4'>
              <span>Tổng GT thỏa thuận</span>
              <span>{currentYearData.ptVal.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className='h-[244px] flex items-center justify-center'><Loading /></div>
      )}
    </div>
  )
}

export default StatisticsByYear;
