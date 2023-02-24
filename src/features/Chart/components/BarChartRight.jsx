import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactApexChart from "react-apexcharts";

const BarChartRight = () => {
  const dataBarChartRight = useSelector((state) => state.chart.dataBarChartRight);
  const [data, setData] = useState(dataBarChartRight.data);
  useEffect(() => {
    setData(dataBarChartRight.data);
  }, [dataBarChartRight]);

  const options = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        colors: {
          ranges: [
            {
              from: 0,
              to: 100,
              color: "#19d216",
            },
            {
              from: -100,
              to: 0,
              color: "#f32626",
            },
          ],
        },
        columnWidth: "70%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      labels: {
        formatter: function (y) {
          return y.toFixed(2);  
        },
      },
    },
    xaxis: {
      categories: data?.map((item) => item.ticker),
      labels: {
        rotate: -90,
        style: {
          fontWeight: "bold",
        },
      },
    },
  };

  const series = [
    {
      name: "Volume trade",
      data: data?.map((item) => item.net_value_foreign),
    },
  ];

  return (
    // <div className="chart" style={{ transform: 'translateY(4%)' }}>
    <ReactApexChart
      options={options}
      series={series}
      type="bar"
      height={380}
      width={360}
    />
    // </div>
  );
};

export default BarChartRight;
