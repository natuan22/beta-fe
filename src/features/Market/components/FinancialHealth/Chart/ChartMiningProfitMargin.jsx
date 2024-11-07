import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../../../Chart/utils/Loading";
import FilterIndusty from "../../../utils/components/FilterIndusty";
import TableMiningProfitMargin from "../Table/TableMiningProfitMargin";

const ChartMiningProfitMargin = () => {
  const { dataChartMiningProfitMargin } = useSelector((state) => state.market);
  const [data, setData] = useState();
  const [timeLine, setTimeLine] = useState();
  const [industryQuery, setIndustryQuery] = useState([]);
  const [colorText, setColorText] = useState(localStorage.getItem("color"));
  const color = useSelector((state) => state.color.colorText);

  useEffect(() => {
    setColorText(color);
  }, [color]);

  useEffect(() => {
    if (dataChartMiningProfitMargin?.length > 0) {
      const transformedData = dataChartMiningProfitMargin?.map((item) => {
        const year = item.date.slice(0, 4);
        const quarter = item.date.slice(4);
        const transformedDate = `Q${quarter} ${year}`;
        return { ...item, date: transformedDate };
      });
      const result = [];
      const uniqueDates = [
        ...new Set(transformedData?.map((item) => item.date)),
      ];
      setTimeLine(uniqueDates);
      transformedData?.forEach((item) => {
        if (industryQuery.includes(item.industry)) {
          const foundItem = result.find((x) => x.name === item.industry);
          if (foundItem) {
            foundItem.data.push(+item.GPM.toFixed(2));
          } else {
            result.push({
              name: item.industry,
              color: item.color,
              data: [+item.GPM.toFixed(2)],
            });
          }
        }
      });
      setData(result);
    }
  }, [dataChartMiningProfitMargin, industryQuery]);

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
      },
      turboThreshold: 100_000_000,
    },
    // boost: {
    //   useGPUTranslations: true,
    //   usePreAllocated: true,
    // },
    series: data,
  };
  const handleSelectedNamesChange = (selectedNames) => {
    setIndustryQuery(selectedNames);
  };
  return (
    <div>
      <div className="xs:flex xxs:block items-center justify-between border-solid border-[#25558d] border-b-2 border-t-0 border-x-0">
        <span className="dark:text-white text-black font-semibold sm:text-base xs:text-[13px]">
          Tỷ suất lợi nhuận gộp biên các ngành (%)
        </span>
        <div className="flex items-center justify-center">
          <FilterIndusty onSelectedNamesChange={handleSelectedNamesChange} />
        </div>
      </div>
      {dataChartMiningProfitMargin.length ? (
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
      <hr />
      <div>
        <TableMiningProfitMargin />
      </div>
    </div>
  );
};

export default ChartMiningProfitMargin;
