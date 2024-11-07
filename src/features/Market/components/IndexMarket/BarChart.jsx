import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../Chart/utils/Loading";
import socket from "../../../Chart/utils/socket";
import { fetchChartTickerContribute } from "../../thunk";

const BarChart = () => {
  const dispatch = useDispatch();
  const { chartTickerContribute } = useSelector((state) => state.market);
  const [activeButton, setActiveButton] = useState("hsx");
  const handleClick = (button) => {
    setActiveButton(button);
  };
  const [handleQueryType, setHandleQueryType] = useState(0);
  const [queryApi, setQueryApi] = useState({
    exchange: "hsx",
    type: 0,
    order: 0,
  });
  const [exchangeOld, setExchangeOld] = useState("");
  const [data, setData] = useState([]);
  const [colorText, setColorText] = useState(localStorage.getItem("color"));
  const color = useSelector((state) => state.color.colorText);

  useEffect(() => {
    dispatch(
      fetchChartTickerContribute(
        queryApi.exchange,
        queryApi.type,
        queryApi.order,
      ),
    );
    setColorText(color);
  }, [dispatch, queryApi, color]);

  const handleQueryApiOrder = (order) => {
    setQueryApi((prev) => ({ ...prev, order }));
  };
  const handleQueryApiType = (type) => {
    setQueryApi((prev) => ({ ...prev, type }));
  };
  const handleQueryApiExchange = (exchange) => {
    setQueryApi((prev) => ({ ...prev, exchange }));
  };
  useEffect(() => {
    if (chartTickerContribute) {
      setData(chartTickerContribute);
    }
  }, [chartTickerContribute]);

  useEffect(() => {
    if (chartTickerContribute) {
      if (queryApi.type !== 0) {
        disconnectSocket(exchangeOld);
      } else {
        if (queryApi.order !== 0) {
          disconnectSocket(exchangeOld);
        } else {
          disconnectSocket(exchangeOld);
          conSocket(queryApi.exchange);
          setExchangeOld(queryApi.exchange);
        }
      }
    }
  }, [queryApi]);

  const disconnectSocket = (exchange) => {
    if (socket.active) {
      socket.off(`listen-${exchange}-ticker-contribute-0`);
    }
  };

  const conSocket = (exchange) => {
    socket.on(`listen-${exchange}-ticker-contribute-0`, (newData) => {
      setData(newData.sort((a, b) => b.contribute_price - a.contribute_price));
    });
  };

  if (
    data?.length &&
    (handleQueryType === "1" ||
      handleQueryType === "2" ||
      handleQueryType === "3")
  ) {
    const incr5 = data.slice(0, 5);
    const decr5 = data.slice(-5).sort(function () {
      return -1;
    });
    const newData = incr5.concat(decr5);

    var options = {
      accessibility: {
        enabled: false,
      },
      credits: false,
      chart: {
        type: "column",
        backgroundColor: "transparent",
      },
      title: {
        text: "",
      },
      xAxis: {
        categories: newData
          .sort((a, b) => b.contribute_price - a.contribute_price)
          ?.map((item) => item.symbol),
        labels: {
          step: 1,
          rotation: 0,
          align: "center",
          useHTML: true,
          style: {
            rotation: 0,
            color: localStorage.getItem("color"),
            fontSize: "10px",
            whiteSpace: "normal",
          },
        },
        crosshair: true,
      },
      yAxis: {
        title: {
          text: "",
        },
        labels: {
          enabled: false,
          style: {
            color: localStorage.getItem("color"),
          },
        },
        gridLineWidth: 0.1,
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        shared: true,
        useHTML: true,
        valueSuffix: " ",
        pointFormatter: function () {
          return (
            '<span style="color:' +
            this.color +
            '">●</span>' +
            "<span>" +
            " " +
            this.name +
            ": <b>" +
            this.y +
            "</b></span>  <b>" +
            "</b><br/>"
          );
        },
      },
      plotOptions: {
        column: {
          colorByPoint: true, // enable per-point coloring
          threshold: 0, // set the threshold at zero
          borderWidth: 0,
        },
        series: {
          borderRadius: 2,
          turboThreshold: 100_000_000,
        },
      },
      boost: {
        useGPUTranslations: true,
        usePreAllocated: true,
      },
      series: [
        {
          data: newData
            .sort((a, b) => b.contribute_price - a.contribute_price)
            ?.map((item) => {
              return {
                name: item.symbol,
                y: +item.contribute_price.toFixed(2),
                color: item.contribute_price > 0 ? "#15b313" : "#ff0000",
              };
            }),
        },
      ],
    };
  } else {
    var options = {
      accessibility: {
        enabled: false,
      },
      credits: false,
      chart: {
        type: "column",
        backgroundColor: "transparent",
      },
      title: {
        text: "",
      },
      xAxis: {
        categories: Array.isArray(data) && data?.map((item) => item.symbol),
        labels: {
          step: 1,
          rotation: -45,
          align: "center",
          style: {
            color: localStorage.getItem("color"),
            fontSize: "11px",
          },
        },
        crosshair: true,
      },
      yAxis: {
        title: {
          text: "",
        },
        labels: {
          enabled: false,
          style: {
            color: localStorage.getItem("color"),
          },
        },
        gridLineWidth: 0.1,
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        shared: true,
        useHTML: true,
        valueSuffix: " ",
        pointFormatter: function () {
          return (
            '<span style="color:' +
            this.color +
            '">●</span>' +
            "<span>" +
            " " +
            this.name +
            ": <b>" +
            this.y +
            "</b></span>  <b>" +
            "</b><br/>"
          );
        },
      },
      plotOptions: {
        column: {
          colorByPoint: true, // enable per-point coloring
          threshold: 0, // set the threshold at zero
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: "{point.y:.1f}", // Hiển thị giá trị trên cột với 1 số thập phân
            style: {
              color: localStorage.getItem("color"),
              fontSize: "7px",
            },
          },
        },
        series: {
          borderRadius: 2,
          turboThreshold: 100_000_000,
        },
      },
      boost: {
        useGPUTranslations: true,
        usePreAllocated: true,
      },
      series: [
        {
          data:
            Array.isArray(data) &&
            data?.map((item) => {
              return {
                name: item.symbol,
                y: +item.contribute_price.toFixed(2),
                color: item.contribute_price > 0 ? "#15b313" : "#ff0000",
              };
            }),
        },
      ],
    };
  }

  return (
    <>
      <div className="md:flex sm:block items-center justify-between border-solid border-[#25558d] border-b-2 border-t-0 border-x-0 pt-[2px]">
        <div>
          <span className="dark:text-white text-black xl:text-[14px] lg:text-base font-semibold">
            Top đóng góp điểm số theo:{" "}
          </span>
          <select
            onChange={(e) => {
              handleQueryApiType(e.target.value);
              setHandleQueryType(e.target.value);
            }}
            className={`dark:bg-[#151924] bg-gray-100 text-[14px] ml-[2px] text-[#007dc6] border-0 md:inline sm:hidden xs:hidden xxs:hidden`}
          >
            <option value="0">Cổ phiếu</option>
            <option value="1">Ngành LV1</option>
            <option value="2">Ngành LV2</option>
            <option value="3">Ngành LV3</option>
          </select>
        </div>
        <div className="flex items-center justify-center">
          <select
            onChange={(e) => {
              handleQueryApiType(e.target.value);
              setHandleQueryType(e.target.value);
            }}
            className={`dark:bg-[#151924] bg-gray-100 text-[14px] ml-1.5 text-[#007dc6] border-0 md:hidden sm:inline`}
          >
            <option value="0">Cổ phiếu</option>
            <option value="1">Ngành LV1</option>
            <option value="2">Ngành LV2</option>
            <option value="3">Ngành LV3</option>
          </select>
          <select
            onChange={(e) => {
              handleQueryApiOrder(e.target.value);
            }}
            className={`bg-[#0050AD] p-[2.5px] text-[14px] ml-2 text-white border-0`}
          >
            <option value="0">Phiên gần nhất</option>
            <option value="1">5 phiên</option>
            <option value="2">1 tháng</option>
            <option value="3">YtD</option>
          </select>
        </div>
      </div>
      <div className="mt-1 mb-3 dark:text-white text-black">
        <span>
          <button
            onClick={() => {
              handleClick("hsx");
              handleQueryApiExchange("hsx");
            }}
            className={
              activeButton === "hsx"
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
              handleClick("hnx");
              handleQueryApiExchange("hnx");
            }}
            className={
              activeButton === "hnx"
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
              handleClick("vn30");
              handleQueryApiExchange("vn30");
            }}
            className={
              activeButton === "vn30"
                ? "border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer"
                : "border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer"
            }
          >
            VN30
          </button>
        </span>
      </div>
      {chartTickerContribute.length ? (
        <div id="chart-container">
          <div className="h-[333px]">
            <HighchartsReact
              highcharts={Highcharts}
              options={options}
              containerProps={{ style: { height: "100%", width: "100%" } }}
            />
          </div>
        </div>
      ) : (
        <div id="chart-container">
          <div className="h-[289px]">
            <div className="mt-14">
              <Loading />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BarChart;
