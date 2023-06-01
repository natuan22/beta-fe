import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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

const FinancialHealth = () => {
  const [exchange, setExchange] = useState("all")
  const [timeFrame, setTimeFrame] = useState("8")
  const [order, setOrder] = useState("0")
  const [industryQuery, setIndustryQuery] = useState('batDongSan,taiChinh,hangHoa,nganHang,taiNguyen,xayDung')
  const { dataQuery } = useSelector(state => state.market)

  useEffect(() => {
    if (dataQuery) {
      setExchange(dataQuery.exchange)
      setTimeFrame(dataQuery.timeFrame)
      setOrder(dataQuery.order)
      setIndustryQuery(dataQuery.industryQuery)
    }
  }, [dataQuery])

  return (
    <div className='container mx-auto mt-2 xl:w-full lg:w-[90%] md:w-[90%]'>
      <Checkbox />

      <div>
        <div className='grid grid-cols-2'>
          <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
              <span className='dark:text-white text-black font-semibold'>Diễn biến P/E bình quân các nhóm ngành (lần)</span>
            </div>
            <div>
              <ChartAveragePE exchange={exchange} industryQuery={industryQuery} order={order} timeFrame={timeFrame} />
            </div>
            <hr />
            <TableAveragePE exchange={exchange} industryQuery={industryQuery} />
          </div>
          <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
              <span className='dark:text-white text-black font-semibold'>Diễn biến P/B bình quân các nhóm ngành (lần)</span>
            </div>
            <div className='h-[300px]'>
              <ChartAveragePB exchange={exchange} industryQuery={industryQuery} order={order} timeFrame={timeFrame} />
            </div>
            <hr />
            <TableAveragePB exchange={exchange} industryQuery={industryQuery} />
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
          <div className='grid grid-cols-3 gap-5'>
            <div>
              <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold'>Tỷ số thanh toán hiện hành (Lần)</span>
              </div>
              <div className='h-[300px]'>
                <CurrentPayoutRatio exchange={exchange} industryQuery={industryQuery} order={order} timeFrame={timeFrame} />
              </div>
            </div>
            <div>
              <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold'>Tỷ số thanh toán nhanh (Lần)</span>
              </div>
              <div className='h-[300px]'>
                <QuickPayoutRatio exchange={exchange} industryQuery={industryQuery} order={order} timeFrame={timeFrame} />
              </div>
            </div>
            <div>
              <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold'>Tỷ số thanh toán tiền mặt (Lần)</span>
              </div>
              <div className='h-[300px]'>
                <CashPayoutRatio exchange={exchange} industryQuery={industryQuery} order={order} timeFrame={timeFrame} />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
          <div className='grid grid-cols-2 gap-5'>
            <div>
              <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold'>Lãi suất vay nợ bình quân của các ngành (%)</span>
              </div>
              <div className='h-[300px]'>
                <ChartAverageDebtRatio exchange={exchange} industryQuery={industryQuery} order={order} timeFrame={timeFrame} />
              </div>
              <hr />
              <div className='h-[300px]'>
                <TableAverageDebtRatio exchange={exchange} industryQuery={industryQuery} />
              </div>
            </div>
            <div>
              <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold'>Hệ số thanh toán lãi vay nợ bình quân của các ngành (%)</span>
              </div>

              <InterestCoverageRatio exchange={exchange} industryQuery={industryQuery} order={order} timeFrame={timeFrame} />
            </div>
          </div>
        </div>

        <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
          <div className='grid grid-cols-4 gap-5'>
            <div>
              <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold'>Vòng quay Tài sản cố định (Lần)</span>
              </div>
              <div className='h-[300px]'>
                <FixedAssetTurnover exchange={exchange} industryQuery={industryQuery} order={order} timeFrame={timeFrame} />
              </div>
            </div>

            <div>
              <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold'>Vòng quay Tiền (Lần)</span>
              </div>
              <div className='h-[300px]'>
                <MoneyWheel exchange={exchange} industryQuery={industryQuery} order={order} timeFrame={timeFrame} />
              </div>
            </div>

            <div>
              <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold'>Vòng quay Tổng tài sản (Lần)</span>
              </div>
              <div className='h-[300px]'>
                <TotalAssetTurnover exchange={exchange} industryQuery={industryQuery} order={order} timeFrame={timeFrame} />
              </div>
            </div>

            <div>
              <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold'>Vòng quay Vốn chủ sở hữu (Lần)</span>
              </div>
              <div className='h-[300px]'>
                <EquityTurnover exchange={exchange} industryQuery={industryQuery} order={order} timeFrame={timeFrame} />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
          <div className='grid grid-cols-2 gap-5'>
            <div>
              <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold'>Tỷ suất lợi nhuận gộp biên các ngành  (%)</span>
              </div>
              <div className='h-[300px]'>
                <ChartMiningProfitMargin exchange={exchange} industryQuery={industryQuery} order={order} timeFrame={timeFrame} />
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
              <NetProfitMargin exchange={exchange} industryQuery={industryQuery} order={order} timeFrame={timeFrame} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialHealth;
