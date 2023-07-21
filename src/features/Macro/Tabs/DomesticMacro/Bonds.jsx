import React, { useEffect, useState } from 'react'
import Loading from '../../../Chart/utils/Loading'
import BondInterestRate from '../../components/Bonds/BondInterestRate'
import BondsIssued from '../../components/Bonds/BondsIssued'
import DebtBalanceStructure from '../../components/Bonds/DebtBalanceStructure'
import EstimatedValueBondsDueDate from '../../components/Bonds/EstimatedValueBondsDueDate'
import ListMaturityBonds from '../../components/Bonds/ListMaturityBonds'
import ListOverdueBondObligation from '../../components/Bonds/ListOverdueBondObligation'
import ProportionOutstandingLoans from '../../components/Bonds/ProportionOutstandingLoans'
import TotalOutstandingDebtAndBondInterest from '../../components/Bonds/TotalOutstandingDebtAndBondInterest'

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
                        <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-3'>
                            <div>
                                <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                    <span className='dark:text-white text-black font-semibold md:text-base xs:text-sm xxs:text-xs'>TPDN phát hành thành công theo từng kỳ (tỷ đồng)</span>
                                </div>
                                <BondsIssued />
                            </div>
                            <div>
                                <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                    <span className='dark:text-white text-black font-semibold md:text-base xs:text-sm xxs:text-xs'>Ước tính giá trị TPDN đáo hạn theo từng kỳ (tỷ đồng)</span>
                                </div>
                                <EstimatedValueBondsDueDate />
                            </div>
                        </div>
                    </div>

                    <div className='mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md'>
                        <div className='lg:block xl:flex gap-3'>
                            <div className='xl:w-[40%] lg:w-full'>
                                <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                    <span className='dark:text-white text-black font-semibold xs:text-base xxs:text-sm'>Lãi suất trái phiếu huy động bình quân (%)</span>
                                </div>
                                <BondInterestRate />
                            </div>
                            <div className='lg:w-full xl:w-[60%] grid md:grid-cols-2 sm:grid-cols-none gap-3'>
                                <div>
                                    <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                        <span className='dark:text-white text-black font-semibold'>Cơ cấu dư nợ TPDN (%)</span>
                                    </div>
                                    <DebtBalanceStructure />
                                </div>
                                <div>
                                    <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                        <span className='dark:text-white text-black font-semibold xl:text-sm lg:text-base xs:text-base xxs:text-sm'>Tỷ trọng dư nợ các DN chậm thanh toán (%)</span>
                                    </div>
                                    <ProportionOutstandingLoans />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md'>
                        <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-3'>
                            <div>
                                <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                    <span className='dark:text-white text-black font-semibold xs:text-base xxs:text-sm'>Danh sách tổng dư nợ thị trường trái phiếu</span>
                                </div>
                                <TotalOutstandingDebtAndBondInterest />
                            </div>
                            <div>
                                <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                    <span className='dark:text-white text-black font-semibold md:text-base xs:text-sm xxs:text-xs'>Danh sách doanh nghiệp chậm nghĩa vụ trái phiếu</span>
                                </div>
                                <ListOverdueBondObligation />
                            </div>
                        </div>
                    </div>

                    <div className='mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md'>
                        <div>
                            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                <span className='dark:text-white text-black font-semibold'>Danh sách trái phiếu đến kỳ đáo hạn (%)</span>
                            </div>
                            <ListMaturityBonds />
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