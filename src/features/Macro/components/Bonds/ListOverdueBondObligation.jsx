import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Loading from "../../../Chart/utils/Loading";
import { fetchDataListOverdueBondObligation } from "../../thunk";

const ListOverdueBondObligation = () => {
  const dispatch = useDispatch();
  const { dataListOverdueBondObligation } = useSelector((state) => state.macro);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchDataListOverdueBondObligation);
  }, [dispatch]);

  useEffect(() => {
    if (dataListOverdueBondObligation) {
      setLoading(false);
      const modifiedArray =
        Array.isArray(dataListOverdueBondObligation) &&
        dataListOverdueBondObligation?.map((item) => {
          const name = item.name
            .replace("Công ty Cổ phần", "CTCP")
            .replace("CÔNG TY CỔ PHẦN", "CTCP")
            .replace("CÔNG TY CỔ PHẦN", "CTCP")
            .replace("Công ty cổ phần", "CTCP");

          return { ...item, name };
        });
      setData(modifiedArray);
    }
  }, [dataListOverdueBondObligation]);

  return (
    <div>
      <section className="bg-blueGray-50 pt-1.5">
        <div className="w-full">
          <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded">
            <div className="block xxs:w-[295px] xs:w-[350px] sm:w-[400px] md:w-[670px] lg:w-[897px] xl:w-full scrollbar-thin scrollbar-thumb-[#0050AD] dark:scrollbar-track-[#151924] scrollbar-track-transparent overflow-x-scroll bg-transparent h-[350px]">
              <table className="items-center w-full border-collapse bg-transparent">
                <thead
                  className="bg-[#0050AD] z-10"
                  style={{ position: "sticky", top: 0 }}
                >
                  <tr>
                    <th className="bg-[#0050AD] text-center align-middle px-3 py-[19px] whitespace-nowrap font-semibold text-sm text-white">
                      Doanh nghiệp
                    </th>
                    <th className="bg-[#0050AD] text-center align-middle px-3 py-[19px] whitespace-nowrap font-semibold text-sm text-white">
                      Mã trái phiếu
                    </th>
                    <th className="bg-[#0050AD] text-center align-middle px-3 py-[19px] md:whitespace-normal sm:whitespace-nowrap xs:whitespace-nowrap xxs:whitespace-nowrap font-semibold text-sm text-white">
                      Tổng lãi trả kỳ (tỷ VNĐ)
                    </th>
                    <th className="bg-[#0050AD] text-center align-middle px-3 py-[19px] md:whitespace-normal sm:whitespace-nowrap xs:whitespace-nowrap xxs:whitespace-nowrap font-semibold text-sm text-white">
                      Tổng giá trị gốc (tỷ VNĐ)
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {!loading ? (
                    Array.isArray(data) &&
                    data.map((item) => (
                      <tr
                        key={item.name}
                        className="dark:hover:bg-gray-800 hover:bg-gray-300 duration-500"
                      >
                        <th
                          className={`text-left align-middle px-1 py-[14px] text-sm dark:text-white text-black`}
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
                          {(item.lai_tra_ky / 1000000000).toLocaleString(
                            "vi-VN",
                            { maximumFractionDigits: 2 },
                          )}
                        </th>
                        <th
                          className={`text-center align-middle whitespace-nowrap px-1 py-[14px] text-sm dark:text-white text-black`}
                        >
                          {(item.gia_tri_goc / 1000000000).toLocaleString(
                            "vi-VN",
                            { maximumFractionDigits: 2 },
                          )}
                        </th>
                      </tr>
                    ))
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
    </div>
  );
};

export default ListOverdueBondObligation;
