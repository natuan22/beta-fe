import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import React from "react";
import calculateChartValues from "../../../../../helper/calculateChartValues";
import LazyLoad from "react-lazyload";

HighchartsMore(Highcharts);

const GauChart = ({ data }) => {
  // Tìm giá trị max và min trong mảng
  const findMaxMin = (arr) => {
    if (arr.length === 0) {
      return null;
    }

    const max = Math.max(...arr);
    const min = Math.min(...arr);

    return { max, min };
  };

  const chartValues = calculateChartValues(data);
  const resultMaxMin = findMaxMin(chartValues);

  const colorBands = [
    {
      from: chartValues[0],
      to: chartValues[1],
      color: "#FF0000",
      thickness: 20,
      label: {
        text: "Rất tiêu cực",
        align: "center",
        verticalAlign: "top",
        x: 25,
        y: 14,
        rotation: -73,
        style: { fontSize: "6.5px", fontWeight: 600 },
      },
    }, // Rất tiêu cực
    {
      from: chartValues[1],
      to: chartValues[2],
      color: "#FFA500",
      thickness: 20,
      label: {
        text: "Tiêu cực",
        align: "center",
        verticalAlign: "top",
        x: 35,
        y: 20,
        rotation: -39,
        style: {
          fontSize: "8px",
          fontWeight: 600,
        },
      },
    }, // Tiêu cực
    {
      from: chartValues[2],
      to: chartValues[3],
      color: "#FFFF00",
      thickness: 20,
      label: {
        text: "Trung lập",
        align: "center",
        verticalAlign: "top",
        x: 49,
        y: 23,
        style: {
          fontSize: "8px",
          fontWeight: 600,
        },
      },
    }, // Trung lập
    {
      from: chartValues[3],
      to: chartValues[4],
      color: "#00FF00",
      thickness: 20,
      label: {
        text: "Tích cực",
        align: "center",
        verticalAlign: "top",
        x: -26,
        y: 20,
        rotation: 37,
        style: {
          fontSize: "8px",
          fontWeight: 600,
        },
      },
    }, // Tích cực
    {
      from: chartValues[4],
      to: chartValues[5],
      color: "#008000",
      thickness: 20,
      label: {
        text: "Rất tích cực",
        align: "center",
        verticalAlign: "top",
        x: -15,
        y: 15,
        rotation: 70,
        style: {
          fontSize: "6.5px",
          fontWeight: 600,
        },
      },
    }, // Rất tích cực
  ];

  const options = {
    accessibility: {
      enabled: false,
    },
    credits: false,
    chart: {
      type: "gauge",
      backgroundColor: "transparent", // màu nền của biểu đồ
    },
    title: {
      text: "",
      align: "low", // Đặt tiêu đề ở dưới
      style: {
        fontSize: "16px", // Kích thước tiêu đề
        color: "#333", // Màu của tiêu đề
      },
      y: 30, // Đặt vị trí y để tiêu đề nằm bên dưới
    },
    pane: {
      startAngle: -90,
      endAngle: 89.9,
      background: null,
      center: ["50%", "75%"],
      size: "110%",
    },
    // the value axis
    yAxis: {
      min: resultMaxMin.min,
      max: resultMaxMin.max,
      tickPosition: "inside",
      tickColor: "#000",
      tickLength: 20,
      tickWidth: 0,
      minorTickInterval: null,
      labels: {
        enabled: false, // Disable the yAxis labels
      },
      lineWidth: 0,
      plotBands: colorBands,
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
    series: [
      {
        name: "",
        data: [data.positive + -data.negative],
        dataLabels: {
          borderWidth: 0,
          color: "#000",
          style: {
            fontSize: "16px",
          },
          format: "{value}",
          enabled: true, // Cho phép hiển thị nhãn
          y: 40, // Vị trí của nhãn trên dial
        },
        dial: {
          radius: "80%",
          backgroundColor: "#000",
          baseWidth: 11,
          baseLength: "0%",
          rearLength: "0%",
        },
        pivot: {
          backgroundColor: "#000",
          radius: 8,
        },
      },
    ],
  };

  return (
    <div className="w-[200px] h-[77px] translate-y-[-40px]">
      <div className="h-[160px] w-[200px]">
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          containerProps={{ style: { height: "100%", width: "100%" } }}
        />
      </div>
    </div>
  );
};

export default GauChart;
