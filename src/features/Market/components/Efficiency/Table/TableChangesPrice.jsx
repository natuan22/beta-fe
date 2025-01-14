import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../../../Chart/utils/Loading";
import { getColor } from "../../../../Chart/utils/utils";

const TableChangesPrice = () => {
  const { dataTableChangesPrice } = useSelector((state) => state.market);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (dataTableChangesPrice) {
      setLoading(false);
      setData(dataTableChangesPrice);
    }
  }, [dataTableChangesPrice]);

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
                  <th className="text-center align-middle px-3 py-[19px] text-[13px] md:whitespace-nowrap sm:whitespace-normal font-semibold text-white">
                    Cổ phiếu
                  </th>
                  <th className="text-center align-middle px-3 py-[19px] text-[13px] md:whitespace-nowrap sm:whitespace-normal font-semibold text-white">
                    Thay đổi giá 5 phiên (%)
                  </th>
                  <th className="text-center align-middle px-3 py-[19px] text-[13px] md:whitespace-nowrap sm:whitespace-normal font-semibold text-white">
                    Thay đổi giá quý (%)
                  </th>
                  <th className="text-center align-middle px-3 py-[19px] text-[13px] md:whitespace-nowrap sm:whitespace-normal font-semibold text-white">
                    Thay đổi giá YtD (%)
                  </th>
                  <th className="text-center align-middle px-3 py-[19px] text-[13px] md:whitespace-nowrap sm:whitespace-normal font-semibold text-white">
                    Thay đổi giá YoY (%)
                  </th>
                </tr>
              </thead>

              <tbody>
                {!loading ? (
                  Array.isArray(data) &&
                  data.map((item, index) => {
                    let colorFive = getColor(item.perFive);
                    let colorQuarter = getColor(item.perQuarter);
                    let colorYtd = getColor(item.perYtd);
                    let colorYtY = getColor(item.perYtY);

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
                          className={`${colorFive} text-center align-middle whitespace-nowrap px-1 py-2.5 font-semibold md:text-base sm:text-sm xs:text-sm xxs:text-xs`}
                        >
                          {item.perFive.toLocaleString("vi-VN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td
                          className={`${colorQuarter} text-center align-middle whitespace-nowrap px-1 py-2.5 font-semibold md:text-base sm:text-sm xs:text-sm xxs:text-xs`}
                        >
                          {item.perQuarter.toLocaleString("vi-VN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td
                          className={`${colorYtd} text-center align-middle whitespace-nowrap px-1 py-2.5 font-semibold md:text-base sm:text-sm xs:text-sm xxs:text-xs`}
                        >
                          {item.perYtd.toLocaleString("vi-VN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td
                          className={`${colorYtY} text-center align-middle whitespace-nowrap px-1 py-2.5 font-semibold md:text-base sm:text-sm xs:text-sm xxs:text-xs`}
                        >
                          {item.perYtY.toLocaleString("vi-VN", {
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

export default TableChangesPrice;
