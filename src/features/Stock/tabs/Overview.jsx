import React, { useState } from 'react'
import { DoubleRightOutlined } from "@ant-design/icons";
import TableTransactionStatistics from '../components/Overview/TableTransactionStatistics';
import '../utils/style/styleButton.css'
import BusinessResults from '../components/Overview/BusinessResults';
import BalanceSheet from '../components/Overview/BalanceSheet';
import CashFlow from '../components/Overview/CashFlow';
import FinancialIndicators from '../components/Overview/FinancialIndicators';
import SameIndustry from '../components/Overview/SameIndustry';
import Events from '../components/Overview/Events';

const Overview = ({ handleTabClick, codeUrl }) => {
  const handleClick = () => {
    handleTabClick('2')
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

  return (
    <div className='pt-4'>
      <div>
        <span className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
          <span className='dark:text-white text-black font-semibold uppercase'>Thống kê giao dịch</span>
          <span className='ml-52 text-[#E4E81D] cursor-pointer' onClick={handleClick}><DoubleRightOutlined /></span>
        </span>
        <TableTransactionStatistics codeSearch={queryApi.stock} />
      </div>
      <div className='grid grid-cols-2 mt-8'>
        <div>
          <div className='flex'>
            <div className='w-[115px] border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
              <span className='dark:text-white text-black font-semibold uppercase'>Tài chính</span>
            </div>
            <button className="custom-btn btn-2 ml-7" onClick={() => handleQueryApiOrder(0)}>Theo quý</button>
            <button className="custom-btn btn-2 ml-5" onClick={() => handleQueryApiOrder(1)}>Theo năm</button>
          </div>
          <div className='h-[300px] dark:text-white text-black'>
            <BusinessResults queryApi={queryApi} />
          </div>
          <div className='h-[300px] dark:text-white text-black'>
            <BalanceSheet />
          </div>
          <div className='h-[300px] dark:text-white text-black'>
            <CashFlow />
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
            <div className='h-[600px] dark:text-white text-black'><SameIndustry /></div>
          </div>

          <div>
            <span className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
              <span className='dark:text-white text-black font-semibold uppercase'>Lịch sự kiện</span>
              <span className='ml-52 text-[#E4E81D] cursor-pointer' onClick={handleClick}><DoubleRightOutlined /></span>
            </span>
            <div className='h-[600px] dark:text-white text-black'><Events /></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview