import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataRatingHeader } from '../../thunk'
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

const RatingHeader = ({ queryApi }) => {
    const { stock } = queryApi
    const dispatch = useDispatch()
    const { dataRatingHeader } = useSelector(state => state.stock)
    const [isBasicPrice, setIsBasicPrice] = useState(true)
    const [dataBasicPrice, setDataBasicPrice] = useState()
    const [dataTechnical, setTechnical] = useState()
    useEffect(() => {
        dispatch(fetchDataRatingHeader(stock))
    }, [stock])

    useEffect(() => {
        if (dataRatingHeader?.length > 0) {
            const sliceArr1 = dataRatingHeader.slice(0, 6)
            const sliceArr2 = dataRatingHeader.slice(6, 12)
            setDataBasicPrice(sliceArr1)
            setTechnical(sliceArr2)
        }
    }, [dataRatingHeader])

    return (
        <div>
            <div className='flex w-full border-solid border-white border-b-2 border-t-0 border-x-0 pb-1' >
                <div className='text-white flex items-center justify-center'>
                    <div className='icon_left cursor-pointer mr-2'
                        onClick={() => {
                            setIsBasicPrice(!isBasicPrice)
                        }}
                    >
                        <BiSolidLeftArrow className='text-base' />
                    </div>
                    <div className='text_mid text-base'>
                        {isBasicPrice ? 'Định giá cơ bản' : 'Yếu tố kỹ thuật'}
                    </div>
                    <div className='icon_right cursor-pointer ml-2'
                        onClick={() => {
                            setIsBasicPrice(!isBasicPrice)
                        }}
                    >
                        <BiSolidRightArrow className='text-base' />
                    </div>
                </div>
            </div>
            <div className='text-white'>
                {isBasicPrice ? (
                    <table className='w-full border-collapse'>
                        <thead>
                            <tr>
                                <th className='p-2 text-left'>Phương pháp</th>
                                <th className='px-3 py-2 text-center'>Giá trị</th>
                                <th className='px-3 py-2 text-center'>BQ Ngành</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataBasicPrice?.map((item, index) => (
                                <tr key={index}>
                                    <td className={`${item.name === 'Tổng hợp định giá' ? 'font-bold' : ''} p-2`}>{item.name}</td>
                                    <td className={`${item.name === 'Tổng hợp định giá' ? 'font-bold border border-solid border-white border-t-2 border-b-0 border-x-0' : ''} p-2 text-center`}>{(item.value).toFixed(2)}</td>
                                    <td className={`${item.name === 'Tổng hợp định giá' ? 'font-bold border border-solid border-white border-t-2 border-b-0 border-x-0' : ''} p-2 text-center`}>{(item.value_industry).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <table className='w-full border-collapse'>
                        <thead>
                            <tr>
                                <th className='p-2 text-left'>Chỉ tiêu</th>
                                <th className='p-2 text-center'>Giá trị</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataTechnical?.map((item, index) => (
                                <tr key={index}>
                                    <td className='p-2'>{item.name}</td>
                                    <td className={`p-2 text-center ${index === dataTechnical.length - 1 ? 'border border-solid border-white border-b-2 border-t-0 border-x-0' : ''}`}>  {typeof (item.value) === 'number' ? (item.value).toFixed(2) : item.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}


            </div>
        </div >

    )
}

export default RatingHeader