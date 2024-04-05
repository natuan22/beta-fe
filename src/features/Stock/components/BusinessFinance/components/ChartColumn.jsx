import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Loading from "../../../../Chart/utils/Loading";

const ChartColumn = ({ data, timeLine, name }) => {
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
      text: name,
      style: {
        color: localStorage.getItem("color"),
        fontFamily: "Roboto", // Sử dụng font chữ "Roboto"
        fontWeight: "700", // Trọng lượng font chữ 700 (Bold)
        fontSize: "14px", // Kích thước font chữ 13px
      },
    },
    xAxis: {
      categories: timeLine,
      labels: {
        style: {
          color: localStorage.getItem("color"), // màu cho các nhãn trục x
          fontSize: "9px",
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
      enabled: false,
      align: "center",
      itemStyle: {
        fontSize: "10px",
        color: localStorage.getItem("color"),
      },
    },

    series: data,
  };
  return (
    <div>
      {data?.length > 0 ? (
        <div className="h-[321px]">
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            containerProps={{ style: { height: "100%", width: "100%" } }}
          />
        </div>
      ) : (
        <div className="h-[321px] flex items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default ChartColumn;
