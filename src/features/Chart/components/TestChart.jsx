import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useSelector } from "react-redux";
import Loading from "../utils/Loading";
import moment from "moment";
import socket from "../utils/socket";

const TestChart = () => {
  const dataStackingChart = useSelector(
    (state) => state.chart.dataStackingArea
  );
  console.log(dataStackingChart)
  const dataAdvance = dataStackingChart&&dataStackingChart?.data&&dataStackingChart.data?.map(item => {
    return [item.time, item.advance]
  })
  const dataDecline = dataStackingChart&&dataStackingChart?.data&&dataStackingChart.data?.map(item => {
    return [item.time, item.decline]
  })
  const dataNoChange = dataStackingChart&&dataStackingChart?.data&&dataStackingChart.data?.map(item => {
    return [item.time, item.noChange]
  })
  const [dataIncr, setDataIncr] = useState([]);
  const [dataDecr, setDataDecr] = useState([]);
  const [dataNoCh, setDataNoCh] = useState([]);
  useEffect(() => {
    // Lấy dữ liệu ban đầu từ API
    if(dataStackingChart && dataStackingChart.data?.length){
      setDataIncr(dataAdvance)
      setDataDecr(dataDecline)
      setDataNoCh(dataNoChange)
    }
    // Lắng nghe sự kiện từ socket
    socket.on("listen-do-rong-thi-truong", (newData) => {
      let mapNewDataIncr = newData?.map(item => [item.time, item.advance])
      let mapNewDataDecr = newData?.map(item => [item.time, item.decline])
      let mapNewDataNoCh = newData?.map(item => [item.time, item.noChange])
      setDataIncr((preData)=> [...preData,...mapNewDataIncr])
      setDataDecr((preData)=> [...preData,...mapNewDataDecr])
      setDataNoCh((preData)=> [...preData,...mapNewDataNoCh])
    });
  }, [ ]);
    
  console.log( dataIncr)
  const [hoveredValue, setHoveredValue] = useState(null);
  if (!dataStackingChart.data || !dataStackingChart.data.length) {
    return <Loading />;
  }
  const options = {
    accessibility: {
      enabled: false,
    },
    credits: false,
    chart: {
      type: "area",
      zoomType: "x",
      backgroundColor: "transparent",
      style: {
        fontFamily: "Roboto",
      },
    },
    title: {
      text: "",
      style: {
        color: "#F1950C",
      },
    },
    xAxis: {
      type: 'datetime',
      tickInterval: 15 * 60 * 1000, 
      min:1680686100000, 
      max: 1680706800000, 
        labels: {
          formatter: function() {
            return moment.utc(this.value).format('HH:mm'); 
          },
          style: {
            color: "#fff",
          },
        },
      crosshair: {
        color: "red",
        width: 2,
      },
      title: {
        text: '', // Tiêu đề trục x
        style: {
          fontWeight: 'bold',
        }
      }
    },    
    yAxis: {
      title: {
        text: "",
        style: {
          color: "#fff",
        },
      },
      labels: {
        style: {
          color: "#fff",
        },
        formatter: function () {
          return this.value + "%";
        },
      },
    },
    legend: {
      itemStyle: {
        color: "#fff",
      },
      enabled: true,
      labelFormatter: function () {
        const hoveredPoint = hoveredValue?.find(
          (point) => point.name === this.name
        );
        const valueString = hoveredPoint ? `: ${hoveredPoint.value}` : "";
        return `${this.name}${valueString}`;
      },
    },
    tooltip: {
      shared: true,
      useHTML: true,
      valueSuffix: " ",
      pointFormatter: function () {
        return (
          '<span style="color:' +
          this.series.color +
          '">' +
          this.series.name +
          ": <b>" +
          this.y +
          "</b></span>  <b>" +
          "</b><br/>"
        );
      },
    },
    plotOptions: {
      area: {
        stacking: "percent",
        lineColor: "#ffffff",
        lineWidth: 1,
        tooltip: {
          valueSuffix: " ",
        },
      },
      series: {
        tooltip: {
          headerFormat: "<span style='font-size: 10px'>{point.key}</span><br/>",
          pointFormat:
            "<span style='color:{point.color}'>{series.name}: <b>{point.y}</b></span><br/>",
          valueDecimals: 2,
        },
        point: {
          events: {
            mouseOver: function () {
              const hoveredValues = [];
              const xValue = this.x;
              this.series.chart.series.forEach((series) => {
                const point = series.data.find((point) => point.x === xValue);
                if (point) {
                  hoveredValues.push({
                    name: series.name,
                    color: series.color,
                    value: point.y,
                  });
                }
              });
              setHoveredValue(hoveredValues);
            },
            mouseOut: function () {
              setHoveredValue(null);
            },
          },
        },
      },
    },
    series: [
      {
        name: "Giảm",
        data:dataDecr ,
        color: "#ff0000",
        lineColor: "#ff0000",
        lineWidth: 2,
        marker: {
          enabled: false,
        },
      },
      {
        name: "Không đổi",
        data:dataNoCh,
        color: "#ffd51e",
        lineColor: "#ffd51e",
        lineWidth: 2,
        marker: {
          enabled: false,
        },
      },
      {
        name: "Tăng",
        data:dataIncr,
        color: "#19d216",
        lineColor: "#19d216",
        lineWidth: 2,
        marker: {
          enabled: false,
        },
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default TestChart;
