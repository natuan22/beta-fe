import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";
import Loading from "../utils/Loading";
import socket from "../utils/socket";

const AreaChart = () => {
  const chartRef = useRef();
  const data1 = useSelector((state) => state.chart.dataChart1);
  const data2 = useSelector((state) => state.chart.dataChart2);
  const dataForRender1 = Array.isArray(data1)
    ? data1.map((item) => item.value.toFixed(3))
    : [];
  const dataForRender2 = Array.isArray(data2)
    ? data2.map((item) => item.value.toFixed(3))
    : [];
  const [dataSocket, setDataSocket] = useState([]);
  useEffect(() => {
    if (data1?.length){
      setDataSocket(data1);
    }
    socket.on("listen-thanh-khoan-phien-hien-tai", (newData) => {
      console.log(newData)
      setDataSocket((preData) => [...preData, ...newData]);
    });
  }, []);
  const timeLine = Array.isArray(data2)
    ? data2.map((item) => {
        let date = new Date(item.time - 200000000 + 1997000);
        // Hours part from the timestamp
        let hours = date.getHours();
        // Minutes part from the timestamp
        let minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        let seconds = "0" + date.getSeconds();

        // Will display time in 10:30:23 format
        let formattedTime =
          hours + ":" + minutes.substr(-2)
        return formattedTime;
      })
    : [];

  useEffect(() => {
    const chartCanvas = chartRef.current;
    if (chartCanvas) {
      const chart = new Chart(chartCanvas, {
        type: "line",
        data: {
          labels: timeLine,
          datasets: [
            {
              label: "GTGD hôm nay",
              data: dataForRender1,
              borderColor: "green",
              fill: true,
              backgroundColor: "rgba(27, 231, 54, 0.5)",
              borderWidth: 0,
            },
            {
              label: "GTGD phiên trước",
              data: dataForRender2,
              borderColor: "red",
              fill: true,
              backgroundColor: "rgba(227, 74, 103, 0.5)",
              borderWidth: 0,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          scales: {
            x: {
              ticks: {
                color: "white",
              },
              display: true,
              title: {
                color: "#F1950C",
                display: true,
                text: "Thời gian giao dịch ",
              },
            },
            y: {
              ticks: {
                color: "white",
              },
              display: true,
              title: {
                color: "#F1950C",
                display: true,
                text: "GTDT (tỷ đồng)",
              },
            },
          },
          plugins: {
            legend: {
              display: false,
              labels: {
                color: "white",
              },
            },
            title: {
              color: "#F1950C",
              display: true,
              text: "",
            },
          },
        },
      });

      return () => {
        chart.destroy();
      };
    }
  }, [data1, data2]);

  return (
    <div>
      {data1.length && data2.length ? (
        <div>
          <canvas
            className="xs:h-[400px] xxs:h-[400px] sm:h-[400px] md:h-[400px] lg:h-[400px] xl:h-[815px] 2xl:h-[672px] 3xl:h-[592px] bg-black"
            ref={chartRef}
          ></canvas>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default AreaChart;
