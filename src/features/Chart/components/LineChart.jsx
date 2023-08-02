import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Loading from "../utils/Loading";
import {
  timeLineChart15h00,
  timeLineChart9h00,
} from "../../../helper/dateTime.helper";
import { useSelector } from "react-redux";
import socket from "../utils/socket";

const LineChart = () => {
  const [dataRealTime, setDataRealTime] = useState([])
  const { dataLineChartHomePage } = useSelector((state) => state.chart);

  const [colorText, setColorText] = useState(localStorage.getItem('color'));
  const color = useSelector((state) => state.color.colorText);

  useEffect(() => {
    setColorText(color);
  }, [color]);

  useEffect(() => {
    if (dataLineChartHomePage?.data?.length) {
      setDataRealTime(dataLineChartHomePage.data)
    }

    if (dataLineChartHomePage?.data?.length) {
      socket.on("listen-chi-so-VNINDEX", (newData) => {

        setDataRealTime((prevData) => [...prevData, ...newData]);
      });
    }
  }, [dataLineChartHomePage.data])
  const data = dataRealTime?.map(item => {
    console.log(item.tradingDate)
    return [item.tradingDate, item.indexValue]
  })
  // Thiết lập các tùy chọn của biểu đồ
  const options = {
    accessibility: {
      enabled: false,
    },
    credits: false,
    chart: {
      type: "spline",
      backgroundColor: "transparent",
    },
    title: {
      text: "",
      // style:{
      //   color:"#fff",
      //   fontSize: '17px'
      // }
    },
    series: [
      {
        name: "Điểm",
        data,
        lineWidth: 1.2,
      },
    ],
    yAxis: {
      title: {
        text: "",
        style: {
          color: localStorage.getItem('color'),
        },
      },
      labels: {
        style: {
          color: localStorage.getItem('color'),
        },
      },
      gridLineWidth: 0.5,
    },
    xAxis: {
      type: "datetime",
      tickInterval: 30 * 60 * 1000,
      min: timeLineChart9h00,
      max: timeLineChart15h00,
      title: {
        text: null,
        style: {
          color: localStorage.getItem('color'),
        },
      },
      labels: {
        // rotation: -45,
        style: {
          color: localStorage.getItem('color'),
        },
      },
    },
    legend: {
      enabled: false, // Tắt chú thích
    },
    plotOptions: {
      series: {
        marker: {
          radius: 2
        }
      }
    }
  };

  const currentTime = new Date();

  // Lấy giờ và phút từ currentTime
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();

  // Kiểm tra xem thời gian có nằm trong khoảng từ 9h15 đến 23h59 không
  const shouldShowData = currentHour > 9 || (currentHour === 9 && currentMinute >= 15) || currentHour === 0

  // Nếu thời gian nằm ngoài khoảng từ 9h15 đến 23h59, hiển thị dữ liệu
  if (!shouldShowData) {
    return <div className="text-center mt-6 dark:text-white text-black">Chưa có dữ liệu giao dịch</div>
  }

  return (
    <div id="chart-container" className="h-[340px]">
      {dataLineChartHomePage?.data?.length ? (
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          containerProps={{ style: { height: "100%", width: "100%" } }}
        />
      ) : (
        <div className="mt-20"><Loading /></div>
      )}
    </div>
  );
};

export default LineChart;
