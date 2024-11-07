import { Button, Popover } from "antd";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { RiFilter2Fill } from "react-icons/ri";
import Loading from "../../../Chart/utils/Loading";

const InvestEffectsStock = ({ data }) => {
  const [openFilterCategory, setOpenFilterCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("danh_muc_1");

  const [timeLine, setTimeLine] = useState();
  const [dataFormat, setDataFormat] = useState();

  const handleSelectedCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  useEffect(() => {
    if (data) {
      const uniqueDates = [
        ...new Set(
          data[selectedCategory]?.map((item) =>
            moment(item.date).format("DD/MM/YYYY"),
          ),
        ),
      ];
      setTimeLine(uniqueDates);

      const result = [];

      data[selectedCategory]?.forEach((item) => {
        const colorArr = ["#fff", "#FFD300", "#0056FF", "#F60101"];
        const name = item.code;
        const value = +item.value.toFixed(2);

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
      setDataFormat(result);
    }
  }, [data, selectedCategory]);

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
        turboThreshold: 100_000_000,
      },
    },
    // boost: {
    //   useGPUTranslations: true,
    //   usePreAllocated: true,
    // },
    tooltip: {
      split: true,
    },
    series: dataFormat,
  };

  return (
    <div>
      <div className="md:flex sm:block items-center justify-between md:w-[700px] sm:w-full">
        <div className="border-solid border-[#9E9E9E] border-b-2 border-t-0 border-x-0 md:w-[405px] sm:w-[265px]">
          <div className="dark:text-white text-black font-semibold flex items-center uppercase">
            HIỆU QUẢ ĐẦU TƯ THEO CỔ PHIẾU
          </div>
        </div>
        <div className="dark:text-white text-black flex items-center justify-center mt-3">
          <span className="mr-6">Chọn danh mục</span>
          <Popover
            content={
              <div className="text-black overflow-auto border text-center">
                <label className="material-checkbox py-2 px-2 text-white">
                  <input
                    type="checkbox"
                    name="category"
                    value="danh_muc_1"
                    checked={selectedCategory === "danh_muc_1"}
                    onChange={handleSelectedCategory}
                  />
                  <span className="checkmark"></span>
                  <span className="text-sm text-black">Danh mục 1</span>
                </label>
                <label className="material-checkbox py-2 px-2 text-white">
                  <input
                    type="checkbox"
                    name="category"
                    value="danh_muc_2"
                    checked={selectedCategory === "danh_muc_2"}
                    onChange={handleSelectedCategory}
                  />
                  <span className="checkmark"></span>
                  <span className="text-sm text-black">Danh mục 2</span>
                </label>
                <label className="material-checkbox py-2 px-2 text-white">
                  <input
                    type="checkbox"
                    name="category"
                    value="danh_muc_3"
                    checked={selectedCategory === "danh_muc_3"}
                    onChange={handleSelectedCategory}
                  />
                  <span className="checkmark"></span>
                  <span className="text-sm text-black">Danh mục 3</span>
                </label>
              </div>
            }
            placement="bottom"
            trigger="click"
            open={openFilterCategory}
            onOpenChange={(visible) => setOpenFilterCategory(visible)}
            showArrow={false}
          >
            <Button className="bg-white items-center flex justify-evenly px-2 py-2">
              <RiFilter2Fill className="text-[#006fa7] text-lg" />
            </Button>
          </Popover>
        </div>
      </div>
      {data ? (
        <div className="h-[350px] mt-2">
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            containerProps={{ style: { height: "100%", width: "100%" } }}
          />
        </div>
      ) : (
        <div className="h-[350px] flex items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default InvestEffectsStock;
