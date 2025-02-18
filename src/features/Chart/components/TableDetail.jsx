import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../utils/Loading";
import socket from "../utils/socket";
import { getColor } from "../utils/utils";

const TableDetail = () => {
  const dataTable = useSelector((state) => state.chart.dataTableDetail);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (dataTable.data) {
      setData(dataTable.data);
    }
  }, [dataTable]);

  useEffect(() => {
    socket.on("listen-domestic-index", (newData) => {
      const sortedData = newData
        .slice()
        .sort((a, b) => a.code.localeCompare(b.code))
        .reverse();
      setData(sortedData);
    });
  }, []);
  return (
    <>
      <section>
        <div className="w-full">
          <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded">
            <div className="block w-full xs:h-[342px] sm:h-[320px] md:h-[336px] lg:h-[350px] xl:h-[344px] 2xl:h-[344px] bg-transparent">
              <table className="items-center w-full border-collapse bg-transparent">
                <thead>
                  <tr className="bg-[#0050AD]">
                    <th className="text-center align-middle px-3 py-2 xxs:text-[10px] text-sm font-semibold text-white">
                      Chỉ số
                    </th>
                    <th className="text-center align-middle px-3 py-2 xxs:text-[10px] text-sm font-semibold text-white">
                      Điểm
                    </th>
                    <th className="text-center align-middle px-3 py-2 xxs:text-[10px] text-sm font-semibold text-white">
                      Thay đổi (điểm)
                    </th>
                    <th className="text-center align-middle px-3 py-2 xxs:text-[10px] text-sm font-semibold text-white">
                      Thay đổi (%)
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data?.length > 0 ? (
                    Array.isArray(data) &&
                    data?.map((item, index) => {
                      let color = getColor(item.change);
                      return (
                        <tr
                          key={index}
                          className="dark:hover:bg-gray-800 hover:bg-gray-300 duration-500"
                        >
                          <th className="text-left px-5 align-middle xxs:text-[10px] xs:text-xs md:text-sm lg:text-sm xl:text-[13px] whitespace-nowrap p-3.5 dark:text-white text-black">
                            {item.code}
                          </th>
                          <td
                            className={`text-center px-5 align-middle xxs:text-[10px] xs:text-xs md:text-sm lg:text-sm xl:text-sm whitespace-nowrap p-3.5 font-semibold ${color}`}
                          >
                            {item.closePrice &&
                              item.closePrice.toLocaleString("vi-VN", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                          </td>
                          <td
                            className={`text-center px-5 align-middle xxs:text-[10px] xs:text-xs md:text-sm lg:text-sm xl:text-sm whitespace-nowrap p-3.5 font-semibold ${color}`}
                          >
                            {item.change &&
                              item.change.toLocaleString("vi-VN", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                          </td>
                          <td
                            className={`text-center px-5 align-middle xxs:text-[10px] xs:text-xs md:text-sm lg:text-sm xl:text-sm whitespace-nowrap p-3.5 font-semibold ${color}`}
                          >
                            {item.perChange &&
                              item.perChange.toLocaleString("vi-VN", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            %
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={4}>
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
    </>
  );
};

export default TableDetail;
