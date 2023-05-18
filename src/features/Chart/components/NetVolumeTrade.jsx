
import React, { useEffect } from "react";
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
  const [colorText, setColorText] = useState(localStorage.getItem('color'));
  const color = useSelector((state) => state.color.colorText);

  useEffect(() => {
    dispatch(fetchDataNetVolume('vnindex'));
    setColorText(color);
  }, [dispatch, color]);

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
      style: {
        fontFamily: 'Roboto'
      }
    },
    accessibility: {
      enabled: false
    },
    credits: false,
    title: {
      text: "",
      style: {
        color: 'white'
      }
    },
    xAxis: {
      categories: timeLine?.reverse(),
      labels: {
        style: {
          color: localStorage.getItem('color') // màu cho các nhãn trục x
        }
      },
      title: {
        style: {
          color: localStorage.getItem('color') // màu cho tiêu đề trục x
        }
      }
    },
    yAxis: [
      {
        title: {
          text: "Tỷ VNĐ",
          style: {
            color: localStorage.getItem('color'),
          },
        },
        labels: {
          style: {
            color: localStorage.getItem('color') // màu cho các nhãn trục y
          }
        }
      },
      {
        title: {
          text: "",
          style: {
            color: localStorage.getItem('color'),
          },
        },
        labels: {
          style: {
            color: localStorage.getItem('color') // màu cho các nhãn trục y
          }
        },
        opposite: true,
      },

    ],
    legend: {
      align: 'center',
      itemStyle: {
        color: localStorage.getItem('color')
      }
    },
    series: [
      {
        type: "column",
        name: "Khối Ngoại",
        data: dataForeign?.reverse(),
        yAxis: 0,
        color: "#ff0000"
      },
      {
        type: "column",
        name: "Tự Doanh",
        data: dataProprietary?.reverse(),
        yAxis: 0,
        color: '#0056FF'
      },
      {
        type: "column",
        name: "Cá Nhân",
        data: dataRetail?.reverse(),
        yAxis: 0,
        color: '#ffd300'
      },
      {
        type: "spline",
        name: title,
        data: dataExchange?.reverse(),
        yAxis: 1,
        color: '#ff8700'
      },
    ],
  };

  return (
    <>
      <div className="bg-transparent pt-2">
        <div className="bg-transparent text-center px-20 py-[10px]">
          <span className="font-semibold text-base uppercase dark:text-white text-black">
            Giá trị giao dịch ròng
          </span>
          <select className={`dark:bg-[#151924] bg-gray-100 dark:hover:bg-gray-900 hover:bg-gray-300 ml-2 rounded-lg p-1 text-base text-[#0097B2]`}
            onChange={(event) => {
              dispatch(fetchDataNetVolume(event.target.value));
              setTitle(event.target.value)
            }}>
            <option value="VNINDEX">VNINDEX</option>
            <option value="UPINDEX">UPINDEX</option>
            <option value="HNX30">HNX30</option>
            <option value="VN30">VN30</option>
          </select>
        </div>
        {dataNetVolume.data || dataNetVolume.data?.length ? (
          <HighchartsReact highcharts={Highcharts} options={options} />
        ) : (
          <div className="mt-6 mb-28"><Loading /></div>
        )}
      </div>
    </>
  );
};

export default NetVolumeTrade;
