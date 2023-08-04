import React from 'react'
import ChartColumnLine from './components/ChartColumnLine'

const ChartBH = ({ queryApiBusinessFinance }) => {
  return (
    <div>
      <div className='grid xl:grid-cols-3 lg:grid-cols-none gap-3'>
        <div>
          <div className='dark:text-white text-black font-semibold mt-10 mb-2 text-center'>Doanh thu thuần hoạt động Kinh doanh Bảo hiểm</div>
          <ChartColumnLine />
        </div>
        <div>
          <div className='dark:text-white text-black font-semibold mt-10 mb-2 text-center'>Lợi nhuận gộp hoạt động kinh doanh bảo hiểm</div>
          <ChartColumnLine />
        </div>
        <div>
          <div className='dark:text-white text-black font-semibold mt-10 mb-2 text-center'>Chi phí hoạt động kinh doanh bảo hiểm</div>
          <ChartColumnLine />
        </div>
        <div>
          <div className='dark:text-white text-black font-semibold mt-10 mb-2 text-center'>Tổng lợi nhuận trước thuế</div>
          <ChartColumnLine />
        </div>
        <div>
          <div className='dark:text-white text-black font-semibold mt-10 mb-2 text-center'>Lợi nhuận sau thuế TNDN</div>
          <ChartColumnLine />
        </div>
        <div>
          <div className='dark:text-white text-black font-semibold mt-10 mb-2 text-center'>Tổng chi bồi thường bảo hiểm</div>
          <ChartColumnLine />
        </div>
      </div>
    </div>
  )
}

export default ChartBH