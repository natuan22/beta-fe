import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  timeStackingChart15h00,
  timeStackingChart9h15,
} from "../../../helper/dateTime.helper";
import Loading from "../utils/Loading";
import socket from "../utils/socket";
import { checkHoliday } from "../../../helper/checkHoliday";

const StackingAreas = () => {
  const [colorText, setColorText] = useState(localStorage.getItem("color"));
  const color = useSelector((state) => state.color.colorText);

  useEffect(() => {
    setColorText(color);
  }, [color]);
  const dataStackingChart = useSelector(
    (state) => state.chart.dataStackingArea,
  );
  const dataAdvance =
    dataStackingChart &&
    dataStackingChart?.data &&
    dataStackingChart.data?.map((item) => {
      return [item.time, item.advance];
    });
  const dataDecline =
    dataStackingChart &&
    dataStackingChart?.data &&
    dataStackingChart.data?.map((item) => {
      return [item.time, item.decline];
    });
  const dataNoChange =
    dataStackingChart &&
    dataStackingChart?.data &&
    dataStackingChart.data?.map((item) => {
      return [item.time, item.noChange];
    });
  const [dataIncr, setDataIncr] = useState([]);
  const [dataDecr, setDataDecr] = useState([]);
  const [dataNoCh, setDataNoCh] = useState([]);
  useEffect(() => {
    if (dataStackingChart && dataStackingChart.data?.length) {
      setDataIncr(dataAdvance || []);
      setDataDecr(dataDecline || []);
      setDataNoCh(dataNoChange || []);
    }
  }, [dataStackingChart]);
  useEffect(() => {
    if (dataStackingChart && dataStackingChart.data?.length) {
      // Lắng nghe sự kiện từ socket
      socket.on("listen-do-rong-thi-truong", (newData) => {
        let mapNewDataIncr = newData?.map((item) => [item.time, item.advance]);
        let mapNewDataDecr = newData?.map((item) => [item.time, item.decline]);
        let mapNewDataNoCh = newData?.map((item) => [item.time, item.noChange]);
        setDataIncr((preData) => [...preData, ...mapNewDataIncr]);
        setDataDecr((preData) => [...preData, ...mapNewDataDecr]);
        setDataNoCh((preData) => [...preData, ...mapNewDataNoCh]);
      });
    }
  }, []);

  const [hoveredValue, setHoveredValue] = useState(null);

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
      type: "datetime",
      tickInterval: 20 * 60 * 1000,
      min: timeStackingChart9h15,
      max: timeStackingChart15h00,
      labels: {
        // formatter: function () {
        //   return moment.utc(this.value).format("HH:mm");
        // },
        style: {
          color: localStorage.getItem("color"),
        },
        rotation: -45,
      },
      crosshair: {
        color: "red",
        width: 2,
      },
      title: {
        text: "", // Tiêu đề trục x
        style: {
          fontWeight: "bold",
        },
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
        data: dataDecr,
        color: "#ff0000",
        lineColor: "#ff0000",
        lineWidth: 2,
        marker: {
          enabled: false,
        },
      },
      {
        name: "Không đổi",
        data: dataNoCh,
        color: "#ffd51e",
        lineColor: "#ffd51e",
        lineWidth: 2,
        marker: {
          enabled: false,
        },
      },
      {
        name: "Tăng",
        data: dataIncr,
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
      <div className="text-center mt-6 dark:text-white text-black">
        Chưa có dữ liệu giao dịch
      </div>
    );
  }

  return (
    <>
      {dataStackingChart.data || dataStackingChart?.data?.length ? (
        <div className="h-[350px]">
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            containerProps={{ style: { height: "100%", width: "100%" } }}
          />
        </div>
      ) : (
        <div className="mt-6">
          <Loading />
        </div>
      )}
    </>
  );
};

export default StackingAreas;
