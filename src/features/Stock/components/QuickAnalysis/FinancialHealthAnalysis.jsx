import React from 'react'
import { BsInfoCircleFill } from "react-icons/bs";
import { Popover } from 'antd';

const contentFinancialHealthAnalysis = (
    <div>
        <span className='text-black font-medium rounded-lg text-sm bg-white p-2 '>
            Sức khoẻ tài chính
        </span>
    </div>
);

const FinancialHealthAnalysis = () => {
    return (
        <div>
            <div className='border-solid dark:border-white border-b-[1px] border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold w-[45%] flex justify-between'>Sức khoẻ tài chính
                    <Popover content={contentFinancialHealthAnalysis} >
                        <span className='dark:text-white text-black'><BsInfoCircleFill /></span>
                    </Popover>
                </span>
            </div>
        </div>
    )
}

export default FinancialHealthAnalysis