import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../../../Chart/utils/Loading";
import { getColor } from "../../../../Chart/utils/utils";

const TableEquityGrowth = () => {
  const { dataTableEquityGrowth } = useSelector((state) => state.market);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (dataTableEquityGrowth) {
      setLoading(false);
      setData(dataTableEquityGrowth);
    }
  }, [dataTableEquityGrowth]);

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
                  <th className="text-center align-middle px-2.5 py-3 text-[13px] md:whitespace-nowrap sm:whitespace-normal font-semibold text-white">
                    Cổ phiếu
                  </th>
                  <th className="text-center align-middle px-2.5 py-3 text-[13px] font-semibold text-white">
                    Tăng trưởng Vốn góp của chủ sở hữu(%)
                  </th>
                  <th className="text-center align-middle px-2.5 py-3 text-[13px] font-semibold text-white">
                    Tăng trưởng Thặng dư vốn cổ phần (%)
                  </th>
                  <th className="text-center align-middle px-2.5 py-3 text-[13px] font-semibold text-white">
                    Tăng trưởng LNST chưa phân phối (%)
                  </th>
                  <th className="text-center align-middle px-2.5 py-3 text-[12px] font-semibold text-white">
                    Tăng trưởng Lợi ích cổ đông không kiểm soát (%)
                  </th>
                </tr>
              </thead>

              <tbody>
                {!loading ? (
                  Array.isArray(data) &&
                  data.map((item, index) => {
                    let colorVonChuSoHuu = getColor(item.vonChuSoHuu);
                    let colorLaiChuPhanPhoi = getColor(item.laiChuPhanPhoi);
                    let colorThangDuVon = getColor(item.thangDuVon);
                    let colorLoiIchCoDong = getColor(item.loiIchCoDong);

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
                          className={`${colorVonChuSoHuu} text-center align-middle whitespace-nowrap px-1 py-2.5 md:text-base sm:text-sm xs:text-sm xxs:text-xs font-semibold`}
                        >
                          {item.vonChuSoHuu.toLocaleString("vi-VN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td
                          className={`${colorLaiChuPhanPhoi} text-center align-middle whitespace-nowrap px-1 py-2.5 md:text-base sm:text-sm xs:text-sm xxs:text-xs font-semibold`}
                        >
                          {item.laiChuPhanPhoi.toLocaleString("vi-VN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td
                          className={`${colorThangDuVon} text-center align-middle whitespace-nowrap px-1 py-2.5 md:text-base sm:text-sm xs:text-sm xxs:text-xs font-semibold`}
                        >
                          {item.thangDuVon.toLocaleString("vi-VN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td
                          className={`${colorLoiIchCoDong} text-center align-middle whitespace-nowrap px-1 py-2.5 md:text-base sm:text-sm xs:text-sm xxs:text-xs font-semibold `}
                        >
                          {item.loiIchCoDong.toLocaleString("vi-VN", {
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

export default TableEquityGrowth;
