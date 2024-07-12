import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../utils/Loading";

const Events = () => {
  const dataEvents = useSelector((state) => state.chart.dataEvents);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dataEvents.data) {
      setLoading(false);
      setData(dataEvents.data);
    }
  }, [dataEvents]);

  return (
    <section className="bg-blueGray-50">
      <div className="w-full">
        <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full mb-6 rounded ">
          <div className="block w-full xl:h-[693px] lg:h-[330px] scrollbar-thin scrollbar-thumb-[#436FB5] dark:scrollbar-track-[#151924] scrollbar-track-transparent overflow-y-scroll bg-transparent">
            <table className="items-center bg-transparent w-full border-collapse">
              <thead className="sticky top-0 bg-[#1E5D8B]">
                <tr>
                  <th className="text-center align-middle xxs:text-[10px] px-3 py-3 text-sm whitespace-nowrap font-semibold text-white">
                    Mã chứng khoán
                  </th>
                  <th className="text-center align-middle xxs:text-[10px] px-3 py-3 text-sm whitespace-nowrap font-semibold text-white">
                    Loại sự kiện
                  </th>
                  <th className="text-center align-middle xxs:text-[10px] px-3 py-3 text-sm whitespace-nowrap font-semibold text-white">
                    Ngày
                  </th>
                  <th className="text-center align-middle xxs:text-[10px] px-3 py-3 text-sm whitespace-nowrap font-semibold text-white">
                    Nội dung sự kiện
                  </th>
                </tr>
              </thead>

              <tbody>
                {!loading ? (
                  Array.isArray(data) &&
                  data.map((item, index) => {
                    return (
                      <tr
                        key={index}
                        className="dark:hover:bg-gray-800 hover:bg-gray-300 duration-500"
                      >
                        <th className="text-center align-middle xxs:text-[10px] text-xs whitespace-nowrap px-3 p-3.5 dark:text-white text-black">
                          {item.ticker}
                        </th>
                        <td className="text-center align-middle xxs:text-[10px] text-xs whitespace-nowrap sm:px-6 lg::px-10 xl:px-10 p-3.5 dark:text-white text-black">
                          {item.LoaiSuKien}
                        </td>
                        <td className="text-center align-center xxs:text-[10px] text-xs whitespace-nowrap sm:px-6 lg::px-10 xl:px-10 p-3.5 dark:text-white text-black">
                          {formatDate(new Date(Date.parse(item.NgayDKCC)))}
                        </td>
                        <td className="text-left align-middle xxs:text-[10px] text-xs px-3 p-4 dark:text-white text-black">
                          {item.NoiDungSuKien}
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

export default Events;

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join("/");
}
