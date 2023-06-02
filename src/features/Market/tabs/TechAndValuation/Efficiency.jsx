import React, { useEffect, useState } from 'react'
import ChartCashDividendGrowth from '../../components/Efficiency/Chart/ChartCashDividendGrowth'
import ChartChangesPrice from '../../components/Efficiency/Chart/ChartChangesPrice'
import ChartEBITDAGrowth from '../../components/Efficiency/Chart/ChartEBITDAGrowth'
import ChartEPSGrowth from '../../components/Efficiency/Chart/ChartEPSGrowth'
import ChartEquityGrowth from '../../components/Efficiency/Chart/ChartEquityGrowth'
import ChartGrossProfitGrowth from '../../components/Efficiency/Chart/ChartGrossProfitGrowth'
import ChartLiabilitiesGrowth from '../../components/Efficiency/Chart/ChartLiabilitiesGrowth'
import ChartLiquidityGrowth from '../../components/Efficiency/Chart/ChartLiquidityGrowth'
import ChartNetRevenueGrowth from '../../components/Efficiency/Chart/ChartNetRevenueGrowth'
import ChartOperatingProfitGrowth from '../../components/Efficiency/Chart/ChartOperatingProfitGrowth'
import TableChangesPrice from '../../components/Efficiency/Table/TableChangesPrice'
import TableEquityGrowth from '../../components/Efficiency/Table/TableEquityGrowth'
import TableLiabilitiesGrowth from '../../components/Efficiency/Table/TableLiabilitiesGrowth'
import TableLiquidityGrowth from '../../components/Efficiency/Table/TableLiquidityGrowth'
import '../../utils/checkBox.css'
import { useSelector } from 'react-redux'
import Checkbox from '../../HOCs/Checkbox'

const Efficiency = () => {
  const { dataQuery } = useSelector(state => state.market)
  const [exchange, setExchange] = useState("all")
  const [timeFrame, setTimeFrame] = useState("8")
  const [order, setOrder] = useState("0")
  const [industryQuery, setIndustryQuery] = useState('batDongSan')

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
      {/* component */}
      <div>
        <div>
          <div className='grid xl:grid-cols-2 lg:grid-cols-none'>
            <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
              <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0 mt-1'>
                <span className='dark:text-white text-black font-semibold'>Thay đổi giá của các ngành (%)</span>
              </div>
              <div>
                <ChartChangesPrice exchange={exchange} industryQuery={industryQuery} order={order} timeFrame={timeFrame} />
              </div>
              <hr />
              <TableChangesPrice exchange={exchange} industryQuery={industryQuery} />
            </div>
            <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
              <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold xs:text-base xxs:text-sm'>Tăng trưởng thanh khoản của các ngành (%)</span>
              </div>
              <div>
                <ChartLiquidityGrowth exchange={exchange} industryQuery={industryQuery} order={order} timeFrame={timeFrame} />
              </div>
              <hr />
              <TableLiquidityGrowth exchange={exchange} industryQuery={industryQuery} />
            </div>
            <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
              <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold xs:text-base xxs:text-sm'>Tăng trưởng vốn chủ sở hữu của các ngành (%)</span>
              </div>
              <div>
                <ChartEquityGrowth exchange={exchange} industryQuery={industryQuery} order={order} timeFrame={timeFrame} />
              </div>
              <hr />
              <TableEquityGrowth exchange={exchange} industryQuery={industryQuery} />
            </div>
            <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
              <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold xs:text-base xxs:text-sm'>Tăng trưởng nợ phải trả của các ngành (%)</span>
              </div>
              <div>
                <ChartLiabilitiesGrowth exchange={exchange} industryQuery={industryQuery} order={order} timeFrame={timeFrame} />
              </div>
              <hr />
              <TableLiabilitiesGrowth exchange={exchange} industryQuery={industryQuery} />
            </div>
          </div>
        </div>

        <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
          <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-5'>
            <div>
              <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold'>Tăng trưởng doanh thu thuần của các ngành qua từng kỳ (%)</span>
              </div>
              <div>
                <ChartNetRevenueGrowth exchange={exchange} industryQuery={industryQuery} order={order} timeFrame={timeFrame} />
              </div>
            </div>
            <div>
              <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold'>Tăng trưởng lợi nhuận gộp các ngành qua từng kỳ (%)</span>
              </div>
              <div>
                <ChartGrossProfitGrowth exchange={exchange} industryQuery={industryQuery} order={order} timeFrame={timeFrame} />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
          <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-5'>
            <div>
              <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold'>Tăng trưởng EBITDA của các ngành qua từng kỳ (%)</span>
              </div>
              <div>
                <ChartEBITDAGrowth exchange={exchange} industryQuery={industryQuery} order={order} timeFrame={timeFrame} />
              </div>
            </div>
            <div>
              <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold'>Tăng trưởng lợi nhuận hoạt động các ngành qua từng kỳ (%)</span>
              </div>
              <div>
                <ChartOperatingProfitGrowth exchange={exchange} industryQuery={industryQuery} order={order} timeFrame={timeFrame} />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
          <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-5'>
            <div>
              <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold'>Tăng trưởng cổ tức tiền mặt của các ngành qua từng kỳ (%)</span>
              </div>
              <div>
                <ChartCashDividendGrowth exchange={exchange} industryQuery={industryQuery} order={order} timeFrame={timeFrame} />
              </div>
            </div>
            <div>
              <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold'>Tăng trưởng EPS các ngành qua từng kỳ (%)</span>
              </div>
              <div>
                <ChartEPSGrowth exchange={exchange} industryQuery={industryQuery} order={order} timeFrame={timeFrame} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Efficiency



