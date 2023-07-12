import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Loading from '../../../Chart/utils/Loading';
import ChangeCPISectors from '../../components/CPI/ChangeCPISectors';
import PerCPIBySectors from '../../components/CPI/PerCPIBySectors';
import PerCPIMonth from '../../components/CPI/PerCPIMonth';
import WeightedCPICommodityBasket from '../../components/CPI/WeightedCPICommodityBasket';
import { fetchDataChangeCPISectors, fetchDataPerCPIBySectors, fetchDataPerCPIMonth, fetchDataTablePerCPIBySectors, fetchDataWeightedCPICommodityBasket } from '../../thunk';

const CPI = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true)
        }, 500)
    }, [])

    useEffect(() => {
        dispatch(fetchDataPerCPIBySectors)
        dispatch(fetchDataTablePerCPIBySectors)
        dispatch(fetchDataChangeCPISectors(0))
        dispatch(fetchDataPerCPIMonth)
        dispatch(fetchDataWeightedCPICommodityBasket)
    }, [dispatch]);

    return (
        <div className="container mx-auto mt-2 md:w-[90%] lg:w-[90%] xl:w-full">
            {isLoading ? (
                <div className='mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md'>
                    <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-3'>
                        <div>
                            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                <span className='dark:text-white text-black font-semibold'>CPI theo các lĩnh vực của nền kinh tế (%)</span>
                            </div>
                            <PerCPIBySectors />
                        </div>
                        <div>
                            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                <span className='dark:text-white text-black font-semibold xs:text-base xxs:text-xs'>CPI các tháng so với cùng kỳ năm trước (%)</span>
                            </div>
                            <PerCPIMonth />
                        </div>
                    </div>
                    <div className='lg:block xl:flex gap-3 mt-2'>
                        <div className='lg:w-full xl:w-[40%] mt-[3px]'>
                            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                <span className='dark:text-white text-black font-semibold'>Quyền số CPI theo rổ hàng hóa (%)</span>
                            </div>
                            <WeightedCPICommodityBasket />
                        </div>
                        <div className='lg:w-full xl:w-[60%]'>
                            <ChangeCPISectors />
                        </div>
                    </div>
                </div>
            ) : (
                <div className='h-[300px] flex items-center justify-center'><Loading /></div>
            )}
        </div>
    )
}

export default CPI