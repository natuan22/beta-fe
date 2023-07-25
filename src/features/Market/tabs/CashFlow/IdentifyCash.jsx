import React, { useEffect, useState } from 'react'
import CashFlowRatio from '../../components/CashFlow/CashFlowRatio'
import ExchangeableValue from '../../components/CashFlow/ExchangeableValue'
import IndustryCashFlow from '../../components/CashFlow/IndustryCashFlow'
import InvestorCashFlow from '../../components/CashFlow/InvestorCashFlow'
import LiquidityGrowth from '../../components/CashFlow/LiquidityGrowth'
import TopCashFlow from '../../components/CashFlow/TopCashFlow'
import TransactionValueRatio from '../../components/CashFlow/TransactionValueRatio'
import InvestorTransaction from '../../components/CashFlow/InvestorTransaction'
import NetVolumeTrade from '../../../Chart/components/NetVolumeTrade'
import Loading from '../../../Chart/utils/Loading'


const IdentifyCash = () => {
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true)
    }, 800)
  }, [])
  return (
    <>
      <div className='container mx-auto mt-2 md:w-[90%] lg:w-[90%] xl:w-full'>
        {isLoading ? (
          <>
            <div className='lg:block xl:flex'>
              <div className="xl:w-[60%]">
                <div className="grid xs:grid-cols-none md:grid-cols-none lg:grid-cols-2 xl:grid-cols-2">
                  <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
                    <LiquidityGrowth />
                  </div>

                  <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
                    <TransactionValueRatio />
                  </div>

                  <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
                    <ExchangeableValue />
                  </div>

                  <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
                    <CashFlowRatio />
                  </div>
                </div>
              </div>

              <div className='xl:w-[40%]'>
                <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
                  <IndustryCashFlow />
                </div>
              </div>
            </div>

            <div className='lg:block xl:flex'>
              <div className="xl:w-[60%]">
                <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
                  <InvestorTransaction />
                </div>
              </div>

              <div className='xl:w-[40%]'>
                <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
                  <TopCashFlow />
                </div>
              </div>
            </div>

            <div>
              <div className='mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md'>
                <InvestorCashFlow />
              </div>
            </div>

            <div>
              <div className='mx-1 my-2 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md'>
                <NetVolumeTrade />
              </div>
            </div>
          </>
        ) : (
          <div className='h-[300px] flex items-center justify-center'><Loading /></div>
        )}
      </div>
    </>
  )
}

export default IdentifyCash