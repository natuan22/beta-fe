import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LegendBtn from "../../../../utils/Component/BtnLegend";
import Loading from "../../../Chart/utils/Loading";
import { fetchDataTotalImportExport } from "../../thunk";

const TotalImportExport = () => {
  const dispatch = useDispatch();
  const { dataTotalImportExport } = useSelector((state) => state.macro);
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
    dispatch(fetchDataTotalImportExport(2));
  }, [dispatch]);

  useEffect(() => {
    if (dataTotalImportExport?.length > 0) {
      let modifiedArray;
      let uniqueDates;

      if (order === "0") {
        modifiedArray = dataTotalImportExport.map((item) => {
          const modifiedName = item.name
            .replace("Nhập khẩu: Tổng trị giá ", "")
            .replace("Xuất khẩu: Tổng trị giá ", "")
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
        modifiedArray = dataTotalImportExport.map((item) => {
          const modifiedName = item.name
            .replace("Nhập khẩu: Tổng trị giá ", "")
            .replace("Xuất khẩu: Tổng trị giá ", "")
            .replace(" (triệu USD)", "");
          const year = moment(item.date, "YYYY/MM/DD").year(); // Lấy năm từ ngày
          return { ...item, name: modifiedName, date: `${year}` };
        });
      } else {
        modifiedArray = dataTotalImportExport.map((item) => {
          const modifiedName = item.name
            .replace("Nhập khẩu: Tổng trị giá ", "")
            .replace("Xuất khẩu: Tổng trị giá ", "")
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
  }, [dataTotalImportExport, order]);

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
      enabled: false,
      align: "center",
      verticalAlign: "top",
      itemStyle: {
        fontSize: "10px",
        color: localStorage.getItem("color"),
      },
    },
    plotOptions: {
      series: {
        turboThreshold: 100_000_000,
      },
    },
    // boost: {
    //   useGPUTranslations: true,
    //   usePreAllocated: true,
    // },
    series: data,
  };

  return (
    <div>
      <div className="flex items-center justify-between border-solid border-[#25558d] border-b-2 border-t-0 border-x-0">
        <span className="dark:text-white text-black font-semibold sm:text-base xs:text-sm xxs:text-xs">
          Tổng giá trị xuất nhập khẩu qua từng kỳ
        </span>
        <div>
          <select
            className={`bg-[#1B496D] p-1 text-[1rem] text-white border-0`}
            onChange={(event) => {
              setOrder(event.target.value);
              dispatch(fetchDataTotalImportExport(event.target.value));
            }}
          >
            <option value="2">Tháng</option>
            <option value="0">Quý</option>
            <option value="1">Năm</option>
          </select>
        </div>
      </div>
      {dataTotalImportExport?.length > 0 ? (
        <>
          <div className="flex justify-center mt-1">
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

export default TotalImportExport;
