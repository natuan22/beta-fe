import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Chart from "react-google-charts";
import { useSelector } from "react-redux";
import moment from "moment";
const StackingAreas = () => {
  const data = useSelector((state) => state.chart.dataStackingArea);
  const [dataRender, setDataRender] = useState([]);

  useEffect(() => {
    if (!data || !data.data || !data.data.length) {
      return;
    }
    
    const timeFormat = ['09:15','09:30','09:45','10:00','10:15','10:30','10:45','11:00','11:15','11:30','13:00','13:15','13:30','13:45','14:00','14:15','14:30','14:45'];

    const filteredData = data.data.filter(item => timeFormat.includes(moment(item.time, 'HH:mm:ss').format('HH:mm')));
    console.log(filteredData)
    setDataRender(filteredData);
  }, [data]);

    
  const dataStructure =[ ['Time', 'Tăng', 'Giảm', 'Không đổi']]
  const dataArr = dataRender.map(item => {
    return [moment(item.time, 'HH:mm:ss').format('HH:mm'), item.advance, item.decline, (415 - (item.advance+item.decline))]
  })
  const dataRenderUpdated = dataStructure.concat(dataArr)
 
 

  const options_stacked = {
    axisColor: "white",
    colors: ["green", "#BAA806", "red"],
    backgroundColor: "transparent",
    isStacked: "percent",
    height: 300,
    legend: {
      position: "top",
      maxLines: 3,
      textStyle: {
        color: "black",
      },
    },
    vAxis: { minValue: 0, textStyle: { color: "#000" } },
    hAxis: {
      textStyle: { color: "#000" },
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
        height="400px"
        data={dataRenderUpdated}
        options={options_stacked}
      />
    </div>
  );
};

export default StackingAreas;
