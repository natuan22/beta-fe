import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../../../Chart/utils/Loading";
import FilterIndusty from "../../../utils/components/FilterIndusty";

const InterestCoverageRatio = () => {
  const { dataChartInterestCoverageRatio } = useSelector(
    (state) => state.market
  );
  const [industryQuery, setIndustryQuery] = useState([]);
  const [data, setData] = useState();
  const [category, setCategory] = useState();

  const [colorText, setColorText] = useState(localStorage.getItem("color"));
  const color = useSelector((state) => state.color.colorText);

  useEffect(() => {
    setColorText(color);
  }, [color]);

  useEffect(() => {
    if (dataChartInterestCoverageRatio?.length > 0) {
      const transformedData = dataChartInterestCoverageRatio?.map((item) => {
        const year = item.date.slice(0, 4);
        const quarter = item.date.slice(4);
        const transformedDate = `Q${quarter} ${year}`;
        return { ...item, date: transformedDate };
      });

      const uniqueIndustry = [
        ...new Set(
          transformedData
            .filter((item) => industryQuery.includes(item.industry))
            .map((item) => item.industry)
        ),
      ];
      const mappedData = [];

      transformedData?.forEach((item) => {
        if (industryQuery.includes(item.industry)) {
          const colorArr = [
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
            (mappedItem) => mappedItem.name === item.date
          );

          if (existingItem) {
            existingItem.data.push(+item.value.toFixed(2));
          } else {
            const uniqueColorIndex = mappedData.length % colorArr.length; // Lấy chỉ mục màu duy nhất
            mappedData.push({
              name: item.date,
              data: [+item.value.toFixed(2)],
              color: colorArr[uniqueColorIndex], // Lấy màu từ mảng colorArr bằng chỉ mục màu duy nhất
            });
          }
        }
      });
      setCategory(uniqueIndustry);
      setData(mappedData);
    }
  }, [dataChartInterestCoverageRatio, industryQuery]);
  // config chart
  const options = {
    chart: {
      backgroundColor: "transparent", // màu nền của biểu đồ
      type: "bar",
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
      enabled: false,
      align: "center",
      itemStyle: {
        fontSize: "10px",
        color: localStorage.getItem("color"),
      },
    },

    series: data,
  };
  const handleSelectedNamesChange = (selectedNames) => {
    setIndustryQuery(selectedNames);
  };
  return (
    <div>
      <div className="md:flex sm:block items-center justify-between border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0">
        <span className="dark:text-white text-black font-semibold md:text-base xs:text-sm xxs:text-[11.8px]">
          Hệ số thanh toán lãi vay nợ bình quân của các ngành (%)
        </span>
        <div className="flex items-center justify-center">
          <FilterIndusty onSelectedNamesChange={handleSelectedNamesChange} />
        </div>
      </div>
      {dataChartInterestCoverageRatio?.length ? (
        <div className="h-[803px]">
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            containerProps={{ style: { height: "100%", width: "100%" } }}
          />
        </div>
      ) : (
        <div className="h-[803px] flex items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default InterestCoverageRatio;
