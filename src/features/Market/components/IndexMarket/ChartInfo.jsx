import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../Chart/utils/Loading";
import socket from "../../../Chart/utils/socket";
import { getColor } from "../../../Chart/utils/utils";
import {
  fetchDataBienDongThiTruong,
  fetchDataLineChartMarket,
} from "../../thunk";

const ChartInfo = () => {
  const dispatch = useDispatch();

  const dataTable = useSelector((state) => state.chart.dataTableDetail);
  const [dataTableDomestic, setDataTableDomestic] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exchange, setExchange] = useState("VNINDEX");
  const [query, setQuery] = useState("0");

  const { lineChartMarketData } = useSelector((state) => state.market);
  const { dataBienDongThiTruong } = useSelector((state) => state.market);
  const [data, setData] = useState([]);
  const [dataInfo, setDataInfo] = useState([]);
  const [dataChart, setDataChart] = useState();

  const [colorText, setColorText] = useState(localStorage.getItem("color"));
  const color = useSelector((state) => state.color.colorText);

  useEffect(() => {
    if (dataBienDongThiTruong) setData(dataBienDongThiTruong);
  }, [dataBienDongThiTruong]);

  useEffect(() => {
    setColorText(color);
  }, [color]);

  useEffect(() => {
    if (dataTable.data) {
      setLoading(false);
      setDataTableDomestic(dataTable.data);
    }
  }, [dataTable]);

  useEffect(() => {
    if (dataTable.data) {
      socket.on("listen-domestic-index", (newData) => {
        const sortedData = newData
          .slice()
          .sort((a, b) => a.code.localeCompare(b.code))
          .reverse();
        setDataTableDomestic(sortedData);
      });
    }
  }, [dataTableDomestic, dataTable]);

  useEffect(() => {
    if (lineChartMarketData?.chart?.length > 0) {
      setDataInfo(lineChartMarketData.chart);
      setDataChart(lineChartMarketData.chart);
    }
  }, [lineChartMarketData]);

  useEffect(() => {
    if (lineChartMarketData?.chart?.length > 0) {
      if (query === "0") {
        disconnectSocket(localStorage.getItem("exchange"));
        conSocket(exchange);
        localStorage.setItem("typeTime", "HH:mm");
        localStorage.setItem("exchange", exchange);
      } else {
        disconnectSocket(localStorage.getItem("exchange"));
        conSocket2(exchange);
        localStorage.setItem("exchange", exchange);
        localStorage.setItem("typeTime", "DD/MM");
      }
    }
  }, [query, exchange, lineChartMarketData]);

  const disconnectSocket = (key) => {
    if (socket.active) {
      socket.off(`listen-chi-so-${key}`);
    }
  };

  const conSocket = (key) => {
    socket.on(`listen-chi-so-${key}`, (newData) => {
      setDataInfo((prevData) => [...prevData, ...newData]);
      setDataChart((prevData) => [...prevData, ...newData]);
    });
  };

  const conSocket2 = (key) => {
    socket.on(`listen-chi-so-${key}`, (newData) => {
      setDataInfo((prevData) => [...prevData, ...newData]);
    });
  };
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
    series: [
      {
        name: "Điểm",
        data: dataChart?.map((item) => item.indexValue),
        zoneAxis: "y",
        zones: [
          {
            value: lineChartMarketData?.prevClosePrice, // Giá trị tách màu (nếu giá trị dưới 5 thì màu đỏ, còn trên 5 thì màu xanh)
            color: "#ff0000",
          },
          {
            color: "#15b313",
          },
        ],
      },
    ],
    yAxis: {
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
      gridLineWidth: 0.1,
      plotLines: [
        {
          value: lineChartMarketData?.prevClosePrice,
          color: "gray",
          dashStyle: "dot", // Kiểu đường line (có thể là 'dash', 'dot', hoặc 'solid')
          width: 2,
          zIndex: 2,
        },
      ],
    },
    xAxis: {
      title: {
        text: null,
        style: {
          color: localStorage.getItem("color"),
        },
      },
      labels: {
        style: {
          color: localStorage.getItem("color"),
        },
      },
      categories: dataChart?.map((item) =>
        moment(item.tradingDate)
          .utc()
          .subtract(1, "days")
          .format(localStorage.getItem("typeTime")),
      ),
    },
    legend: {
      enabled: false, // Tắt chú thích
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

  const vnindexData = dataInfo && dataInfo[dataInfo.length - 1];
  const colorChange = vnindexData && getColor(vnindexData.percentIndexChange);

  return (
    <>
      <div>
        <div className="flex items-center justify-between border-solid border-[#25558d] border-b-2 border-t-0 border-x-0">
          <div>
            <span className="dark:text-white text-black xxs:text-[12px] xs:text-[1.1rem] sm:text-[1.3rem] md:text-[1.5rem] xl:pl-[5px] lg:pl-[10px] md:pl-0">
              {vnindexData && vnindexData.comGroupCode}
            </span>
            <span
              className={`${colorChange} text-white xxs:text-[11px] xs:text-[0.7rem] sm:text-[0.9rem] md:text-[1rem] lg:text-[0.9rem] xl:text-[0.9rem] xl:pl-[12px] lg:pl-[20px] sm:pl-[15px] md:pl-[30px] xs:pl-[15px] xxs:pl-[5px]`}
            >
              {vnindexData && vnindexData.indexValue.toFixed(2)}
            </span>
            <span
              className={`${colorChange} xxs:text-[11px] xs:text-[0.7rem] sm:text-[0.9rem] md:text-[1rem] lg:text-[0.9rem] xl:text-[0.9rem] xl:pl-[12px] lg:pl-[20px] sm:pl-[15px] md:pl-[30px] xs:pl-[15px] xxs:pl-[5px]`}
            >
              {vnindexData && vnindexData.indexChange.toFixed(2)}/{" "}
              {vnindexData && vnindexData.percentIndexChange.toFixed(2)}%
            </span>
          </div>
          <div>
            <select
              className={`bg-[#0050AD] p-[4.5px] text-[1rem] text-white border-0 cursor-pointer`}
              onChange={(event) => {
                localStorage.setItem("typeApi", event.target.value);
                setQuery(event.target.value);
                dispatch(
                  fetchDataLineChartMarket(exchange, event.target.value),
                );
              }}
            >
              <option value="0">Trong ngày</option>
              <option value="1">5 phiên</option>
              <option value="2">1 tháng</option>
              <option value="3">YtD</option>
            </select>
          </div>
        </div>
        <div className="md:mt-2 lg:mt-[28px] xl:mt-2 ">
          {dataChart?.length > 0 ? (
            <div className="h-[405px]">
              <HighchartsReact
                highcharts={Highcharts}
                options={options}
                containerProps={{ style: { height: "100%", width: "100%" } }}
              />
            </div>
          ) : (
            <div className="text-center mt-12 h-[348px]">
              <Loading />
            </div>
          )}
        </div>
      </div>
      <hr />
      <div className="flex justify-around dark:text-white text-black text-xs mt-2">
        <span className="xs:text-[10px] sm:text-[12px]">
          Mở cửa: <span>{vnindexData && vnindexData.openIndex}</span>
        </span>
        <span className="xs:text-[10px] sm:text-[12px]">
          Thấp nhất: <span>{vnindexData && vnindexData.lowestIndex}</span>
        </span>
        <span className="xs:text-[10px] sm:text-[12px]">
          Cao nhất: <span>{vnindexData && vnindexData.highestIndex}</span>
        </span>
      </div>
      <div className="flex justify-around text-xs mt-1">
        <span className="text-[#5CE1E6] xs:text-[11px] sm:text-[12px]">
          Sàn:{" "}
          <span className="dark:text-white text-black">{data && data.low}</span>
        </span>
        <span className="text-red-500 xs:text-[11px] sm:text-[12px]">
          Giảm:{" "}
          <span className="dark:text-white text-black">
            {data && data.decrease}
          </span>
        </span>
        <span className="text-yellow-500 xs:text-[11px] sm:text-[12px]">
          Tham chiếu:{" "}
          <span className="dark:text-white text-black">
            {data && data.equal}
          </span>
        </span>
        <span className="text-green-500 xs:text-[11px] sm:text-[12px]">
          Tăng:{" "}
          <span className="dark:text-white text-black">
            {data && data.increase}
          </span>
        </span>
        <span className="text-[#CB6CE6] xs:text-[11px] sm:text-[12px]">
          Trần:{" "}
          <span className="dark:text-white text-black">
            {data && data.high}
          </span>
        </span>
      </div>

      <div className="mt-2">
        <section>
          <div className="w-full">
            <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded">
              <div className="block w-full bg-transparent xs:min-h-[300px] md:min-h-[300px] lg:min-h-[300px] xl:min-h-[300px] 2xl:min-h-[300px]">
                <table className="items-center w-full border-collapse bg-transparent">
                  <thead>
                    <tr className="bg-[#0050AD]">
                      <th className="text-center align-middle xxs:text-[10px] px-[2.7px] py-2 text-sm font-semibold text-white">
                        Chỉ số
                      </th>
                      <th className="text-center align-middle xxs:text-[10px] px-[2.7px] py-2 text-sm font-semibold text-white">
                        Điểm số
                      </th>
                      <th className="text-center align-middle xxs:text-[10px] px-[2.7px] py-2 text-xs font-semibold text-white">
                        % Thay đổi
                      </th>
                      <th className="text-center align-middle xxs:text-[10px] px-[2.7px] py-2 text-xs font-semibold text-white">
                        Khối lượng (triệu CP)
                      </th>
                      <th className="text-center align-middle xxs:text-[10px] px-[2.7px] py-2 text-xs font-semibold text-white">
                        Giá trị (tỷ VNĐ)
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {!loading ? (
                      Array.isArray(dataTableDomestic) &&
                      dataTableDomestic.map((item, index) => {
                        let color = getColor(item.change);
                        return (
                          <tr
                            onClick={() => {
                              if (!localStorage.getItem("typeApi")) {
                                dispatch(
                                  fetchDataLineChartMarket(`${item.code}`, "0"),
                                );
                              } else {
                                dispatch(
                                  fetchDataLineChartMarket(
                                    `${item.code}`,
                                    localStorage.getItem("typeApi"),
                                  ),
                                );
                              }
                              setExchange(item.code);
                              dispatch(fetchDataBienDongThiTruong(item.code));
                            }}
                            key={index}
                            className="dark:hover:bg-gray-800 hover:bg-gray-300 duration-500 cursor-pointer"
                          >
                            <th className="text-left px-3 align-middle xxs:text-[10px] xs:text-xs md:text-sm lg:text-sm xl:text-[13px] whitespace-nowrap p-3.5 dark:text-white text-black">
                              {item.code}
                            </th>
                            <td
                              className={`text-center px-1.5 align-middle xxs:text-[10px] xs:text-xs md:text-sm lg:text-sm xl:text-sm whitespace-nowrap p-3.5 font-semibold ${color}`}
                            >
                              {item.closePrice &&
                                item.closePrice.toLocaleString("vi-VN", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}
                            </td>
                            <td
                              className={`text-center px-1.5 align-middle xxs:text-[10px] xs:text-xs md:text-sm lg:text-sm xl:text-sm whitespace-nowrap p-3.5 font-semibold ${color}`}
                            >
                              {item.perChange &&
                                item.perChange.toLocaleString("vi-VN", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}
                              %
                            </td>
                            <td
                              className={`text-center px-1.5 align-middle xxs:text-[10px] xs:text-xs md:text-sm lg:text-sm xl:text-sm whitespace-nowrap p-3.5 font-semibold ${color}`}
                            >
                              {item.totalVol &&
                                (item.totalVol / 1000000).toLocaleString(
                                  "vi-VN",
                                  {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  },
                                )}
                            </td>
                            <td
                              className={`text-center px-1.5 align-middle xxs:text-[10px] xs:text-xs md:text-sm lg:text-sm xl:text-sm whitespace-nowrap p-3.5 font-semibold ${color}`}
                            >
                              {item.totalVal &&
                                (item.totalVal / 1000000000).toLocaleString(
                                  "vi-VN",
                                  {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  },
                                )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={6}>
                          <div className="mt-16">
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
    </>
  );
};

export default ChartInfo;
