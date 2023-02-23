import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";
import Loading from "../utils/Loading";

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
          hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
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
              borderColor: "lightgreen",
              fill: true,
              backgroundColor: "rgba(27, 231, 54, 0.3)",
              borderWidth: 0,
            },
            {
              label: "GTGD phiên trước",
              data: dataForRender2,
              borderColor: "red",
              fill: true,
              backgroundColor: "rgba(227, 74, 103,0.4)",
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: "Thời gian giao dịch ",
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: "GTDT (tỷ đồng)",
               
              },
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Thanh Khoản Thị Trường",
            },
          },
        },
      });

      return () => {
        chart.destroy();
      };
    }
  }, [data1, data2, chartRef]);

  return (
    <div>
      {data1.length && data2.length ? (
        <canvas ref={chartRef}></canvas>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default AreaChart;
