import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataTradingInvestors } from "../../thunk";
import Loading from "../../../Chart/utils/Loading";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const TradingInvestors = ({ stock }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [timeLine, setTimeLine] = useState();
  const { dataTradingInvestors } = useSelector((state) => state.stock);

  const processData = (data) => {
    const knData = [];
    const tdData = [];
    const cnData = [];
    const closePriceData = [];

    data.forEach((item) => {
      knData.push(item.kn);
      tdData.push(item.td);
      cnData.push(item.cn);
      closePriceData.push(item.price * 1000);
    });

    return [
      {
        type: "column",
        data: knData,
        name: "KLGD Khối ngoại",
        yAxis: 0,
        color: {
          // Thêm thuộc tính color ở đây
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, "rgba(12,74,234,1)"],
            [0.78, "rgba(27,160,152,1)"],
            [1, "rgba(0,212,255,1)"],
          ],
        },
      },
      {
        type: "column",
        data: tdData,
        name: "KLGD Tự doanh",
        yAxis: 0,
        color: {
          // Thêm thuộc tính color ở đây
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0.09, "rgba(239,135,12,1)"],
            [0.5, "rgba(222,199,62,1)"],
            [0.78, "rgba(249,237,137,1)"],
          ],
        },
      },
      {
        type: "column",
        data: cnData,
        name: "KLGD Cá nhân",
        yAxis: 0,
        color: {
          // Thêm thuộc tính color ở đây
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0.03, "rgba(127,90,240,1)"],
            [0.43, "rgba(127,90,240,1)"],
            [0.78, "rgba(211,201,243,1)"],
          ],
        },
      },
      {
        type: "spline",
        data: closePriceData,
        name: "Giá",
        yAxis: 1,
        color: "#37FF05",
      },
    ];
  };

  useEffect(() => {
    dispatch(fetchDataTradingInvestors(stock));
  }, [dispatch, stock]);

  useEffect(() => {
    if (dataTradingInvestors?.length > 0) {
      const uniqueDates = [
        ...new Set(
          dataTradingInvestors?.map((item) =>
            moment(item.date).format("DD/MM/YYYY")
          )
        ),
      ];
      setTimeLine(uniqueDates);
      setData(processData(dataTradingInvestors));
    }
  }, [dataTradingInvestors, stock]);

  const options = {
    chart: {
      backgroundColor: "transparent", // màu nền của biểu đồ
      type: "column",
    },
    accessibility: {
      enabled: false,
    },
    credits: false,
    title: {
      text: "",
      style: {
        color: "white",
      },
    },
    xAxis: {
      categories: timeLine,
      labels: {
        style: {
          color: localStorage.getItem("color"), // màu cho các nhãn trục x
          fontSize: "9px",
        },
      },
      title: {
        style: {
          color: localStorage.getItem("color"), // màu cho tiêu đề trục x
        },
      },
    },
    yAxis: [
      {
        title: {
          text: "",
          style: {
            color: localStorage.getItem("color"),
          },
        },
        labels: {
          style: {
            color: localStorage.getItem("color"), // màu cho các nhãn trục y
          },
        },
      },
      {
        title: {
          text: "",
          style: {
            color: localStorage.getItem("color"),
          },
        },
        labels: {
          style: {
            color: localStorage.getItem("color"), // màu cho các nhãn trục y
          },
        },
        opposite: true,
      },
    ],
    plotOptions: {
      series: {
        marker: {
          radius: 3, // Giá trị bán kính marker
        },
      },
    },
    legend: {
      enabled: true,
      align: "center",
      itemStyle: {
        color: localStorage.getItem("color"),
      },
    },
    series: data,
  };

  return (
    <div>
      {dataTradingInvestors?.length > 0 ? (
        <>
          <div className="h-[460px] mt-4">
            <HighchartsReact
              highcharts={Highcharts}
              options={options}
              containerProps={{ style: { height: "100%", width: "100%" } }}
            />
          </div>
        </>
      ) : (
        <div className="h-[460px] flex items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default TradingInvestors;
