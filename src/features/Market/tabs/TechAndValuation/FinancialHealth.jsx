import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../Chart/utils/Loading';
import CashPayoutRatio from '../../components/FinancialHealth/Chart/CashPayoutRatio';
import ChartAverageDebtRatio from '../../components/FinancialHealth/Chart/ChartAverageDebtRatio';
import ChartAveragePB from '../../components/FinancialHealth/Chart/ChartAveragePB';
import ChartAveragePE from '../../components/FinancialHealth/Chart/ChartAveragePE';
import ChartMiningProfitMargin from '../../components/FinancialHealth/Chart/ChartMiningProfitMargin';
import CurrentPayoutRatio from '../../components/FinancialHealth/Chart/CurrentPayoutRatio';
import EquityTurnover from '../../components/FinancialHealth/Chart/EquityTurnover';
import FixedAssetTurnover from '../../components/FinancialHealth/Chart/FixedAssetTurnover';
import InterestCoverageRatio from '../../components/FinancialHealth/Chart/InterestCoverageRatio';
import MoneyWheel from '../../components/FinancialHealth/Chart/MoneyWheel';
import NetProfitMargin from '../../components/FinancialHealth/Chart/NetProfitMargin';
import QuickPayoutRatio from '../../components/FinancialHealth/Chart/QuickPayoutRatio';
import TotalAssetTurnover from '../../components/FinancialHealth/Chart/TotalAssetTurnover';
import FinancialHealthOverview from '../../components/FinancialHealth/Table/FinancialHealthOverview';
import TableAverageDebtRatio from '../../components/FinancialHealth/Table/TableAverageDebtRatio';
import TableAveragePB from '../../components/FinancialHealth/Table/TableAveragePB';
import TableAveragePE from '../../components/FinancialHealth/Table/TableAveragePE';
import TableMiningProfitMargin from '../../components/FinancialHealth/Table/TableMiningProfitMargin';
import Checkbox from '../../HOCs/Checkbox';
import {
  fetchDataChartAssetTurnoverRatio,
  fetchDataChartAverageDebitIndustry,
  fetchDataChartAveragePB,
  fetchDataChartAveragePE,
  fetchDataChartCashPayoutRatio,
  fetchDataChartInterestCoverageRatio,
  fetchDataChartMiningProfitMargin,
  fetchDataChartPayoutRatio,
  fetchDataTableAverageDebtRatio,
} from '../../thunk';

const FinancialHealth = () => {
  const dispatch = useDispatch()
  const { dataQuery } = useSelector(state => state.market)
  const [exchange, setExchange] = useState("all")
  const [type, setType] = useState("8")
  const [order, setOrder] = useState("0")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true)
    }, 700)
  }, [])

  useEffect(() => {
    if (dataQuery) {
      const { exchange, type, order } = dataQuery
      setExchange(exchange)
      setType(type)
      setOrder(order)
    }
  }, [dataQuery])

  useEffect(() => {
    dispatch(fetchDataChartAveragePE(exchange, type, order))
    dispatch(fetchDataChartAveragePB(exchange, type, order))
    dispatch(fetchDataChartPayoutRatio(exchange, order))
    dispatch(fetchDataChartCashPayoutRatio(exchange, order))
    dispatch(fetchDataChartAssetTurnoverRatio(exchange, order))
    dispatch(fetchDataTableAverageDebtRatio(exchange, order))
    dispatch(fetchDataChartMiningProfitMargin(exchange, type, order))
    dispatch(fetchDataChartInterestCoverageRatio(exchange, type, order))
    dispatch(fetchDataChartAverageDebitIndustry(exchange, type, order))
  }, [dispatch, exchange, type, order])


  return (
    <div className='container mx-auto mt-2 md:w-[90%] lg:w-[90%] xl:w-full'>
      <Checkbox />
      {/* component */}
      {isLoading ? (
        <div>
          <div className='grid xl:grid-cols-2 lg:grid-cols-none'>
            <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
              <div>
                <ChartAveragePE />
              </div>
            </div>
            <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
              <div>
                <ChartAveragePB />
              </div>
            </div>
          </div>
          <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
              <span className='dark:text-white text-black font-semibold xs:text-base xxs:text-sm'>Tổng quan sức khỏe tài chính các ngành (%)</span>
            </div>
            <div>
              <FinancialHealthOverview exchange={exchange} />
            </div>
          </div>

          <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
            <div className='grid md:grid-cols-3 sm:grid-cols-none gap-3'>
              <div>
                <CurrentPayoutRatio />
              </div>
              <div>
                <QuickPayoutRatio />
              </div>
              <div>
                <CashPayoutRatio />
              </div>
            </div>
          </div>

          <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
            <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-3'>
              <div>
                <div>
                  <ChartAverageDebtRatio />
                </div>
              </div>
              <div>
                <InterestCoverageRatio />
              </div>
            </div>
          </div>

          <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
            <div className='grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-none gap-3'>
              <div>
                <FixedAssetTurnover />
              </div>

              <div>
                <MoneyWheel />
              </div>

              <div>
                <TotalAssetTurnover />
              </div>

              <div>
                <EquityTurnover />
              </div>
            </div>
          </div>

          <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
            <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-3'>
              <div>
                <div>
                  <ChartMiningProfitMargin />
                </div>
                <hr />
                <div className='h-[300px]'>
                  <TableMiningProfitMargin exchange={exchange} />
                </div>
              </div>
              <div>
                <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                  <span className='dark:text-white text-black font-semibold'>Tỷ suất lợi nhuận ròng các ngành (%)</span>
                </div>
                <NetProfitMargin />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='h-[300px] flex items-center justify-center'><Loading /></div>
      )}
    </div>
  );
};

export default FinancialHealth;
