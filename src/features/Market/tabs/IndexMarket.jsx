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
import {
  fetchDataAreaChart1,
  fetchDataAreaChart2,
  fetchDataEvents,
  fetchDataGeneralIndustry,
  fetchDataLineChart,
  fetchDataMacroNews,
  fetchDataMarketMap,
  fetchDataNews,
  fetchDataTableDetail,
  fetchDataWidthMarket
} from '../../Chart/thunk';
import { useDispatch } from 'react-redux';

const IndexMarket = () => {
  const dispatch = useDispatch()

  useEffect(() => {git com
    dispatch(fetchDataNews);
    dispatch(fetchDataLineChart('0'))
    dispatch(fetchDataGeneralIndustry('all'))
    dispatch(fetchDataTableDetail)
    dispatch(fetchDataMarketMap('all', '0'))
    dispatch(fetchDataMacroNews)
    dispatch(fetchDataEvents)
    dispatch(fetchDataWidthMarket("VNINDEX"));
    dispatch(fetchDataAreaChart1);
    dispatch(fetchDataAreaChart2);
  }, [dispatch])

  return (
    <>
      <div className='container mx-auto md:w-[90%] lg:w-[90%] xl:w-full'>
        <div className='md:block lg:flex justify-center'>
          <div className='mx-1 my-1 px-[8px] py-[8px] bg-[#151924]'>
            <div>
              <ChartInfo />
            </div>
            <div className='mt-1.5'>
              <TableDomesticIndex />
            </div>
          </div>
          <div className='lg:hidden xl:block mx-[10px] my-1 px-[8px] py-[8px] bg-[#151924] '>
            <div>
              <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0 pt-[11px]'>
                <span className='text-white text-[0.9rem] pl-[2px]'>Top đóng góp điểm số theo: </span>
                <select className={`bg-[#151924] text-[0.9rem] text-[#0097B2] border-0`}>
                  <option value="0">Cổ phiếu</option>
                  <option value="1">Ngành LV1</option>
                  <option value="2">Ngành LV2</option>
                  <option value="3">Ngành LV3</option>
                </select>
                <select className={`bg-[#1B496D] p-1 text-[0.9rem] text-white border-0`}>
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

            <div className='md:w-full xl:w-[416px]'>
              <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0 pt-[11px]'>
                <span className='text-white text-[0.9rem] ml-[92px]'>Diễn biến độ rộng thị trường </span>
                <select className={`bg-[#1B496D] ml-[15px] p-1 text-[0.9rem] text-white border-0`}>
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
          <div className='mx-[5px] my-1 px-[8px] py-[8px] bg-[#151924]'>
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
        <div className='xs:hidden md:hidden lg:flex xl:hidden mt-1.5 px-[8px] py-[8px] bg-[#151924] '>
          <div className='w-[50%]'>
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0 pt-[11px]'>
              <span className='text-white text-[0.9rem]'>Top đóng góp điểm số theo: </span>
              <select className={`bg-[#151924] text-[0.9rem] text-[#0097B2] border-0`}>
                <option value="1">Cổ phiếu</option>
                <option value="2">...</option>
                <option value="3">...</option>
              </select>
              <select className={`bg-[#1B496D] p-1 text-[0.9rem] text-white border-0`}>
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

          <div className='w-[50%]'>
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0 pt-[11px]'>
              <span className='text-white text-[0.9rem]'>Diễn biến độ rộng thị trường </span>
              <select className={`bg-[#1B496D] p-1 text-[0.9rem] text-white border-0`}>
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
        <div className='mt-[20px] md:block xl:flex'>
          <div className='md:w-full xl:w-[60%] mx-2 px-[8px] py-[8px] bg-[#151924]'>
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
              <span className='text-white text-[1.2rem] font-bold'>Bản đồ thị trường</span>
            </div>
            <MarketMap />
          </div>

          <div className='md:w-full xl:w-[40%] mx-2 px-[8px] py-[8px] bg-[#151924]'>
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
              <span className='text-white text-[1.2rem] font-bold'>Biến động ngành</span>
            </div>
            <GeneralIndustry />
          </div>
        </div>

        <div className='mt-[20px] md:block lg:flex justify-center'>
          <div className='mx-1 my-1 px-[8px] py-[8px] bg-[#151924] md:w-full lg:w-[50%] xl:w-[500px] 2xl:w-[500px] h-[700px]'>
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
              <span className='text-white text-[1.2rem] font-bold'>Tin tức thị trường</span>
            </div>
            <News />
          </div>

          <div className='mx-1 my-1 px-[8px] py-[8px] bg-[#151924] md:w-full lg:w-[50%] xl:w-[500px] 2xl:w-[500px] h-[700px]'>
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
              <span className='text-white text-[1.2rem] font-bold'>Lịch sự kiện</span>
            </div>
            <Events />
          </div>

          <div className='lg:hidden xl:block mx-[5px] my-1 px-[8px] py-[8px] bg-[#151924] md:w-full xl:w-[500px] 2xl:w-[500px] h-[700px]'>
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
        <div className='xs:hidden md:hidden lg:block xl:hidden mx-[5px] my-1 px-[8px] py-[8px] bg-[#151924] h-[700px]'>
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
    </>
  )
}

export default IndexMarket