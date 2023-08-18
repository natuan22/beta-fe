import React, { useEffect, useState } from 'react'
import { BsInfoCircleFill } from "react-icons/bs";
import { Popover } from 'antd';
import ChartGauge from './components/ChartGauge';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataBasicPrice } from '../../thunk';
import { Rating } from '@mui/material';
import Loading from '../../../Chart/utils/Loading';
import { getTextColorRating } from '../../../Chart/utils/utils';

const contentBasicPrice = (
    <div>
        <span className='text-black font-medium rounded-lg text-sm bg-white p-2'>
            Định giá cơ bản
        </span>
    </div>
);

const BasicPrice = ({ queryApi }) => {
    const dispatch = useDispatch()
    const { dataBasicPrice } = useSelector(state => state.stock)
    const [showChild, setShowChild] = useState(false);
    const [showChildStates, setShowChildStates] = useState([]);

    useEffect(() => {
        dispatch(fetchDataBasicPrice(queryApi.stock));
    }, [dispatch, queryApi]);

    const totalValue = Array.isArray(dataBasicPrice) && dataBasicPrice?.reduce((sum, item) => sum + item.value, 0);

    // Calculate the average value
    const averageValue = totalValue / dataBasicPrice?.length;

    const toggleChildVisibility = (index) => {
        const updatedStates = [...showChildStates];
        updatedStates[index] = !updatedStates[index];
        setShowChildStates(updatedStates);
    };

    return (
        <div>
            <div className='border-solid dark:border-white border-b-[1px] border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold w-[45%] flex justify-between'>Định giá cơ bản
                    <Popover content={contentBasicPrice} >
                        <span className='dark:text-white text-black'><BsInfoCircleFill /></span>
                    </Popover>
                </span>
            </div>
            {dataBasicPrice.length > 0 ? (
                <div>
                    <div className='grid grid-cols-2 items-center'>
                        <ChartGauge data={+averageValue.toFixed()} />
                        <div className='dark:text-white text-black text-justify'>Từ những dữ liệu được ghi nhận chúng tôi đánh giá Cổ phiếu {queryApi.stock} có sức khỏe tài chính {getTextColorRating(averageValue.toFixed()).text} với mức điểm số <span className={getTextColorRating(averageValue.toFixed()).color}>{averageValue.toFixed()}/5</span>.</div>
                    </div>

                    <div>
                        <ul className='ml-[40px]'>
                            {Array.isArray(dataBasicPrice) && dataBasicPrice?.map((item, index) => {
                                return (
                                    <li key={index} className='dark:text-white text-black'>
                                        <span className='items-center flex justify-between'>
                                            <span className='w-[65%] flex justify-between'>
                                                {item.name}
                                                <Popover content={contentBasicPrice} onClick={() => toggleChildVisibility(index)}>
                                                    <span className='dark:text-white text-black cursor-pointer'><BsInfoCircleFill /></span>
                                                </Popover>
                                            </span>
                                            <span>
                                                <Rating
                                                    sx={{
                                                        '& .MuiRating-iconEmpty': {
                                                            color: '#faaf00'
                                                        }
                                                    }}
                                                    value={item.value} readOnly />
                                            </span>
                                        </span>
                                        {showChildStates[index] && (
                                            <ul className='ml-[40px]'>
                                                {item.child.map((items, index) => {
                                                    return (
                                                        <li key={index}>
                                                            <span className='items-center flex justify-between'>
                                                                <span className='w-[62%] flex justify-between'>
                                                                    {items.name}
                                                                    <Popover content={contentBasicPrice} onClick={() => setShowChild(!showChild)}>
                                                                        <span className='dark:text-white text-black cursor-pointer'><BsInfoCircleFill /></span>
                                                                    </Popover>
                                                                </span>
                                                                <span>
                                                                    <Rating
                                                                        sx={{
                                                                            '& .MuiRating-iconEmpty': {
                                                                                color: '#faaf00'
                                                                            }
                                                                        }}
                                                                        value={items.value} readOnly />
                                                                </span>
                                                            </span>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        )}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            ) : (
                <div className='h-[300px] flex items-center justify-center'><Loading /></div>
            )}
        </div>
    )
}

export default BasicPrice