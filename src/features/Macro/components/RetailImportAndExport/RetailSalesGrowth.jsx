import React from 'react'

const RetailSalesGrowth = () => {
    return (
        <div>
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold xs:text-base xxs:text-[13px]'>Tăng trưởng doanh số bán lẻ tại các lĩnh vực (%)</span>
                <select className={`bg-[#1B496D] p-1 text-[1rem] text-white border-0 xl:ml-[140px] lg:ml-[330px] md:ml-[105px] sm:ml-[100px] xs:ml-[80px] xxs:ml-[50px]`}
                    onChange={(event) => {
                    }}>
                    <option value='0'>Cùng kỳ (YoY)</option>
                    <option value='1'>Tháng trên tháng (MoM)</option>
                </select>
            </div>
            <div className='h-[300px]'></div>
        </div>
    )
}

export default RetailSalesGrowth