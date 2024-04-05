import moment from "moment";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../Chart/utils/Loading";
import { fetchDataCashFlowRatio } from "../../thunk";

const CashFlowRatio = () => {
  const dispatch = useDispatch();
  const { dataCashFlowRatio } = useSelector((state) => state.market);
  const [data, setData] = useState([]);
  const [colorText, setColorText] = useState(localStorage.getItem("color"));
  const color = useSelector((state) => state.color.colorText);

  const [activeButton, setActiveButton] = useState("all");
  const handleClick = (button) => {
    setActiveButton(button);
  };

  useEffect(() => {
    setColorText(color);
  }, [color]);

  const [queryApi, setQueryApi] = useState({
    exchange: "ALL",
    type: 1,
  });

  useEffect(() => {
    dispatch(fetchDataCashFlowRatio(queryApi.exchange, queryApi.type));
  }, [dispatch, queryApi]);

  useEffect(() => {
    if (dataCashFlowRatio) {
      setData(dataCashFlowRatio);
    }
  }, [dataCashFlowRatio]);

  const handleQueryApiExchange = (exchange) => {
    setQueryApi((prev) => ({ ...prev, exchange }));
  };
  const handleQueryApiType = (type) => {
    setQueryApi((prev) => ({ ...prev, type }));
  };

  const [hoveredValue, setHoveredValue] = useState(null);

  const uniqueDates = [];

  const datesSet = new Set();
  Array.isArray(data) &&
    data.map((item) => {
      const date = item.date;
      if (!datesSet.has(date)) {
        datesSet.add(date);
        uniqueDates.push(moment(date).format("DD/MM"));
      }
    });

  let caNhanPercent = [];
  let khoiNgoaiPercent = [];
  let tuDoanhPercent = [];

  for (let i = 0; i < data.length; i++) {
    let type = data[i].type;
    let percent = data[i].percent;

    switch (type) {
      case 0:
        khoiNgoaiPercent.push(+percent.toFixed(2));
        break;
      case 1:
        tuDoanhPercent.push(+percent.toFixed(2));
        break;
      case 2:
        caNhanPercent.push(+percent.toFixed(2));
        break;
      default:
        break;
    }
  }

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
      categories: uniqueDates,
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
      gridLineWidth: 0.2,
    },
    legend: {
      itemStyle: {
        fontSize: "10px",
        color: localStorage.getItem("color"),
      },
      enabled: true,
      labelFormatter: function () {
        const hoveredPoint = hoveredValue?.find(
          (point) => point.name === this.name
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
      },
    },
    series: [
      {
        name: "Tự doanh",
        data: tuDoanhPercent,
        color: "#0056FF",
        lineColor: "#0056FF",
        lineWidth: 2,
        marker: {
          enabled: false,
        },
      },
      {
        name: "Khối ngoại",
        data: khoiNgoaiPercent,
        color: "#ff0000",
        lineColor: "#ff0000",
        lineWidth: 2,
        marker: {
          enabled: false,
        },
      },
      {
        name: "Cá nhân",
        data: caNhanPercent,
        color: "#ffd300",
        lineColor: "#ffd300",
        lineWidth: 2,
        marker: {
          enabled: false,
        },
      },
    ],
  };

  return (
    <>
      <div className="flex items-center justify-between border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0">
        <span className="dark:text-white text-black xs:text-base xxs:text-[13px] font-semibold">
          Tỷ trọng dòng tiền theo nhóm NĐT
        </span>
        <div>
          <select
            className={`bg-[#1B496D] p-1 text-[1rem] text-white border-0`}
            onChange={(event) => {
              handleQueryApiType(event.target.value);
            }}
          >
            <option value="1">5 phiên</option>
            <option value="2">20 phiên</option>
            <option value="4">50 phiên</option>
            <option value="3">YtD</option>
            <option value="5">YoY</option>
          </select>
        </div>
      </div>
      <div className="pt-3 mb-3 dark:text-white text-black">
        <span>
          <button
            onClick={() => {
              handleClick("all");
              handleQueryApiExchange("all");
            }}
            className={
              activeButton === "all"
                ? "border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer"
                : "border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer"
            }
          >
            Toàn thị trường
          </button>
        </span>
        <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10 xxs:pl-5">
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
      {dataCashFlowRatio.length ? (
        <div className="xl:h-[300px] 2xl:h-[300px]">
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            containerProps={{ style: { height: "100%", width: "100%" } }}
          />
        </div>
      ) : (
        <div className="mt-12">
          <Loading />
        </div>
      )}
    </>
  );
};

export default CashFlowRatio;
