import React from 'react'
import Error404 from '../../../Navigation/Error404'
import CashFlowRatio from '../../components/CashFlow/CashFlowRatio'
import ExchangeableValue from '../../components/CashFlow/ExchangeableValue'
import IndustryCashFlow from '../../components/CashFlow/IndustryCashFlow'
import InvestorCashFlow from '../../components/CashFlow/InvestorCashFlow'
import LiquidityGrowth from '../../components/CashFlow/LiquidityGrowth'
import NetTransferValue from '../../components/CashFlow/NetTransferValue'
import TopCashFlow from '../../components/CashFlow/TopCashFlow'
import TransactionValueRatio from '../../components/CashFlow/TransactionValueRatio'
import InvestorTransaction from '../../components/CashFlow/InvestorTransaction'
import NetVolumeTrade from '../../../Chart/components/NetVolumeTrade'


const IdentifyCash = () => {
  return (
    <>
      <Error404 />
      {/* <div className='container mx-auto mt-2'>
        <div className='flex'>
          <div className="w-[60%]">
            <div className="grid grid-cols-[2fr_2fr]">
              <div className="mx-1 my-1 px-[8px] py-[8px] bg-[#151924] h-[300px]">
                <LiquidityGrowth />
              </div>

              <div className="mx-1 my-1 px-[8px] py-[8px] bg-[#151924] h-[300px]">
                <TransactionValueRatio />
              </div>

              <div className="mx-1 my-1 px-[8px] py-[8px] bg-[#151924] h-[300px]">
                <ExchangeableValue />
              </div>

              <div className="mx-1 my-1 px-[8px] py-[8px] bg-[#151924] h-[300px]">
                <CashFlowRatio />
              </div>
            </div>
          </div>

          <div className='w-[40%]'>
            <div className="mx-1 my-1 px-[8px] py-[8px] bg-[#151924] h-[624px]">
              <IndustryCashFlow />
            </div>
          </div>
        </div>

        <div className='flex'>
          <div className="w-[60%]">
            <div className="mx-1 my-1 px-[8px] py-[8px] bg-[#151924]">
              <InvestorTransaction />
            </div>
          </div>

          <div className='w-[40%]'>
            <div className="mx-1 my-1 px-[8px] py-[8px] bg-[#151924]">
              <TopCashFlow />
            </div>
          </div>
        </div>

        <div>
          <div className='mx-1 my-1 px-[8px] py-[8px] bg-[#151924] h-[500px]'>
            <InvestorCashFlow />
          </div>
        </div>

        <div>
          <div className='mx-1 my-2 px-[8px] py-[8px] bg-[#151924]'>
            <NetVolumeTrade />
          </div>
        </div>
      </div> */}
    </>
  )
}

export default IdentifyCash