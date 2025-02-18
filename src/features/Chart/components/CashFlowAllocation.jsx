import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import formatNumberCurrency from "../../../helper/formatNumberCurrency";
import Loading from "../utils/Loading";
import socket from "../utils/socket";

const CashFlowAllocation = () => {
  const dataCashFlowAllocation = useSelector(
    (state) => state.chart.dataCashFlowAllocation,
  );
  const [data, setData] = useState([]);
  const [colorText, setColorText] = useState(localStorage.getItem("color"));
  const color = useSelector((state) => state.color.colorText);

  useEffect(() => {
    setColorText(color);
  }, [color]);

  useEffect(() => {
    if (dataCashFlowAllocation.data) {
      setData(dataCashFlowAllocation.data);
    }
  }, [dataCashFlowAllocation]);

  useEffect(() => {
    if (dataCashFlowAllocation.data) {
      socket.on("listen-phan-bo-dong-tien", (newData) => {
        setData(newData);
      });
    }
  }, [data]);

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
      type: "category",
      labels: {
        style: {
          color: localStorage.getItem("color"),
        },
      },
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
    // boost: {
    //   useGPUTranslations: true,
    //   usePreAllocated: true,
    // },
    plotOptions: {
      column: {
        colorByPoint: true, // enable per-point coloring
        threshold: 0, // set the threshold at zero
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          // format: "{point.y:.1f}", // Hiển thị giá trị trên cột với 1 số thập phân
          formatter: function () {
            return formatNumberCurrency(this.y); // Định dạng số với dấu phân cách hàng nghìn
          },
          style: {
            color: localStorage.getItem("color"),
            fontSize: "11px",
          },
        },
      },
      series: {
        borderRadius: 2,
        turboThreshold: 100_000_000,
      },
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
    series: [
      {
        data: [
          {
            name: "Tăng",
            y: +(data.increase / 1000000000).toFixed(2),
            color: "#19d216",
          }, // thiết lập màu cho cột tăng
          {
            name: "Giảm",
            y: +(data.decrease / 1000000000).toFixed(2),
            color: "#ff0000",
          }, // thiết lập màu cho cột giảm
          {
            name: "Không đổi",
            y: +(data.equal / 1000000000).toFixed(2),
            color: "#ffd51e",
          }, // thiết lập màu cho cột không đổi
        ],
      },
    ],
  };

  return (
    <>
      <div id="chart-container">
        {dataCashFlowAllocation.data ? (
          <div className="h-[300px]">
            <HighchartsReact
              highcharts={Highcharts}
              options={options}
              containerProps={{ style: { height: "100%", width: "100%" } }}
            />
          </div>
        ) : (
          <div className="mt-14 mb-[100px] flex flex-col items-center justify-center  ">
            <Loading />
          </div>
        )}
      </div>
    </>
  );
};

export default CashFlowAllocation;
