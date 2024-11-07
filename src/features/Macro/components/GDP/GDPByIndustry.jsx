import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../Chart/utils/Loading";
import { fetchDataGDPByIndustry } from "../../thunk";

const GDPByIndustry = () => {
  const dispatch = useDispatch();
  const { dataGDPByIndustry } = useSelector((state) => state.macro);
  const [timeLine, setTimeLine] = useState();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [dates, setDates] = useState();
  const [dataTb, setDataTb] = useState();
  const [colorText, setColorText] = useState(localStorage.getItem("color"));
  const color = useSelector((state) => state.color.colorText);

  useEffect(() => {
    setColorText(color);
  }, [color]);

  useEffect(() => {
    dispatch(fetchDataGDPByIndustry);
  }, [dispatch]);

  useEffect(() => {
    if (dataGDPByIndustry?.length > 0) {
      setLoading(false);
      const modifiedArray = dataGDPByIndustry.map((item) => {
        const modifiedName = item.name
          .replace("Giá trị GDP (2010) : ", "")
          .replace(" (Tỷ VNĐ)", "");
        const quarter = moment(item.date, "YYYY/MM/DD").quarter(); // Lấy quý từ ngày
        const year = moment(item.date, "YYYY/MM/DD").year(); // Lấy năm từ ngày

        return { ...item, name: modifiedName, date: `Quý ${quarter}/${year}` };
      });
      const uniqueDates = [...new Set(modifiedArray?.map((item) => item.date))];
      setTimeLine(uniqueDates);

      const result = [];

      modifiedArray?.forEach((item) => {
        const colorArr = ["#2D8BBA", "#41B8D5", "#6CE5E8"];
        const name = item.name;
        const value = item.value;

        const existingObj = result.find((obj) => obj.name === name);

        if (existingObj) {
          existingObj.data.push(value);
        } else {
          const uniqueColorIndex = result.length % colorArr.length;
          result.push({
            name: name,
            data: [value],
            color: colorArr[uniqueColorIndex],
          });
        }
      });
      setData(result);

      const dates = [...new Set(modifiedArray?.map((item) => item.date))];
      setDates(dates);
      const newData = {};
      modifiedArray.forEach((item) => {
        if (!newData[item.name]) {
          newData[item.name] = [];
        }
        newData[item.name].push(item.value);
      });
      setDataTb(
        Object.entries(newData).map(([name, values]) => ({ name, values })),
      );
    }
  }, [dataGDPByIndustry]);

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
      {dataGDPByIndustry?.length > 0 ? (
        <div className="h-[300px] mt-2">
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

      <section className="bg-blueGray-50 pt-1.5">
        <div className="w-full">
          <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded">
            <div className="block xxs:w-[295px] xs:w-[350px] sm:w-[400px] md:w-[670px] lg:w-[897px] xl:w-full scrollbar-thin scrollbar-thumb-[#0050AD] dark:scrollbar-track-[#151924] scrollbar-track-transparent overflow-x-scroll bg-transparent h-[225px]">
              <table className="items-center w-full border-collapse bg-transparent">
                <thead
                  className="bg-[#0050AD] z-10"
                  style={{ position: "sticky", top: 0 }}
                >
                  <tr>
                    <th className="sticky left-0 bg-[#0050AD] text-center align-middle px-3 py-[19px] whitespace-nowrap font-semibold text-xs text-white">
                      Kỳ
                    </th>
                    {Array.isArray(dates) &&
                      dates?.map((item) => (
                        <th
                          key={item}
                          className="text-center align-middle px-3 py-[19px] text-xs font-semibold text-white"
                        >
                          {item}
                        </th>
                      ))}
                  </tr>
                </thead>

                <tbody>
                  {!loading ? (
                    Array.isArray(dataTb) &&
                    dataTb.map((item) => (
                      <tr
                        key={item.name}
                        className="dark:hover:bg-gray-800 hover:bg-gray-300 duration-500"
                      >
                        <th
                          className={`sticky left-0 dark:bg-[#151924] bg-gray-100 text-left align-middle whitespace-nowrap px-1 py-[14px] text-sm dark:text-white text-black`}
                        >
                          {item.name}
                        </th>
                        {item.values.map((value, index) => (
                          <td
                            key={index}
                            className={`text-sm text-center align-middle whitespace-nowrap px-1 py-[14px] font-semibold dark:text-white text-black`}
                          >
                            {value.toLocaleString("vi-VN", {
                              maximumFractionDigits: 2,
                            })}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>
                        <div>
                          <Loading />
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GDPByIndustry;
