import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataAverageSalary } from "../../thunk";
import moment from "moment";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import Loading from "../../../Chart/utils/Loading";

const AverageSalary = () => {
  const dispatch = useDispatch();
  const { dataAverageSalary } = useSelector((state) => state.macro);
  const [timeLine, setTimeLine] = useState();
  const [data, setData] = useState();
  const [colorText, setColorText] = useState(localStorage.getItem("color"));
  const color = useSelector((state) => state.color.colorText);

  useEffect(() => {
    setColorText(color);
  }, [color]);

  useEffect(() => {
    dispatch(fetchDataAverageSalary);
  }, [dispatch]);

  useEffect(() => {
    if (dataAverageSalary?.length > 0) {
      const modifiedArray = dataAverageSalary.map((item) => {
        const modifiedName = item.name.replace(" ( triệu người)", "");
        const quarter = moment(item.date, "YYYY/MM/DD").quarter(); // Lấy quý từ ngày
        const year = moment(item.date, "YYYY/MM/DD").year(); // Lấy năm từ ngày

        return { ...item, name: modifiedName, date: `Quý ${quarter}/${year}` };
      });
      const uniqueDates = [...new Set(modifiedArray?.map((item) => item.date))];
      setTimeLine(uniqueDates);

      const result = [];

      modifiedArray?.forEach((item) => {
        const name = item.name;
        const value = item.value;
        const color = item.color;

        const existingObj = result.find((obj) => obj.name === name);

        if (existingObj) {
          existingObj.data.push(value);
        } else {
          result.push({
            name: name,
            data: [value],
            color,
          });
        }
      });
      setData(result);
    }
  }, [dataAverageSalary]);

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
        gridLineWidth: 0.1,
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
        gridLineWidth: 0.1,
      },
    ],
    legend: {
      align: "center",
      verticalAlign: "top",
      itemStyle: {
        fontSize: "10px",
        color: localStorage.getItem("color"),
      },
    },
    series: data,
  };

  return (
    <>
      {dataAverageSalary?.length > 0 ? (
        <div className="h-[340px] mt-2">
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            containerProps={{ style: { height: "100%", width: "100%" } }}
          />
        </div>
      ) : (
        <div className="h-[340px] flex items-center justify-center">
          <Loading />
        </div>
      )}
    </>
  );
};

export default AverageSalary;
