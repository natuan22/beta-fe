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
      data: dataStockRender.map((item) => item.point),
    },
  ];

  const options = {
    grid: {
      show: true,      // you can either change hear to disable all grids
      xaxis: {
        lines: {
          show: false  //or just here to disable only x axis grids
        }
      },
      yaxis: {
        lines: {
          show: true  //or just here to disable only y axis
        }
      },
    },
    chart: {
      background: '#020203',
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
              color: "#f10000",
            },
          ],
        },
        columnWidth: "70%",
        barStart: "0",
      },
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      min: -3 ,
      max: 3 ,
      labels: {
        formatter: function (y) {
          return y.toFixed(2);
        },
        style: {
          colors: '#fff',
        }
      },
    },
    xaxis: {
      categories: dataStockRender.map(item => item.symbol),
      labels: {
        rotate: 90,
        style: {
          fontWeight: "bold",
          fontSize: "6px",
          colors: '#fff',
        },
      },
      axisTicks: {
        show: false,
      }
    },
  };

  return (
    <div className="3xl:h-[342px] xl:h-[272px]">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
      />
    </div >
  );
};

export default BarChartLeft;