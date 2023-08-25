import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataBussinessAnalysis } from '../../thunk';
import { BsInfoCircleFill } from "react-icons/bs";
import { Popover } from 'antd';

const contentBussinessAnalysis = (
    <div>
        <span className='text-black font-medium rounded-lg text-sm bg-white p-2 '>
            Ngành nghề kinh doanh
        </span>
    </div>
);

const BussinessAnalysis = ({ queryApi }) => {
    const dispatch = useDispatch()
    const { dataBussinessAnalysis } = useSelector(state => state.stock)

    useEffect(() => {
        dispatch(fetchDataBussinessAnalysis(queryApi.stock));
    }, [dispatch, queryApi]);

    return (
        <div>
            <div className='border-solid dark:border-white border-b-[1px] border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold w-[45%] flex justify-between'>Ngành nghề kinh doanh
                    <Popover content={contentBussinessAnalysis} >
                        <span className='dark:text-white text-black'><BsInfoCircleFill /></span>
                    </Popover>
                </span>
            </div>
        </div>
    )
}

export default BussinessAnalysis