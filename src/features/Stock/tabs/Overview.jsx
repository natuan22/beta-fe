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

const Overview = ({ handleTabClick, codeUrl }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleClickToTransactionStatistics = () => {
    handleTabClick('2')
  }

  const handleClickToEvents = () => {
    handleTabClick('4')
  }

  const [queryApi, setQueryApi] = useState({
    stock: codeUrl.split('-')[0],
    type: codeUrl.split('-')[1],
    order: 0
  })

  const [queryApiSameIndustry, setQueryApiSameIndustry] = useState({
    stock: codeUrl.split('-')[0],
    exchange: 'hose'
  })

  const handleQueryApiOrder = (order) => {
    setQueryApi((prev) => ({ ...prev, order }));
  };

  const handleQueryApiExchange = (exchange) => {
    setQueryApiSameIndustry((prev) => ({ ...prev, exchange }));
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true)
    }, 700)
  }, [])

  return (
    <div>
      {isLoading ? (
        <div className='mt-4'>
          <div>
            <span className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
              <span className='dark:text-white text-black font-semibold uppercase'>Thống kê giao dịch</span>
              <span className='ml-52 text-[#E4E81D] cursor-pointer' onClick={handleClickToTransactionStatistics}><DoubleRightOutlined /></span>
            </span>
            <TableTransactionStatistics codeSearch={queryApi.stock} />
          </div>
          <div className='grid grid-cols-2 mt-8 gap-3'>
            <div>
              <div className='flex'>
                <div className='w-[115px] border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                  <span className='dark:text-white text-black font-semibold uppercase'>Tài chính</span>
                </div>
                <button className="custom-btn btn-2 ml-7" onClick={() => handleQueryApiOrder(0)}>Theo quý</button>
                <button className="custom-btn btn-2 ml-5" onClick={() => handleQueryApiOrder(1)}>Theo năm</button>
              </div>

              <div>
                <BusinessResults queryApi={queryApi} />
              </div>

              <div>
                <BalanceSheet queryApi={queryApi} />
              </div>

              <div className='mt-[47.5px]'>
                <CashFlow queryApi={queryApi} />
              </div>

              <div className='h-[300px] dark:text-white text-black'>
                <FinancialIndicators />
              </div>
            </div>

            <div>
              <div>
                <div className='flex'>
                  <div className='w-[317px] border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                    <span className='dark:text-white text-black font-semibold uppercase'>Doanh nghiệp cùng ngành</span>
                  </div>
                  <button className="custom-btn btn-2 ml-7" onClick={() => handleQueryApiExchange('HOSE')}>HOSE</button>
                  <button className="custom-btn btn-2 ml-5" onClick={() => handleQueryApiExchange('HNX')}>HNX</button>
                  <button className="custom-btn btn-2 ml-5" onClick={() => handleQueryApiExchange('UPCOM')}>UPCOM</button>
                </div>
                <div className='h-[620px]'>
                  <SameIndustry queryApi={queryApiSameIndustry} />
                </div>
              </div>

              <div className='mt-6'>
                <span className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                  <span className='dark:text-white text-black font-semibold uppercase'>Lịch sự kiện</span>
                  <span className='ml-52 text-[#E4E81D] cursor-pointer' onClick={handleClickToEvents}><DoubleRightOutlined /></span>
                </span>
                <div>
                  <Events codeSearch={queryApi.stock} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <span className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
              <span className='dark:text-white text-black font-semibold uppercase'>Hồ sơ doanh nghiệp</span>
            </span>
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