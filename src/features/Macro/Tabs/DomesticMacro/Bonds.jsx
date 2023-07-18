import React, { useEffect, useState } from 'react'
import Loading from '../../../Chart/utils/Loading'

const Bonds = () => {
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
                        <div className='flex gap-3'>
                            <div className='w-[40%]'>
                                <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                    <span className='dark:text-white text-black font-semibold'>TPDN phát hành thành công theo từng kỳ (tỷ đồng)</span>
                                </div>
                            </div>
                            <div className='flex w-[60%] gap-3'>
                                <div className='w-[65%]'>
                                    <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                        <span className='dark:text-white text-black font-semibold'>Ước tính giá trị TPDN đáo hạn theo từng kỳ (tỷ đồng)</span>
                                    </div>
                                </div>
                                <div className='w-[35%]'>
                                    <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                        <span className='dark:text-white text-black font-semibold'>Cơ cấu dư nợ TPDN (%)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md'>
                        <div className='flex gap-3'>
                            <div className='w-[40%]'>
                                <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                    <span className='dark:text-white text-black font-semibold'>Lãi suất trái phiếu huy động bình quân (%)</span>
                                </div>
                            </div>
                            <div className='w-[60%]'>
                                <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                    <span className='dark:text-white text-black font-semibold'>Danh sách trái phiếu đến kỳ đáo hạn (%)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md'>
                        <div className='flex gap-3'>
                            <div className='w-[40%]'>

                            </div>
                            <div className='flex w-[60%] gap-3'>
                                <div className='w-[65%]'>
                                    <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                        <span className='dark:text-white text-black font-semibold'>Danh sách doanh nghiệp chậm nghĩa vụ trái phiếu</span>
                                    </div>
                                </div>
                                <div className='w-[35%]'>
                                    <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                        <span className='dark:text-white text-black font-semibold'>Tỷ trọng dư nợ các DN chậm thanh toán (%)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className='h-[300px] flex items-center justify-center'><Loading /></div>
            )}
        </div>
    )
}

export default Bonds