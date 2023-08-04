import React from 'react'
import ChartColumn from './components/ChartColumn'
import ChartColumnLine from './components/ChartColumnLine'

const ChartCK = () => {
  return (
    <div>
      <div>
        <div className='dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5'>Lợi nhuận hoạt động</div>
        <ChartColumnLine />
      </div>
      <div>
        <div className='dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5'>Lợi nhuận tài chính</div>
        <ChartColumnLine />
      </div>
      <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-3'>
        <div>
          <div className='dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5'>Lợi nhuận kế toán trước thuế</div>
          <ChartColumn />
        </div>
        <div>
          <div className='dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5'>Lợi nhuận kế toán sau thuế</div>
          <ChartColumn />
        </div>
      </div>
    </div>
  )
}

export default ChartCK