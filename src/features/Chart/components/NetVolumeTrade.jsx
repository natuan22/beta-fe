import React, { useEffect, useRef } from "react";
import {Chart} from "chart.js";
import { useState } from "react";

const NetVolumeTrade = () => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const myChartRef = chartRef.current.getContext("2d");
    if (chartInstance) {
      chartInstance.destroy();
    }
    new Chart(myChartRef, {
      type: "bar",
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "Positive Dataset",
            data: [10, 20, 30, 40, 50, 60, 70],
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
            yAxisID: "y-axis-1",
          },
          {
            label: "Negative Dataset",
            data: [-20, -10, -30, 40, -50, 20, -30],
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            yAxisID: "y-axis-1",
          },
          {
            label: "Mixed Dataset",
            data: [25, -30, 40, -35, 50, -45, 60],
            backgroundColor: "rgba(255, 206, 86, 0.2)",
            borderColor: "rgba(255, 206, 86, 1)",
            borderWidth: 1,
            yAxisID: "y-axis-1",
          },
          {
            label: "Line Dataset",
            data: [25, 30, 35, 40, 45, 50, 55],
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            type: "line",
            fill: false,
            yAxisID: "y-axis-2",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              type: "linear",
              display: true,
              position: "left",
              id: "y-axis-1",
            },
            {
              type: "linear",
              display: true,
              position: "right",
              id: "y-axis-2",
              gridLines: {
                drawOnChartArea: false,
              },
            },
          ],
        },
      },
    });
  }, []);

  return <canvas ref={chartRef} />;
};

export default NetVolumeTrade;
