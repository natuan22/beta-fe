import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Chart/utils/Loading";
import socket from "../../Chart/utils/socket";
import { fecthDataTableThanhKhoan } from "../thunk";
import { Spin } from "antd";

const TableThanhKhoan = () => {
  const { tableThanhKhoanData } = useSelector((state) => state.market);
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = useState("1day");
  const dataTable = useSelector((state) => state.chart.dataTableDetail);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [queryApi, setQueryApi] = useState({
    exchange: "ALL",
    type: 0,
    order: 0,
  });
  useEffect(() => {
    dispatch(
      fecthDataTableThanhKhoan(queryApi.exchange, queryApi.type, queryApi.order)
    );
  }, [dispatch, queryApi]);
  const handleClick = (button) => {
    setActiveButton(button);
  };

  const buttonStyle = {
    backgroundColor: "transparent",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "0.9rem",
    padding: "0.375rem 0.5rem",
  };

  const activeButtonStyle = {
    backgroundColor: "#275F88",
    color: "#fff",
  };
  const handleQueryApiOrder = (order) => {
    setQueryApi((prev) => ({ ...prev, order }));
  };
  const handleQueryApiType = (type) => {
    setQueryApi((prev) => ({ ...prev, type }));
  };
  const handleQueryApiExchange = (exchange) => {
    setQueryApi((prev) => ({ ...prev, exchange }));
  };
  useEffect(() => {
    if (dataTable.data) {
      setLoading(false);
      setData(dataTable.data);
    }
  }, [dataTable]);
  return (
    <>
      <div className="bg-[#2D303A] flex justify-around items-center rounded-full mb-2">
        <button
          style={
            activeButton === "1day"
              ? { ...buttonStyle, ...activeButtonStyle }
              : buttonStyle
          }
          onClick={() => {
            handleClick("1day");
            handleQueryApiOrder(0);
          }}
          className="uppercase"
        >
          1 ngày
        </button>
        <button
          style={
            activeButton === "5days"
              ? { ...buttonStyle, ...activeButtonStyle }
              : buttonStyle
          }
          onClick={() => {
            handleClick("5days");
            handleQueryApiOrder(1);
          }}
          className="uppercase"
        >
          5 ngày
        </button>
        <button
          style={
            activeButton === "1week"
              ? { ...buttonStyle, ...activeButtonStyle }
              : buttonStyle
          }
          onClick={() => {
            handleClick("1week");
            handleQueryApiOrder(2);
          }}
          className="uppercase"
        >
          1 tuần
        </button>
        <button
          style={
            activeButton === "YtD"
              ? { ...buttonStyle, ...activeButtonStyle }
              : buttonStyle
          }
          onClick={() => {
            handleClick("YtD");
            handleQueryApiOrder(3);
          }}
          className=""
        >
          YtD
        </button>
      </div>
      <div>
        <span className="text-white text-[0.9rem] pl-[2px]">Top đóng góp thanh khoản theo: </span>
        <div className="md:inline lg:block xl:inline 2xl:inline text-center">
          <select
            onChange={(e) => {
              handleQueryApiType(e.target.value);
            }}
            className={`bg-[#151924] text-[0.9rem] ml-1.5 text-[#0097B2] border-0`}
          >
            <option value="0">Cổ phiếu</option>
            <option value="1">Ngành Lv1</option>
            <option value="2">Ngành Lv2</option>
            <option value="3">Ngành Lv3</option>
          </select>
          <span className="text-white text-[0.9rem] ml-4">Sàn</span>
          <select
            onChange={(e) => {
              handleQueryApiExchange(e.target.value);
            }}
            className={`bg-[#151924] text-[0.9rem] ml-1.5 text-[#0097B2] border-0`}
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
            <div className="block w-full overflow-auto scrollbar-thin scrollbar-thumb-[#436FB5] scrollbar-track-[#151924] xs:h-[340px] md:h-[340px] lg:h-[360px] xl:h-[379px] 2xl:min-h-[379px] bg-transparent">
              <table className="items-center w-full border-collapse bg-transparent">
                <thead className="sticky top-0">
                  <tr className="bg-[#1E5D8B]">
                    <th className="text-center align-middle px-1.5 py-2 text-[0.75rem] font-semibold text-white">
                      Cổ phiếu
                    </th>
                    <th className="text-center align-middle px-1.5 py-2 text-[0.75rem] font-semibold text-white">
                      Tỷ lệ đóng góp (%)
                    </th>
                    <th className="text-center align-middle px-1.5 py-2 text-[0.75rem] font-semibold text-white">
                      GT giao dịch (tỷ)
                    </th>
                    <th className="text-center align-middle px-1.5 py-2 text-[0.75rem] font-semibold text-white">
                      KL Giao dịch (tr CP)
                    </th>
                    <th className="text-center align-middle px-1.5 py-2 text-[0.75rem] font-semibold text-white">
                      Chênh lệch cung-cầu (KL)
                    </th>
                    <th className="text-center align-middle px-1.5 py-2 text-[0.75rem] font-semibold text-white">
                      Chênh lệch cung-cầu (GT)
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {tableThanhKhoanData?.length ? (
                    tableThanhKhoanData?.map((item, index) => {
                      let color = getColor(item.supplyDemandVolumeGap)
                      let color2 = getColor(item.supplyDemandValueGap)

                      return (
                        <tr className="text-white text-center text-[13px] hover:bg-gray-800 duration-500" key={index}>
                          <th className="text-left px-1.5 align-middle p-3.5" >{item.symbol}</th>
                          <td className="text-center px-1.5 align-middle whitespace-nowrap p-3.5 font-semibold">{item.contribute.toFixed(2)}%</td>
                          <td className="text-center px-1.5 align-middle whitespace-nowrap p-3.5 font-semibold">{(item.totalValueMil / 1000).toFixed(1)}</td>
                          <td className="text-center px-1.5 align-middle whitespace-nowrap p-3.5 font-semibold">{(item.totalVolume / 100000).toFixed(2)}</td>
                          <td className={`${color} text-center px-1.5 align-middle whitespace-nowrap p-3.5 font-semibold`}>
                            {(item.supplyDemandVolumeGap / 1000000).toFixed(2)}
                          </td>
                          <td className={`${color2} text-center px-1.5 align-middle whitespace-nowrap p-3.5 font-semibold`}>
                            {(item.supplyDemandValueGap / 1000).toFixed(2)}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr><td colSpan={6}><div className="mt-16"><Loading /></div></td></tr>
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

export default TableThanhKhoan;

function getColor(item) {
  let color = "";
  if (item === 0) color = "text-yellow-500";
  else if (item < 0) color = "text-red-500";
  else color = "text-green-500";

  return color;
}