import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import formatNumberCurrency from "../../../../../../helper/formatNumberCurrency";

const StackColumnVal = ({ data }) => {
  const [series, setSeries] = useState([]);
  const [hasData, setHasData] = useState(false);

  const isValidData = (buyData, sellData) => {
    return [
      buyData.large,
      buyData.medium,
      buyData.small,
      sellData.large,
      sellData.medium,
      sellData.small,
    ].some((val) => val >= 0);
  };

  useEffect(() => {
    if (data) {
      // Destructure buyValData và sellValData
      const {
        large: buyLarge = 0,
        medium: buyMedium = 0,
        small: buySmall = 0,
      } = data.buyValData || {};
      const {
        large: sellLarge = 0,
        medium: sellMedium = 0,
        small: sellSmall = 0,
      } = data.sellValData || {};

      // Kiểm tra tính hợp lệ của dữ liệu
      if (isValidData(data.buyValData || {}, data.sellValData || {})) {
        const dataSeries = [
          {
            name: "Lớn",
            data: [
              { y: +(buyLarge / 1_000_000_000).toFixed(2), color: "#00d060" },
              { y: +(sellLarge / 1_000_000_000).toFixed(2), color: "#d34037" },
            ],
          },
          {
            name: "Trung bình",
            data: [
              { y: +(buyMedium / 1_000_000_000).toFixed(2), color: "#0c7640" },
              { y: +(sellMedium / 1_000_000_000).toFixed(2), color: "#812a24" },
            ],
          },
          {
            name: "Nhỏ",
            data: [
              { y: +(buySmall / 1_000_000_000).toFixed(2), color: "#144d31" },
              { y: +(sellSmall / 1_000_000_000).toFixed(2), color: "#572724" },
            ],
          },
        ];

        setSeries(dataSeries);
        setHasData(true);
      } else {
        setHasData(false);
      }
    }
  }, [data]);

  // Cấu hình biểu đồ
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
      categories: ["Mua", "Bán"],
      labels: {
        style: {
          color: localStorage.getItem("color"),
          fontSize: "12px", // Độ lớn của chữ trục y
          fontWeight: "bold",
        },
      },
    },
    yAxis: {
      min: 0,
      gridLineWidth: 0.1,
      stackLabels: {
        enabled: true,
        formatter: function () {
          const isBuySeries = this.x === 0;
          const totalValue = data?.totalBuyVal + data?.totalSellVal;
          const percentage = isBuySeries
            ? (data?.totalBuyVal / totalValue) * 100
            : (data?.totalSellVal / totalValue) * 100;

          const color = isBuySeries ? "#22c55e" : "#ef4444";

          return `<span style="color: ${color};">${formatNumberCurrency(
            this.total,
          )} (${
            totalValue > 0 ? `${formatNumberCurrency(percentage)}%` : "-"
          })</span>`;
        },
        style: {
          color: localStorage.getItem("color"),
          fontWeight: "bold",
        },
      },
      title: {
        text: "Tỷ VNĐ",
        style: {
          color: localStorage.getItem("color"),
          fontSize: "9px", // Độ lớn của chữ trục y
          fontWeight: "bold",
        },
      },
      labels: {
        align: "right", // Canh chỉnh label về phía bên phải
        style: {
          color: localStorage.getItem("color"),
          fontSize: "9px", // Độ lớn của chữ trục y
          fontWeight: "bold",
        },
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: true,
          formatter: function () {
            return this.y !== 0 ? formatNumberCurrency(this.y) : null;
          },
          style: {
            color: localStorage.getItem("color"),
            fontWeight: "bold",
          },
        },
      },
      series: {
        turboThreshold: 100_000_000,
      },
    },
    // boost: {
    //   useGPUTranslations: true,
    //   usePreAllocated: true,
    // },
    series: series,
    tooltip: {
      shared: true,
      useHTML: true,
      valueSuffix: " ",
      backgroundColor: "#fff",
      pointFormatter: function () {
        return (
          '<span style="color:' +
          this.color +
          '">●</span> ' +
          this.series.name +
          ": <b>" +
          formatNumberCurrency(this.y) +
          "</b> tỷ đồng</span><br/>"
        );
      },
    },
  };

  return (
    <div>
      {hasData ? (
        <div className="h-[335px]">
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            containerProps={{ style: { height: "100%", width: "100%" } }}
          />
        </div>
      ) : (
        <div className="h-[300px] text-center mt-5 font-semibold dark:text-white text-black">
          Chưa có dữ liệu giao dịch
        </div>
      )}
    </div>
  );
};

export default StackColumnVal;
