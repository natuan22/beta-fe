import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataBarChartRight } from "../thunk";
import Loading from "../utils/Loading";
import socket from "../utils/socket";

const BarChartRight = () => {
  const dispatch = useDispatch();
  const dataBarChartRight = useSelector(
    (state) => state.chart.dataBarChartRight,
  );
  const [data, setData] = useState(dataBarChartRight?.data ?? []);
  const [colorText, setColorText] = useState(localStorage.getItem("color"));
  const color = useSelector((state) => state.color.colorText);

  const [query, setQuery] = useState("hose");
  const [socketOld, setSocketOld] = useState("");
  useEffect(() => {
    setColorText(color);
  }, [color]);

  useEffect(() => {
    if (dataBarChartRight.data) setData(dataBarChartRight?.data);
  }, [dataBarChartRight]);
  useEffect(() => {
    conSocket(query);
    setSocketOld(query);
  }, [query]);

  const disconnectSocket = (socketOld) => {
    if (socket.active) {
      socket.off(`listen-top-foreign-${socketOld}`);
    }
  };

  const conSocket = (key) => {
    socket.on(`listen-top-foreign-${key}`, (newData) => {
      setData(
        newData.sort((a, b) => b.net_value_foreign - a.net_value_foreign),
      );
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
      categories: data?.map((item) => item.ticker),
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
      title: {
        text: "",
      },
      labels: {
        enabled: false,
        style: {
          color: localStorage.getItem("color"),
        },
      },
      min: Math.min(
        ...data?.map((item) => item.net_value_foreign / 1000000000),
        0,
      ),
      max: Math.max(
        ...data?.map((item) => item.net_value_foreign / 1000000000),
        0,
      ),
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
            fontSize: "6px",
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
        data: data?.map((item) => {
          return {
            name: item.ticker,
            y: +(item.net_value_foreign / 1000000000).toFixed(2),
            color:
              item.net_value_foreign / 1000000000 > 0 ? "#15b313" : "#ff0000",
          };
        }),
      },
    ],
  };

  return (
    <>
      <div>
        <span className="font-semibold uppercase text-sm dark:text-white text-black">
          Top nước ngoài mua bán ròng
        </span>
        <select
          className={`dark:bg-[#151924] bg-gray-100 dark:hover:bg-gray-900 hover:bg-gray-300 ml-2 rounded-lg p-1 text-base text-[#007dc6]`}
          onChange={(event) => {
            disconnectSocket(socketOld);
            setQuery(event.target.value);
            dispatch(fetchDataBarChartRight(event.target.value));
          }}
        >
          <option value="hose">HSX</option>
          <option value="hnx">HNX</option>
          <option value="upcom">UPCOM</option>
        </select>
      </div>
      <div id="chart-container">
        {dataBarChartRight.data?.length ? (
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

export default BarChartRight;
