import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../Chart/utils/Loading";
import { fetchDataJobFluctuations } from "../../thunk";

const JobFluctuations = () => {
  const dispatch = useDispatch();
  const { dataJobFluctuations } = useSelector((state) => state.macro);
  const [data, setData] = useState();
  const [category, setCategory] = useState();
  const [colorText, setColorText] = useState(localStorage.getItem("color"));
  const color = useSelector((state) => state.color.colorText);

  useEffect(() => {
    dispatch(fetchDataJobFluctuations);
  }, [dispatch]);

  useEffect(() => {
    setColorText(color);
  }, [color]);

  useEffect(() => {
    if (dataJobFluctuations?.length > 0) {
      const transformedData = dataJobFluctuations?.map((item) => {
        return { ...item, date: moment(item.date).format("DD/MM/YYYY") };
      });

      const uniqueIndustry = [
        ...new Set(transformedData.map((item) => item.name)),
      ];
      const mappedData = [];

      transformedData?.forEach((item) => {
        const colorArr = ["#2CC8DD"];
        const existingItem = mappedData.find(
          (mappedItem) => mappedItem.name === item.date,
        );

        if (existingItem) {
          existingItem.data.push(+item.value.toFixed(2));
        } else {
          const uniqueColorIndex = mappedData.length % colorArr.length; // Lấy chỉ mục màu duy nhất
          mappedData.push({
            name: item.date,
            data: [+item.value.toFixed(2)],
            color: colorArr[uniqueColorIndex], // Lấy màu từ mảng colorArr bằng chỉ mục màu duy nhất
          });
        }
      });
      setCategory(uniqueIndustry);
      setData(mappedData);
    }
  }, [dataJobFluctuations]);

  const options = {
    chart: {
      backgroundColor: "transparent", // màu nền của biểu đồ
      type: "bar",
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
      categories: category,
      labels: {
        style: {
          color: localStorage.getItem("color"), // màu cho các nhãn trục x
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
    <>
      {dataJobFluctuations.length ? (
        <div className="h-[727px]">
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            containerProps={{ style: { height: "100%", width: "100%" } }}
          />
        </div>
      ) : (
        <div className="h-[727px] flex items-center justify-center">
          <Loading />
        </div>
      )}
    </>
  );
};

export default JobFluctuations;
