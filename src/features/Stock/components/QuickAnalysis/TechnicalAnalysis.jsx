import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataTechnicalAnalysis } from '../../thunk';
import { BsInfoCircleFill } from "react-icons/bs";
import { Popover } from 'antd';

const contentTechnicalAnalysis = (
    <div>
        <span className='text-black font-medium rounded-lg text-sm bg-white p-2 '>
            Phân tích kỹ thuật
        </span>
    </div>
);

const TechnicalAnalysis = ({ queryApi }) => {
    const dispatch = useDispatch()
    const { dataTechnicalAnalysis } = useSelector(state => state.stock)

    useEffect(() => {
        dispatch(fetchDataTechnicalAnalysis(queryApi.stock));
    }, [dispatch, queryApi]);
    return (
        <div>
            <div className='border-solid dark:border-white border-b-[1px] border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold w-[45%] flex justify-between'>Phân tích kỹ thuật
                    <Popover content={contentTechnicalAnalysis} >
                        <span className='dark:text-white text-black'><BsInfoCircleFill /></span>
                    </Popover>
                </span>
            </div>
        </div>
    )
}

export default TechnicalAnalysis