import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../Chart/utils/Loading";
import { getColor } from "../../../Chart/utils/utils";
import { fecthDataTableThanhKhoan } from "../../thunk";
import formatNumberCurrency from "../../../../helper/formatNumberCurrency";

const hashTb = {
  "1 ngày": "1 ngày",
  "5 ngày": "5 ngày",
  "1 tháng": "1 tháng",
  YtD: "YtD",
};

const TableLiquidity = () => {
  const dispatch = useDispatch();
  const { tableThanhKhoanData } = useSelector((state) => state.market);
  const [activeButton, setActiveButton] = useState("0");
  const [queryApi, setQueryApi] = useState({
    exchange: "ALL",
    type: 0,
    order: 0,
  });
  const [title, setTitle] = useState("Cổ phiếu");
  useEffect(() => {
    if (queryApi.type !== 0) {
      setTitle("Ngành");
    } else {
      setTitle("Cổ phiếu");
    }
  }, [queryApi.type]);
  useEffect(() => {
    dispatch(
      fecthDataTableThanhKhoan(queryApi.exchange, queryApi.type, queryApi.order)
    );
  }, [dispatch, queryApi]);

  const handleQueryApiOrder = (order) => {
    setQueryApi((prev) => ({ ...prev, order }));
  };
  const handleQueryApiType = (type) => {
    setQueryApi((prev) => ({ ...prev, type }));
  };
  const handleQueryApiExchange = (exchange) => {
    setQueryApi((prev) => ({ ...prev, exchange }));
  };
  const buttonRef = useRef([]);

  const handleActiveButton = (index) => {
    setActiveButton(index);
  };

  useEffect(() => {
    const activeBtn = buttonRef.current[activeButton];
    const movingBackground = document.querySelector(".moving-background");
    if (activeBtn && movingBackground) {
      movingBackground.style.left = `${activeBtn.offsetLeft}px`;
      movingBackground.style.width = `${activeBtn.offsetWidth}px`;
    }
  }, [activeButton]);
  return (
    <>
      <div className="relative dark:bg-[#2D303A] bg-gray-400 flex justify-around items-center rounded-full mb-2">
        <div className="moving-background absolute h-full top-0 bg-[#275F88] transition-all duration-500 z-0"></div>
        {Object.entries(hashTb).map(([label], index) => (
          <button
            ref={(el) => (buttonRef.current[index] = el)}
            key={index}
            onClick={() => {
              handleActiveButton(index);
              handleQueryApiOrder(index);
            }}
            className="uppercase z-10 bg-transparent text-white border-none px-[0.375rem] py-[0.5rem] cursor-pointer"
          >
            {label}
          </button>
        ))}
      </div>

      <div>
        <span className="dark:text-white text-black text-[0.9rem] pl-[2px] font-semibold">
          Top đóng góp thanh khoản theo:{" "}
        </span>
        <div className="md:inline lg:block xl:inline 2xl:inline text-center">
          <select
            onChange={(e) => {
              handleQueryApiType(e.target.value);
            }}
            className={`dark:bg-[#151924] bg-gray-100 text-[0.9rem] ml-1.5 text-[#0097B2] border-0`}
          >
            <option value={0}>Cổ phiếu</option>
            <option value={1}>Ngành Lv1</option>
            <option value={2}>Ngành Lv2</option>
            <option value={3}>Ngành Lv3</option>
          </select>
          <span className="dark:text-white text-black text-[0.9rem] ml-4">
            Sàn
          </span>
          <select
            onChange={(e) => {
              handleQueryApiExchange(e.target.value);
            }}
            className={`dark:bg-[#151924] bg-gray-100 text-[0.9rem] ml-1.5 text-[#0097B2] border-0`}
          >
            <option value="ALL">Toàn thị trường</option>
            <option value="HSX">HSX</option>
            <option value="HNX">HNX</option>
            <option value="UPCOM">UPCOM</option>
          </select>
        </div>
      </div>
      <section className="mt-1">
        <div className="w-full">
          <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded">
            <div className="block w-full overflow-auto scrollbar-thin scrollbar-thumb-[#436FB5] scrollbar-track-transparent h-[379px] bg-transparent">
              <table className="items-center w-full border-collapse bg-transparent">
                <thead className="sticky top-0">
                  <tr className="bg-[#1E5D8B]">
                    <th className="text-center align-middle xxs:text-[10px] px-1.5 py-2 text-[0.75rem] font-semibold text-white">
                      {title}
                    </th>
                    <th className="text-center align-middle xxs:text-[10px] px-1.5 py-2 text-[0.75rem] font-semibold text-white">
                      Tỷ lệ đóng góp (%)
                    </th>
                    <th className="text-center align-middle xxs:text-[10px] px-1.5 py-2 text-[0.75rem] font-semibold text-white">
                      GT giao dịch (tỷ)
                    </th>
                    <th className="text-center align-middle xxs:text-[10px] px-1.5 py-2 text-[0.75rem] font-semibold text-white">
                      KL Giao dịch (tr CP)
                    </th>
                    <th className="text-center align-middle xxs:text-[10px] px-1.5 py-2 text-[0.75rem] font-semibold text-white">
                      Chênh lệch cung-cầu (KL)
                    </th>
                    <th className="text-center align-middle xxs:text-[10px] px-1.5 py-2 text-[0.75rem] font-semibold text-white">
                      Chênh lệch cung-cầu (GT)
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {tableThanhKhoanData?.length ? (
                    tableThanhKhoanData?.map((item, index) => {
                      let color = getColor(item.supplyDemandVolumeGap);
                      let color2 = getColor(item.supplyDemandValueGap);

                      return (
                        <tr
                          className="dark:text-white text-black text-center xxs:text-[10px] text-[13px] dark:hover:bg-gray-800 hover:bg-gray-300 duration-500"
                          key={index}
                        >
                          <th className="text-left px-1.5 align-middle p-3.5">
                            {item.symbol}
                          </th>
                          <td className="text-center px-1.5 align-middle whitespace-nowrap p-3.5 font-semibold">
                            {formatNumberCurrency(item.contribute)}%
                          </td>
                          <td className="text-center px-1.5 align-middle whitespace-nowrap p-3.5 font-semibold">
                            {formatNumberCurrency(
                              item.totalValueMil / 1000000000
                            )}
                          </td>
                          <td className="text-center px-1.5 align-middle whitespace-nowrap p-3.5 font-semibold">
                            {formatNumberCurrency(item.totalVolume / 100000)}
                          </td>
                          <td
                            className={`${color} text-center px-1.5 align-middle whitespace-nowrap p-3.5 font-semibold`}
                          >
                            {formatNumberCurrency(
                              item.supplyDemandVolumeGap / 1000000
                            )}
                          </td>
                          <td
                            className={`${color2} text-center px-1.5 align-middle whitespace-nowrap p-3.5 font-semibold`}
                          >
                            {formatNumberCurrency(
                              item.supplyDemandValueGap / 1000
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6}>
                        <div className="mt-16 text-center">
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

export default TableLiquidity;
