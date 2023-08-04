import React from 'react'
import ChartColumnLine from './components/ChartColumnLine'

const ChartNH = () => {
    return (
        <div>
            <div className='grid xl:grid-cols-3 lg:grid-cols-none gap-3'>
                <div>
                    <div className='dark:text-white text-black font-semibold mt-10 mb-2 text-center'>Tăng trưởng thu nhập lãi</div>
                    <ChartColumnLine />
                </div>
                <div>
                    <div className='dark:text-white text-black font-semibold mt-10 mb-2 text-center'>Lãi/lỗ thuần từ hoạt động dịch vụ</div>
                    <ChartColumnLine />
                </div>
                <div>
                    <div className='dark:text-white text-black font-semibold mt-10 mb-2 text-center'>Chi phí hoạt động</div>
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
                    <div className='dark:text-white text-black font-semibold mt-10 mb-2 text-center'>Chi phí dự phòng rủi ro tín dụng</div>
                    <ChartColumnLine />
                </div>
            </div>
        </div>
    )
}

export default ChartNH