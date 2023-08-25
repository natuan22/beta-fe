import React, { useEffect, useState } from 'react'
import { BsInfoCircleFill } from "react-icons/bs";
import { Popover } from 'antd';
import ChartGauge from './components/ChartGauge';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataFinancialHealthAnalysis } from '../../thunk';
import { Rating } from '@mui/material';
import Loading from '../../../Chart/utils/Loading';
import { getTextColorRating } from '../../../Chart/utils/utils';
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
    const [showChild, setShowChild] = useState(false);
    const [showChildStates, setShowChildStates] = useState([]);
    useEffect(() => {
        dispatch(fetchDataFinancialHealthAnalysis(queryApi.stock));
    }, [dispatch, queryApi]);
    const toggleChildVisibility = (index) => {
        const updatedStates = [...showChildStates];
        updatedStates[index] = !updatedStates[index];
        setShowChildStates(updatedStates);
    };
    return (
        <div>
            <div className='border-solid dark:border-white border-b-[1px] border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold xl:w-[50%] lg:w-[35%] md:w-[40%] sm:w-[45%] flex justify-between'>Sức khỏe tài chính
                    <Popover content={contentFinancialHealthAnalysis} >
                        <span className='dark:text-white text-black'><BsInfoCircleFill /></span>
                    </Popover>
                </span>
            </div>
            {dataFinancialHealthAnalysis ? (
                <div>
                    <div className='grid sm:grid-cols-2 xs:grid-cols-none items-center'>
                        <ChartGauge data={dataFinancialHealthAnalysis.totalStar} />
                        <div className='dark:text-white text-black text-justify'>Từ những dữ liệu được ghi nhận chúng tôi đánh giá Cổ phiếu {queryApi.stock} có sức khỏe tài chính {getTextColorRating(dataFinancialHealthAnalysis.totalStar).text} với mức điểm số <span className={getTextColorRating(dataFinancialHealthAnalysis.totalStar).color}>{dataFinancialHealthAnalysis.totalStar}/5</span>.</div>
                    </div>

                    <div>
                        <ul className='ml-[40px] mt-1'>
                            {Array.isArray(dataFinancialHealthAnalysis.data) && dataFinancialHealthAnalysis.data?.map((item, index) => {
                                const contentChild = (
                                    <div>
                                        <span className='text-black font-medium rounded-lg text-sm bg-white p-2'>
                                            {item.name}
                                        </span>
                                    </div>
                                );
                                return (
                                    <li key={index} className='dark:text-white text-black mb-2'>
                                        <span className='items-center flex justify-between'>
                                            <span className='sm:w-[60%] xs:w-[50%] xxs:w-[48%] items-center flex justify-between sm:text-base xs:text-sm xxs:text-xs'>
                                                {item.name}
                                                <Popover content={contentChild} onClick={() => toggleChildVisibility(index)}>
                                                    <span className='dark:text-white text-black cursor-pointer'><BsInfoCircleFill /></span>
                                                </Popover>
                                            </span>
                                            <span className='flex justify-between items-center text-base'>
                                                <p className='mr-2'>{item.value}</p>
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
                                            <div>

                                                <ul className='ml-[40px] mt-1'>
                                                    {item.child.map((itemChild, index) => {
                                                        const contentItemChild = (
                                                            <div>
                                                                <span className='text-black font-medium rounded-lg text-sm bg-white p-2'>
                                                                    {itemChild.name}
                                                                </span>
                                                            </div>
                                                        );
                                                        return (
                                                            <li key={index}>
                                                                <span className='items-center flex justify-between'>

                                                                    <span className='w-[56%] flex justify-between'>
                                                                        <span className='text-sm'>
                                                                            {itemChild.name}

                                                                        </span>
                                                                        <Popover content={contentItemChild} onClick={() => setShowChild(!showChild)}>
                                                                            <span className='dark:text-white text-black cursor-pointer'><BsInfoCircleFill /></span>
                                                                        </Popover>
                                                                    </span>
                                                                    <span className='flex justify-between items-center'>
                                                                        <p className='text-[15px] mr-2'>
                                                                            {itemChild.value}
                                                                        </p>
                                                                        <Rating
                                                                            sx={{
                                                                                '& .MuiRating-iconEmpty': {
                                                                                    color: '#faaf00',
                                                                                    fontSize: '20px'
                                                                                },
                                                                                '& .MuiRating-iconFilled ': {
                                                                                    fontSize: '20px'

                                                                                }
                                                                            }}
                                                                            value={itemChild.value} readOnly />
                                                                    </span>
                                                                </span>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
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

export default FinancialHealthAnalysis