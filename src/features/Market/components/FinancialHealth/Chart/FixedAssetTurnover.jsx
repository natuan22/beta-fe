import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../../../Chart/utils/Loading";
import FilterIndusty from "../../../utils/components/FilterIndusty";

const FixedAssetTurnover = () => {
  const { dataChartAssetTurnoverRatio } = useSelector((state) => state.market);
  const [industryQuery, setIndustryQuery] = useState([]);
  const [data, setData] = useState();
  const [category, setCategory] = useState();

  const [colorText, setColorText] = useState(localStorage.getItem("color"));
  const color = useSelector((state) => state.color.colorText);

  useEffect(() => {
    setColorText(color);
  }, [color]);

  useEffect(() => {
    if (dataChartAssetTurnoverRatio?.length > 0) {
      const transformedData = dataChartAssetTurnoverRatio?.map((item) => {
        const year = item.date.slice(0, 4);
        const quarter = item.date.slice(4);
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
          const colorArr = ["#147DF5", "#E7C64F"];
          const existingItem = mappedData.find(
            (mappedItem) => mappedItem.name === item.date,
          );

          if (existingItem) {
            existingItem.data.push(+item.FAT.toFixed(2));
          } else {
            const uniqueColorIndex = mappedData.length % colorArr.length; // Lấy chỉ mục màu duy nhất
            mappedData.push({
              name: item.date,
              data: [+item.FAT.toFixed(2)],
              color: colorArr[uniqueColorIndex], // Lấy màu từ mảng colorArr bằng chỉ mục màu duy nhất
            });
          }
        }
      });
      setCategory(uniqueIndustry);
      setData(mappedData);
    }
  }, [dataChartAssetTurnoverRatio, industryQuery]);
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
      <div className="flex items-center justify-between border-solid border-[#25558d] border-b-2 border-t-0 border-x-0">
        <span className="dark:text-white text-black font-semibold xl:text-base lg:text-sm md:text-sm xs:text-base xxs:text-[13px]">
          Vòng quay Tài sản cố định (Lần)
        </span>
        <FilterIndusty onSelectedNamesChange={handleSelectedNamesChange} />
      </div>
      {dataChartAssetTurnoverRatio?.length ? (
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

export default FixedAssetTurnover;
