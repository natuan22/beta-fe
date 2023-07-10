import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Loading from '../../../Chart/utils/Loading'
import IndexConsumptionStorage from '../../components/Produce/IndexConsumptionStorage';
import IndexIndustrialProduction from '../../components/Produce/IndexIndustrialProduction';
import IndexIndustrialProductionByIndustry from '../../components/Produce/IndexIndustrialProductionByIndustry';
import IndustrialProductionPrimarily from '../../components/Produce/IndustrialProductionPrimarily';
import { fetchDataIndexConsumptionStorage, fetchDataIndexIndustrialProduction, fetchDataIndexIndustrialProductionByIndustry, fetchDataIndustrialProductionPrimarily, fetchDataTableIndexIndustrialProduction } from '../../thunk';

const Produce = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true)
        }, 500)
    }, [])

    useEffect(() => {
        dispatch(fetchDataIndexIndustrialProduction)
        dispatch(fetchDataTableIndexIndustrialProduction)
        dispatch(fetchDataIndexConsumptionStorage('cheBienGo'))
        dispatch(fetchDataIndexIndustrialProductionByIndustry('cheBienGo'))
        dispatch(fetchDataIndustrialProductionPrimarily('acQuyDienCacLoai'))
    }, [dispatch]);

    return (
        <div className="container mx-auto mt-2 md:w-[90%] lg:w-[90%] xl:w-full">
            {isLoading ? (
                <>
                    <div className='mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md'>
                        <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                            <span className='dark:text-white text-black font-semibold'>Chỉ số sản xuất công nghiệp (%)</span>
                        </div>
                        <IndexIndustrialProduction />
                    </div>
                    <div className='mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md'>
                        <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-5'>
                            <div>
                                <IndexIndustrialProductionByIndustry />
                            </div>
                            <div>
                                <IndexConsumptionStorage />
                            </div>
                        </div>
                    </div>
                    <div className='mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md'>
                        <IndustrialProductionPrimarily />
                    </div>
                </>
            ) : (
                <div className='h-[300px] flex items-center justify-center'><Loading /></div>
            )}
        </div>
    )
}

export default Produce