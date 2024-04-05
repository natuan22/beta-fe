import moment from "moment";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../../../Chart/utils/Loading";
import FilterIndusty from "../../../utils/components/FilterIndusty";

const QuickPayoutRatio = () => {
  const { dataChartPayoutRatio } = useSelector((state) => state.market);
  const [industryQuery, setIndustryQuery] = useState([]);
  const [data, setData] = useState();
  const [category, setCategory] = useState();
  const [colorText, setColorText] = useState(localStorage.getItem("color"));
  const color = useSelector((state) => state.color.colorText);

  useEffect(() => {
    setColorText(color);
  }, [color]);

  useEffect(() => {
    if (dataChartPayoutRatio?.length > 0) {
      const transformedData = dataChartPayoutRatio?.map((item) => {
        const quarter = moment(item.date, "YYYY/MM/DD").quarter(); // Lấy quý từ ngày
        const year = moment(item.date, "YYYY/MM/DD").year(); // Lấy năm từ ngày

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
          const colorArr = ["#147DF5", "#E7C64F"];
          const existingItem = mappedData.find(
            (mappedItem) => mappedItem.name === item.date
          );

          if (existingItem) {
            existingItem.data.push(+item.quickRatio.toFixed(2));
          } else {
            const uniqueColorIndex = mappedData.length % colorArr.length; // Lấy chỉ mục màu duy nhất
            mappedData.push({
              name: item.date,
              data: [+item.quickRatio.toFixed(2)],
              color: colorArr[uniqueColorIndex], // Lấy màu từ mảng colorArr bằng chỉ mục màu duy nhất
            });
          }
        }
      });
      setCategory(uniqueIndustry);
      setData(mappedData);
    }
  }, [dataChartPayoutRatio, industryQuery]);
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
        gridLineWidth: 0.2,
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
        gridLineWidth: 0.2,
      },
    ],
    legend: {
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
      <div className="lg:flex md:block sm:flex xs:flex xxs:flex items-center justify-between border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0">
        <span className="dark:text-white text-black font-semibold xl:text-base lg:text-[14px] md:text-sm xs:text-base xxs:text-[13px]">
          Tỷ số thanh toán nhanh (Lần)
        </span>
        <div className="flex items-center justify-center">
          <FilterIndusty onSelectedNamesChange={handleSelectedNamesChange} />
        </div>
      </div>
      {dataChartPayoutRatio.length ? (
        <div className="h-[500px]">
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            containerProps={{ style: { height: "100%", width: "100%" } }}
          />
        </div>
      ) : (
        <div className="h-[500px] flex items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default QuickPayoutRatio;
