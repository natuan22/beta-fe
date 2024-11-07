import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LegendBtn from "../../../../../../utils/Component/BtnLegend";
import { hashTb } from "../../utils/constant";

const ColumnPerChart = ({ dataPer, timeLine }) => {
  const [configChartPer, setConfigChartPer] = useState(null);

  const [colorText, setColorText] = useState(localStorage.getItem("color"));
  const color = useSelector((state) => state.color.colorText);

  useEffect(() => {
    setColorText(color);
  }, [color]);

  const sortedDataPerArray = dataPer?.sort((a, b) => {
    const aIndex = Object.keys(hashTb).findIndex(
      (key) => hashTb[key] === a.name,
    );
    const bIndex = Object.keys(hashTb).findIndex(
      (key) => hashTb[key] === b.name,
    );
    return aIndex - bIndex;
  });

  const callBackHighchartPer = (chart) => {
    setConfigChartPer(chart);
  };
  const [visibleSeriesCount, setVisibleSeriesCount] = useState();

  const handleLastLegend = (visibleLegends) => { setVisibleSeriesCount(visibleLegends) };

  const optionsPer = {
    accessibility: { enabled: false },
    credits: false,
    chart: { type: "column", backgroundColor: "transparent" },
    title: { text: "" },
    xAxis: {
      categories: timeLine,
      labels: { style: { color: localStorage.getItem("color") } },
    },
    yAxis: {
      // min: 0,
      // max: 100,
      title: { text: "", style: { color: localStorage.getItem("color") } },
      stackLabels: {
        enabled: visibleSeriesCount === 1,
        formatter: function () { return this.total },
        style: {
          fontSize: "10px",
          fontWeight: "bold",
          color: localStorage.getItem("color"),
        },
      },
      labels: {
        style: { color: localStorage.getItem("color") },
        formatter: function () {
          return this.value + "%";
        },
      },
      gridLineWidth: 0.1,
    },
    legend: {
      enabled: false,
      itemStyle: {
        color: localStorage.getItem("color"),
        fontWeight: "bold",
      },
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: { enabled: false },
      },
      series: {
        turboThreshold: 100_000_000,
      },
    },
    // boost: {
    //   useGPUTranslations: true,
    //   usePreAllocated: true,
    // },
    series: dataPer,
  };

  return (
    <div>
      <div className="h-[450px]">
        <HighchartsReact
          highcharts={Highcharts}
          options={optionsPer}
          callback={callBackHighchartPer}
          containerProps={{ style: { height: "100%", width: "100%" } }}
        />
      </div>
      <div className="legendArea ml-[70px]">
        <LegendBtn chart={configChartPer} data={sortedDataPerArray} handleLastLegend={handleLastLegend} />
      </div>
    </div>
  );
};

export default ColumnPerChart;
