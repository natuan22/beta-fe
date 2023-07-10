import React, { useEffect, useState } from 'react'
import Loading from '../../../Chart/utils/Loading'
import MarcoNews from '../../components/DomesticMacro/MarcoNews'

const DomesticMacro = () => {
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true)
        }, 500)
    }, [])
    return (
        <div className="container mx-auto md:w-[90%] lg:w-[90%] xl:w-[90%] 2xl:w-full pt-2">
            {isLoading ? (
                <>
                    <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
                        <div>
                            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                <span className='dark:text-white text-black font-semibold uppercase'>Tin vĩ mô</span>
                            </div>
                            <MarcoNews />
                        </div>
                    </div>
                    <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md mt-2">
                        <div>
                            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                <span className='dark:text-white text-black font-semibold uppercase'>Báo cáo vĩ mô</span>
                            </div>
                            <div className='h-[100px] flex items-center justify-center dark:text-white text-black uppercase font-bold'>Chúng tôi sẽ cập nhật khi có báo cáo</div>
                        </div>
                    </div>
                </>
            ) : (
                <div className='h-[300px] flex items-center justify-center'><Loading /></div>
            )}
        </div>
    )
}

export default DomesticMacro