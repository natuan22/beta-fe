import React from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import moment from "moment";
const MyChart = () => {
    const dataStacked = useSelector(state => state.chart.dataStackingArea)
    const timeFormat = ['09:00','09:15','09:30','09:45','10:00','10:15','10:30','10:45','11:00','11:15','11:30','13:00','13:15','13:30','13:45','14:00','14:15','14:30','14:45'];

  const data = [
    {
      index: "VNINDEX",
      noChange: 77.0,
      decline: 135.0,
      advance: 105.0,
      time: "09:25:55",
    },
    {
      index: "VNINDEX",
      noChange: 76.0,
      decline: 141.0,
      advance: 105.0,
      time: "09:26:55",
    },
    {
      index: "VNINDEX",
      noChange: 73.0,
      decline: 148.0,
      advance: 103.0,
      time: "09:27:55",
    },
  ];
  const options = {
    series: [
      {
        name: "No Change",
        data: data.map((item) => ({
          x: new Date(`2000-01-01T${item.time}Z`).getTime(),
          y: item.noChange,
        })),
      },
      {
        name: "Decline",
        data: data.map((item) => ({
          x: new Date(`2000-01-01T${item.time}Z`).getTime(),
          y: item.decline,
        })),
      },
      {
        name: "Advance",
        data: data.map((item) => ({
          x: new Date(`2000-01-01T${item.time}Z`).getTime(),
          y: item.advance,
        })),
      },
    ],
    chart: {
      type: "line",
      height: 350,
    },
    colors: ["#008FFB", "#FF4560", "#00E396"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    fill: {
      type: "solid",
      opacity: 0.2,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
        style:{
            colors:"#fff"
        }
      },
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return <span>{value}</span>
        },
        style: {
            colors: '#fff'
        }
      },
    },
  };

  return (
    <div>
      <ReactApexChart
        options={options}
        series={options.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default MyChart;
