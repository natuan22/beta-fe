import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Loading from "../../../Chart/utils/Loading";
import { fetchDataListMaturityBonds } from "../../thunk";

const ListMaturityBonds = () => {
  const dispatch = useDispatch();
  const { dataListMaturityBonds } = useSelector((state) => state.macro);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchDataListMaturityBonds);
  }, [dispatch]);

  useEffect(() => {
    if (dataListMaturityBonds) {
      setLoading(false);
      const modifiedArray =
        Array.isArray(dataListMaturityBonds) &&
        dataListMaturityBonds?.map((item) => {
          const name = item.name
            .replace("Công ty cổ phần", "CTCP")
            .replace("Công ty Cổ phần", "CTCP")
            .replace("CÔNG TY CỔ PHẦN", "CTCP");

          return { ...item, name };
        });
      setData(modifiedArray);
    }
  }, [dataListMaturityBonds]);

  return (
    <div>
      <section className="bg-blueGray-50 pt-1.5">
        <div className="w-full">
          <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded">
            <div className="block xxs:w-[295px] xs:w-[350px] sm:w-[400px] md:w-[670px] lg:w-[897px] xl:w-full scrollbar-thin scrollbar-thumb-[#0050AD] dark:scrollbar-track-[#151924] scrollbar-track-transparent overflow-x-scroll bg-transparent h-[420px]">
              <table className="items-center w-full border-collapse bg-transparent">
                <thead
                  className="bg-[#0050AD] z-10"
                  style={{ position: "sticky", top: 0 }}
                >
                  <tr>
                    <th className="bg-[#0050AD] text-center align-middle px-3 py-[19px] font-semibold whitespace-nowrap text-sm text-white">
                      Doanh nghiệp
                    </th>
                    <th className="bg-[#0050AD] text-center align-middle px-3 py-[19px] font-semibold text-sm text-white">
                      Mã TP
                    </th>
                    <th className="bg-[#0050AD] text-center align-middle px-3 py-[19px] xl:whitespace-normal lg:whitespace-nowrap md:whitespace-nowrap sm:whitespace-nowrap xs:whitespace-nowrap xxs:whitespace-nowrap font-semibold text-sm text-white">
                      Kỳ hạn còn lại (ngày)
                    </th>
                    <th className="bg-[#0050AD] text-center align-middle px-3 py-[19px] xl:whitespace-normal lg:whitespace-nowrap md:whitespace-nowrap sm:whitespace-nowrap xs:whitespace-nowrap xxs:whitespace-nowrap font-semibold text-sm text-white">
                      Giá trị phát hành (tỷ VNĐ)
                    </th>
                    <th className="bg-[#0050AD] text-center align-middle px-3 py-[19px] xl:whitespace-normal lg:whitespace-nowrap md:whitespace-nowrap sm:whitespace-nowrap xs:whitespace-nowrap xxs:whitespace-nowrap font-semibold text-sm text-white">
                      Giá trị lưu hành hiện tại (tỷ VNĐ)
                    </th>
                    <th className="bg-[#0050AD] text-center align-middle px-3 py-[19px] xl:whitespace-normal lg:whitespace-nowrap md:whitespace-nowrap sm:whitespace-nowrap xs:whitespace-nowrap xxs:whitespace-nowrap font-semibold text-sm text-white">
                      Tổ chức lưu ký
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {!loading ? (
                    Array.isArray(data) &&
                    data.map((item, index) => (
                      <tr
                        key={index}
                        className="dark:hover:bg-gray-800 hover:bg-gray-300 duration-500"
                      >
                        <th
                          className={`text-left align-middle lg:whitespace-nowrap md:whitespace-normal px-1 py-[14px] text-sm dark:text-white text-black`}
                        >
                          {item.name}
                        </th>
                        <th
                          className={`text-center align-middle whitespace-nowrap px-1 py-[14px] text-sm dark:text-white text-black`}
                        >
                          {item.code}
                        </th>
                        <th
                          className={`text-center align-middle whitespace-nowrap px-1 py-[14px] text-sm dark:text-white text-black`}
                        >
                          {item.khcl}
                        </th>
                        <th
                          className={`text-center align-middle whitespace-nowrap px-1 py-[14px] text-sm dark:text-white text-black`}
                        >
                          {(item.gtph / 1000000000).toLocaleString("vi-VN", {
                            maximumFractionDigits: 2,
                          })}
                        </th>
                        <th
                          className={`text-center align-middle whitespace-nowrap px-1 py-[14px] text-sm dark:text-white text-black`}
                        >
                          {(item.gtlh / 1000000000).toLocaleString("vi-VN", {
                            maximumFractionDigits: 2,
                          })}
                        </th>
                        <th
                          className={`text-left align-middle whitespace-nowrap px-1 py-[14px] text-sm dark:text-white text-black`}
                        >
                          {item.tclk}
                        </th>
                      </tr>
                    ))
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
  );
};

export default ListMaturityBonds;
