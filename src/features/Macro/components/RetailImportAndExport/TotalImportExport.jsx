import React from 'react'

const TotalImportExport = () => {
    return (
        <div>
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold sm:text-base xs:text-sm xxs:text-xs'>Tổng giá trị xuất nhập khẩu qua từng kỳ</span>
                <select className={`bg-[#1B496D] p-1 text-[1rem] text-white border-0 xl:ml-[330px] lg:ml-[525px] md:ml-[300px] sm:ml-[32px] xs:ml-[25px] xxs:ml-[9px]`}
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

export default TotalImportExport