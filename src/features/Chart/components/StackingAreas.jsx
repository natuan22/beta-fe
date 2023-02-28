import React, { useCallback } from "react";
import Chart from "react-google-charts";
import { useSelector } from "react-redux";
import moment from "moment";
const StackingAreas = () => {
  const data = useSelector((state) => state.chart.dataStackingArea);
  if (!data || !data.data || !data.data.length) return null;

  const dataStackChart = data.data?.map((item) => {
    return [
      moment(item.time, "HH:mm:ss").format("HH:mm"),
      item.advance,
      item.noChange,
      item.decline,
    ];
  });
  console.log(dataStackChart);

  const dataStructure = [["Time", "Tăng", "Không đổi", "Giảm"]];

  const dataRenderUpdated = dataStructure.concat(dataStackChart);

  const options_stacked = {
    areaOpacity:0.8,
    axisColor: "#f59e0b",
    colors: ["#19d216", "#ffd51e", "#FF3906"],
    backgroundColor: "transparent",
    isStacked: "percent",
    height: 400,
    legend: {
      position: "top",
      maxLines: 3,
      textStyle: {
        color: "#f59e0b",
      },
    },
    vAxis: { minValue: 0, textStyle: { color: "#f59e0b" } },
    hAxis: {
      
      format: "HH:mm",
      textStyle: { color: "#f59e0b", fontSize: 11 },
    },
    selectionMode: "multiple",
    aggregationTarget: "category",
    annotations: {
      textStyle: {
        fontSize: 10,
        color: "#BAA806",
        auraColor: "none",
      },
      boxStyle: {
        stroke: "red",
        strokeWidth: 1,
        gradient: {
          color1: "red",
          color2: "red",
          x1: "0%",
          y1: "0%",
          x2: "100%",
          y2: "100%",
        },
      },
    },
  };
  return (
    <div>
      <Chart
        chartType="AreaChart"
        width="100%"
        height={400}
        data={dataRenderUpdated}
        options={options_stacked}
      />
    </div>
  );
};

export default StackingAreas;
