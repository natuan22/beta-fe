import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataBarChartLeft } from "../thunk";
import Loading from "../utils/Loading";
import socket from "../utils/socket";

const BarChartLeft = () => {
  const dispatch = useDispatch();
  const dataBarChartLeft = useSelector((state) => state.chart.dataBarChartLeft);
  const [data, setData] = useState(dataBarChartLeft?.data ?? []);

  const [colorText, setColorText] = useState(localStorage.getItem("color"));
  const color = useSelector((state) => state.color.colorText);

  const [query, setQuery] = useState("hsx");
  const [socketOld, setSocketOld] = useState("");

  useEffect(() => {
    setColorText(color);
  }, [color]);

  useEffect(() => {
    if (dataBarChartLeft) setData(dataBarChartLeft);
  }, [dataBarChartLeft]);

  useEffect(() => {
    if (dataBarChartLeft) {
      conSocket(query);
      setSocketOld(query);
    }
  }, [query]);

  const disconnectSocket = (socketOld) => {
    if (socket.active) {
      socket.off(`listen-${socketOld}-ticker-contribute-0`);
    }
  };

  const conSocket = (key) => {
    socket.on(`listen-${key}-ticker-contribute-0`, (newData) => {
      setData(newData.sort((a, b) => b.contribute_price - a.contribute_price));
    });
  };

  const options = {
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
          fontSize: 10,
        },
      },
      crosshair: true,
    },
    yAxis: {
      visible: true,
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
    // boost: {
    //   useGPUTranslations: true,
    //   usePreAllocated: true,
    // },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          format: "{point.y:.1f}", // Hiển thị giá trị trên cột với 1 số thập phân
          style: {
            color: localStorage.getItem("color"),
            fontSize: "7px",
          },
        },
        colorByPoint: true, // enable per-point coloring
        threshold: 0, // set the threshold at zero
        borderWidth: 0,
      },
      series: {
        borderRadius: 2,
        turboThreshold: 100_000_000,
      },
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

  return (
    <>
      <div>
        <span className="font-semibold uppercase text-sm dark:text-white text-black">
          Nhóm cổ phiếu dẫn dắt thị trường
        </span>

        <select
          className={`dark:bg-[#151924] bg-gray-100 dark:hover:bg-gray-900 hover:bg-gray-300 ml-2 rounded-lg p-1 text-base text-[#007dc6]`}
          onChange={(event) => {
            disconnectSocket(socketOld);
            setQuery(event.target.value);
            dispatch(fetchDataBarChartLeft(event.target.value));
          }}
        >
          <option value="hsx">HSX</option>
          <option value="hnx">HNX</option>
          <option value="vn30">VN30</option>
        </select>
      </div>
      <div id="chart-container">
        {dataBarChartLeft?.length ? (
          <div className="xl:h-[350px] 2xl:h-[350px]">
            <HighchartsReact
              highcharts={Highcharts}
              options={options}
              containerProps={{ style: { height: "100%", width: "100%" } }}
            />
          </div>
        ) : (
          <div className="mt-6 flex flex-col justify-center xl:h-[325px] 2xl:h-[325px]">
            <Loading />
          </div>
        )}
      </div>
    </>
  );
};

export default BarChartLeft;
