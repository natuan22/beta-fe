import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";

import React from "react";

HighchartsMore(Highcharts);

const ChartGauge = ({ data }) => {
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
    },
    pane: {
      startAngle: -90,
      endAngle: 89.9,
      background: null,
      center: ["50%", "75%"],
      size: "110%",
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
    // the value axis
    yAxis: {
      min: 1,
      max: 5,
      tickPosition: "inside",
      tickColor: "#FFFFFF",
      tickLength: 20,
      tickWidth: 0,
      minorTickInterval: null,
      labels: {
        enabled: false, // Disable the yAxis labels
      },
      lineWidth: 0,
      plotBands: [
        {
          from: 1,
          to: 5,
          color: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 1,
              y2: 0,
            },
            stops: [
              [0, "rgba(57, 234, 191, 1)"],
              [0.2, "rgba(45, 204, 204, 1)"],
              [0.5, "rgba(39, 144, 189, 1)"],
              [0.65, "rgba(35, 75, 179, 1)"],
              [0.75, "rgba(27, 5, 159, 1)"],
            ],
          },
          thickness: 30,
        },
      ],
    },
    series: [
      {
        name: "",
        data: [data],
        dataLabels: {
          borderWidth: 0,
          color: "#333333",
          style: {
            fontSize: "16px",
          },
          enabled: false,
        },
        dial: {
          radius: "80%",
          backgroundColor: "#00FF0A",
          baseWidth: 12,
          baseLength: "0%",
          rearLength: "0%",
        },
        pivot: {
          backgroundColor: "#00FF0A",
          radius: 8,
        },
      },
    ],
  };

  return (
    <div>
      <div className="h-[200px]">
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          containerProps={{ style: { height: "100%", width: "100%" } }}
        />
      </div>
    </div>
  );
};

export default ChartGauge;
