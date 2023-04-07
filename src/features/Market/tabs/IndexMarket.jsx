import React, { useEffect, useState } from 'react'
import BarChart from '../components/BarChart';
import DoRongThiTruong from '../components/DoRongThiTruong';
import TableDomesticIndex from '../components/TableDomesticIndex';
import TableThanhKhoan from '../components/TableThanhKhoan';
import ThanhKhoan from '../components/ThanhKhoan';
import GeneralIndustry from '../components/GeneralIndustry';
import News from '../components/News';
import Events from '../components/Events';
import ChartInfo from '../components/ChartInfo';
import MarketMap from '../components/MarketMap';
import { fetchDataAreaChart1, fetchDataAreaChart2, fetchDataEvents, fetchDataGeneralIndustry, fetchDataLineChart, fetchDataMacroNews, fetchDataMarketMap, fetchDataNews, fetchDataTableDetail } from '../../Chart/thunk';
import { useDispatch } from 'react-redux';

const IndexMarket = () => {
  const dispatch = useDispatch()
  const [activeButton, setActiveButton] = useState('1day');

  useEffect(() => {
    dispatch(fetchDataNews);
    dispatch(fetchDataLineChart('0'))
    dispatch(fetchDataGeneralIndustry('all'))
    dispatch(fetchDataTableDetail)
    dispatch(fetchDataMarketMap('all', '0'))
    dispatch(fetchDataMacroNews)
    dispatch(fetchDataEvents)

    dispatch(fetchDataAreaChart1);
    dispatch(fetchDataAreaChart2);
  }, [dispatch])
  
  const handleClick = (button) => {
    setActiveButton(button);
  }

  const buttonStyle = {
    backgroundColor: 'transparent',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.9rem',
    padding: '0.375rem 0.5rem'
  }

  const activeButtonStyle = {
    backgroundColor: '#275F88',
    color: '#fff',
  }

  return (
    <>
      <div className=''>
        <div className='flex justify-center'>
          <div className='mx-1 my-1 px-[8px] py-[8px] bg-[#151924] w-[500px]'>
            <div>
              <ChartInfo />
            </div>
            <div className='mt-1.5'>
              <TableDomesticIndex />
            </div>
          </div>
          <div className='mx-[15px] my-1 px-[8px] py-[8px] bg-[#151924] '>
            <div>
              <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0 pt-[11px]'>
                <span className='text-white text-[0.9rem] pl-[2px]'>Top đóng góp điểm số trong phiên theo: </span>
                <select className={`bg-[#151924] text-[0.9rem] text-[#0097B2] border-0`}>
                  <option value="1">Cổ phiếu</option>
                  <option value="2">...</option>
                  <option value="3">...</option>
                </select>
                <select className={`bg-[#1B496D] ml-3 p-1 text-[0.9rem] text-white border-0`}>
                  <option value="1">Phiên gần nhất</option>
                  <option value="2">5 phiên</option>
                  <option value="3">1 tháng</option>
                  <option value="4">YtD</option>
                </select>
              </div>
              <div>
                <BarChart />
              </div>
            </div>

            <div>
              <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0 pt-[11px]'>
                <span className='text-white text-[0.9rem] ml-28'>Diễn biến độ rộng thị trường </span>
                <select className={`bg-[#1B496D] ml-[57px] p-1 text-[0.9rem] text-white border-0`}>
                  <option value="1">Phiên gần nhất</option>
                  <option value="2">01 tháng</option>
                  <option value="3">01 quý</option>
                  <option value="4">01 năm</option>
                </select>
              </div>
              <div>
                <DoRongThiTruong />
              </div>
            </div>
          </div>
          <div className='mx-[5px] my-1 px-[8px] py-[8px] bg-[#151924] w-[500px]'>
            <div className="bg-[#2D303A] flex justify-around items-center rounded-full mb-2">
              <button
                style={activeButton === '1day' ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                onClick={() => {
                  handleClick('1day')
                }}
                className='uppercase'>1 ngày</button>
              <button
                style={activeButton === '5days' ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                onClick={() => {
                  handleClick('5days')
                }}
                className='uppercase'>5 ngày</button>
              <button
                style={activeButton === '1week' ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                onClick={() => {
                  handleClick('1week')
                }}
                className='uppercase'>1 tuần</button>
              <button
                style={activeButton === 'YtD' ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                onClick={() => {
                  handleClick('YtD')
                }}
                className=''>YtD</button>
            </div>
            <div>
              <span className='text-white text-[0.9rem] pl-[2px]'>Top đóng góp thanh khoản trong phiên theo: </span>
              <select className={`bg-[#151924] text-[0.9rem] text-[#0097B2] border-0`}>
                <option value="1">Cổ phiếu</option>
                <option value="2">...</option>
                <option value="3">...</option>
              </select>
              <span className='text-white text-[0.9rem] pl-[15px]'>Sàn </span>
              <select className={`bg-[#151924] text-[0.9rem] text-[#0097B2] border-0`}>
                <option value="1">HOSE</option>
                <option value="2">HNX</option>
                <option value="3">UPCOM</option>
                <option value="4">VN30</option>
              </select>
            </div>
            <div className='pt-2'>
              <TableThanhKhoan />
            </div>
            <hr />
            <div>
              <div className='text-center my-1'>
                <span className='text-white text-[1rem]'>Thanh khoản trong phiên</span>
              </div>
              <ThanhKhoan />
            </div>
          </div>
        </div>

        <div className='mt-[20px] flex'>
          <div className='w-[60%] mx-2 px-[8px] py-[8px] bg-[#151924]'>
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
              <span className='text-white text-[1.2rem] font-bold'>Bản đồ thị trường</span>
            </div>
            <MarketMap />
          </div>

          <div className='w-[40%] mx-2 px-[8px] py-[8px] bg-[#151924]'>
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
              <span className='text-white text-[1.2rem] font-bold'>Biến động ngành</span>
            </div>
            <GeneralIndustry />
            <hr />
            <div className='text-center py-2'>
              <span className='text-white'>Lực mua - bán hiện tại</span>
            </div>
            <div className='flex'>
              <div className='w-3/5 bg-green-500 h-7'></div>
              <div className='w-[40%] bg-red-500 h-7'></div>
            </div>
          </div>
        </div>

        <div className='mt-[20px] flex justify-center'>
          <div className='mx-1 my-1 px-[8px] py-[8px] bg-[#151924] w-[500px] h-[700px]'>
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
              <span className='text-white text-[1.2rem] font-bold'>Tin tức thị trường</span>
            </div>
            <News />
          </div>

          <div className='mx-[15px] my-1 px-[8px] py-[8px] bg-[#151924] w-[500px] h-[700px]'>
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
              <span className='text-white text-[1.2rem] font-bold'>Lịch sự kiện</span>
            </div>
            <Events />
          </div>

          <div className='mx-[5px] my-1 px-[8px] py-[8px] bg-[#151924] w-[500px] h-[700px]'>
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
              <span className='text-white text-[1.2rem] font-bold'>Báo cáo phân tích</span>
            </div>
            <div className="pt-3 mb-3 text-white">
              <button className='border-none bg-transparent text-white text-[1.1rem]'>Thị trường cơ sở</button>
              <button className='border-none bg-transparent text-white text-[1.1rem] pl-10'>Thị trường phái sinh</button>
              <button className='border-none bg-transparent text-white text-[1.1rem] pl-10'>Doanh nghiệp</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default IndexMarket