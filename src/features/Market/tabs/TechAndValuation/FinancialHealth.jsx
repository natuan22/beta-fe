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
  fetchDataChartAveragePB,
  fetchDataChartAveragePE,
  fetchDataChartCashPayoutRatio,
  fetchDataChartInterestCoverageRatio,
  fetchDataChartMiningProfitMargin,
  fetchDataChartPayoutRatio,
  fetchDataTableAverageDebtRatio,
  fetchDataTableAveragePB,
  fetchDataTableAveragePE
} from '../../thunk';

const FinancialHealth = () => {
  const dispatch = useDispatch()
  const { dataQuery } = useSelector(state => state.market)
  const [exchange, setExchange] = useState("all")
  const [type, setType] = useState("8")
  const [order, setOrder] = useState("0")
  const [industryQuery, setIndustryQuery] = useState('batDongSan')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true)
    }, 700)
  }, [])

  useEffect(() => {
    if (dataQuery) {
      const { exchange, type, order, industryQuery } = dataQuery
      setExchange(exchange)
      setType(type)
      setOrder(order)
      setIndustryQuery(industryQuery)
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
  }, [dispatch, exchange, type, order])

  useEffect(() => {
    dispatch(fetchDataTableAveragePE(exchange, industryQuery));
    dispatch(fetchDataTableAveragePB(exchange, industryQuery));
  }, [dispatch, exchange, industryQuery])

  return (
    <div className='container mx-auto mt-2 xl:w-full lg:w-[90%] md:w-[90%]'>
      <Checkbox />
      {/* component */}
      {isLoading ? (

        <div>
          <div className='grid xl:grid-cols-2 lg:grid-cols-none'>
            <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
              <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold'>Diễn biến P/E bình quân các nhóm ngành (lần)</span>
              </div>
              <div>
                <ChartAveragePE industryQuery={industryQuery} />
              </div>
              <hr />
              <TableAveragePE />
            </div>
            <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
              <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold'>Diễn biến P/B bình quân các nhóm ngành (lần)</span>
              </div>
              <div>
                <ChartAveragePB industryQuery={industryQuery} />
              </div>
              <hr />
              <TableAveragePB />
            </div>
          </div>
          <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
              <span className='dark:text-white text-black font-semibold'>Tổng quan sức khỏe tài chính các ngành (%)</span>
            </div>
            <div className='h-[300px]'>
              <FinancialHealthOverview exchange={exchange} industryQuery={industryQuery} />
            </div>
          </div>

          <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
            <div className='grid md:grid-cols-3 sm:grid-cols-none gap-3'>
              <div>
                <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                  <span className='dark:text-white text-black font-semibold lg:text-base md:text-sm'>Tỷ số thanh toán hiện hành (Lần)</span>
                </div>
                <CurrentPayoutRatio industryQuery={industryQuery} />
              </div>
              <div>
                <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                  <span className='dark:text-white text-black font-semibold lg:text-base md:text-sm'>Tỷ số thanh toán nhanh (Lần)</span>
                </div>
                <QuickPayoutRatio industryQuery={industryQuery} />
              </div>
              <div>
                <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                  <span className='dark:text-white text-black font-semibold lg:text-base md:text-sm'>Tỷ số thanh toán tiền mặt (Lần)</span>
                </div>
                <CashPayoutRatio industryQuery={industryQuery} />
              </div>
            </div>
          </div>

          <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
            <div className='grid grid-cols-2 gap-3'>
              <div>
                <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                  <span className='dark:text-white text-black font-semibold'>Lãi suất vay nợ bình quân của các ngành (%)</span>
                </div>
                <div className='h-[300px]'>
                  <ChartAverageDebtRatio industryQuery={industryQuery} />
                </div>
                <hr />
                <TableAverageDebtRatio />
              </div>
              <div>
                <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                  <span className='dark:text-white text-black font-semibold'>Hệ số thanh toán lãi vay nợ bình quân của các ngành (%)</span>
                </div>
                <InterestCoverageRatio industryQuery={industryQuery} />
              </div>
            </div>
          </div>

          <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
            <div className='grid lg:grid-cols-4 gap-3 md:grid-cols-2'>
              <div>
                <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                  <span className='dark:text-white text-black font-semibold xl:text-base lg:text-sm'>Vòng quay Tài sản cố định (Lần)</span>
                </div>
                <FixedAssetTurnover industryQuery={industryQuery} />
              </div>

              <div>
                <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                  <span className='dark:text-white text-black font-semibold xl:text-base lg:text-sm'>Vòng quay Tiền (Lần)</span>
                </div>
                <MoneyWheel industryQuery={industryQuery} />
              </div>

              <div>
                <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                  <span className='dark:text-white text-black font-semibold xl:text-base lg:text-sm'>Vòng quay Tổng tài sản (Lần)</span>
                </div>
                <TotalAssetTurnover industryQuery={industryQuery} />
              </div>

              <div>
                <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                  <span className='dark:text-white text-black font-semibold xl:text-base lg:text-sm'>Vòng quay Vốn chủ sở hữu (Lần)</span>
                </div>
                <EquityTurnover industryQuery={industryQuery} />
              </div>
            </div>
          </div>

          <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
            <div className='grid grid-cols-2 gap-3'>
              <div>
                <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                  <span className='dark:text-white text-black font-semibold'>Tỷ suất lợi nhuận gộp biên các ngành  (%)</span>
                </div>
                <div>
                  <ChartMiningProfitMargin industryQuery={industryQuery} />
                </div>
                <hr />
                <div className='h-[300px]'>
                  <TableMiningProfitMargin exchange={exchange} industryQuery={industryQuery} />
                </div>
              </div>
              <div>
                <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                  <span className='dark:text-white text-black font-semibold'>Tỷ suất lợi nhuận ròng các ngành (%)</span>
                </div>
                <NetProfitMargin industryQuery={industryQuery} />
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
