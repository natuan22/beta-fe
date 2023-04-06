import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Loading from "../utils/Loading";
import moment from "moment-timezone";

const LineChart = (props) => {
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
          props.data &&
          props.data?.length &&
          props.data?.map((item) => item.indexValue),
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
        text: null,
        style: {
          color: "#fff",
        },
      },
      labels: {
        style: {
          color: "#fff",
        },
      },
      categories: props.data && props.data?.length && props.data?.map(item => moment(item.tradingDate).utc().format(props.fmtDay)),
    },
    legend: {
      enabled: false // Tắt chú thích
    }
  };

  return (
    <div id="chart-container" className="h-[350px]">
      {props.data?.length ? (
        <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
      ) : (
        <div className="mt-24"><Loading /></div>
      )}
    </div>
  );
};

export default LineChart;
