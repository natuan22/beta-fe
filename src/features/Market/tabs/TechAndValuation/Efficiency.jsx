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
import { useDispatch, useSelector } from 'react-redux'
import Checkbox from '../../HOCs/Checkbox'
import {
  fetchDataChartCashDividendGrowth,
  fetchDataChartChangesPrice,
  fetchDataChartEBITDAGrowth,
  fetchDataChartEPSGrowth,
  fetchDataChartEquityGrowth,
  fetchDataChartGrossProfitGrowth,
  fetchDataChartLiabilitiesGrowth,
  fetchDataChartLiquidityGrowth,
  fetchDataChartNetRevenueGrowth,
  fetchDataChartOperatingProfitGrowth,
  fetchDataTableChangesPrice,
  fetchDataTableEquityGrowth,
  fetchDataTableLiabilitiesGrowth,
  fetchDataTableLiquidityGrowth
} from '../../thunk'

const Efficiency = () => {
  const dispatch = useDispatch()
  const { dataQuery } = useSelector(state => state.market)
  const [exchange, setExchange] = useState("all")
  const [type, setType] = useState("8")
  const [order, setOrder] = useState("0")
  const [industryQuery, setIndustryQuery] = useState('batDongSan')

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
    dispatch(fetchDataChartLiquidityGrowth(exchange, type, order))
    dispatch(fetchDataChartChangesPrice(exchange, type, order))
    dispatch(fetchDataChartEquityGrowth(exchange, type, order))
    dispatch(fetchDataChartLiabilitiesGrowth(exchange, type, order))
    dispatch(fetchDataChartEPSGrowth(exchange, type, order))
    dispatch(fetchDataChartCashDividendGrowth(exchange, type, order))
    dispatch(fetchDataChartOperatingProfitGrowth(exchange, type, order))
    dispatch(fetchDataChartEBITDAGrowth(exchange, type, order))
    dispatch(fetchDataChartGrossProfitGrowth(exchange, type, order))
    dispatch(fetchDataChartNetRevenueGrowth(exchange, type, order))
  }, [exchange, type, order])

  useEffect(() => {
    dispatch(fetchDataTableChangesPrice(exchange, industryQuery));
    dispatch(fetchDataTableLiquidityGrowth(exchange, industryQuery));
    dispatch(fetchDataTableEquityGrowth(exchange, industryQuery));
    dispatch(fetchDataTableLiabilitiesGrowth(exchange, industryQuery));
  }, [exchange, industryQuery])

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
                <ChartChangesPrice industryQuery={industryQuery} />
              </div>
              <hr />
              <TableChangesPrice />
            </div>
            <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
              <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold xs:text-base xxs:text-sm'>Tăng trưởng thanh khoản của các ngành (%)</span>
              </div>
              <div>
                <ChartLiquidityGrowth industryQuery={industryQuery} />
              </div>
              <hr />
              <TableLiquidityGrowth />
            </div>
            <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
              <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold xs:text-base xxs:text-sm'>Tăng trưởng vốn chủ sở hữu của các ngành (%)</span>
              </div>
              <div>
                <ChartEquityGrowth industryQuery={industryQuery} />
              </div>
              <hr />
              <TableEquityGrowth />
            </div>
            <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
              <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold xs:text-base xxs:text-sm'>Tăng trưởng nợ phải trả của các ngành (%)</span>
              </div>
              <div>
                <ChartLiabilitiesGrowth industryQuery={industryQuery} />
              </div>
              <hr />
              <TableLiabilitiesGrowth />
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
                <ChartNetRevenueGrowth industryQuery={industryQuery} />
              </div>
            </div>
            <div>
              <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold'>Tăng trưởng lợi nhuận gộp các ngành qua từng kỳ (%)</span>
              </div>
              <div>
                <ChartGrossProfitGrowth industryQuery={industryQuery} />
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
                <ChartEBITDAGrowth industryQuery={industryQuery} />
              </div>
            </div>
            <div>
              <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold'>Tăng trưởng lợi nhuận hoạt động các ngành qua từng kỳ (%)</span>
              </div>
              <div>
                <ChartOperatingProfitGrowth industryQuery={industryQuery} />
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
                <ChartCashDividendGrowth industryQuery={industryQuery} />
              </div>
            </div>
            <div>
              <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold'>Tăng trưởng EPS các ngành qua từng kỳ (%)</span>
              </div>
              <div>
                <ChartEPSGrowth industryQuery={industryQuery} />
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Efficiency



