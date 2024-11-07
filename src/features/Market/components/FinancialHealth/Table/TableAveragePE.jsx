import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../../../Chart/utils/Loading";
import { getColor } from "../../../../Chart/utils/utils";

const TableAveragePE = () => {
  const { dataTableAveragePE } = useSelector((state) => state.market);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (dataTableAveragePE) {
      setLoading(false);
      setData(dataTableAveragePE);
    }
  }, [dataTableAveragePE]);

  return (
    <section className="bg-blueGray-50 pt-1.5">
      <div className="w-full">
        <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded">
          <div className="block w-full scrollbar-thin scrollbar-thumb-[#0050AD] dark:scrollbar-track-[#151924] scrollbar-track-transparent overflow-y-scroll bg-transparent h-[350px]">
            <table className="items-center w-full border-collapse bg-transparent">
              <thead
                className="bg-[#0050AD] z-10"
                style={{ position: "sticky", top: 0 }}
              >
                <tr>
                  <th className="text-center align-middle px-2 py-[19px] text-[13px] whitespace-nowrap font-semibold text-white">
                    Cổ phiếu
                  </th>
                  <th className="text-center align-middle px-2 py-[19px] text-[13px] font-semibold text-white">
                    EPS 04 quý gần nhất (VNĐ/CP)
                  </th>
                  <th className="text-center align-middle px-2 py-[19px] text-[13px] font-semibold text-white">
                    Thay đổi giá qua 04 Quý (%)
                  </th>
                  <th className="text-center align-middle px-2 py-[19px] text-[13px] font-semibold text-white">
                    Thay đổi EPS 04 quý liền kề (%)
                  </th>
                  <th className="text-center align-middle px-2 py-[19px] text-[13px] font-semibold text-white">
                    P/E (Lần)
                  </th>
                </tr>
              </thead>

              <tbody>
                {!loading ? (
                  Array.isArray(data) &&
                  data.map((item, index) => {
                    let colorPricePerChange = getColor(item.pricePerChange);
                    let colorPer = getColor(item.per);

                    return (
                      <tr
                        key={index}
                        className="dark:hover:bg-gray-800 hover:bg-gray-300 duration-500"
                      >
                        <th
                          className={`text-center align-middle whitespace-nowrap px-1 py-2.5 dark:text-white text-black md:text-base sm:text-sm xs:text-sm xxs:text-xs`}
                        >
                          {item.code}
                        </th>
                        <td
                          className={` text-center align-middle whitespace-nowrap px-1 py-2.5 dark:text-white text-black font-semibold md:text-base sm:text-sm xs:text-sm xxs:text-xs`}
                        >
                          {item.VND.toLocaleString("vi-VN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td
                          className={`${colorPricePerChange} text-center align-middle whitespace-nowrap px-1 py-2.5 font-semibold md:text-base sm:text-sm xs:text-sm xxs:text-xs`}
                        >
                          {item.pricePerChange.toLocaleString("vi-VN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td
                          className={`${colorPer} text-center align-middle whitespace-nowrap px-1 py-2.5 font-semibold md:text-base sm:text-sm xs:text-sm xxs:text-xs`}
                        >
                          {item.per.toLocaleString("vi-VN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td
                          className={` text-center align-middle whitespace-nowrap px-1 py-2.5 dark:text-white text-black font-semibold md:text-base sm:text-sm xs:text-sm xxs:text-xs`}
                        >
                          {item.pData.toLocaleString("vi-VN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5}>
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
  );
};

export default TableAveragePE;
