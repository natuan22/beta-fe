import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../../../Chart/utils/Loading";
import { getColor } from "../../../../Chart/utils/utils";

const TableLiquidityGrowth = () => {
  const { dataTableLiquidityGrowth } = useSelector((state) => state.market);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (dataTableLiquidityGrowth) {
      setLoading(false);
      setData(dataTableLiquidityGrowth);
    }
  }, [dataTableLiquidityGrowth]);

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
                  <th className="text-center align-middle px-3 py-3 text-[13px] md:whitespace-nowrap sm:whitespace-normal font-semibold text-white">
                    Cổ phiếu
                  </th>
                  <th className="text-center align-middle px-3 py-3 text-[13px] font-semibold text-white">
                    Tăng trưởng thanh khoản so với quý gần nhất (%)
                  </th>
                  <th className="text-center align-middle px-3 py-3 text-[13px] font-semibold text-white">
                    Tăng trưởng thanh khoản so với cùng kỳ năm trước (%)
                  </th>
                  <th className="text-center align-middle px-3 py-3 text-[13px] font-semibold text-white">
                    Tăng trưởng thanh khoản qua 04 năm (%)
                  </th>
                </tr>
              </thead>

              <tbody>
                {!loading ? (
                  Array.isArray(data) &&
                  data.map((item, index) => {
                    let colorQuarter = getColor(item.perQuarter);
                    let colorQuarterLastYear = getColor(
                      item.perQuarterLastYear,
                    );
                    let colorFourYear = getColor(item.perFourYear);

                    return (
                      <tr
                        key={index}
                        className="dark:hover:bg-gray-800 hover:bg-gray-300 duration-500"
                      >
                        <th
                          className={`text-center align-middle whitespace-nowrap px-1 py-2.5 md:text-base sm:text-sm xs:text-sm xxs:text-xs dark:text-white text-black`}
                        >
                          {item.code}
                        </th>
                        <td
                          className={`${colorQuarter} text-center align-middle whitespace-nowrap px-1 py-2.5 md:text-base sm:text-sm xs:text-sm xxs:text-xs font-semibold`}
                        >
                          {item.perQuarter.toLocaleString("vi-VN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td
                          className={`${colorQuarterLastYear} text-center align-middle whitespace-nowrap px-1 py-2.5 md:text-base sm:text-sm xs:text-sm xxs:text-xs font-semibold`}
                        >
                          {item.perQuarterLastYear.toLocaleString("vi-VN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td
                          className={`${colorFourYear} text-center align-middle whitespace-nowrap px-1 py-2.5 md:text-base sm:text-sm xs:text-sm xxs:text-xs font-semibold`}
                        >
                          {item.perFourYear.toLocaleString("vi-VN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
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
  );
};

export default TableLiquidityGrowth;
