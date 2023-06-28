import React from 'react'

const RetailValue = () => {
    return (
        <div>
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold sm:text-base xs:text-sm xxs:text-xs'>Giá trị bán lẻ theo các lĩnh vực (Tỷ VNĐ)</span>
                <select className={`bg-[#1B496D] p-1 text-[1rem] text-white border-0 xl:ml-[330px] lg:ml-[520px] md:ml-[290px] sm:ml-[30px] xs:ml-[25px] xxs:ml-[8px]`}
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

export default RetailValue