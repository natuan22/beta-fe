import React, { useEffect, useState } from 'react';
import { hashTb_CTCP_BH_CK } from '../utils/hashTbStock/hashTb';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataChartFinancialIndicators } from '../../../../thunk';

const ChartCTCPFinancialIndicators = ({ queryApiBusinessFinance }) => {
  const dispatch = useDispatch()
  const { dataChartFinancialIndicators } = useSelector(state => state.stock)
  const [timeLine, setTimeLine] = useState()
  const [data, setData] = useState()

  useEffect(() => {
    dispatch(fetchDataChartFinancialIndicators(queryApiBusinessFinance.stock, queryApiBusinessFinance.order))
  }, [dispatch, queryApiBusinessFinance])

  useEffect(() => {
    if (dataChartFinancialIndicators?.length > 0) {
      let modifiedArray;

      if (queryApiBusinessFinance.order === '0') {
        modifiedArray = dataChartFinancialIndicators.map(item => {
          const year = item.date.slice(0, 4);
          const quarter = item.date.slice(4);

          return { ...item, date: `Quý ${quarter}/${year}` };
        });
      } else {
        modifiedArray = dataChartFinancialIndicators.map(item => {
          return { ...item, date: `Năm ${item.date}` };
        });
      }

      const uniqueDates = [...new Set(modifiedArray?.map(item => item.date))];
      setTimeLine(uniqueDates)

      const result = [];

      modifiedArray?.forEach(item => {
        const name = item.name;
        const value = +(item.value).toFixed(2);
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
  }, [dataChartFinancialIndicators, queryApiBusinessFinance])

  return (
    <div>
      <div className='text-white mt-8'>
        <Swiper
          slidesPerView={2}
          navigation={true}
          modules={[Navigation]}
        >
          {hashTb_CTCP_BH_CK.map((slideObj, index) => {

            const Component = slideObj.component; // Lấy tên component từ slideObj
            const componentLabels = slideObj.labels;

            return (
              <SwiperSlide key={index}>
                <Component key={index} data={data} labels={componentLabels} />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default ChartCTCPFinancialIndicators;
