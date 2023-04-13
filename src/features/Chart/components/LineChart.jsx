import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Loading from "../utils/Loading";
import { timeLineChart15h00, timeLineChart9h00 } from "../../../helper/dateTime.helper";

const LineChart = (props) => {
  const data = props.data.map((item) => [
    item.tradingDate,
    item.indexValue,
  ]); 
  console.log(data)
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
        data,
        lineWidth: 1.5
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
      gridLineWidth:0.5,

    },
    xAxis: {
      type: "datetime",
      tickInterval: 30 * 60 * 1000,
      min: timeLineChart9h00,
      max: timeLineChart15h00,

      title: {
        text: null,
        style: {
          color: "#fff",
        },
      },
      labels: {
        // rotation: -45,
        style: {
          color: "#fff",
        },
      },
    },
    legend: {
      enabled: false, // Tắt chú thích
    },
  };

  return (
    <div id="chart-container" className="h-[350px] ">
      {props.data?.length ? (
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          containerProps={{ style: { height: "100%", width: "100%" } }}
        />
      ) : (
        <div className="mt-24">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default LineChart;
