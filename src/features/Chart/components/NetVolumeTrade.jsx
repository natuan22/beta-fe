import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useSelector } from "react-redux";
import Loading from "../utils/Loading";
import moment from "moment";

const NetVolumeTrade = () => {
  const dataNetVolume = useSelector((state) => state.chart.dataNetVolume);
  if (!dataNetVolume.data || !dataNetVolume.data.length) return <Loading />;
  console.log(dataNetVolume);
  const dataExchange = dataNetVolume.data?.map((item) => item.exchange_price);
  const dataForeign = dataNetVolume.data?.map(
    (item) => +item.net_foreign.toFixed(2)
  );
  const dataProprietary = dataNetVolume.data?.map(
    (item) => +item.net_proprietary.toFixed(2)
  );
  const dataRetail = dataNetVolume.data?.map(
    (item) => +item.net_retail.toFixed(2)
  );
  const timeLine = dataNetVolume.data?.map((item) =>
    moment(item.date).format("DD/MM")
  );
  // console.log(dataForeign, dataProprietary, dataRetail, dataExchange);
  const options = {
    chart: {
      backgroundColor: "transparent", // màu nền của biểu đồ
      height: 500, // chiều cao của biểu đồ
      width: 1400, // chiều rộng của biểu đồ
    },
    title: {
      text: "Giá trị giao dịch ròng",
      style:{
        color: '#fff'
      }
    },
    xAxis: {
      categories: timeLine.reverse(),
      labels: {
        style: {
          color: '#fff' // màu cho các nhãn trục x
        }
      }  ,
      title: {
        style: {
          color: '#fff' // màu cho tiêu đề trục x
        }
      }
    },
    yAxis: [
      {
        title: {
          text: "Tỉ VNĐ",
          style: {
            color: "#fff",
          },
        },
        labels: {
          style: {
            color: '#fff' // màu cho các nhãn trục y
          }
        }
      },
      {
        title: {
          text: "Điểm",
          style: {
            color: "#fff",
          },
        },
        labels: {
          style: {
            color: '#fff' // màu cho các nhãn trục y
          }
        },
        opposite: true,
      },
      
    ],
    legend: {
      align: 'center' ,
      itemStyle: {
        color: '#fff'
      }
    },
    series: [
      {
        type: "column",
        name: "Foreign",
        data: dataForeign.reverse(),
        yAxis: 0,
        color: "#ff0000"
      },
      {
        type: "column",
        name: "Proprietary",
        data: dataProprietary.reverse(),
        yAxis: 0,
        color: '#ffd300'
      },
      {
        type: "column",
        name: "Retail",
        data: dataRetail.reverse(),
        yAxis: 0,
        color: '#0056FF'
      },
      {
        type: "spline",
        name: "VNINDEX",
        data: dataExchange.reverse(),
        yAxis: 1,
        color: '#ff8700'
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default NetVolumeTrade;
