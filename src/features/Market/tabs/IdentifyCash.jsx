import React, { useState } from 'react'
import Error404 from '../../Navigation/Error404'
import CashFlowRatio from '../components/CashFlowRatio';
import ExchangeableValue from '../components/ExchangeableValue';
import IndustryCashFlow from '../components/IndustryCashFlow';
import InvestorCashFlow from '../components/InvestorCashFlow';
import LiquidityGrowth from '../components/LiquidityGrowth';
import NetTransferValue from '../components/NetTransferValue';
import TopCashFlow from '../components/TopCashFlow';
import TransactionProgress from '../components/TransactionProgress';
import TransactionValueRatio from '../components/TransactionValueRatio';

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
            <div className="mx-1 my-1 px-[8px] py-[8px] bg-[#151924] h-[300px]">
              <TransactionProgress />
            </div>
          </div>

          <div className='w-[40%]'>
            <div className="mx-1 my-1 px-[8px] py-[8px] bg-[#151924] h-[300px]">
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
          <div className='mx-1 my-2 px-[8px] py-[8px] bg-[#151924] h-[400px]'>
            <NetTransferValue />
          </div>
        </div>
      </div> */}
    </>
  )
}

export default IdentifyCash