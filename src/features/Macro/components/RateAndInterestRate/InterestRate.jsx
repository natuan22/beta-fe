import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataInterestRate } from "../../thunk";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import Loading from "../../../Chart/utils/Loading";

const InterestRate = () => {
  const dispatch = useDispatch();
  const { dataInterestRate } = useSelector((state) => state.macro);
  const [timeLine, setTimeLine] = useState();
  const [data, setData] = useState();
  const [colorText, setColorText] = useState(localStorage.getItem("color"));
  const color = useSelector((state) => state.color.colorText);

  useEffect(() => {
    setColorText(color);
  }, [color]);

  useEffect(() => {
    dispatch(fetchDataInterestRate);
  }, [dispatch]);

  useEffect(() => {
    if (dataInterestRate?.length > 0) {
      const uniqueDates = [
        ...new Set(
          dataInterestRate?.map((item) =>
            moment(item.date).format("DD/MM/YYYY")
          )
        ),
      ];
      setTimeLine(uniqueDates);

      const result = [];

      dataInterestRate?.forEach((item) => {
        const name = item.name;
        const value = item.value;
        const colorArr = [
          "#49C3FB",
          "#9B57CC",
          "#7E80E7",
          "#65A6FA",
          "#00CADC",
        ];

        const existingObj = result.find((obj) => obj.name === name);

        if (existingObj) {
          existingObj.data.push(value);
        } else {
          const uniqueColorIndex = result.length % colorArr.length; // Lấy chỉ mục màu duy nhất
          result.push({
            name: name,
            data: [value],
            color: colorArr[uniqueColorIndex], // Lấy màu từ mảng colorArr bằng chỉ mục màu duy nhất
          });
        }
      });
      setData(result);
    }
  }, [dataInterestRate]);

  const options = {
    accessibility: {
      enabled: false,
    },
    credits: false,
    chart: {
      type: "spline",
      backgroundColor: "transparent",
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: timeLine,
      labels: {
        style: {
          color: localStorage.getItem("color"),
          fontSize: "9px",
        },
      },
    },
    yAxis: {
      title: {
        text: null,
        style: {
          color: localStorage.getItem("color"),
        },
      },
      stackLabels: {
        enabled: false,
      },
      labels: {
        style: {
          color: localStorage.getItem("color"),
        },
      },
      gridLineWidth: 0.1,
    },
    legend: {
      align: "center",
      verticalAlign: "top",
      enabled: true,
      itemStyle: {
        color: localStorage.getItem("color"),
        fontWeight: "bold",
      },
    },
    plotOptions: {
      series: {
        marker: {
          radius: 2, // Giá trị bán kính marker
        },
      },
    },
    series: data,
  };

  return (
    <div>
      {dataInterestRate?.length > 0 ? (
        <div className="h-[300px]">
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            containerProps={{ style: { height: "100%", width: "100%" } }}
          />
        </div>
      ) : (
        <div className="h-[300px] flex items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default InterestRate;
