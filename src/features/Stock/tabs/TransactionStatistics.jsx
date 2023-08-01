import React, { useEffect, useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Loading from '../../Chart/utils/Loading';
import { IoBarChartSharp } from "react-icons/io5";
import { ImTable2 } from "react-icons/im";
import '../utils/style/datePickerStyle.css'
import { Popover } from 'antd';
import moment from 'moment';
import dayjs from 'dayjs';
import TransactionData from '../components/TransactionStatistics/TransactionData';
import TotalMatchingVolume from '../components/TransactionStatistics/TotalMatchingVolume';
import { useSelector } from 'react-redux';
import useQueryApi from '../components/Overview/utils/custom/useQueryApi/useQueryApi';
import TradingPriceFluctuations from '../components/TransactionStatistics/TradingPriceFluctuations';
import AverageTradingVolume from '../components/TransactionStatistics/AverageTradingVolume';
import StatisticsByMonth from '../components/TransactionStatistics/StatisticsByMonth';
import StatisticsByQuarter from '../components/TransactionStatistics/StatisticsByQuarter';
import StatisticsByYear from '../components/TransactionStatistics/StatisticsByYear';
import TradingInvestors from '../components/TransactionStatistics/TradingInvestors';

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

const TransactionStatistics = ({ codeUrl }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme'))
  const color = useSelector((state) => state.color.colorTheme);
  const [isLoading, setIsLoading] = useState(false)
  const [isChart, setIsChart] = useState(false)
  const { queryApi } = useQueryApi(codeUrl);

  const [fromDate, setFromDate] = useState(dayjs().subtract(7, 'day'))
  const [toDate, setToDate] = useState(dayjs())

  const handleChangeChart = () => {
    setIsChart(!isChart)
  }
  useEffect(() => {
    setTheme(color);
  }, [color]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true)
    }, 700)
  }, [])

  return (
    <div className='container mx-auto'>
      {isLoading ? (
        <div className='mt-4'>
          <div>
            <div className='flex justify-between items-center'>
              <div>
                {!isChart ? (
                  <span className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                    <span className='dark:text-white text-black font-semibold uppercase'>Dữ liệu giao dịch</span>
                    <Popover content={contentTotalMatchingVolume} >
                      <span className='ml-[12.4rem] text-[#C3A9A9] cursor-pointer text-[22px]' onClick={handleChangeChart}><IoBarChartSharp /></span>
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
              <div className='flex input' id='datePicker'>
                <div className='flex items-center'>
                  <span className='dark:text-white text-black mr-4'>Từ ngày</span>
                  <DatePicker
                    format="DD/MM/YYYY"
                    margin="normal"
                    sx={{
                      '& .MuiInputBase-root .MuiInputBase-input ': { color: (localStorage.getItem('theme') === 'dark' ? '#fff' : '#000') },
                      '& .MuiInputBase-root .MuiInputAdornment-root .MuiButtonBase-root  ': { color: (localStorage.getItem('theme') === 'dark' ? '#fff' : '#000') },
                    }}
                    disableFuture
                    formatDate={(date) => moment(date).format('DD/MM/YYYY')}
                    value={fromDate} onChange={(newValue) => {
                      setFromDate(newValue)
                    }} />
                </div>
                <div className='ml-16 flex items-center'>
                  <span className='dark:text-white text-black mr-4'>Đến ngày</span>
                  <DatePicker
                    format="DD/MM/YYYY"
                    margin="normal"
                    sx={{
                      '& .MuiInputBase-root .MuiInputBase-input ': { color: (localStorage.getItem('theme') === 'dark' ? '#fff' : '#000') },
                      '& .MuiInputBase-root .MuiInputAdornment-root .MuiButtonBase-root  ': { color: (localStorage.getItem('theme') === 'dark' ? '#fff' : '#000') },
                    }}
                    disableFuture
                    formatDate={(date) => moment(date).format('DD/MM/YYYY')}
                    value={toDate} onChange={(newValue) => { setToDate(newValue) }} />
                </div>
              </div>
            </div>
            {!isChart ? (
              <div className='h-[460px]'>
                <TransactionData stock={queryApi.stock} from={fromDate} to={toDate} />
              </div>
            ) : (
              <div className='h-[460px]'>
                <TotalMatchingVolume stock={queryApi.stock} from={fromDate} to={toDate} />
              </div>
            )}
          </div>

          <div className='grid grid-cols-2 gap-40 mt-8'>
            <div>
              <div className='w-[362px] border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold uppercase'>Biến động giá giao dịch</span>
              </div>
              <TradingPriceFluctuations stock={queryApi.stock} />
            </div>
            <div>
              <div className='w-[362px] border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold uppercase'>Khối lượng giao dịch bình quân/ngày</span>
              </div>
              <AverageTradingVolume stock={queryApi.stock} />
            </div>
          </div>

          <div className='grid grid-cols-3 gap-3 mt-8'>
            <div>
              <span className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold uppercase'>Thống kê theo các tháng</span>
              </span>
              <StatisticsByMonth stock={queryApi.stock} />
            </div>
            <div>
              <span className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold uppercase'>Thống kê theo các quý</span>
              </span>
              <StatisticsByQuarter stock={queryApi.stock} />
            </div>
            <div>
              <span className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold uppercase'>Thống kê theo các năm</span>
              </span>
              <StatisticsByYear stock={queryApi.stock} />
            </div>
          </div>

          <div className='mt-8'>
            <span className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
              <span className='dark:text-white text-black font-semibold uppercase'>Giao dịch các nhóm nhà đầu tư</span>
            </span>
            <TradingInvestors stock={queryApi.stock} />
          </div>
        </div>
      ) : (
        <div className='h-[300px] flex items-center justify-center'><Loading /></div>
      )}
    </div>
  )
}

export default TransactionStatistics