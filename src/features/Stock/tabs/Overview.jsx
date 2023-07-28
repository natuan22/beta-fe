import React, { useState } from 'react'
import { DoubleRightOutlined } from "@ant-design/icons";
import TableTransactionStatistics from '../components/Overview/TableTransactionStatistics';
import '../utils/style/styleButton.css'
import BusinessResults from '../components/Overview/BusinessResults';

const Overview = ({ handleTabClick, codeUrl }) => {
  const handleClick = () => {
    handleTabClick('2')
  }
  const [queryApi, setQueryApi] = useState({
    stock: codeUrl.split('-')[0],
    type: codeUrl.split('-')[1],
    order: 0
  })

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
            <button class="custom-btn btn-2 ml-7">Theo quý</button>
            <button class="custom-btn btn-2 ml-5">Theo năm</button>
          </div>
          <BusinessResults queryApi={queryApi} />
        </div>
      </div>
    </div>
  )
}

export default Overview