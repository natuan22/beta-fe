import React, { useState } from 'react'

const LiquidityGrowth = () => {
    return (
        <>
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='text-white'>Mức tăng trưởng thanh khoản (%)</span>
                <select className={`bg-[#1B496D] p-1 text-[1rem] text-white border-0`}
                    onChange={(event) => {
                    }}>
                    <option value='0'>Từ đầu năm</option>
                    <option value='1'>...</option>
                    <option value='2'>...</option>
                    <option value='3'>...</option>
                </select>
            </div>
        </>
    )
}

export default LiquidityGrowth