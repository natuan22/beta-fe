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
} from '../../thunk'
import Loading from '../../../Chart/utils/Loading'

const Efficiency = () => {
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
      const { exchange, type, order } = dataQuery
      setExchange(exchange)
      setType(type)
      setOrder(order)
    }
  }, [dataQuery])

  useEffect(() => {
    dispatch(fetchDataChartChangesPrice(exchange, type, order))
    dispatch(fetchDataChartLiquidityGrowth(exchange, type, order))
    dispatch(fetchDataChartEquityGrowth(exchange, type, order))
    dispatch(fetchDataChartLiabilitiesGrowth(exchange, type, order))
    dispatch(fetchDataChartNetRevenueGrowth(exchange, type, order))
    dispatch(fetchDataChartGrossProfitGrowth(exchange, type, order))
    dispatch(fetchDataChartEBITDAGrowth(exchange, type, order))
    dispatch(fetchDataChartOperatingProfitGrowth(exchange, type, order))
    dispatch(fetchDataChartCashDividendGrowth(exchange, type, order))
    dispatch(fetchDataChartEPSGrowth(exchange, type, order))
  }, [dispatch, exchange, type, order])



  return (
    <div className='container mx-auto mt-2 xl:w-full lg:w-[90%] md:w-[90%]'>
      <Checkbox />
      {/* component */}
      {isLoading ? (
        <div>
          <div>
            <div className='grid xl:grid-cols-2 lg:grid-cols-none'>
              <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
                <ChartChangesPrice />
              </div>
              <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
                <ChartLiquidityGrowth />
              </div>
              <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
                <ChartEquityGrowth />
              </div>
              <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
                <ChartLiabilitiesGrowth />
              </div>
            </div>
          </div>

          <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
            <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-3'>
              <div>
                <ChartNetRevenueGrowth />
              </div>
              <div>
                <ChartGrossProfitGrowth />
              </div>
            </div>
          </div>

          <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
            <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-3'>
              <div>
                <ChartEBITDAGrowth />
              </div>
              <div>
                <ChartOperatingProfitGrowth />
              </div>
            </div>
          </div>

          <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
            <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-3'>
              <div>
                <ChartCashDividendGrowth />
              </div>
              <div>

                <div>
                  <ChartEPSGrowth />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='h-[300px] flex items-center justify-center'><Loading /></div>
      )}
    </div>
  )
}

export default Efficiency



