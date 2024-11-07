import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../Chart/utils/Loading";
import { fetchDataTableChangesPrice } from "../../../thunk";
import FilterIndusty from "../../../utils/components/FilterIndusty";
import { hashTb } from "../../utils/hashTb";
import TableChangesPrice from "../Table/TableChangesPrice";

const ChartChangesPrice = () => {
  const dispatch = useDispatch();
  const { dataChartChangesPrice, dataQuery } = useSelector(
    (state) => state.market,
  );
  const { exchange } = dataQuery;
  const [data, setData] = useState();
  const [timeLine, setTimeLine] = useState();
  const [industryQuery, setIndustryQuery] = useState([]);
  const [colorText, setColorText] = useState(localStorage.getItem("color"));
  const color = useSelector((state) => state.color.colorText);

  useEffect(() => {
    if (dataQuery && industryQuery.length > 0) {
      const industryValues = industryQuery.map((query) =>
        getIndustryValue(query),
      );
      dispatch(fetchDataTableChangesPrice(exchange, industryValues.toString()));
    }
  }, [industryQuery, exchange]);
  useEffect(() => {
    setColorText(color);
  }, [color]);
  const getIndustryValue = (query) => {
    return hashTb[query] || null;
  };
  useEffect(() => {
    if (dataChartChangesPrice?.length > 0) {
      const result = [];
      const transformedData = dataChartChangesPrice?.map((item) => {
        const quarter = moment(item.date, "YYYY/MM/DD").quarter(); // Lấy quý từ ngày
        const year = moment(item.date, "YYYY/MM/DD").year(); // Lấy năm từ ngày

        const transformedDate = `Q${quarter} ${year}`;
        return { ...item, date: transformedDate };
      });
      const uniqueDates = [
        ...new Set(transformedData?.map((item) => item.date)),
      ];
      setTimeLine(uniqueDates);
      transformedData?.forEach((item) => {
        if (industryQuery.includes(item.industry)) {
          const foundItem = result.find((x) => x.name === item.industry);
          if (foundItem) {
            foundItem.data.push(+item.perChange.toFixed(2));
          } else {
            result.push({
              name: item.industry,
              color: item.color,
              data: [+item.perChange.toFixed(2)],
            });
          }
        }
      });
      setData(result);
    }
  }, [industryQuery, dataChartChangesPrice]);
  const handleSelectedNamesChange = (selectedNames) => {
    setIndustryQuery(selectedNames);
  };
  const options = {
    accessibility: {
      enabled: false,
    },
    credits: false,
    chart: {
      type: "spline",
      backgroundColor: "transparent",
    },
    title: {
      text: null,
    },
    legend: {
      enabled: false,
      itemStyle: {
        color: localStorage.getItem("color"),
        fontWeight: "bold",
      },
    },
    xAxis: [
      {
        categories: timeLine,
        title: {
          text: null,
          style: {
            color: localStorage.getItem("color"),
          },
        },
        labels: {
          style: {
            color: localStorage.getItem("color"),
            fontSize: "9px",
          },
        },
      },
    ],
    yAxis: {
      title: {
        text: null,
      },
      labels: {
        style: {
          color: localStorage.getItem("color"),
        },
      },
      gridLineWidth: 0.1,
    },
    plotOptions: {
      series: {
        marker: {
          radius: 2, // Giá trị bán kính marker
        },
        turboThreshold: 100_000_000,
      },
    },
    // boost: {
    //   useGPUTranslations: true,
    //   usePreAllocated: true,
    // },
    series: data,
  };
  return (
    <>
      <div>
        <div className="flex items-center justify-between border-solid border-[#25558d] border-b-2 border-t-0 border-x-0 mt-1">
          <span className="dark:text-white text-black font-semibold xs:text-base xxs:text-sm">
            Thay đổi giá của các ngành (%)
          </span>
          <FilterIndusty onSelectedNamesChange={handleSelectedNamesChange} />
        </div>
        {dataChartChangesPrice.length ? (
          <div className="h-[450px] mt-3">
            <HighchartsReact
              highcharts={Highcharts}
              options={options}
              containerProps={{ style: { height: "100%", width: "100%" } }}
            />
          </div>
        ) : (
          <div className="h-[450px] flex items-center justify-center">
            <Loading />
          </div>
        )}

        <div>
          <TableChangesPrice />
        </div>
      </div>
    </>
  );
};

export default ChartChangesPrice;
