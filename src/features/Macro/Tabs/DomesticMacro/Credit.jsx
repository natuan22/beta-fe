import React, { useEffect, useState } from 'react'
import Loading from '../../../Chart/utils/Loading';
import TotalMeansOfPayment from '../../components/Credit/TotalMeansOfPayment';
import InternationalBalanceOfPayments from '../../components/Credit/InternationalBalanceOfPayments';
import CreditBalance from '../../components/Credit/CreditBalance';
import CreditBalanceGrowth from '../../components/Credit/CreditBalanceGrowth';
import StatisticsCreditInstitution from '../../components/Credit/StatisticsCreditInstitution';

const Credit = () => {
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
                    <div className='mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md'>
                        <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-3'>
                            <div>
                                <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                    <span className='dark:text-white text-black font-semibold'>Tổng phương tiện thanh toán</span>
                                </div>
                                <TotalMeansOfPayment />
                            </div>
                            <div>
                                <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                    <span className='dark:text-white text-black font-semibold'>Cán cân thanh toán quốc tế</span>
                                </div>
                                <InternationalBalanceOfPayments />
                            </div>
                        </div>
                    </div>
                    <div className='mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md'>
                        <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-3'>
                            <div>
                                <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                    <span className='dark:text-white text-black font-semibold xs:text-base xxs:text-sm'>Dư nợ tín dụng đối với nền kinh tế (tỷ VNĐ)</span>
                                </div>
                                <CreditBalance />
                            </div>
                            <div>
                                <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                    <span className='dark:text-white text-black font-semibold sm:text-base xs:text-sm xxs:text-xs'>Tăng trưởng dư nợ tín dụng đối với nền kinh tế (%)</span>
                                </div>
                                <CreditBalanceGrowth />
                                <StatisticsCreditInstitution />
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className='h-[300px] flex items-center justify-center'><Loading /></div>
            )}
        </div >
    )
}

export default Credit