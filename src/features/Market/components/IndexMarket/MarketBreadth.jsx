import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../Chart/utils/Loading";
import socket from "../../../Chart/utils/socket";
import { fetchDataDoRongThiTruong } from "../../thunk";
import { checkHoliday } from "../../../../helper/checkHoliday";

const MarketBreadth = () => {
  const dispatch = useDispatch();
  const { dataDoRongThiTruong } = useSelector((state) => state.market);
  const [data, setData] = useState([]);
  const [activeButton, setActiveButton] = useState("HOSE");
  const handleClick = (button) => {
    setActiveButton(button);
  };
  const [formatDate, setFormatDate] = useState("HH:mm");
  const [colorText, setColorText] = useState(localStorage.getItem("color"));
  const color = useSelector((state) => state.color.colorText);

  useEffect(() => {
    setColorText(color);
  }, [color]);

  const [queryApi, setQueryApi] = useState({
    exchange: "HOSE",
    type: 0,
  });
  useEffect(() => {
    dispatch(fetchDataDoRongThiTruong(queryApi.exchange, queryApi.type));
  }, [dispatch, queryApi]);

  useEffect(() => {
    if (dataDoRongThiTruong) {
      if (queryApi.type !== 0) {
        disconnectSocketHNX();
        disconnectSocketHSX();
      } else {
        if (queryApi.exchange === "HOSE") {
          disconnectSocketHNX();
          conSocketHSX();
        } else {
          disconnectSocketHSX();
          conSocketHNX();
        }
      }
    }
  }, [queryApi, dataDoRongThiTruong]);

  useEffect(() => {
    if (dataDoRongThiTruong) {
      setData(dataDoRongThiTruong);
    }
  }, [dataDoRongThiTruong]);

  const disconnectSocketHSX = () => {
    if (socket.active) {
      socket.off(`listen-do-rong-thi-truong`);
    }
  };

  const disconnectSocketHNX = () => {
    if (socket.active) {
      socket.off(`listen-do-rong-thi-truong-hnx`);
    }
  };

  const conSocketHSX = () => {
    socket.on(`listen-do-rong-thi-truong`, (newData) => {
      setData((prevData) => [...prevData, ...newData]);
    });
  };

  const conSocketHNX = () => {
    socket.on(`listen-do-rong-thi-truong-hnx`, (newData) => {
      setData((prevData) => [...prevData, ...newData]);
    });
  };

  const handleQueryApiExchange = (exchange) => {
    setQueryApi((prev) => ({ ...prev, exchange }));
  };
  const handleQueryApiType = (type) => {
    setQueryApi((prev) => ({ ...prev, type }));
  };

  const [hoveredValue, setHoveredValue] = useState(null);

  const timeLine =
    Array.isArray(data) &&
    data?.map((item) => moment.utc(item.time).format(formatDate));

  const dataAdvance = Array.isArray(data) && data?.map((item) => item.advance);
  const dataDecline = Array.isArray(data) && data?.map((item) => item.decline);
  const dataNoChange =
    Array.isArray(data) && data?.map((item) => item.noChange);
  const options = {
    accessibility: {
      enabled: false,
    },
    credits: false,
    chart: {
      type: "area",
      zoomType: "x",
      backgroundColor: "transparent",
      style: {
        fontFamily: "Roboto",
      },
    },
    title: {
      text: "",
      style: {
        color: "#F1950C",
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
          color: localStorage.getItem("color"),
        },
      },
      crosshair: {
        color: "black",
        width: 3,
      },
    },
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
        formatter: function () {
          return this.value + "%";
        },
      },
      gridLineWidth: 0.1,
    },
    legend: {
      itemStyle: {
        color: localStorage.getItem("color"),
      },
      enabled: true,
      labelFormatter: function () {
        const hoveredPoint = hoveredValue?.find(
          (point) => point.name === this.name,
        );
        const valueString = hoveredPoint ? `: ${hoveredPoint.value}` : "";
        return `${this.name}${valueString}`;
      },
    },
    tooltip: {
      shared: true,
      useHTML: true,
      valueSuffix: " ",
      backgroundColor: "#fff",
      pointFormatter: function () {
        return (
          '<span style="color:' +
          this.series.color +
          '">' +
          this.series.name +
          ": <b>" +
          this.y +
          "</b></span>  <b>" +
          "</b><br/>"
        );
      },
    },
    plotOptions: {
      area: {
        stacking: "percent",
        lineColor: "#ffffff",
        lineWidth: 1,
        tooltip: {
          valueSuffix: " ",
        },
      },
      series: {
        marker: {
          radius: 2, // Giá trị bán kính marker
        },
        tooltip: {
          headerFormat: "<span style='font-size: 10px'>{point.key}</span><br/>",
          pointFormat:
            "<span style='color:{point.color}'>{series.name}: <b>{point.y}</b></span><br/>",
          valueDecimals: 2,
        },
        point: {
          events: {
            mouseOver: function () {
              const hoveredValues = [];
              const xValue = this.x;
              this.series.chart.series.forEach((series) => {
                const point = series.data.find((point) => point.x === xValue);
                if (point) {
                  hoveredValues.push({
                    name: series.name,
                    color: series.color,
                    value: point.y,
                  });
                }
              });
              setHoveredValue(hoveredValues);
            },
            mouseOut: function () {
              setHoveredValue(null);
            },
          },
        },
        turboThreshold: 100_000_000,
      },
    },
    // boost: {
    //   useGPUTranslations: true,
    //   usePreAllocated: true,
    // },
    series: [
      {
        name: "Giảm",
        data: dataDecline,
        color: "#ff0000",
        lineColor: "#ff0000",
        lineWidth: 2,
        marker: {
          enabled: false,
        },
      },
      {
        name: "Không đổi",
        data: dataNoChange,
        color: "#ffd51e",
        lineColor: "#ffd51e",
        lineWidth: 2,
        marker: {
          enabled: false,
        },
      },
      {
        name: "Tăng",
        data: dataAdvance,
        color: "#19d216",
        lineColor: "#19d216",
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

  // Lấy ngày và tháng hiện tại
  const currentDate = currentTime.getDate();
  const currentMonth = currentTime.getMonth() + 1; // getMonth() trả về 0-11

  // Kiểm tra xem ngày hiện tại có phải là ngày lễ không
  const isHoliday = checkHoliday(currentDate, currentMonth);

  // Kiểm tra xem ngày là thứ 7 hoặc chủ nhật
  const isWeekend = currentDay === 0 || currentDay === 6;

  // Kiểm tra xem thời gian có nằm trong khoảng từ 8h đến 9h15 không
  const isNoDataTimeRange =
    currentHour === 8 || (currentHour === 9 && currentMinute <= 15);

  // Nếu là thời gian không có dữ liệu (8h-9h15) và không phải cuối tuần hoặc ngày lễ, hiển thị thông báo
  if (isNoDataTimeRange && !isWeekend && !isHoliday) {
    return (
      <>
        <div className="xs:flex xxs:block items-center justify-between border-solid border-[#25558d] border-b-2 border-t-0 border-x-0 pt-[1px]">
          <span className="dark:text-white text-black xl:text-[0.9rem] lg:text-base">
            Diễn biến độ rộng thị trường
          </span>
          <div className="flex items-center justify-center">
            <select
              onChange={(e) => {
                handleQueryApiType(e.target.value);
                if (e.target.value !== 0) {
                  setFormatDate("DD/MM");
                }
              }}
              className={`bg-[#0050AD] p-[2.5px] xl:text-[0.9rem] lg:text-base text-white border-0 cursor-pointer`}
            >
              <option value="0">Phiên gần nhất</option>
              <option value="1">01 tháng</option>
              <option value="2">01 quý</option>
              <option value="3">01 năm</option>
            </select>
          </div>
        </div>
        <div className="mt-1 mb-3 dark:text-white text-black">
          <span>
            <button
              onClick={() => {
                handleClick("HOSE");
                handleQueryApiExchange("HOSE");
              }}
              className={
                activeButton === "HOSE"
                  ? "border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer"
                  : "border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer"
              }
            >
              HSX
            </button>
          </span>
          <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10 xxs:pl-5">
            <button
              onClick={() => {
                handleClick("HNX");
                handleQueryApiExchange("HNX");
              }}
              className={
                activeButton === "HNX"
                  ? "border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer"
                  : "border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer"
              }
            >
              HNX
            </button>
          </span>
          <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10 xxs:pl-5">
            <button
              onClick={() => {
                handleClick("UPCOM");
                handleQueryApiExchange("UPCOM");
              }}
              className={
                activeButton === "UPCOM"
                  ? "border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer"
                  : "border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer"
              }
            >
              UPCOM
            </button>
          </span>
        </div>
        <div className="text-center mt-6 dark:text-white text-black h-[327px]">
          Chưa có dữ liệu giao dịch
        </div>
      </>
    );
  }
  return (
    <>
      <div className="xs:flex xxs:block items-center justify-between border-solid border-[#25558d] border-b-2 border-t-0 border-x-0 pt-[22px]">
        <span className="dark:text-white text-black xl:text-[0.9rem] lg:text-base font-semibold">
          Diễn biến độ rộng thị trường
        </span>
        <div className="flex items-center justify-center">
          <select
            onChange={(e) => {
              handleQueryApiType(e.target.value);
              if (e.target.value !== 0) {
                setFormatDate("DD/MM");
              }
            }}
            className={`bg-[#0050AD] p-[2.5px] xl:text-[0.9rem] lg:text-base text-white border-0 cursor-pointer`}
          >
            <option value="0">Phiên gần nhất</option>
            <option value="1">01 tháng</option>
            <option value="2">01 quý</option>
            <option value="3">01 năm</option>
          </select>
        </div>
      </div>
      <div className="mt-1 mb-3 dark:text-white text-black">
        <span>
          <button
            onClick={() => {
              handleClick("HOSE");
              handleQueryApiExchange("HOSE");
            }}
            className={
              activeButton === "HOSE"
                ? "border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer"
                : "border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer"
            }
          >
            HSX
          </button>
        </span>
        <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10 xxs:pl-5">
          <button
            onClick={() => {
              handleClick("HNX");
              handleQueryApiExchange("HNX");
            }}
            className={
              activeButton === "HNX"
                ? "border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer"
                : "border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer"
            }
          >
            HNX
          </button>
        </span>
        <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10 xxs:pl-5">
          <button
            onClick={() => {
              handleClick("UPCOM");
              handleQueryApiExchange("UPCOM");
            }}
            className={
              activeButton === "UPCOM"
                ? "border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer"
                : "border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer"
            }
          >
            UPCOM
          </button>
        </span>
      </div>

      {dataDoRongThiTruong.length ? (
        <div className="xl:h-[338px] 2xl:h-[338px]">
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            containerProps={{ style: { height: "100%", width: "100%" } }}
          />
        </div>
      ) : (
        <div className="mt-12 ">
          <Loading />
        </div>
      )}
    </>
  );
};

export default MarketBreadth;
