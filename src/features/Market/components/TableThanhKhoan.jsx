import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Chart/utils/Loading";
import socket from "../../Chart/utils/socket";
import { fecthDataTableThanhKhoan } from "../thunk";
import { Spin } from "antd";

const TableThanhKhoan = () => {
  const { tableThanhKhoanData } = useSelector((state) => state.market);
  console.log(tableThanhKhoanData);
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
  const [hoveredIndex, setHoveredIndex] = useState(-1);
    const handleMouseOver = (index) => {
        setHoveredIndex(index);
    };
    const handleMouseOut = () => {
        setHoveredIndex(-1);
    };

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
  console.log(queryApi);
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
        <span className="text-white text-[0.9rem] pl-[2px]">
          Top đóng góp thanh khoản theo:{" "}
        </span>
        <select
          onChange={(e) => {
            handleQueryApiType(e.target.value);
          }}
          className={`bg-[#151924] text-[0.9rem] text-[#0097B2] border-0`}
        >
          <option value="0">Cổ phiếu</option>
          <option value="1">Ngành Lv1</option>
          <option value="2">Ngành Lv2</option>
          <option value="3">Ngành Lv3</option>
        </select>
        <span className="text-white text-[0.9rem] pl-[15px]">Sàn </span>
        <select
          onChange={(e) => {
            handleQueryApiExchange(e.target.value);
          }}
          className={`bg-[#151924] text-[0.9rem] text-[#0097B2] border-0`}
        >
          <option value="ALL">Toàn thị trường</option>
          <option value="HSX">HSX</option>
          <option value="HNX">HNX</option>
          <option value="UPCOM">UPCOM</option>
        </select>
      </div>
      <section>
        <div className="w-full">
          <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded">
            <div className="block w-full scrollbar-thin scrollbar-thumb-[#436FB5] scrollbar-track-[#151924]  h-24 overflow-auto  sm:min-h-[312px] md:min-h-[336px] lg:min-h-[350px] xl:min-h-[350px] bg-transparent">
              <table className="items-center w-full border-collapse bg-transparent  scrollbar-thin scrollbar-thumb-[#436FB5] scrollbar-track-[#151924] ">
                <thead className="sticky top-0">
                  <tr className="bg-[#1E5D8B]">
                    <th className="text-center align-middle px-3 py-2 text-[0.7rem] font-semibold text-white">
                      Cổ phiếu
                    </th>
                    <th className="text-center align-middle px-3 py-2 text-[0.7rem] font-semibold text-white">
                      Tỷ lệ đóng góp (%)
                    </th>
                    <th className="text-center align-middle px-3 py-2 text-[0.7rem] font-semibold text-white">
                      GT giao dịch (tỷ)
                    </th>
                    <th className="text-center align-middle px-3 py-2 text-[0.7rem] font-semibold text-white">
                      KL Giao dịch (tr CP)
                    </th>
                    <th className="text-center align-middle px-3 py-2 text-[0.7rem] font-semibold text-white">
                      Chênh lệch cung-cầu (KL)
                    </th>
                    <th className="text-center align-middle px-3 py-2 text-[0.7rem] font-semibold text-white">
                      Chênh lệch cung-cầu (GT)
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {tableThanhKhoanData?.length ? (
                    tableThanhKhoanData?.map((item, index) => {
                      return (
                        <tr className="text-white text-center hover:bg-gray-800 duration-500" key={index}>
                          <td className="text-left " >{item.symbol}</td>
                          <td className="text-center px-5 align-middle  whitespace-nowrap p-3.5 font-semibold">{item.contribute.toFixed(2)}%</td>
                          <td className="text-center px-5 align-middle  whitespace-nowrap p-3.5 font-semibold">{(item.totalValueMil/1000).toFixed(1)}</td>
                          <td className="text-center px-5 align-middle  whitespace-nowrap p-3.5 font-semibold">{(item.totalVolume/100000).toFixed(2)}</td>
                          {item.supplyDemandVolumeGap >= 0?<td className="text-center px-5 align-middle  whitespace-nowrap p-3.5 font-semibold">{(item.supplyDemandVolumeGap/1000000).toFixed(2)}</td> :<td className="text-center text-red-500 px-5 align-middle  whitespace-nowrap p-3.5 font-semibold">{(item.supplyDemandVolumeGap/1000000).toFixed(2)}</td>} 
                         {item.supplyDemandValueGap >= 0?<td className="text-center text-green-500 px-5 align-middle  whitespace-nowrap p-3.5 font-semibold">{(item.supplyDemandValueGap/1000).toFixed(2)}</td> :<td className="text-center text-red-500 px-5 align-middle  whitespace-nowrap p-3.5 font-semibold">{(item.supplyDemandValueGap/1000).toFixed(2)}</td>} 
                        </tr>
                      );
                    })
                  ) : (
                    <div className="text-center "><Spin /></div>
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
