import React, { useEffect, useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Loading from '../../Chart/utils/Loading';
import { IoBarChartSharp } from "react-icons/io5";
import { ImTable2 } from "react-icons/im";
import '../utils/style/datePickerStyle.css'
import { Popover } from 'antd';
import moment from 'moment';
import dayjs from 'dayjs';

const contentTotalMatchingVolume = (
  <div>
    <span className='text-black font-medium rounded-lg text-sm bg-white p-2 '>
      Nhấn vào để xem chi tiết tổng khối lượng khớp lệnh
    </span>
  </div>
);

const contentTransactionData = (
  <div>
    <span className='text-black font-medium rounded-lg text-sm bg-white p-2 '>
      Nhấn vào để xem chi tiết dữ liệu giao dịch
    </span>
  </div>
);

const TransactionStatistics = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isChart, setIsChart] = useState(false)
  const [fromDate, setFromDate] = useState(dayjs().subtract(7, 'day'))
  const [toDate, setToDate] = useState(dayjs())

  const handleChangeChart = () => {
    setIsChart(!isChart)
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true)
    }, 700)
  }, [])

  return (
    <div className='container mx-auto md:w-[90%] lg:w-[90%] xl:w-[90%]'>
      {isLoading ? (
        <div className='mt-4'>
          <div>
            <div className='flex justify-between items-center'>
              <div>
                {!isChart ? (
                  <span className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                    <span className='dark:text-white text-black font-semibold uppercase'>Dữ liệu giao dịch</span>
                    <Popover content={contentTotalMatchingVolume} >
                      <span className='ml-[6.6rem] text-[#C3A9A9] cursor-pointer text-[22px]' onClick={handleChangeChart}><IoBarChartSharp /></span>
                    </Popover>
                  </span>
                ) : (
                  <span className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                    <span className='dark:text-white text-black font-semibold uppercase'>Tổng khối lượng khớp lệnh</span>
                    <Popover content={contentTransactionData} >
                      <span className='ml-[6.6rem] text-[#0055B6] cursor-pointer text-[22px]' onClick={handleChangeChart}><ImTable2 /></span>
                    </Popover>
                  </span>
                )}

              </div>
              <div className='flex input'>
                <div className='flex items-center'>
                  <span className='dark:text-white text-black mr-4'>Từ ngày</span>
                  <DatePicker
                    openTo="year"
                    format="DD/MM/YYYY"
                    margin="normal"
                    disableFuture
                    formatDate={(date) => moment(date).format('DD/MM/YYYY')}
                    value={fromDate} onChange={(newValue) => { setFromDate(newValue); }} />
                </div>
                <div className='ml-16 flex items-center'>
                  <span className='dark:text-white text-black mr-4'>Đến ngày</span>
                  <DatePicker
                    openTo="year"
                    format="DD/MM/YYYY"
                    margin="normal"
                    disableFuture
                    formatDate={(date) => moment(date).format('DD/MM/YYYY')}
                    value={toDate} onChange={(newValue) => { setToDate(newValue); }} />
                </div>
              </div>
            </div>

          </div>
        </div>
      ) : (
        <div className='h-[300px] flex items-center justify-center'><Loading /></div>
      )}
    </div>
  )
}

export default TransactionStatistics