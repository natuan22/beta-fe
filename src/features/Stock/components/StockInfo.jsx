import React, { useEffect } from 'react'
import { getColor } from '../../Chart/utils/utils'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataInfoHeader } from '../thunk'
const resourceURL = process.env.REACT_APP_RESOURCE_URL

const StockInfo = (props) => {
    const dispatch = useDispatch()
    const { dataInfoHeader } = useSelector((state) => state.stock);

    useEffect(() => {
        dispatch(fetchDataInfoHeader(props.codeSearch.split('-')[0]));
    }, [dispatch, props]);

    return (
        <div>
            <div className='px-[20px] pt-[30px] overflow-y-auto'>
                <table className='border border-[#34A3F3] border-solid border-collapse w-full'>
                    <tbody>
                        <tr>
                            <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid' rowSpan={3}>
                                <div>
                                    <p className='font-semibold'>GIÁ</p>
                                    <p className={`lg:text-2xl md:text-base lg:leading-[53px] md:leading-10 ${getColor(dataInfoHeader.perChange)}`}>{dataInfoHeader.price}</p>
                                    <p className={`font-bold ${getColor(dataInfoHeader.perChange)}`}>{dataInfoHeader.change && dataInfoHeader.change.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/({dataInfoHeader.perChange && dataInfoHeader.perChange.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%)</p>
                                </div>
                            </td>
                            <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid' colSpan={3}>
                                <p className='font-semibold'>{dataInfoHeader.exchange} (%)</p>
                            </td>
                            <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid' rowSpan={3}>
                                <p className='font-semibold'>KLGD</p>
                                <p className='lg:text-2xl md:text-base lg:leading-[70px] md:leading-10'>{dataInfoHeader.kldg && dataInfoHeader.kldg.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
                            </td>
                            <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid' rowSpan={3}>
                                <p className='font-semibold'>P/E</p>
                                <p className='lg:text-2xl md:text-base lg:leading-[70px] md:leading-10'>{dataInfoHeader.pe && dataInfoHeader.pe.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                            </td>
                            <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid' rowSpan={3}>
                                <p className='font-semibold'>P/B</p>
                                <p className='lg:text-2xl md:text-base lg:leading-[70px] md:leading-10'>{dataInfoHeader.pb && dataInfoHeader.pb.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                            </td>
                            <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid' rowSpan={3}>
                                <p className='font-semibold'>VỐN HOÁ (TỶ)</p>
                                <p className='lg:text-2xl md:text-base lg:leading-[70px] md:leading-10'>{dataInfoHeader.vh && (dataInfoHeader.vh / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                            </td>
                            <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid' rowSpan={3}>
                                <p className='font-semibold'>ROAE</p>
                                <p className='lg:text-2xl md:text-base lg:leading-[70px] md:leading-10'>{dataInfoHeader.roae && dataInfoHeader.roae.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                            </td>
                            <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid' rowSpan={3}>
                                <p className='font-semibold'>ROAA</p>
                                <p className='lg:text-2xl md:text-base lg:leading-[70px] md:leading-10'>{dataInfoHeader.roaa && dataInfoHeader.roaa.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                            </td>
                        </tr>
                        <tr>
                            <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid font-semibold'>1W</td>
                            <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid font-semibold'>1M</td>
                            <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid font-semibold'>1Y</td>
                        </tr>
                        <tr>
                            <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid font-bold'>
                                <p className={`${getColor(dataInfoHeader.p_week)}`}>{dataInfoHeader.p_week && dataInfoHeader.p_week.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%</p>
                            </td>
                            <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid font-bold'>
                                <p className={`${getColor(dataInfoHeader.p_month)}`}>{dataInfoHeader.p_month && dataInfoHeader.p_month.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%</p>
                            </td>
                            <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid font-bold'>
                                <p className={`${getColor(dataInfoHeader.p_year)}`}>{dataInfoHeader.p_year && dataInfoHeader.p_year.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 3 })}%</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr className="h-px my-7 bg-[#34A3F3] border-0"></hr>
            <div className='flex mb-7'>
                <div className={`bg-[#E4E81D] xxs:px-4 xs:px-4 sm:px-9 py-2 rounded-xl font-semibold`}>{dataInfoHeader.code}</div>
                <div className='bg-[#E4E81D] ml-4 xxs:px-4 xs:px-4 sm:px-24 py-2 rounded-xl font-semibold'>{dataInfoHeader.industry}</div>
            </div>
            <div className='grid lg:grid-cols-12 md:grid-cols-none gap-3'>
                <div className='lg:col-span-3 md:col-span-full'>
                    <span className='text-[#8BFF62] uppercase font-semibold'>{dataInfoHeader.company}</span>
                    <div className='p-4 flex justify-center'>
                        <img className='object-contain w-[262px] h-[145px]' src={`${resourceURL}${dataInfoHeader.image}`} onError={event => {
                            event.target.src = `${resourceURL}/resources/stock/logo_default.jpeg`
                            event.onerror = null
                        }} alt="companyImg" />
                    </div>
                </div>
                <div className='lg:col-span-5 md:col-span-full'>
                    <span className='text-[#8BFF62]'>Tên tiếng anh: {dataInfoHeader.company_eng}</span>
                    <p className='dark:text-white text-black text-justify pt-4'>{dataInfoHeader.summary}</p>
                </div>
                <div className='lg:col-span-4 md:col-span-full'></div>
            </div>
        </div>
    )
}

export default StockInfo