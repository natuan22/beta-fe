import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataImportValue } from "../../thunk";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import Loading from "../../../Chart/utils/Loading";
import LegendBtn from "../../../../utils/Component/BtnLegend";

const ImportValue = () => {
  const dispatch = useDispatch();
  const { dataImportValue } = useSelector((state) => state.macro);
  const [timeLine, setTimeLine] = useState();
  const [data, setData] = useState();
  const [order, setOrder] = useState("2");

  const [colorText, setColorText] = useState(localStorage.getItem("color"));
  const color = useSelector((state) => state.color.colorText);

  const chartRef = useRef(null);
  const callBackHighChart = (chart) => {
    chartRef.current = chart;
  };
  useEffect(() => {
    setColorText(color);
  }, [color]);

  useEffect(() => {
    dispatch(fetchDataImportValue(2));
  }, [dispatch]);

  useEffect(() => {
    if (dataImportValue?.length > 0) {
      let modifiedArray;
      let uniqueDates;

      if (order === "0") {
        modifiedArray = dataImportValue.map((item) => {
          const modifiedName = item.name
            .replace("Nhập khẩu: ", "")
            .replace(" (triệu USD)", "");
          const quarter = moment(item.date, "YYYY/MM/DD").quarter(); // Lấy quý từ ngày
          const year = moment(item.date, "YYYY/MM/DD").year(); // Lấy năm từ ngày
          return {
            ...item,
            name: modifiedName,
            date: `Quý ${quarter}/${year}`,
          };
        });
      } else if (order === "1") {
        modifiedArray = dataImportValue.map((item) => {
          const modifiedName = item.name
            .replace("Nhập khẩu: ", "")
            .replace(" (triệu USD)", "");
          const year = moment(item.date, "YYYY/MM/DD").year(); // Lấy năm từ ngày
          return { ...item, name: modifiedName, date: `${year}` };
        });
      } else {
        modifiedArray = dataImportValue.map((item) => {
          const modifiedName = item.name
            .replace("Nhập khẩu: ", "")
            .replace(" (triệu USD)", "");
          const month = moment(item.date, "YYYY/MM/DD").month() + 1; // Lấy tên tháng từ ngày
          const year = moment(item.date, "YYYY/MM/DD").year(); // Lấy năm từ ngày
          return {
            ...item,
            name: modifiedName,
            date: `Tháng ${month}/${year}`,
          };
        });
      }

      uniqueDates = [...new Set(modifiedArray?.map((item) => item.date))];
      setTimeLine(uniqueDates);

      const result = modifiedArray.reduce((acc, item) => {
        const { name, value, color } = item;
        const existingObj = acc.find((obj) => obj.name === name);

        if (existingObj) {
          existingObj.data.push(value);
        } else {
          acc.push({
            name: name,
            data: [value],
            color,
          });
        }
        return acc;
      }, []);

      setData(result);
    }
  }, [dataImportValue, order]);

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
      gridLineWidth: 0.2,
    },
    legend: {
      verticalAlign: "top",
      enabled: false,
      itemStyle: {
        color: localStorage.getItem("color"),
        fontWeight: "bold",
      },
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: data,
  };
  return (
    <div>
      <div className="flex items-center justify-between border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0">
        <span className="dark:text-white text-black font-semibold sm:text-base xs:text-sm xxs:text-xs">
          Giá trị nhập khẩu một số mặt hàng chính
        </span>
        <div>
          <select
            className={`bg-[#1B496D] p-1 text-[1rem] text-white border-0`}
            onChange={(event) => {
              setOrder(event.target.value);
              dispatch(fetchDataImportValue(event.target.value));
            }}
          >
            <option value="2">Tháng</option>
            <option value="0">Quý</option>
            <option value="1">Năm</option>
          </select>
        </div>
      </div>
      {dataImportValue?.length > 0 ? (
        <>
          <div className="mt-1">
            <LegendBtn chart={chartRef.current} data={data} />
          </div>
          <div className="h-[300px]">
            <HighchartsReact
              callback={callBackHighChart}
              highcharts={Highcharts}
              options={options}
              containerProps={{ style: { height: "100%", width: "100%" } }}
            />
          </div>
        </>
      ) : (
        <div className="h-[300px] flex items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default ImportValue;
