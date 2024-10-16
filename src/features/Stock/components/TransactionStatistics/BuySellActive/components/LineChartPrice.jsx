import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import "../utils/styles/hide-legend-icon.css";
import "../utils/styles/triangleLineChart.css";

const LineChartPrice = ({ data }) => {
  const [seriesConfigLineChart, setSeriesConfigLineChart] = useState(0);
  const [seriesData, setSeriesData] = useState([]);

  useEffect(() => {
    if (data?.data.length > 0) {
      const dataReversed = [...data.data].reverse();

      const dataRenderLine = dataReversed.map((item) => [
        item.timestamp,
        item.matchPrice,
      ]);

      const dataRenderVol = dataReversed.map((item) => ({
        x: item.timestamp,
        y: item.volume,
        color:
          item.action === "B" ? "green" : item.action === "S" ? "red" : "black",
      }));

      const dataRenderMB = dataReversed
        .map((item) => ({
          x: item.timestamp,
          y:
            item.totalSellVolToNow !== 0
              ? +(item.totalBuyVolToNow / item.totalSellVolToNow).toFixed(2)
              : 0, // Sử dụng null nếu phép chia sẽ dẫn đến Infinity
        }))
        .filter(
          (item) =>
            item.x >=
            Date.UTC(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDate(),
              9,
              30
            )
        );

      const dataRenderArea = dataReversed.map((item) => {
        const totalValueDifference = +(
          (item.totalBuyValToNow - item.totalSellValToNow) /
          1_000_000_000
        ).toFixed(2);
        return {
          x: item.timestamp,
          y: totalValueDifference,
          color: totalValueDifference > 0 ? "green" : "red",
        };
      });

      // Cấu hình series option 1: Volume và M/B
      const seriesOption1 = [
        {
          type: "column",
          name: "Khối lượng",
          data: dataRenderVol.length ? dataRenderVol : [null],
          yAxis: 1,
          dataLabels: {
            enabled: false,
          },
        },
        {
          type: "line",
          name: "M/B",
          data: dataRenderMB.length ? dataRenderMB : [null],
          yAxis: 2,
          zoneAxis: "y",
          zones: [{ value: 1, color: "#d92323" }, { color: "#24bf0f" }],
          dataLabels: {
            enabled: true,
            formatter: function () {
              return this.point.index === this.series.data.length - 1
                ? this.point.y.toFixed(2)
                : null;
            },
            style: {
              color: localStorage.getItem("color"),
              fontSize: "11px",
              fontWeight: "bold",
              textOutline: "1px contrast",
            },
          },
        },
      ];

      // Cấu hình series option 2: Lũy kế
      const seriesOption2 = [
        {
          type: "area",
          name: "Lũy kế",
          data: dataRenderArea.length ? dataRenderArea : [null],
          yAxis: 1,
          zoneAxis: "y",
          zones: [{ value: 0, color: "#d92323" }, { color: "#24bf0f" }],
          dataLabels: {
            enabled: true,
            formatter: function () {
              return this.point.index === this.series.data.length - 1
                ? this.point.y.toFixed(2)
                : null;
            },
            style: {
              color: localStorage.getItem("color"),
              fontSize: "11px",
              fontWeight: "bold",
              textOutline: "1px contrast",
            },
          },
        },
      ];

      const combinedSeries = [
        {
          type: "line",
          name: "Giá",
          data: dataRenderLine.length ? dataRenderLine : [null],
          yAxis: 0,
          zoneAxis: "y",
          zones: [
            { value: data?.prevClosePrice, color: "red" },
            { color: "green" },
          ],
          dataLabels: {
            enabled: true,
            formatter: function () {
              return this.point.index === this.series.data.length - 1
                ? this.point.y.toFixed(2)
                : null;
            },
            style: {
              color: localStorage.getItem("color"),
              fontSize: "11px",
              fontWeight: "bold",
              textOutline: "1px contrast",
            },
          },
        },
        ...(seriesConfigLineChart === 0 ? seriesOption1 : seriesOption2), // Chọn series cấu hình dựa vào `seriesConfig`
      ];

      setSeriesData(combinedSeries);
    }
  }, [data, seriesConfigLineChart]);

  const chartOptions = {
    chart: { backgroundColor: "transparent" },
    accessibility: { enabled: false },
    credits: false,
    title: { text: "" },
    legend: {
      enabled: true,
      verticalAlign: "top",
      itemStyle: {
        color: localStorage.getItem("color"),
        fontWeight: "bold",
        fontSize: "11px",
      },
    },
    xAxis: {
      type: "datetime",
      tickInterval: 30 * 60 * 1000,
      min: Date.UTC(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        9,
        0
      ),
      max: Date.UTC(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        15,
        0
      ),
      labels: {
        rotation: 0,
        style: { color: localStorage.getItem("color"), fontSize: "9px" },
      },
    },
    yAxis: [
      {
        top: "5%",
        height: "50%",
        title: "",
        gridLineWidth: 0,
        plotLines: [
          {
            value: data?.prevClosePrice,
            color: "#EF9C21",
            dashStyle: "dot",
            width: 1.5,
            zIndex: 2,
          },
        ],
        labels: {
          style: {
            color: localStorage.getItem("color"),
            fontSize: "9px",
            fontWeight: "bold",
          },
        },
      },
      {
        top: "60%",
        height: "40%",
        title: "",
        gridLineWidth: 0,
        labels: {
          x: 22,
          style: {
            color: localStorage.getItem("color"),
            fontSize: "9px",
            fontWeight: "bold",
          },
        },
        title: {
          text: seriesConfigLineChart === 0 ? "" : "Tỷ VNĐ",
          style: {
            color: localStorage.getItem("color"),
            fontSize: "9px",
            fontWeight: "bold",
          },
        },
      },
      {
        top: "60%",
        height: "40%",
        gridLineWidth: 0,
        title: "",
        labels: {
          style: {
            color: localStorage.getItem("color"),
            fontSize: "9px",
            fontWeight: "bold",
          },
        },
        opposite: true,
      },
    ],
    plotOptions: {
      series: {
        marker: { radius: 1 },
        lineWidth: 2,
        color: "#000",
        turboThreshold: 100_000_000_000,
      },
    },
    tooltip: {
      shared: true,
      useHTML: true,
      valueSuffix: " ",
      backgroundColor: "#fff",
      pointFormatter: function () {
        return `<span style="color:${this.color}">●</span> ${this.series.name}: <b>${this.y}</b><br/>`;
      },
    },
    series: seriesData || [null],
  };

  return (
    <div>
      <div className="w-fit">
        <button
          className={`custom-btn-line ${
            seriesConfigLineChart === 0 ? "active-btn-line" : "btn-2-line"
          }`}
          onClick={() => setSeriesConfigLineChart(0)}
        >
          Khối lượng M/B chủ động
        </button>
        <button
          className={`custom-btn-line ml-4 xs:translate-x-0 xxs:-translate-x-4 xs:mt-0 xxs:mt-2 ${
            seriesConfigLineChart === 1 ? "active-btn-line" : "btn-2-line"
          }`}
          onClick={() => setSeriesConfigLineChart(1)}
        >
          Lũy kế
        </button>
      </div>
      {data ? (
        <div>
          {seriesConfigLineChart === 0 ? (
            <div className={`${seriesData ? "moving-left-div" : ""} opacity-0`}>
              <div className="relative flex z-10 top-[34px] 2xl:left-[193px] xl:left-[325px] lg:left-[351px] md:left-[238px] sm:left-[105px] xs:left-[80px] xxs:left-[53px] w-[16px] h-[2px]">
                <div className="w-[8px] h-[2px] bg-[#008000]"></div>
                <div className="w-[8px] h-[2px] bg-[#ff0000]"></div>
              </div>
              <div className="relative z-10 top-[25px] 2xl:left-[260px] xl:left-[393px] lg:left-[420px] md:left-[305px] sm:left-[172px] xs:left-[147px] xxs:left-[121px] w-[8px] h-[6px]">
                <div className="absolute" id="triangle-topright-line"></div>
                <div id="triangle-bottomleft-line"></div>
              </div>
              <div className="relative flex z-10 top-[26px] 2xl:left-[359px] xl:left-[492px] lg:left-[518px] md:left-[401px] sm:left-[270px] xs:left-[245px] xxs:left-[218px] w-[16px] h-[2px]">
                <div className="w-[8px] h-[2px] bg-[#008000]"></div>
                <div className="w-[8px] h-[2px] bg-[#ff0000]"></div>
              </div>
            </div>
          ) : (
            <div
              className={`${seriesData ? "moving-right-div" : ""} opacity-0`}
            >
              <div className="relative flex z-10 top-[34px] 2xl:left-[237px] xl:left-[370px] lg:left-[397px] md:left-[284px] sm:left-[150px] xs:left-[125px] xxs:left-[98px] w-[16px] h-[2px]">
                <div className="w-[8px] h-[2px] bg-[#008000]"></div>
                <div className="w-[8px] h-[2px] bg-[#ff0000]"></div>
              </div>
              <div className="relative z-10 top-[43px] 2xl:left-[303px] xl:left-[435px] lg:left-[463px] md:left-[345px] sm:left-[215px] xs:left-[190px] xxs:left-[162px] w-[8px] h-[8px]">
                <div className="relative flex top-[-16px] left-[2px] z-10 w-[16px] h-[2px]">
                  <div className="w-[6px] h-[2px] bg-[#008000]"></div>
                  <div className="w-[6px] h-[2px] bg-[#ff0000]"></div>
                </div>
                <div className="relative flex top-[-15px] left-[4px] z-10 w-[16px] h-[2px]">
                  <div className="w-[4px] h-[2px] bg-[#008000]"></div>
                  <div className="w-[4px] h-[2px] bg-[#ff0000]"></div>
                </div>
                <div className="relative flex top-[-14px] left-[6px] z-10 w-[16px] h-[2px]">
                  <div className="w-[1.5px] h-[2px] bg-[#008000]"></div>
                  <div className="w-[1.5px] h-[2px] bg-[#ff0000]"></div>
                </div>
              </div>
            </div>
          )}
          <div className="h-[672px] line-chart-mb">
            <HighchartsReact
              highcharts={Highcharts}
              options={chartOptions}
              containerProps={{ style: { height: "100%", width: "100%" } }}
            />
          </div>
        </div>
      ) : (
        <div className="text-center mt-5 font-semibold dark:text-white text-black">
          Chưa có dữ liệu giao dịch
        </div>
      )}
    </div>
  );
};

export default LineChartPrice;
