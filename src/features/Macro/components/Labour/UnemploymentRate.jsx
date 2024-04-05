import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import Loading from "../../../Chart/utils/Loading";
import { fetchDataUnemploymentRate } from "../../thunk";

const UnemploymentRate = () => {
  const dispatch = useDispatch();
  const { dataUnemploymentRate } = useSelector((state) => state.macro);
  const [timeLine, setTimeLine] = useState();
  const [data, setData] = useState();

  const [colorText, setColorText] = useState(localStorage.getItem("color"));
  const color = useSelector((state) => state.color.colorText);

  useEffect(() => {
    setColorText(color);
  }, [color]);

  useEffect(() => {
    dispatch(fetchDataUnemploymentRate);
  }, [dispatch]);

  useEffect(() => {
    if (dataUnemploymentRate?.length > 0) {
      const modifiedArray = dataUnemploymentRate.map((item) => {
        const quarter = moment(item.date, "YYYY/MM/DD").quarter(); // Lấy quý từ ngày
        const year = moment(item.date, "YYYY/MM/DD").year(); // Lấy năm từ ngày

        return { ...item, date: `Quý ${quarter}/${year}` };
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
  }, [dataUnemploymentRate]);

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
      gridLineWidth: 0.5,
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
      {dataUnemploymentRate?.length > 0 ? (
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
    </div>
  );
};

export default UnemploymentRate;
