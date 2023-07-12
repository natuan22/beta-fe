import React, { useEffect, useState } from 'react'
import Loading from '../../../Chart/utils/Loading'
import Error404 from '../../../Navigation/Error404'

const RateAndInterestRate = () => {
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true)
        }, 600)
    }, [])

    return (
        <div className="container mx-auto mt-2 md:w-[90%] lg:w-[90%] xl:w-full">
            {isLoading ? (
                <>
                    {/* <div className='mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md'>

                    </div> */}
                    <Error404 />
                </>
            ) : (
                <div className='h-[300px] flex items-center justify-center'><Loading /></div>
            )}
        </div>
    )
}

export default RateAndInterestRate