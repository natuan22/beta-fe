import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../Chart/utils/Loading";
import { fetchDataCentralRate } from "../../thunk";

const CentralRate = () => {
  const dispatch = useDispatch();
  const { dataCentralRate } = useSelector((state) => state.macro);
  const [timeLine, setTimeLine] = useState();
  const [data, setData] = useState();
  const [colorText, setColorText] = useState(localStorage.getItem("color"));
  const color = useSelector((state) => state.color.colorText);

  useEffect(() => {
    setColorText(color);
  }, [color]);
  useEffect(() => {
    dispatch(fetchDataCentralRate);
  }, [dispatch]);

  useEffect(() => {
    if (dataCentralRate?.length > 0) {
      const uniqueDates = [
        ...new Set(
          dataCentralRate?.map((item) =>
            moment(item.date).format("DD/MM/YYYY"),
          ),
        ),
      ];
      setTimeLine(uniqueDates);
      setData(dataCentralRate.map((item) => [item.value]));
    }
  }, [dataCentralRate]);

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
    ],
    legend: {
      itemStyle: {
        color: localStorage.getItem("color"),
      },
    },
    series: [
      {
        name: "Tỷ giá",
        data: data,
        marker: {
          enabled: false,
        },
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
  };

  return (
    <div>
      {dataCentralRate?.length > 0 ? (
        <div className="h-[404px] mt-2">
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            containerProps={{ style: { height: "100%", width: "100%" } }}
          />
        </div>
      ) : (
        <div className="h-[404px] flex items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default CentralRate;
