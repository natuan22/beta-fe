import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useSelector } from "react-redux";

const BarChartLeft = () => {
  const dataBarChartLeft = useSelector((state) => state.chart.dataBarChartLeft);
  const [data, setData] = useState(dataBarChartLeft?.data ?? []);

  useEffect(() => {
    setData(dataBarChartLeft?.data ?? []);
  }, [dataBarChartLeft]);

  const sortedData =
    data && data.data ? [...data.data].sort((a, b) => b.point - a.point) : [];
  const top10 = sortedData.slice(0, 10);
  const bottom10 = sortedData.slice(-10);
  const dataStockRender = top10.concat(bottom10);
  const options = {
    accessibility: {
      enabled: false,
    },
    credits: false,
    chart: {
      type: "column",
      backgroundColor: "transparent",
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: dataStockRender?.map((item) => item.symbol),
      labels: {
        step: 1,
        rotation: -45,
        align: 'center',
        style: {
          color: "#fff",
          fontSize: 10
        }
      },
      crosshair: true
    },
    yAxis: {
      title: {
        text: "",
      },
      labels: {
        style: {
          color: '#fff'
        }
      },
      min: Math.min(
        ...dataStockRender?.map((item) => item.point),
        0
      ),
      max: Math.max(
        ...dataStockRender?.map((item) => item.point),
        0
      ),
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      column: {
        colorByPoint: true, // enable per-point coloring
        threshold: 0, // set the threshold at zero
        borderWidth: 0
      },
      series: {
        borderRadius: 2
      }
    },
    series: [
      {
        data: dataStockRender?.map(item => {
          return {
            name: item.symbol,
            y: +item.point.toFixed(3),
            color: item.point > 0 ? "#15b313" : "#ff0000"
          };
        })
      },
    ],
  };

  return (
    <div id="chart-container">
      <div className="xl:h-[350px] 2xl:h-[350px] 3xl:h-[386px]">
        <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
      </div>
    </div>
  );
};

export default BarChartLeft;
