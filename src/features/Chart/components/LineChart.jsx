import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useSelector } from "react-redux";
import Loading from "../utils/Loading";
import moment from "moment";

const LineChart = () => {
  const dataLineChart = useSelector((state) => state.chart.dataLineChart);

  // Thiết lập các tùy chọn của biểu đồ
  const options = {
    accessibility: {
      enabled: false,
    },
    credits: false,
    chart: {
      type: "line",
      backgroundColor: "transparent",
    },
    title: {
      text: "",
    },
    series: [
      {
        name: "Điểm",
        data:
          dataLineChart &&
          dataLineChart?.length &&
          dataLineChart?.map((item) => item.indexValue),
      },
    ],
    yAxis: {
      title: {
        text: "",
        style: {
          color: "#fff",
        },
      },
      labels: {
        style: {
          color: "#fff",
        },
      },
    },
    xAxis: {
      title: {
        text: "Thời gian",
        style: {
          color: "#fff",
        },
      },
      labels: {
        style: {
          color: "#fff",
        },
      },
      categories: dataLineChart && dataLineChart?.length && dataLineChart?.map(item => moment(item.tradingDate).format('hh:mm')),
    },
    legend: {
      enabled: false // Tắt chú thích
    }
  };

  return (
    <div id="chart-container" >
      {dataLineChart?.length ? (
        <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default LineChart;
