import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../../../Chart/utils/Loading";
import FilterIndusty from "../../../utils/components/FilterIndusty";

const ChartEBITDAGrowth = (props) => {
  const [industryQuery, setIndustryQuery] = useState([]);
  const { dataChartEBITDAGrowth } = useSelector((state) => state.market);
  const [data, setData] = useState();
  const [category, setCategory] = useState();

  const [colorText, setColorText] = useState(localStorage.getItem("color"));
  const color = useSelector((state) => state.color.colorText);

  useEffect(() => {
    setColorText(color);
  }, [props, color]);

  useEffect(() => {
    if (dataChartEBITDAGrowth?.length > 0) {
      const transformedData = dataChartEBITDAGrowth?.map((item) => {
        const quarter = moment(item.date, "YYYY/MM/DD").quarter(); // Lấy quý từ ngày
        const year = moment(item.date, "YYYY/MM/DD").year(); // Lấy năm từ ngày

        const transformedDate = `Q${quarter} ${year}`;
        return { ...item, date: transformedDate };
      });

      const uniqueIndustry = [
        ...new Set(
          transformedData
            .filter((item) => industryQuery.includes(item.industry))
            .map((item) => item.industry),
        ),
      ];
      const mappedData = [];

      transformedData?.forEach((item) => {
        if (industryQuery.includes(item.industry)) {
          const colorArr = [
            "#D0DFFF",
            "#044DED",
            "#A8C2FB",
            "#0F639A",
            "#6893EF",
            "#3D78E0",
            "#1D63DC",
            "#155AD1",
            "#0B4DBD",
            "#0F459F",
            "#93D2FE",
            "#78C5FD",
            "#61BAFE",
            "#3EADFF",
            " #0E97FF",
            "#005073",
            "#117DAC",
            "#189BD3",
            "#1DBBD6",
            " #72C7EC",
          ];
          const existingItem = mappedData.find(
            (mappedItem) => mappedItem.name === item.date,
          );

          if (existingItem) {
            existingItem.data.push(+item.perChange.toFixed(2));
          } else {
            const uniqueColorIndex = mappedData.length % colorArr.length; // Lấy chỉ mục màu duy nhất
            mappedData.push({
              name: item.date,
              data: [+item.perChange.toFixed(2)],
              color: colorArr[uniqueColorIndex], // Lấy màu từ mảng colorArr bằng chỉ mục màu duy nhất
            });
          }
        }
      });
      setCategory(uniqueIndustry);
      setData(mappedData);
    }
  }, [dataChartEBITDAGrowth, industryQuery]);
  // config chart
  const options = {
    chart: {
      backgroundColor: "transparent", // màu nền của biểu đồ
      type: "column",
    },
    accessibility: {
      enabled: false,
    },
    credits: false,
    title: {
      text: "",
      style: {
        color: "white",
      },
    },
    xAxis: {
      categories: category,
      labels: {
        style: {
          color: localStorage.getItem("color"), // màu cho các nhãn trục x
        },
      },
      title: {
        style: {
          color: localStorage.getItem("color"), // màu cho tiêu đề trục x
        },
      },
    },
    yAxis: [
      {
        title: {
          text: "",
          style: {
            color: localStorage.getItem("color"),
          },
        },
        labels: {
          style: {
            color: localStorage.getItem("color"), // màu cho các nhãn trục y
          },
          formatter: function () {
            return this.value + "%";
          },
        },
        gridLineWidth: 0.1,
      },
      {
        title: {
          text: "",
          style: {
            color: localStorage.getItem("color"),
          },
        },
        labels: {
          style: {
            color: localStorage.getItem("color"), // màu cho các nhãn trục y
          },
        },
        opposite: true,
        gridLineWidth: 0.1,
      },
    ],
    legend: {
      align: "center",
      itemStyle: {
        fontSize: "10px",
        color: localStorage.getItem("color"),
      },
    },
    plotOptions: {
      series: {
        turboThreshold: 100_000_000,
      },
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
      {dataChartEBITDAGrowth.length ? (
        <div>
          <div className="md:flex sm:block items-center justify-between border-solid border-[#25558d] border-b-2 border-t-0 border-x-0">
            <span className="dark:text-white text-black font-semibold sm:text-base xs:text-sm xxs:text-[12px]">
              Tăng trưởng EBITDA của các ngành qua từng kỳ (%)
            </span>
            <div className="flex items-center justify-center">
              <FilterIndusty
                onSelectedNamesChange={handleSelectedNamesChange}
              />
            </div>
          </div>
          <div className="h-[450px] mt-3">
            <HighchartsReact
              highcharts={Highcharts}
              options={options}
              containerProps={{ style: { height: "100%", width: "100%" } }}
            />
          </div>
        </div>
      ) : (
        <div id="chart-container">
          <div className="mt-14 mb-[379px] flex flex-col justify-center">
            <Loading />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartEBITDAGrowth;
