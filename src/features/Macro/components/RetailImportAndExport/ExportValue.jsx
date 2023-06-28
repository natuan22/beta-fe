import React from 'react'

const ExportValue = () => {
    return (
        <div>
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold sm:text-base xs:text-sm xxs:text-xs'>Giá trị xuất khẩu các loại mặt hàng chính</span>
                <select className={`bg-[#1B496D] p-1 text-[1rem] text-white border-0 xl:ml-[320px] lg:ml-[518px] md:ml-[293px] sm:ml-[25px] xs:ml-[20px] xxs:ml-[4px]`}
                    onChange={(event) => {
                    }}>
                    <option value='0'>Tháng</option>
                    <option value='1'>Quý</option>
                    <option value='2'>Năm</option>
                </select>
            </div>
            <div className='h-[300px]'></div>
        </div>
    )
}

export default ExportValue