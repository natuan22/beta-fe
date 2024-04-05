import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Top10Buy = () => {
  const dataTopNetForeignChange = useSelector(
    (state) => state.chart.dataTopNetForeignChange
  );
  const [data, setData] = useState([]);
  const [colorText, setColorText] = useState(localStorage.getItem("color"));
  const color = useSelector((state) => state.color.colorText);

  useEffect(() => {
    setColorText(color);
  }, [color]);
  useEffect(() => {
    if (dataTopNetForeignChange.data) setData(dataTopNetForeignChange.data);
  }, [dataTopNetForeignChange]);

  const netBuy = data.slice(0, 10);

  const optionsBuy = {
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
        data: netBuy.map((item) => +item.net_value.toFixed(2)),
        color: "#15b313",
      },
    ],
    xAxis: [
      {
        categories: netBuy.map((item) => item.ticker),
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
        <HighchartsReact
          highcharts={Highcharts}
          options={optionsBuy}
          containerProps={{ style: { height: "654px", width: "100%" } }}
        />
      </div>
    </>
  );
};

export default Top10Buy;
