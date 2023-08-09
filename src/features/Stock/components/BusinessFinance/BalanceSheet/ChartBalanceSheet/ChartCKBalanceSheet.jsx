import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getColorByIndex } from '../../../../../Chart/utils/utils'
import { fetchDataChartBalanceSheet, fetchDataChartPieBalanceSheet } from '../../../../thunk'
import ChartColumn from '../../components/ChartColumn'
import ChartPie from '../../components/ChartPie'

const ChartCKBalanceSheet = ({ queryApiBusinessFinance }) => {
  const dispatch = useDispatch()
  const { dataChartBalanceSheet, dataChartPieBalanceSheet } = useSelector(state => state.stock)
  const [timeLine, setTimeLine] = useState()
  const [data, setData] = useState()
  const [dataPie, setDataPie] = useState()

  useEffect(() => {
    dispatch(fetchDataChartBalanceSheet(queryApiBusinessFinance.stock, queryApiBusinessFinance.order))
    dispatch(fetchDataChartPieBalanceSheet(queryApiBusinessFinance.stock, queryApiBusinessFinance.order))
  }, [dispatch, queryApiBusinessFinance])

  useEffect(() => {
    if (dataChartBalanceSheet?.length > 0) {
      let modifiedArray;

      if (queryApiBusinessFinance.order === '0') {
        modifiedArray = dataChartBalanceSheet.map(item => {
          const year = item.date.slice(0, 4);
          const quarter = item.date.slice(4);

          return { ...item, date: `Quý ${quarter}/${year}` };
        });
      } else {
        modifiedArray = dataChartBalanceSheet.map(item => {
          return { ...item, date: `Năm ${item.date}` };
        });
      }

      const uniqueDates = [...new Set(modifiedArray?.map(item => item.date))];
      setTimeLine(uniqueDates)

      const result = [];

      modifiedArray?.forEach(item => {
        const name = item.name;
        const value = +(item.value / queryApiBusinessFinance.unit).toFixed(2);
        const color = item.color;

        const existingObj = result.find(obj => obj.name === name);

        if (existingObj) {
          existingObj.data.push(value);
        } else {
          result.push({
            name: name,
            data: [value],
            color
          });
        }
      })
      setData(result)
    }
  }, [dataChartBalanceSheet, queryApiBusinessFinance])

  useEffect(() => {
    if (dataChartPieBalanceSheet?.length > 0) {
      let modifiedArray;

      if (queryApiBusinessFinance.order === '0') {
        modifiedArray = dataChartPieBalanceSheet.map(item => {
          const year = item.date.slice(0, 4);
          const quarter = item.date.slice(4);

          return { ...item, date: `Quý ${quarter}/${year}` };
        });
      } else {
        modifiedArray = dataChartPieBalanceSheet.map(item => {
          return { ...item, date: `Năm ${item.date}` };
        });
      }

      const danhSachMoi = modifiedArray.map((item, index) => ({
        name: item.name,
        y: +item.value.toFixed(2),
        color: getColorByIndex(index)
      }));
      setDataPie(danhSachMoi)
    }
  }, [dataChartPieBalanceSheet, queryApiBusinessFinance])
  return (
    <div>
      <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-3'>
        <div>
          <div className='dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5'>Tỷ trọng trên tổng tài sản</div>
          <ChartPie data={Array.isArray(dataPie) && dataPie.slice(0, 2)} />
        </div>
        <div>
          <div className='dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5'>Tỷ trọng trên tổng nguồn vốn</div>
          <ChartPie data={Array.isArray(dataPie) && dataPie.slice(2, 4)} />
        </div>
        <div>
          <div className='dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5'>Tài sản tài chính ngắn hạn</div>
          <ChartColumn data={Array.isArray(data) && data.slice(0, 1)} timeLine={timeLine} />
        </div>
        <div>
          <div className='dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5'>Tài sản tài chính dài hạn</div>
          <ChartColumn data={Array.isArray(data) && data.slice(1, 2)} timeLine={timeLine} />
        </div>
        <div>
          <div className='dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5'>Nợ phải trả</div>
          <ChartColumn data={Array.isArray(data) && data.slice(2, 3)} timeLine={timeLine} />
        </div>
        <div>
          <div className='dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5'>Vốn chủ sở hữu</div>
          <ChartColumn data={Array.isArray(data) && data.slice(3, 4)} timeLine={timeLine} />
        </div>
      </div>
    </div>
  )
}

export default ChartCKBalanceSheet