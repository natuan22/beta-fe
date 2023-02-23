import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

const BarChartLeft = () => {
  const dataBarChartLeft = useSelector((state) => state.chart.dataBarChartLeft);
  const [data, setData] = useState(dataBarChartLeft?.data ?? []);
  useEffect(() => {

    setData(dataBarChartLeft?.data ?? []);
  }, [dataBarChartLeft]);

  const sortedData = data && data.data ? [...data.data].sort((a, b) => b.point - a.point) : [];
  const top10 = sortedData.slice(0, 10);
  const bottom10 = sortedData.slice(-10);
  const dataStockRender = top10.concat(bottom10)

  const series = [
    {
      name: "Volume trade",
      data: dataStockRender.map((item) => item.point.toFixed(2)),
    },
  ];

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
              from: -45,
              to: 0,
              color: "#f10000",
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
      categories: dataStockRender.map(item => item.symbol),
      labels: {
        rotate: 0,
        style: {
          fontWeight: "bold",
          fontSize: "7px"
        },
      },
    },
  };

  return (
    <div className="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={400}
        width={400}
      />
    </div>
  );
};

export default BarChartLeft;
