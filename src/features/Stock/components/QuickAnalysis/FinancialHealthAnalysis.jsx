import React, { useEffect } from 'react'
import { BsInfoCircleFill } from "react-icons/bs";
import { Popover } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataFinancialHealthAnalysis } from '../../thunk';

const contentFinancialHealthAnalysis = (
    <div>
        <span className='text-black font-medium rounded-lg text-sm bg-white p-2 '>
            Sức khoẻ tài chính
        </span>
    </div>
);

const FinancialHealthAnalysis = ({ queryApi }) => {
    const dispatch = useDispatch()
    const { dataFinancialHealthAnalysis } = useSelector(state => state.stock)

    useEffect(() => {
        dispatch(fetchDataFinancialHealthAnalysis(queryApi.stock));
    }, [dispatch, queryApi]);

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