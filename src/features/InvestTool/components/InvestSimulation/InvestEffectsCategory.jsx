import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Loading from "../../../Chart/utils/Loading";

const InvestEffectsCategory = ({ data }) => {
  const [timeLine, setTimeLine] = useState();
  const [dataFormat, setDataFormat] = useState();

  useEffect(() => {
    if (data?.length > 0) {
      const uniqueDates = [
        ...new Set(data?.map((item) => moment(item.date).format("DD/MM/YYYY"))),
      ];
      setTimeLine(uniqueDates);

      const result = [];

      data?.forEach((item) => {
        const colorArr = ["#fff", "#DFF300", "#0056FF", "#F60101"];
        const name = item.name;
        const value = +item.value.toFixed(2);

        const existingObj = result.find((obj) => obj.name === name);

        if (existingObj) {
          existingObj.data.push(value);
        } else {
          const uniqueColorIndex = result.length % colorArr.length;
          result.push({
            name: name,
            data: [value],
            color: colorArr[uniqueColorIndex],
          });
        }
      });
      setDataFormat(result);
    }
  }, [data]);

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
      text: "",
    },
    // Trong phần tùy chỉnh biểu đồ (options)
    xAxis: {
      categories: timeLine,
      labels: {
        style: {
          color: localStorage.getItem("color"),
          fontSize: "9px",
        },
      },
    },

    yAxis: {
      title: {
        text: null,
        style: {
          color: localStorage.getItem("color"),
        },
      },
      stackLabels: {
        enabled: false,
      },
      labels: {
        style: {
          color: localStorage.getItem("color"),
        },
      },
      gridLineWidth: 0.1,
    },
    legend: {
      verticalAlign: "top",
      enabled: true,
      itemStyle: {
        color: localStorage.getItem("color"),
        fontWeight: "bold",
      },
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
    tooltip: {
      split: true,
    },
    series: dataFormat,
  };

  return (
    <div>
      <div className="border-solid border-[#9E9E9E] border-b-2 border-t-0 border-x-0 md:w-[405px] sm:w-[265px]">
        <div className="dark:text-white text-black font-semibold flex items-center uppercase">
          HIỆU QUẢ ĐẦU TƯ THEO DANH MỤC
        </div>
      </div>
      {data?.length > 0 ? (
        <div className="h-[350px] mt-2">
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            containerProps={{ style: { height: "100%", width: "100%" } }}
          />
        </div>
      ) : (
        <div className="h-[350px] flex items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default InvestEffectsCategory;
