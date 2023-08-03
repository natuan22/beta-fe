import React, { useEffect, useLayoutEffect } from 'react'
import { getColor } from '../../Chart/utils/utils'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataInfoHeader } from '../thunk'
import CandleChart from './CandleChart'
import { useNavigate } from 'react-router-dom'
import socket from '../../Chart/utils/socket'
import { useState } from 'react'
import Loading from '../../Chart/utils/Loading'
const resourceURL = process.env.REACT_APP_RESOURCE_URL

const StockInfo = ({ codeSearch }) => {
    const dispatch = useDispatch()
    const code = codeSearch.split('-')[0]
    const type = codeSearch.split('-')[1]
    const { dataInfoHeader, dataInfoHeaderStatus } = useSelector((state) => state.stock);
    const [data, setData] = useState()
    const [dataChart, setDataChart] = useState([])
    const nav = useNavigate()
    useEffect(() => {
        dispatch(fetchDataInfoHeader(code, type));
    }, [dispatch, code]);

    useLayoutEffect(() => {
        if (dataInfoHeaderStatus === 400) {
            nav('/trang-khong-ton-tai')
        }
    }, [dataInfoHeaderStatus])

    useEffect(() => {
        if (dataInfoHeader) {
            setData(dataInfoHeader)
        }
    }, [dataInfoHeader])

    useEffect(() => {
        socket.on(`listen-co-phieu-${code}`, (newData) => {
            setDataChart([newData.time, newData.closePrice])
            setData(prevData => ({
                ...prevData,
                ...newData
            }));
        })
    }, [])

    return (
        <div>
            {dataInfoHeader && data ?
                <div>
                    <div className='px-[20px] pt-[30px] overflow-y-auto'>
                        <table className='border border-[#34A3F3] border-solid border-collapse w-full'>
                            <tbody>
                                <tr>
                                    <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid' rowSpan={3}>
                                        <div>
                                            <p className='font-semibold'>GIÁ</p>
                                            <p className={`lg:text-2xl md:text-base lg:leading-[53px] md:leading-10 ${getColor(data.perChange)}`}>{data.closePrice}</p>
                                            <p className={`font-bold ${getColor(data.perChange)}`}>{data.change && data.change.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/({data.perChange && data.perChange.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%)</p>
                                        </div>
                                    </td>
                                    <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid' colSpan={3}>
                                        <p className='font-semibold'>{data.exchange} (%)</p>
                                    </td>
                                    <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid' rowSpan={3}>
                                        <p className='font-semibold'>KLGD</p>
                                        <p className='lg:text-2xl md:text-base lg:leading-[70px] md:leading-10'>{data.kldg && data.kldg.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
                                    </td>
                                    <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid' rowSpan={3}>
                                        <p className='font-semibold'>P/E</p>
                                        <p className='lg:text-2xl md:text-base lg:leading-[70px] md:leading-10'>{data.pe && data.pe.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                    </td>
                                    <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid' rowSpan={3}>
                                        <p className='font-semibold'>P/B</p>
                                        <p className='lg:text-2xl md:text-base lg:leading-[70px] md:leading-10'>{data.pb && data.pb.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                    </td>
                                    <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid' rowSpan={3}>
                                        <p className='font-semibold'>VỐN HOÁ (TỶ)</p>
                                        <p className='lg:text-2xl md:text-base lg:leading-[70px] md:leading-10'>{data.vh && (data.vh / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                    </td>
                                    <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid' rowSpan={3}>
                                        <p className='font-semibold'>ROAE</p>
                                        <p className='lg:text-2xl md:text-base lg:leading-[70px] md:leading-10'>{data.roae && data.roae.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                    </td>
                                    <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid' rowSpan={3}>
                                        <p className='font-semibold'>ROAA</p>
                                        <p className='lg:text-2xl md:text-base lg:leading-[70px] md:leading-10'>{data.roaa && data.roaa.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid font-semibold'>1W</td>
                                    <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid font-semibold'>1M</td>
                                    <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid font-semibold'>1Y</td>
                                </tr>
                                <tr>
                                    <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid font-bold'>
                                        <p className={`${getColor(data.p_week)}`}>{data.p_week && data.p_week.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%</p>
                                    </td>
                                    <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid font-bold'>
                                        <p className={`${getColor(data.p_month)}`}>{data.p_month && data.p_month.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%</p>
                                    </td>
                                    <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid font-bold'>
                                        <p className={`${getColor(data.p_year)}`}>{data.p_year && data.p_year.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 3 })}%</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <hr className="h-px my-7 bg-[#34A3F3] border-0"></hr>
                    <div className='flex mb-7'>
                        <div className={`bg-[#E4E81D] xxs:px-4 xs:px-4 sm:px-9 py-2 rounded-xl font-semibold`}>{data.code}</div>
                        <div className='bg-[#E4E81D] ml-4 xxs:px-4 xs:px-4 sm:px-24 py-2 rounded-xl font-semibold'>{data.industry}</div>
                    </div>
                    <div className='grid lg:grid-cols-12 md:grid-cols-none gap-3'>
                        <div className='lg:col-span-3 md:col-span-full'>
                            <span className='text-[#8BFF62] uppercase font-semibold'>{data.company}</span>
                            <div className='p-4 flex justify-center'>
                                <img className='object-contain w-[262px] h-[145px]' src={`${resourceURL}${data.image}`} onError={event => {
                                    event.target.src = `${resourceURL}/resources/stock/logo_default.jpeg`
                                    event.onerror = null
                                }} alt="companyImg" />
                            </div>
                        </div>
                        <div className='lg:col-span-5 md:col-span-full'>
                            <span className='text-[#8BFF62]'>Tên tiếng anh: {data.company_eng}</span>
                            <p className='dark:text-white text-black text-justify pt-4'>{data.summary}</p>
                        </div>
                        <div className='lg:col-span-4 md:col-span-full'>
                            <CandleChart code={code} dataChart={dataChart} />
                        </div>
                    </div>
                </div>
                : <div><Loading /></div>}
        </div>

    )
}

export default StockInfo