import { Popover } from 'antd';
import React, { useEffect } from 'react'
import { BsInfoCircleFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataBusinessPosition } from '../../thunk';

const contentBusinessPosition = (
    <div>
        <span className='text-black font-medium rounded-lg text-sm bg-white p-2 '>
            Vị thế doanh nghiệp
        </span>
    </div>
);

const BusinessPosition = ({ queryApi }) => {
    const dispatch = useDispatch()
    const { dataBusinessPosition } = useSelector(state => state.stock)

    useEffect(() => {
        dispatch(fetchDataBusinessPosition(queryApi.stock));
    }, [dispatch, queryApi]);

    return (
        <div>
            <div className='border-solid dark:border-white border-b-[1px] border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold w-[45%] flex justify-between'>Vị thế doanh nghiệp
                    <Popover content={contentBusinessPosition} >
                        <span className='dark:text-white text-black'><BsInfoCircleFill /></span>
                    </Popover>
                </span>
            </div>
        </div>
    )
}

export default BusinessPosition