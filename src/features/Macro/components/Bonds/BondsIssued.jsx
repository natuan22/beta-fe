import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../Chart/utils/Loading";
import { fetchDataBondsIssued } from "../../thunk";

const BondsIssued = () => {
  const dispatch = useDispatch();
  const { dataBondsIssued } = useSelector((state) => state.macro);
  const [timeLine, setTimeLine] = useState();
  const [data, setData] = useState();
  const [colorText, setColorText] = useState(localStorage.getItem("color"));
  const color = useSelector((state) => state.color.colorText);

  useEffect(() => {
    setColorText(color);
  }, [color]);

  useEffect(() => {
    dispatch(fetchDataBondsIssued);
  }, [dispatch]);

  useEffect(() => {
    if (dataBondsIssued?.length > 0) {
      const modifiedArray = dataBondsIssued.map((item) => {
        const month = moment(item.date, "YYYY/MM/DD").month() + 1; // Lấy tên tháng từ ngày
        const year = moment(item.date, "YYYY/MM/DD").year(); // Lấy năm từ ngày

        return { ...item, date: `Tháng ${month}/${year}` };
      });
      const uniqueDates = [...new Set(modifiedArray?.map((item) => item.date))];
      setTimeLine(uniqueDates);

      const result = [];

      modifiedArray?.forEach((item) => {
        const name = item.name;
        const value = +(item.value / 1000000000).toFixed(2);
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
  }, [dataBondsIssued]);

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
      gridLineWidth: 0.1,
    },
    legend: {
      enabled: true,
      align: "center",
      verticalAlign: "top",
      itemStyle: {
        fontSize: "10px",
        color: localStorage.getItem("color"),
      },
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
      },
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
    <>
      {dataBondsIssued?.length > 0 ? (
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
    </>
  );
};

export default BondsIssued;
