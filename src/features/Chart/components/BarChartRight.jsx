import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const BarChartRight = () => {
  const dataBarChartRight = useSelector((state) => state.chart.dataBarChartRight);
  const [data, setData] = useState(dataBarChartRight?.data ?? []);
  useEffect(() => {
    setData(dataBarChartRight?.data ?? []);
  }, [dataBarChartRight]);

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
      categories: data?.map((item) => item.ticker),
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
        ...data?.map((item) => item.net_value_foreign),
        0
      ),
      max: Math.max(
        ...data?.map((item) => item.net_value_foreign),
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
        data: data?.map(item => {
          return {
            name: item.ticker,
            y: item.net_value_foreign,
            color: item.net_value_foreign > 0 ? "#15b313" : "#ff0000"
          };
        })
      },
    ],
  };

  return (
    <div id="chart-container">
      <div className="xl:h-[350px] 2xl:h-[350px]">
        <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
      </div>
    </div>
  );
};

export default BarChartRight;