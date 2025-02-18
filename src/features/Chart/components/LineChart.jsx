import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  timeLineChart15h00,
  timeLineChart9h00,
} from "../../../helper/dateTime.helper";
import Loading from "../utils/Loading";
import socket from "../utils/socket";

const LineChart = () => {
  const [dataRealTime, setDataRealTime] = useState([]);
  const { dataLineChartHomePage } = useSelector((state) => state.chart);

  const [colorText, setColorText] = useState(localStorage.getItem("color"));
  const color = useSelector((state) => state.color.colorText);

  useEffect(() => {
    setColorText(color);
  }, [color]);
  useEffect(() => {
    if (dataLineChartHomePage?.data?.chart?.length) {
      setDataRealTime(dataLineChartHomePage.data.chart);
    }

    if (dataLineChartHomePage?.data?.chart?.length) {
      socket.on("listen-chi-so-VNINDEX", (newData) => {
        setDataRealTime((prevData) => [...prevData, ...newData]);
      });
    }
  }, [dataLineChartHomePage.data]);
  const data = dataRealTime?.map((item) => {
    return [item.tradingDate, item.indexValue];
  });
  // Lấy ngày hôm nay
  const today = new Date();
  today.setHours(9);
  const newData = [[today.getTime(), dataRealTime[0]?.indexValue]];

  const newDataArray = newData.concat(data);

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
        data: newDataArray,
        lineWidth: 1.2,
        zoneAxis: "y",
        zones: [
          {
            value: dataLineChartHomePage?.data?.prevClosePrice, // Giá trị tách màu (nếu giá trị dưới 5 thì màu đỏ, còn trên 5 thì màu xanh)
            color: "#ff0000",
          },
          {
            color: "#15b313",
          },
        ],
      },
    ],
    yAxis: {
      title: {
        text: "",
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
      plotLines: [
        {
          value: dataLineChartHomePage?.data?.prevClosePrice,
          color: "gray",
          dashStyle: "dot", // Kiểu đường line (có thể là 'dash', 'dot', hoặc 'solid')
          width: 2,
          zIndex: 2,
        },
      ],
    },
    xAxis: {
      type: "datetime",
      tickInterval: 60 * 60 * 1000,
      min: timeLineChart9h00,
      max: timeLineChart15h00,
      title: {
        text: null,
        style: {
          color: localStorage.getItem("color"),
        },
      },
      labels: {
        rotation: 0,
        style: {
          color: localStorage.getItem("color"),
          fontSize: "9px",
        },
      },
    },
    legend: {
      enabled: false, // Tắt chú thích
    },
    // boost: {
    //   useGPUTranslations: true,
    //   usePreAllocated: true,
    // },
    plotOptions: {
      series: {
        marker: {
          radius: 2,
        },
        turboThreshold: 100_000_000,
      },
    },
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
      <div className="text-center mt-6 dark:text-white text-black">
        Chưa có dữ liệu giao dịch
      </div>
    );
  }

  return (
    <div id="chart-container" className="h-[320px]">
      {dataLineChartHomePage?.data?.chart.length ? (
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          containerProps={{ style: { height: "100%", width: "100%" } }}
        />
      ) : (
        <div className="mt-20">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default LineChart;
