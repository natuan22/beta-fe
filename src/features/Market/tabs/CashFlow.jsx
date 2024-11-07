import React from "react";
import LazyLoad from "react-lazyload";
import NetVolumeTrade from "../../Chart/components/NetVolumeTrade";
import CashFlowRatio from "../components/CashFlow/CashFlowRatio";
import ExchangeableValue from "../components/CashFlow/ExchangeableValue";
import IndustryCashFlow from "../components/CashFlow/IndustryCashFlow";
import InvestorCashFlow from "../components/CashFlow/InvestorCashFlow";
import InvestorTransaction from "../components/CashFlow/InvestorTransaction";
import LiquidityGrowth from "../components/CashFlow/LiquidityGrowth";
import TopCashFlow from "../components/CashFlow/TopCashFlow";
import TransactionValueRatio from "../components/CashFlow/TransactionValueRatio";

const CashFlow = () => {
  return (
    <>
      <div className="container mx-auto mt-2 md:w-[90%] lg:w-[90%] xl:w-full">
        <>
          <div className="lg:block xl:flex">
            <div className="xl:w-[60%]">
              <div className="grid xs:grid-cols-none md:grid-cols-none lg:grid-cols-2 xl:grid-cols-2">
                <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
                  <LazyLoad offset={300} debounce={200} once>
                    <LiquidityGrowth />
                  </LazyLoad>
                </div>

                <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
                  <LazyLoad offset={300} debounce={200} once>
                    <TransactionValueRatio />
                  </LazyLoad>
                </div>

                <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
                  <LazyLoad offset={300} debounce={200} once>
                    <ExchangeableValue />
                  </LazyLoad>
                </div>

                <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
                  <LazyLoad offset={300} debounce={200} once>
                    <CashFlowRatio />
                  </LazyLoad>
                </div>
              </div>
            </div>

            <div className="xl:w-[40%]">
              <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
                <LazyLoad offset={300} debounce={200} once>
                  <IndustryCashFlow />
                </LazyLoad>
              </div>
            </div>
          </div>

          <div className="lg:block xl:flex">
            <div className="xl:w-[60%]">
              <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
                <LazyLoad offset={300} debounce={200} once>
                  <InvestorTransaction />
                </LazyLoad>
              </div>
            </div>

            <div className="xl:w-[40%]">
              <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
                <LazyLoad offset={300} debounce={200} once>
                  <TopCashFlow />
                </LazyLoad>
              </div>
            </div>
          </div>

          <div>
            <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
              <LazyLoad offset={300} debounce={200} once>
                <InvestorCashFlow />
              </LazyLoad>
            </div>
          </div>

          <div>
            <div className="mx-1 my-2 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
              <LazyLoad offset={300} debounce={200} once>
                <NetVolumeTrade />
              </LazyLoad>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default CashFlow;
