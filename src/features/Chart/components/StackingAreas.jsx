import React, { useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useSelector } from "react-redux";
import Loading from "../utils/Loading";
import moment from "moment";
import '../utils/Stacking.css'

const PercentageAreaChart = () => {
  const chartRef = useRef(null)
  const dataStackingChart = useSelector(
    (state) => state.chart.dataStackingArea
  );
  console.log(dataStackingChart.data);
  if (!dataStackingChart.data || !dataStackingChart.data.length)
    return <Loading />;

  // Tiếp tục xử lý dữ liệu của bạn ở đây
  const timeLine = dataStackingChart.data?.map((item) =>
    moment(item.time, "HH:mm:ss").format("HH:mm")
  );
  const totalValue = dataStackingChart.data?.map(item => (item.advance + item.noChange + item.decline))
  const dataAdvance = dataStackingChart.data?.map((item) => (item.advance));
  const dataDecline = dataStackingChart.data?.map((item) => (item.decline));
  const dataNoChange = dataStackingChart.data?.map((item) => (item.noChange));

  const options = {
    chart: {
      type: "area",
      zoomType: "x",
      backgroundColor: "transparent",
      events: {
        mouseMove: function (e) {
          const chart = this;
          const legendData = [];
          chart.series.forEach(function (series) {
            const point = series.searchPoint(e, true);
            if (point) {
              const { x, y } = point;
              const xAxis = chart.xAxis[0];
              const xValue = xAxis.categories[x];
              const yValue = y.toFixed(2);
              legendData.push({
                name: series.name,
                color: series.color,
                value: `${xValue}: ${yValue}`,
              });
            }
          });
    
          chart.legend.update({
            labelFormatter: function () {
              const { name, color } = this;
              const legendItem = legendData.find(item => item.name === name);
              return `<span style="color: ${color}; cursor: pointer;">${name}: ${legendItem ? legendItem.value : ''}</span>`;
            },
          });
        },
        mouseOut: function () {
          const chart = this;
          chart.legend.update({
            labelFormatter: function () {
              return this.name;
            },
          });
        },
      },
      
    },
    title: {
      text: "Độ rộng thị trường",
      style: {
        color: "#fff",
      },
    },
    xAxis: {
      categories: timeLine,
      tickmarkPlacement: "on",
      title: {
        enabled: false,
      },
      labels: {
        style: {
          color:'#fff'
        }
      }
    },
    yAxis: {
      title: {
        text: "Percent",
        style: {
          color: "#fff",
        },
      },
      labels: {
        style: {
          color: "#fff",
        },
        formatter: function () {
          return this.value + "%";
        },
      },
    },
    legend: {
      itemStyle: {
        color: "#fff",
      },  
    },
    tooltip: {
      pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
      split: false,
      shared: true,
      outside: true,
      positioner: function() {
        return {
          x: this.chart.Left,
          y: 390
        };
      },
    },
    plotOptions: {
      area: {
        stacking: "percent",
        lineColor: "#ffffff",
        lineWidth: 1,
        marker: {
          lineWidth: 1,
          lineColor: "#ffffff",
        },
      },
    },
    series: [
      {
        name: "Giảm",
        data: dataDecline,
        color: "#ff0000",
        lineColor: "#ff0000",
        lineWidth: 2,
      },
      {
        name: "Không đổi",
        data: dataNoChange,
        color: "#ffd51e",
        lineColor: "#ffd51e",
        lineWidth: 2,
      },
      {
        name: "Tăng",
        data: dataAdvance,
        color: "#19d216",
        lineColor: "#19d216",
        lineWidth: 2,
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default PercentageAreaChart;


