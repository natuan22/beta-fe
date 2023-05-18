import React from 'react'
import CashFlowRatio from '../../components/CashFlow/CashFlowRatio'
import ExchangeableValue from '../../components/CashFlow/ExchangeableValue'
import IndustryCashFlow from '../../components/CashFlow/IndustryCashFlow'
import InvestorCashFlow from '../../components/CashFlow/InvestorCashFlow'
import LiquidityGrowth from '../../components/CashFlow/LiquidityGrowth'
import TopCashFlow from '../../components/CashFlow/TopCashFlow'
import TransactionValueRatio from '../../components/CashFlow/TransactionValueRatio'
import InvestorTransaction from '../../components/CashFlow/InvestorTransaction'
import NetVolumeTrade from '../../../Chart/components/NetVolumeTrade'


const IdentifyCash = () => {
  return (
    <>
      {/* <Error404 /> */}
      <div className='container mx-auto mt-2'>
        <div className='flex'>
          <div className="w-[60%]">
            <div className="grid grid-cols-2">
              <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100">
                <LiquidityGrowth />
              </div>

              <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100">
                <TransactionValueRatio />
              </div>

              <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100">
                <ExchangeableValue />
              </div>

              <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100">
                <CashFlowRatio />
              </div>
            </div>
          </div>

          <div className='w-[40%]'>
            <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100">
              <IndustryCashFlow />
            </div>
          </div>
        </div>

        <div className='flex'>
          <div className="w-[60%]">
            <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100">
              <InvestorTransaction />
            </div>
          </div>

          <div className='w-[40%]'>
            <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100">
              <TopCashFlow />
            </div>
          </div>
        </div>

        <div>
          <div className='mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 h-[500px]'>
            <InvestorCashFlow />
          </div>
        </div>

        <div>
          <div className='mx-1 my-2 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100'>
            <NetVolumeTrade />
          </div>
        </div>
      </div>
    </>
  )
}

export default IdentifyCash