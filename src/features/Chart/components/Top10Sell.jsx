import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Top10Sell = () => {
  const dataTopNetForeignChange = useSelector(
    (state) => state.chart.dataTopNetForeignChange,
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

  const netSell = data.slice(-10).sort(function () {
    return -1;
  });

  const optionsSell = {
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
        data: netSell.map((item) => +item.net_value.toFixed(2)),
        color: "#ff0000",
      },
    ],
    xAxis: [
      {
        categories: netSell.map((item) => item.ticker),
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
    // boost: {
    //   useGPUTranslations: true,
    //   usePreAllocated: true,
    // },
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
        turboThreshold: 100_000_000,
      },
    },
  };

  return (
    <>
      <div className="chart">
        <HighchartsReact
          highcharts={Highcharts}
          options={optionsSell}
          containerProps={{ style: { height: "653px", width: "100%" } }}
        />
      </div>
    </>
  );
};

export default Top10Sell;
