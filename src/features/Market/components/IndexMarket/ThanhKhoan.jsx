import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../../Chart/utils/Loading";
import socket from "../../../Chart/utils/socket";

function ThanhKhoan() {
  const dataToday = useSelector((state) => state.chart.dataChart1);
  const dataPreviousDay = useSelector((state) => state.chart.dataChart2);
  const [dataSocket, setDataSocket] = useState([]);
  const [colorText, setColorText] = useState(localStorage.getItem("color"));
  const color = useSelector((state) => state.color.colorText);

  useEffect(() => {
    setColorText(color);
  }, [color]);
  useEffect(() => {
    if (dataToday) {
      setDataSocket(dataToday);
    }
    if (dataToday) {
      socket.on("listen-thanh-khoan-phien-hien-tai", (newData) => {
        setDataSocket((prevData) => [...prevData, ...newData]);
      });
    }
  }, [dataToday]);

  // Thiết lập cấu hình cho biểu đồ
  const options = {
    accessibility: {
      enabled: false,
    },
    credits: false,
    chart: {
      type: "area",
      backgroundColor: "transparent",
    },
    title: {
      text: "",
    },
    xAxis: {
      type: "datetime",
      title: {
        text: null,
        style: {
          color: localStorage.getItem("color"),
        },
      },
      labels: {
        style: {
          color: localStorage.getItem("color"),
        },
      },
    },
    yAxis: {
      title: {
        text: null,
        style: {
          color: localStorage.getItem("color"),
        },
      },
      labels: {
        style: {
          color: localStorage.getItem("color"),
        },
      },
      gridLineWidth: 0.1,
    },
    legend: {
      itemStyle: {
        color: localStorage.getItem("color"),
      },
    },
    plotOptions: {
      series: {
        turboThreshold: 100_000_000,
      },
    },
    // boost: {
    //   useGPUTranslations: true,
    //   usePreAllocated: true,
    // },
    series: [
      {
        name: "Phiên trước",
        data:
          dataPreviousDay &&
          dataPreviousDay.length &&
          dataPreviousDay.map((item) => [item.time, +item.value.toFixed(2)]),
        color: "#ff0000",
        opacity: "0.9",
        lineColor: "#ff0000",
        lineWidth: 2,
        marker: {
          enabled: false,
        },
      },
      {
        name: "Hôm nay",
        data:
          dataSocket &&
          dataSocket.length &&
          dataSocket.map((item) => [item.time, +item.value.toFixed(2)]),
        color: "#2AF371",
        opacity: "0.7",
        lineColor: "#2AF371",
        lineWidth: 2,
        marker: {
          enabled: false,
        },
      },
    ],
  };
  const currentTime = new Date();

  // Lấy giờ và phút từ currentTime
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();

  // Lấy ngày trong tuần (0: Chủ nhật, 1: Thứ 2, ..., 6: Thứ 7)
  const currentDay = currentTime.getDay();

  // Kiểm tra xem thời gian có nằm trong khoảng từ 9h15 đến 23h59 không
  const isWithinTimeRange =
    currentHour > 9 ||
    (currentHour === 9 && currentMinute >= 15) ||
    currentHour === 0;

  // Kiểm tra xem ngày là thứ 7 hoặc chủ nhật
  const isWeekend = currentDay === 0 || currentDay === 6;

  // Nếu thời gian nằm ngoài khoảng từ 9h15 đến 23h59 hoặc là ngày thứ 7/chủ nhật, hiển thị dữ liệu
  if (!isWithinTimeRange || isWeekend) {
    return (
      <div className="text-center mt-6 dark:text-white text-black h-[304px]">
        Chưa có dữ liệu giao dịch
      </div>
    );
  }

  return (
    <>
      {dataPreviousDay?.length && dataToday?.length ? (
        <div className="lg:h-[365px] xl:h-[345px] 2xl:h-[344px]">
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            containerProps={{ style: { height: "100%", width: "100%" } }}
          />
        </div>
      ) : (
        <div className="h-[200px]">
          <div className="mt-12">
            <Loading />
          </div>
        </div>
      )}
    </>
  );
}

export default ThanhKhoan;
