import React from "react";
import { useSelector } from "react-redux";
import Loading from "../utils/Loading";
import { useState, useEffect } from "react";
import { getColor } from "../utils/utils";

const GoodsDetail = ({ type }) => {
  const dataGoods = useSelector((state) => state.chart.dataGoodsDetail);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dataGoods.data) {
      setLoading(false);
      setData(dataGoods.data);
    }
  }, [dataGoods]);

  return (
    <section className="bg-blueGray-50">
      <div className="w-full">
        <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full mb-6 ">
          <div
            className={`block w-full overflow-y-scroll scrollbar-thin scrollbar-thumb-[#436FB5] dark:scrollbar-track-[#151924] scrollbar-track-transparent ${
              type === 0 ? "h-[330px]" : "h-[370px]"
            } bg-transparent`}
          >
            <table className="items-center w-full border-collapse bg-transparent">
              <thead className="sticky top-0 bg-[#1E5D8B]">
                <tr className="bg-[#1E5D8B]">
                  <th className="align-middle xxs:text-[10px] px-3 py-3 text-sm font-semibold text-center text-white">
                    Hàng hóa
                  </th>
                  <th className="align-middle xxs:text-[10px] px-3 py-3 text-sm font-semibold text-center text-white">
                    Giá
                  </th>
                  <th className="align-middle xxs:text-[10px] px-3 py-3 text-sm font-semibold text-center text-white">
                    % thay đổi
                  </th>
                </tr>
              </thead>

              <tbody>
                {!loading ? (
                  Array.isArray(data) &&
                  data.map((item, index) => {
                    let color = getColor(item.Day);

                    return (
                      <tr
                        key={index}
                        className="dark:hover:bg-gray-800 hover:bg-gray-300 duration-500"
                      >
                        <th className="text-left align-middle xxs:text-[10px] md:text-sm xs:text-xs whitespace-nowrap px-3 py-3.5 dark:text-white text-black">
                          {item.name} ({item.unit})
                        </th>
                        <td
                          className={`text-center align-middle xxs:text-[10px] md:text-sm xs:text-xs whitespace-nowrap px-3 py-3.5 font-semibold ${color}`}
                        >
                          {item.price.toLocaleString("vi-VN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td
                          className={`text-center align-middle xxs:text-[10px] md:text-sm xs:text-xs whitespace-nowrap px-3 py-3.5 font-semibold ${color}`}
                        >
                          {item.Day}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={3}>
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

export default GoodsDetail;
