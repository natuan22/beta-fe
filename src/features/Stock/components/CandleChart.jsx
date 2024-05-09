import React, { useEffect, useState } from "react";
import Highcharts from "highcharts"; // Import highstock module
import HighchartsReact from "highcharts-react-official";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataCandleChart } from "../thunk";
import Loading from "../../Chart/utils/Loading";
import {
  timeLineChart9h00,
  timeLineChart15h00,
} from "../../../helper/dateTime.helper";
const CandleChart = ({ code, dataChart }) => {
  const dispatch = useDispatch();
  const { dataCandleChart } = useSelector((state) => state.stock);
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(fetchDataCandleChart(code));
  }, [dispatch, code]);

  useEffect(() => {
    if (dataCandleChart?.chart?.length > 0) {
      const mappedData = dataCandleChart.chart.map((item) => [
        item.time,
        item.closePrice,
      ]);
      // Lấy ngày hôm nay
      const today = new Date();
      today.setHours(9);
      const newData = [[today.getTime(), dataCandleChart.chart[0]?.closePrice]];

      const newDataArray = newData.concat(mappedData);
      setData(newDataArray);
    }
  }, [dataCandleChart]);

  useEffect(() => {
    if (dataChart?.length > 0) {
      setData((preData) => [...preData, ...[dataChart]]);
    }
  }, [dataChart]);

  const options = {
    accessibility: {
      enabled: false,
    },
    credits: false,
    chart: {
      backgroundColor: "transparent",
    },
    title: {
      text: "Diễn biến giao dịch trong ngày",
      style: {
        color: localStorage.getItem("color"),
        fontSize: "13px",
        fontFamily: "Roboto",
      },
    },
    rangeSelector: {
      selected: 1, // Chọn khoảng thời gian mặc định để hiển thị
    },
    plotOptions: {
      series: {
        marker: {
          radius: 3,
        },
      },
    },
    series: [
      {
        type: "line", // Loại biểu đồ nến
        name: "Giá cổ phiếu",
        data: data,
        color: "#7cb5ec",
        zoneAxis: "y",
        zones: [
          {
            value: dataCandleChart?.prevClosePrice * 1000, // Giá trị tách màu (nếu giá trị dưới 5 thì màu đỏ, còn trên 5 thì màu xanh)
            color: "red",
          },
          {
            color: "green",
          },
        ],
      },
    ],
    yAxis: {
      title: {
        text: "",
        style: {
          color: localStorage.getItem("color"),
        },
      },
      labels: {
        style: {
          color: localStorage.getItem("color"),
        },
      },
      gridLineWidth: 0.1,
      plotLines: [
        {
          value: dataCandleChart?.prevClosePrice * 1000,
          color: "gray",
          dashStyle: "dot", // Kiểu đường line (có thể là 'dash', 'dot', hoặc 'solid')
          width: 2,
          zIndex: 2,
        },
      ],
    },
    xAxis: {
      type: "datetime",
      tickInterval: 60 * 60 * 1000,
      min: timeLineChart9h00,
      max: timeLineChart15h00,
      title: {
        text: null,
        style: {
          color: localStorage.getItem("color"),
        },
      },
      labels: {
        // rotation: -45,
        style: {
          color: localStorage.getItem("color"),
        },
      },
      crosshair: true,
    },
    tooltip: {
      split: true,
    },
    legend: {
      enabled: false, // Tắt chú thích
    },
  };

  return (
    <div>
      {dataCandleChart?.chart?.length > 0 ? (
        <div className="h-[330px]">
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            containerProps={{ style: { height: "100%", width: "100%" } }}
          />
        </div>
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </div>
  );
};

export default CandleChart;
