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
        <div className=' w-[361px] h-[345px]'>
            <div className='flex w-full border-solid border-white border-b-2 border-t-0 border-x-0 ' >
                <div className='text-white flex items-center  justify-center '>
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
                {isBasicPrice ?
                    <table class="table-auto">
                        <thead>
                            <tr>
                                <th>Phương pháp</th>
                                <th>Giá trị</th>
                                <th>BQ Ngành</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataBasicPrice?.map((item, index) => (
                                <tr key={index}>
                                    <td className={`${item.name === 'Tổng hợp định giá' ? 'font-bold' : ''} p-3`}>{item.name}</td>
                                    <td className={`${item.name === 'Tổng hợp định giá' ? 'font-bold' : ''} p-3 text-center`}>{(item.value).toFixed(2)}</td>
                                    <td className={`${item.name === 'Tổng hợp định giá' ? 'font-bold' : ''} p-3 text-center`}>{(item.value_industry).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    :

                    <table class="table-auto">
                        <thead>
                            <tr>
                                <th>Chỉ tiêu</th>
                                <th>Giá trị</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataTechnical?.map((item, index) => (
                                <tr key={index}>
                                    <td className='p-3'>{item.name}</td>
                                    <td className='p-3' >  {typeof (item.value) === 'number' ? (item.value).toFixed(2) : item.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }


            </div>
        </div>

    )
}

export default RatingHeader