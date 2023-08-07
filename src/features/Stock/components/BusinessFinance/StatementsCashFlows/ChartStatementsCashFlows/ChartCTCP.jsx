import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataChartStatementsCashFlows } from '../../../../thunk';
import ChartColumn from '../../components/ChartColumn';

const ChartCTCP = ({ queryApiBusinessFinance }) => {
  const dispatch = useDispatch()
  const { dataChartStatementsCashFlows } = useSelector(state => state.stock)
  const [timeLine, setTimeLine] = useState()
  const [data, setData] = useState()

  useEffect(() => {
    dispatch(fetchDataChartStatementsCashFlows(queryApiBusinessFinance.stock, queryApiBusinessFinance.order))
  }, [dispatch, queryApiBusinessFinance])

  useEffect(() => {
    if (dataChartStatementsCashFlows?.length > 0) {
      let modifiedArray;

      if (queryApiBusinessFinance.order === '0') {
        modifiedArray = dataChartStatementsCashFlows.map(item => {
          const modifiedName = `${item.name.trim().charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()}`;
          const year = item.date.slice(0, 4);
          const quarter = item.date.slice(4);

          return { ...item, name: modifiedName, date: `Quý ${quarter}/${year}` };
        });
      } else {
        modifiedArray = dataChartStatementsCashFlows.map(item => {
          const modifiedName = `${item.name.trim().charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()}`;
          return { ...item, name: modifiedName, date: `Năm ${item.date}` };
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
  }, [dataChartStatementsCashFlows, queryApiBusinessFinance])

  return (
    <div>
      <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-3'>
        <div>
          <div className='dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5'>Lưu chuyển tiền thuần từ hoạt động kinh doanh</div>
          <ChartColumn data={Array.isArray(data) && data.slice(0, 1)} timeLine={timeLine} />
        </div>
        <div>
          <div className='dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5'>Lưu chuyển tiền thuần từ hoạt động đầu tư</div>
          <ChartColumn data={Array.isArray(data) && data.slice(1, 2)} timeLine={timeLine} />
        </div>
        <div>
          <div className='dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5'>Lưu chuyển tiền thuần từ hoạt động tài chính</div>
          <ChartColumn data={Array.isArray(data) && data.slice(2, 3)} timeLine={timeLine} />
        </div>
        <div>
          <div className='dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5'>Lưu chuyển tiền thuần trong kỳ</div>
          <ChartColumn data={Array.isArray(data) && data.slice(3, 4)} timeLine={timeLine} />
        </div>
        <div>
          <div className='dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5'>Tiền và tương đương tiền đầu kỳ</div>
          <ChartColumn data={Array.isArray(data) && data.slice(4, 5)} timeLine={timeLine} />
        </div>
        <div>
          <div className='dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5'>Tiền và tương đương tiền cuối kỳ</div>
          <ChartColumn data={Array.isArray(data) && data.slice(5, 6)} timeLine={timeLine} />
        </div>
      </div>
    </div>
  )
}

export default ChartCTCP