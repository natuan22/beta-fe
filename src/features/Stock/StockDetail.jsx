import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import LayOut from '../../HOCs/Layout'
import { fetchDataInfoHeader } from './thunk'

const StockDetail = () => {
    const dispatch = useDispatch()
    const { code } = useParams()
    const { dataInfoHeader } = useSelector((state) => state.stock);

    useEffect(() => {
        if (code)
            dispatch(fetchDataInfoHeader(code));
    }, [dispatch, code]);

    console.log(dataInfoHeader)

    return (
        <LayOut>
            <div className="container mx-auto">
                <div className='px-[20px] pt-[30px] overflow-y-auto'>
                    <table className='border border-[#34A3F3] border-solid border-collapse w-full'>
                        <tbody>
                            <tr>
                                <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid' rowSpan={3}>
                                    <div>
                                        <p className='font-semibold'>GIÁ</p>
                                        <p className='lg:text-2xl md:text-base lg:leading-[53px] md:leading-10 text-red-500'>71.4</p>
                                        <p className='font-bold text-red-500'>-0.5/(-0.70%)</p>
                                    </div>
                                </td>
                                <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid' colSpan={3}>
                                    <p className='font-semibold'>VN-INDEX (%)</p>
                                </td>
                                <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid' rowSpan={3}>
                                    <p className='font-semibold'>KLGD</p>
                                    <p className='lg:text-2xl md:text-base lg:leading-[70px] md:leading-10'>71.4 M</p>
                                </td>
                                <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid' rowSpan={3}>
                                    <p className='font-semibold'>P/E</p>
                                    <p className='lg:text-2xl md:text-base lg:leading-[70px] md:leading-10'>71.4</p>
                                </td>
                                <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid' rowSpan={3}>
                                    <p className='font-semibold'>P/B</p>
                                    <p className='lg:text-2xl md:text-base lg:leading-[70px] md:leading-10'>71.4</p>
                                </td>
                                <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid' rowSpan={3}>
                                    <p className='font-semibold'>VỐN HOÁ (TỶ)</p>
                                    <p className='lg:text-2xl md:text-base lg:leading-[70px] md:leading-10'>71.4</p>
                                </td>
                                <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid' rowSpan={3}>
                                    <p className='font-semibold'>ROAE</p>
                                    <p className='lg:text-2xl md:text-base lg:leading-[70px] md:leading-10'>71.4</p>
                                </td>
                                <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid' rowSpan={3}>
                                    <p className='font-semibold'>ROAA</p>
                                    <p className='lg:text-2xl md:text-base lg:leading-[70px] md:leading-10'>71.4</p>
                                </td>
                            </tr>
                            <tr>
                                <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid font-semibold'>1W</td>
                                <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid font-semibold'>1M</td>
                                <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid font-semibold'>1Y</td>
                            </tr>
                            <tr>
                                <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid font-bold'>
                                    <p className='text-red-500'>-0.9%</p>
                                </td>
                                <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid font-bold'>
                                    <p className='text-green-500'>0.26%</p>
                                </td>
                                <td className='dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid font-bold'>
                                    <p className='text-red-500'>-0.36%</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr className="h-px my-7 bg-[#34A3F3] border-0"></hr>
            </div>
        </LayOut>
    )
}

export default StockDetail