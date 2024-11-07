import React, { useEffect, useState } from "react";
import {
  hashTb_CTCP_BH_CK,
  hashTbToFilterData,
} from "../utils/hashTbStock/hashTb";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataChartFinancialIndicators } from "../../../../thunk";
import Loading from "../../../../../Chart/utils/Loading";

const ChartBHFinancialIndicators = ({ queryApiBusinessFinance }) => {
  const dispatch = useDispatch();
  const { dataChartFinancialIndicators } = useSelector((state) => state.stock);
  const [timeLine, setTimeLine] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    dispatch(
      fetchDataChartFinancialIndicators(
        queryApiBusinessFinance.stock,
        queryApiBusinessFinance.order,
      ),
    );
  }, [dispatch, queryApiBusinessFinance]);

  useEffect(() => {
    if (dataChartFinancialIndicators?.length > 0) {
      let modifiedArray;

      if (queryApiBusinessFinance.order === "0") {
        modifiedArray = dataChartFinancialIndicators.map((item) => {
          const year = item.date.slice(0, 4);
          const quarter = item.date.slice(4);

          return { ...item, date: `Quý ${quarter}/${year}` };
        });
      } else {
        modifiedArray = dataChartFinancialIndicators.map((item) => {
          return { ...item, date: `Năm ${item.date}` };
        });
      }

      const uniqueDates = [...new Set(modifiedArray?.map((item) => item.date))];
      setTimeLine(uniqueDates);

      const result = [];

      modifiedArray?.forEach((item) => {
        const name = item.name;
        const value = +item.value.toFixed(2);
        const color = item.color;

        const existingObj = result.find((obj) => obj.name === name);

        if (existingObj) {
          existingObj.data.push(value);
        } else {
          result.push({
            name: name,
            data: [value],
            color,
          });
        }
      });
      setData(result);
    }
  }, [dataChartFinancialIndicators, queryApiBusinessFinance]);

  return (
    <div>
      {data?.length > 0 ? (
        <Swiper slidesPerView={1} navigation={true} modules={[Navigation]}>
          {hashTb_CTCP_BH_CK.map((slideObj, index) => {
            const Component = slideObj.component;
            const componentLabels = slideObj.labels;
            const filteredData = data?.filter((item) =>
              componentLabels.includes(hashTbToFilterData[item.name]),
            );
            return (
              <SwiperSlide key={index}>
                <Component
                  key={index}
                  time={timeLine}
                  data={filteredData}
                  labels={componentLabels}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <div className="h-[300px] flex items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default ChartBHFinancialIndicators;
