import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useSelector } from "react-redux";
import Loading from "../utils/Loading";
import moment from "moment";

const PercentageAreaChart = () => {
  const dataStackingChart = useSelector(
    (state) => state.chart.dataStackingArea
  );
  console.log(dataStackingChart.data);
  if ( !dataStackingChart.data || !dataStackingChart.data.length)
    return <Loading />;

  // Tiếp tục xử lý dữ liệu của bạn ở đây
  const timeLine = dataStackingChart.data?.map((item) =>
    moment(item.time, "HH:mm:ss").format("HH:mm")
  );
  const totalValue = dataStackingChart.data?.map(
    (item) => item.advance + item.noChange + item.decline
  );
  const dataAdvance = dataStackingChart.data?.map((item) => item.advance);
  const dataDecline = dataStackingChart.data?.map((item) => item.decline);
  const dataNoChange = dataStackingChart.data?.map((item) => item.noChange);

  const options = {
    chart: {
      type: "area",
      zoomType: "x",
      backgroundColor: "transparent",
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
        enabled: true,
      },
      labels: {
        style: {
          color: "#fff",
        },
      },
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
      shared: true,
    useHTML: true,
    valueSuffix: " ",
    pointFormatter: function() {
      return '<span style="color:' + this.series.color + '">' + this.series.name + ': <b>' + this.y + '</b></span><br/>';
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
        events: {
          legendItemClick: function () {
            const chart = this.chart;
            const seriesIndex = this.index;
            const series = chart.series[seriesIndex];
            series.visible ? series.hide() : series.show();
            chart.redraw();
          },
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
