import React, { useEffect, useState } from 'react'
import { DoubleRightOutlined } from "@ant-design/icons";
import TableTransactionStatistics from '../components/Overview/TableTransactionStatistics';
import '../utils/style/styleButton.css'
import BusinessResults from '../components/Overview/BusinessResults';
import BalanceSheet from '../components/Overview/BalanceSheet';
import CashFlow from '../components/Overview/CashFlow';
import FinancialIndicators from '../components/Overview/FinancialIndicators';
import SameIndustry from '../components/Overview/SameIndustry';
import Events from '../components/Overview/Events';
import Loading from '../../Chart/utils/Loading';
import useQueryApi from '../components/Overview/utils/custom/useQueryApi/useQueryApi';
import { Popover } from 'antd';

const contentTransactionStatistics = (
  <div>
    <span className='text-black font-medium rounded-lg text-sm bg-white p-2 '>
      Nhấn vào để xem chi tiết thống kê giao dịch
    </span>
  </div>
);

const contentNewsAndEvent = (
  <div>
    <span className='text-black font-medium rounded-lg text-sm bg-white p-2 '>
      Nhấn vào để xem chi tiết tin tức và sự kiện
    </span>
  </div>
);

const Overview = ({ handleTabClick, codeUrl }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { queryApi, queryApiSameIndustry, handleQueryApiOrder, handleQueryApiExchange } = useQueryApi(codeUrl);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true)
    }, 700)
  }, [])

  const handleGoToTransactionStatistics = () => {
    handleTabClick('2')
  }
  const handleGoToNewsAndEvent = () => {
    handleTabClick('4')
  }
  return (
    <div className='container mx-auto'>
      {isLoading ? (
        <div className='mt-4'>
          <div>
            <span className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
              <span className='dark:text-white text-black font-semibold uppercase'>Thống kê giao dịch</span>
              <Popover content={contentTransactionStatistics} >
                <span className='ml-52 text-[#E4E81D] cursor-pointer ' onClick={handleGoToTransactionStatistics}><DoubleRightOutlined /></span>
              </Popover>
            </span>
            <TableTransactionStatistics codeSearch={queryApi.stock} />
          </div>
          <div>
            <div className='grid xl:grid-cols-2 lg:grid-cols-none mt-8 gap-10'>
              <div>
                <div className='flex'>
                  <div className='w-[115px] border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                    <span className='dark:text-white text-black font-semibold uppercase'>Tài chính</span>
                  </div>
                  <button className="custom-btn btn-2 ml-5" onClick={() => handleQueryApiOrder(0)}>Theo quý</button>
                  <button className="custom-btn btn-2 ml-5" onClick={() => handleQueryApiOrder(1)}>Theo năm</button>
                </div>

                <div>
                  <BusinessResults queryApi={queryApi} />
                </div>

                <div className='xl:mt-[10px] lg:mt-4'>
                  <BalanceSheet queryApi={queryApi} />
                </div>

                <div className='xl:mt-[54.5px] lg:mt-4'>
                  <CashFlow queryApi={queryApi} />
                </div>

                <div className='xl:mt-[9px] lg:mt-4'>
                  <FinancialIndicators codeSearch={queryApi.stock} />
                </div>
              </div>

              <div>
                <div>
                  <div className='md:flex sm:block'>
                    <div className='w-[317px] border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                      <span className='dark:text-white text-black font-semibold uppercase'>Doanh nghiệp cùng ngành</span>
                    </div>
                    <div className='flex md:mt-0 sm:mt-4 xs:mt-4 xxs:mt-4 sm:justify-center xs:justify-center xxs:justify-center'>
                      <button className="custom-btn btn-2 ml-7" onClick={() => handleQueryApiExchange('HOSE')}>HOSE</button>
                      <button className="custom-btn btn-2 ml-5" onClick={() => handleQueryApiExchange('HNX')}>HNX</button>
                      <button className="custom-btn btn-2 ml-5" onClick={() => handleQueryApiExchange('UPCOM')}>UPCOM</button>
                    </div>
                  </div>
                  <div className='xxs:w-[317px] xs:w-[373px] sm:w-[423px] md:w-full'>
                    <SameIndustry queryApi={queryApiSameIndustry} />
                  </div>
                </div>

                <div className='xl:mt-6 lg:mt-4'>
                  <span className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                    <span className='dark:text-white text-black font-semibold uppercase'>Lịch sự kiện</span>
                    <Popover content={contentNewsAndEvent}>
                      <span className='ml-52 text-[#E4E81D] cursor-pointer' onClick={handleGoToNewsAndEvent}><DoubleRightOutlined /></span>
                    </Popover>
                  </span>
                  <div className='xxs:w-[317px] xs:w-[373px] sm:w-[423px] md:w-full'>
                    <Events codeSearch={queryApi.stock} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-4'>
            <div className='sm:w-[373px] xs:w-[200px] xxs:w-[200px] border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
              <span className='dark:text-white text-black font-semibold uppercase'>Hồ sơ doanh nghiệp</span>
            </div>
            <div className='h-[344px] bg-[#78898B] mt-4'></div>
          </div>
        </div>
      ) : (
        <div className='h-[300px] flex items-center justify-center'><Loading /></div>
      )}
    </div>
  )
}

export default Overview