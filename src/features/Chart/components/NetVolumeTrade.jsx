
import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../utils/Loading";
import moment from "moment";
import { fetchDataNetVolume } from "../thunk";
import { useState } from "react";


const NetVolumeTrade = () => {
  const dispatch = useDispatch();
  const dataNetVolume = useSelector((state) => state.chart.dataNetVolume);
  const [title, setTitle] = useState('VNINDEX')
  if (!dataNetVolume.data || !dataNetVolume.data.length) return <Loading />;

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
      backgroundColor: "black", // màu nền của biểu đồ
      style: {
        fontFamily: 'Roboto'
      }
    },
    accessibility: {
      enabled: false
    },
    credits: false,
    title: {
      text: "GIÁ TRỊ GIAO DỊCH RÒNG",
      style: {
        color: '#F1950C'
      }
    },
    xAxis: {
      categories: timeLine.reverse(),
      labels: {
        style: {
          color: '#fff' // màu cho các nhãn trục x
        }
      },
      title: {
        style: {
          color: '#fff' // màu cho tiêu đề trục x
        }
      }
    },
    yAxis: [
      {
        title: {
          text: "T VNĐ",
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
          text: "",
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
      align: 'center',
      itemStyle: {
        color: '#fff'
      }
    },
    series: [
      {
        type: "column",
        name: "Khối Ngoại",
        data: dataForeign.reverse(),
        yAxis: 0,
        color: "#ff0000"
      },
      {
        type: "column",
        name: "Cá Nhân",
        data: dataProprietary.reverse(),
        yAxis: 0,
        color: '#ffd300'
      },
      {
        type: "column",
        name: "Tự Doanh",
        data: dataRetail.reverse(),
        yAxis: 0,
        color: '#0056FF'
      },
      {
        type: "spline",
        name: title,
        data: dataExchange.reverse(),
        yAxis: 1,
        color: '#ff8700'
      },
    ],
  };

  return (
    <div className="bg-black pt-2">
      <select className="xs:ml-[145px] xxs:ml-[170px] sm:ml-[270px] md:ml-[330px] lg:ml-[450px] xl:ml-[650px] mb-[10px]" onChange={(event) => {
        dispatch(fetchDataNetVolume(event.target.value));
        setTitle(event.target.value)
      }}>
        <option value="VNINDEX">VNINDEX</option>
        <option value="UPINDEX">UPINDEX</option>
        <option value="HNX30">HNX30</option>
        <option value="VN30">VN30</option>
      </select>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div >
  );
};

export default NetVolumeTrade;
