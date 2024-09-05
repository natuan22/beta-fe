import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { fetchDataROC5Phien } from "../thunk";
import chartStyle from "../utils/Chart.module.css";
import socket from "../utils/socket";
import Loading from "../utils/Loading";

const TopROC = () => {
  const dispatch = useDispatch();
  const dataROC = useSelector((state) => state.chart.dataROC5Phien);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("hsx");
  const [socketOld, setSocketOld] = useState("");
  const [colorText, setColorText] = useState(localStorage.getItem("color"));
  const color = useSelector((state) => state.color.colorText);

  useEffect(() => {
    setColorText(color);
  }, [color]);

  useEffect(() => {
    if (dataROC.data) {
      setData(dataROC.data);
    }
  }, [dataROC]);

  useEffect(() => {
    if (dataROC.data) {
      conSocket(query);
      setSocketOld(query);
    }
  }, [query]);

  const disconnectSocket = (socketOld) => {
    if (socket.active) {
      socket.off(`listen-top-roc-${socketOld}`);
    }
  };

  const conSocket = (key) => {
    socket.on(`listen-top-roc-${key}`, (newData) => {
      setData(newData.sort((a, b) => b["%5D"] - a["%5D"]));
    });
  };

  const incr10 = data.slice(0, 10);

  const decr10 = data.slice(-10).sort(function () {
    return -1;
  });

  const optionsDecr = {
    accessibility: {
      enabled: false,
    },
    credits: false,
    chart: {
      type: "bar",
      backgroundColor: "transparent",
    },
    title: {
      text: null,
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        name: "Giảm",
        data: decr10.map((item) => +item["%5D"].toFixed(2)),
        color: "#ff0000",
      },
    ],
    xAxis: [
      {
        categories: decr10.map((item) => item.ticker),
        reversed: true,
        opposite: true,
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
    ],
    yAxis: {
      gridLineWidth: 0,
      title: {
        text: null,
      },
      labels: {
        enabled: false,
        style: {
          color: localStorage.getItem("color"),
        },
      },
    },
    plotOptions: {
      bar: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: "{point.y:.1f}", // Hiển thị giá trị trên cột với 1 số thập phân
          style: {
            color: localStorage.getItem("color"),
            fontSize: "9px",
          },
        },
      },
      series: {
        borderRadius: 5,
      },
    },
  };

  const optionsIncr = {
    accessibility: {
      enabled: false,
    },
    credits: false,
    chart: {
      type: "bar",
      backgroundColor: "transparent",
    },
    title: {
      text: null,
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        name: "Tăng",
        data: incr10.map((item) => +item["%5D"].toFixed(2)),
        color: "#15b313",
      },
    ],
    xAxis: [
      {
        categories: incr10.map((item) => item.ticker),
        reversed: true,
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
    ],
    yAxis: {
      gridLineWidth: 0,
      title: {
        text: null,
      },
      labels: {
        enabled: false,
        style: {
          color: localStorage.getItem("color"),
        },
      },
    },
    plotOptions: {
      bar: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: "{point.y:.1f}", // Hiển thị giá trị trên cột với 1 số thập phân
          style: {
            color: localStorage.getItem("color"),
            fontSize: "9px",
          },
        },
      },
      series: {
        borderRadius: 5,
      },
    },
  };

  return (
    <>
      <div className="chart">
        <div className="mx-2 mt-2 px-1.5 py-1.5 dark:bg-[#151924] bg-gray-100 shadow-md">
          <div className="dark:bg-[#151924] bg-gray-100 text-center px-20 pt-[19px]">
            <span className="font-semibold text-base uppercase dark:text-white text-black">
              Top 10 cổ phiếu tăng/giảm mạnh nhất sàn
            </span>
            <select
              className={`${chartStyle.selectStyle} dark:bg-[#151924] bg-gray-100 dark:hover:bg-gray-900 hover:bg-gray-300 mx-2 rounded-lg p-1 text-base text-[#0097B2]`}
              onChange={(event) => {
                disconnectSocket(socketOld);
                setQuery(event.target.value);
                dispatch(fetchDataROC5Phien(event.target.value));
              }}
            >
              <option value="hsx">HSX</option>
              <option value="hnx">HNX</option>
              <option value="upcom">UPCOM</option>
            </select>
            <span className="font-semibold uppercase dark:text-white text-black">
              qua 05 phiên gần nhất
            </span>
          </div>

          {dataROC.data?.length ? (
            <div className="grid grid-cols-2 dark:bg-[#151924] bg-gray-100">
              <div className="text-center mx-1">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={optionsDecr}
                  containerProps={{ style: { height: "609px", width: "100%" } }}
                />
              </div>

              <div className="text-center mx-1">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={optionsIncr}
                  containerProps={{ style: { height: "609px", width: "100%" } }}
                />
              </div>
            </div>
          ) : (
            <div className="text-center mt-6 h-[585px]">
              <Loading />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TopROC;
