import React, { useEffect, useState } from 'react'
import Loading from '../../../Chart/utils/Loading'
import AccumulatedAndTotalInvestment from '../../components/FDI/AccumulatedAndTotalInvestment'
import ForeignInvestIndex from '../../components/FDI/ForeignInvestIndex'
import TotalInvestProjects from '../../components/FDI/TotalInvestProjects'
import TotalRegisteredAndDisbursedCapital from '../../components/FDI/TotalRegisteredAndDisbursedCapital'

const FDI = () => {
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true)
        }, 500)
    }, [])

    return (
        <div className="container mx-auto mt-2 md:w-[90%] lg:w-[90%] xl:w-full">
            {isLoading ? (
                <>
                    <div className='mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md'>
                        <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-3'>
                            <div>
                                <TotalInvestProjects />
                            </div>
                            <div>
                                <TotalRegisteredAndDisbursedCapital />
                            </div>
                        </div>
                    </div>
                    <div className='mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md'>
                        <ForeignInvestIndex />
                    </div>
                    <div className='mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md'>
                        <AccumulatedAndTotalInvestment />
                    </div>
                </>
            ) : (
                <div className='h-[300px] flex items-center justify-center'><Loading /></div>
            )}
        </div>
    )
}

export default FDI