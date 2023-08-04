import React from 'react'
import ChartColumn from './components/ChartColumn'
import ChartColumnLine from './components/ChartColumnLine'

const ChartCTCP = () => {
  return (
    <div>
      <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-3'>
        <div>
          <div className='dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5'>Doanh thu thuần</div>
          <ChartColumn />
        </div>
        <div>
          <div className='dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5'>Tổng lợi nhuận kế toán trước thuế</div>
          <ChartColumn />
        </div>
      </div>
      <div>
        <div className='dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5'>Lợi nhuận gộp</div>
        <ChartColumnLine />
      </div>
      <div>
        <div className='dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5'>Lợi nhuận sau thuế</div>
        <ChartColumnLine />
      </div>
    </div>
  )
}

export default ChartCTCP