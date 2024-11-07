import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import calSignalText from "../../../../helper/calSignalText";
import formatNumberCurrency from "../../../../helper/formatNumberCurrency";
import logoPaths from "../../../../helper/logoPaths";
import FooterAnalysis from "./FooterAnalysis";
import HeaderAnalysis from "./HeaderAnalysis";
import Candlestick from "./TechPage1/Candlestick";
import StackColumnChart from "./TechPage1/ColumnChart";
import GauChartGenAnalReportAuto from "./TechPage1/GauChartGenAnalReportAuto";
import LineChart from "./TechPage1/LineChart";
import Table from "./TechPage1/Table";
import LazyLoad from "react-lazyload";

const getColorBaseOnName = (value) => {
  if (value === "Tích cực") return "text-green-500";
  if (value === "Tiêu cực") return "text-red-500";
  if (value === "Trung lập") return "text-yellow-500";
};

const TechPage1 = () => {
  const {
    dataInfoHeader,
    dataInfoStock,
    dataTechnicalIndex,
    dataPriceFluctuationCorrelation,
    dataPriceFluctuation,
    dataSalesOrderStatistics,
  } = useSelector((state) => state.stock);
  const [maxType, setMaxType] = useState("");

  useEffect(() => {
    if (Object.keys(dataTechnicalIndex).length !== 0) {
      setMaxType(calSignalText(dataTechnicalIndex.generalSignal));
    }
  }, [dataTechnicalIndex]);

  return (
    <div className="h-[1152px] w-[800px] bg-white">
      <div className="header">
        <LazyLoad offset={300} debounce={200} once>
          <HeaderAnalysis />
        </LazyLoad>
      </div>
      <div className="content w-[800px] flex flex-col items-center h-[990px]">
        <div className="w-[790px] flex h-full justify-between">
          <div className="cont-left w-[330px]">
            <LazyLoad offset={300} debounce={200} once>
              {Object.keys(dataInfoStock).length !== 0 ? (
                <div className="h-[555px]">
                  <div className="stock-info flex flex-col justify-around h-[150px] w-full ">
                    <div className="flex items-center justify-around h-full">
                      {dataInfoHeader ? (
                        <img
                          className="w-[25%]"
                          src={logoPaths[dataInfoHeader.code]}
                          alt="stock"
                        />
                      ) : (
                        <>Loading...</>
                      )}

                      <div className="w-[210px]">
                        <p className="m-0 text-[#0055B6] font-bold text-[40px]">
                          {dataInfoStock.code}
                        </p>
                        <p className="m-0 text-[#FF8700] font-bold ">
                          {dataInfoStock.companyName}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`${
                        dataInfoStock.LV2 === "Hàng hóa và dịch vụ công nghiệp"
                          ? "text-[14px]"
                          : "text-base"
                      }`}
                    >
                      <p className="text-[#023E8A] font-bold m-0">
                        Ngành cấp II:{" "}
                        <span className={`text-black font-semibold`}>
                          {dataInfoStock.LV2}
                        </span>{" "}
                      </p>
                      <p className="text-[#023E8A] font-bold m-0">
                        Ngành cấp IV:{" "}
                        <span className="text-black font-semibold">
                          {dataInfoStock.LV4}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="w-full pt-2.5">
                    <div className="bg-gradient-to-b from-[#024A9B] to-[#0568D8] h-[25px] p-1">
                      <h2 className="text-white text-[15px] font-semibold text-center m-0">
                        Thông tin cổ phiếu
                      </h2>
                    </div>
                    <div className="flex justify-between items-center text-[15px]">
                      <p className="text-[#0249A4] m-1 w-[75%]">
                        Thị giá (đồng/CP)
                      </p>
                      <p className="text-[#0249A4] m-1 ">:</p>
                      <p className="m-1 w-[25%] text-end font-semibold text-black">
                        {formatNumberCurrency(dataInfoStock.closePrice * 1000)}
                      </p>
                    </div>
                    <div className="flex justify-between items-center text-[15px]">
                      <p className="text-[#0249A4] m-1 w-[75%]">
                        Vốn hóa thị trường (tỷ đồng)
                      </p>
                      <p className="text-[#0249A4] m-1 ">:</p>
                      <p className="m-1 w-[25%] text-end font-semibold text-black">
                        {formatNumberCurrency(
                          dataInfoStock.marketCap / 1000000000,
                        )}
                      </p>
                    </div>
                    <div className="flex justify-between items-center text-[15px]">
                      <p className="text-[#0249A4] m-1 w-[75%]">
                        Số CP đang lưu hành (triệu CP)
                      </p>
                      <p className="text-[#0249A4] m-1">:</p>
                      <p className="m-1  w-[25%] text-end font-semibold text-black">
                        {formatNumberCurrency(dataInfoStock.shareout / 1000000)}
                      </p>
                    </div>
                    <div className="flex justify-between items-center text-[15px]">
                      <p className="text-[#0249A4] m-1 w-[75%]">
                        Giá cao nhất 52 tuần (đồng)
                      </p>
                      <p className="text-[#0249A4] m-1">:</p>
                      <p className="m-1 w-[25%] text-end font-semibold text-black">
                        {formatNumberCurrency(dataInfoStock.high)}
                      </p>
                    </div>
                    <div className="flex justify-between items-center text-[15px]">
                      <p className="text-[#0249A4] m-1 w-[75%]">
                        Giá thấp nhất 52 tuần (đồng)
                      </p>
                      <p className="text-[#0249A4] m-1">:</p>
                      <p className="m-1 w-[25%] text-end font-semibold text-black">
                        {formatNumberCurrency(dataInfoStock.low)}
                      </p>
                    </div>
                    <div className="flex justify-between items-center text-[15px]">
                      <p className="text-[#0249A4] m-1 w-[75%]">
                        KLCP trung bình 20 phiên (CP)
                      </p>
                      <p className="text-[#0249A4] m-1">:</p>
                      <p className="m-1 w-[25%] text-end font-semibold text-black">
                        {formatNumberCurrency(dataInfoStock.kl)}
                      </p>
                    </div>
                    <div className="flex justify-between items-center text-[15px]">
                      <p className="text-[#0249A4] m-1 w-[75%]">
                        GTGD trung bình 20 phiên{" "}
                        <span className="text-[13px]">(tỷ đồng)</span>
                      </p>
                      <p className="text-[#0249A4] m-1">:</p>
                      <p className="m-1 w-[25%] text-end font-semibold text-black">
                        {formatNumberCurrency(
                          dataInfoStock.gia_tri / 1000000000,
                        )}
                      </p>
                    </div>
                    <div className="flex justify-between items-center text-[15px]">
                      <p className="text-[#0249A4] m-1 w-[75%]">
                        EPS (đồng/CP)
                      </p>
                      <p className="text-[#0249A4] m-1">:</p>
                      <p className="m-1 w-[25%] text-end font-semibold text-black">
                        {formatNumberCurrency(dataInfoStock.EPS)}
                      </p>
                    </div>
                    <div className="flex justify-between items-center text-[15px]">
                      <p className="text-[#0249A4] m-1 w-[75%]">P/E (lần)</p>
                      <p className="text-[#0249A4] m-1">:</p>
                      <p className="m-1 w-[25%] text-end font-semibold text-black">
                        {formatNumberCurrency(dataInfoStock.PE)}
                      </p>
                    </div>
                    <div className="flex justify-between items-center text-[15px]">
                      <p className="text-[#0249A4] m-1 w-[75%]">
                        BVPS (đồng/CP)
                      </p>
                      <p className="text-[#0249A4] m-1">:</p>
                      <p className="m-1 w-[25%] text-end font-semibold text-black">
                        {formatNumberCurrency(dataInfoStock.BVPS)}
                      </p>
                    </div>
                    <div className="flex justify-between items-center text-[15px]">
                      <p className="text-[#0249A4] m-1 w-[75%]">P/B (lần)</p>
                      <p className="text-[#0249A4] m-1">:</p>
                      <p className="m-1 w-[25%] text-end font-semibold text-black">
                        {formatNumberCurrency(dataInfoStock.PB)}
                      </p>
                    </div>
                    <div className="flex justify-between items-center text-[15px]">
                      <p className="text-[#0249A4] m-1 w-[75%]">
                        Tỷ lệ sở hữu nước ngoài
                      </p>
                      <p className="text-[#0249A4] m-1">:</p>
                      <p className="m-1 w-[25%] text-end font-semibold text-black">
                        {formatNumberCurrency(dataInfoStock.nuoc_ngoai)}%
                      </p>
                    </div>
                    {/* <div className="flex justify-between items-center text-[15px]">
                    <p className="text-[#0249A4] m-1 w-[75%]">
                      Tỷ lệ sở hữu nhà nước
                    </p>
                    <p className="text-[#0249A4] m-1">:</p>
                    <p className="m-1 w-[25%] text-end font-semibold text-black">
                      {formatNumberCurrency(dataInfoStock.nha_nuoc)}%
                    </p>
                  </div> */}
                  </div>
                </div>
              ) : (
                <div className="h-[547px] mt-2">Loading....</div>
              )}
            </LazyLoad>
            <div className={`lineChart translate-y-[2.5px]`}>
              <div className="bg-gradient-to-b from-[#024A9B] to-[#0568D8] h-[25px] z-30 text-center p-1 tran">
                <h2 className="text-white font-semibold text-[12px] m-0 leading-[19px] ">
                  Tương quan biến động giá cổ phiếu{" "}
                  <span className="uppercase">{dataInfoStock?.code}</span> trong
                  1 năm (%)
                </h2>
              </div>
              {Object.keys(dataPriceFluctuationCorrelation).length !== 0 ? (
                <LineChart data={dataPriceFluctuationCorrelation} />
              ) : (
                <div className="h-[300px]">Loading...</div>
              )}
            </div>
            <div className={`table translate-y-[-20px]`}>
              <LazyLoad offset={300} debounce={200} once>
                <Table data={dataPriceFluctuation} />
              </LazyLoad>
            </div>
          </div>

          <div className="cont-right w-[450px] mr-1 ">
            <div className="h-[150px] w-[450px] flex items-center justify-between translate-y-[6px]">
              <div className="w-[202px] text-center h-[120px]">
                <p className="m-0 font-bold text-[16px] pt-2">
                  Tín hiệu kỹ thuật tổng hợp
                </p>
                <p
                  style={{
                    textShadow:
                      maxType === "Rất tích cực"
                        ? "-2px 3px 3px #95e4bf"
                        : maxType === "Tích cực"
                          ? "-2px 3px 3px #95e4bf"
                          : maxType === "Tiêu cực"
                            ? "-2px 3px 3px #e4a095"
                            : maxType === "Rất tiêu cực"
                              ? "-2px 3px 3px #e4a095"
                              : "-2px 3px 3px #FACC15",
                  }}
                  className={`${
                    maxType === "Rất tích cực"
                      ? "text-green-500"
                      : maxType === "Tích cực"
                        ? "text-green-500"
                        : maxType === "Tiêu cực"
                          ? "text-red-500"
                          : maxType === "Rất tiêu cực"
                            ? "text-red-500"
                            : "text-yellow-500"
                  } uppercase font-bold text-[30px] text-center m-0 pt-5 overflow-visible whitespace-nowrap`}
                >
                  {maxType}
                </p>
              </div>
              <div className="w-[248px]">
                {Object.keys(dataTechnicalIndex).length !== 0 ? (
                  <GauChartGenAnalReportAuto
                    data={dataTechnicalIndex.generalSignal}
                  />
                ) : (
                  <div className="text-center">Loading...</div>
                )}
              </div>
            </div>

            <div className="imgPrice w-[450px] pt-2.5">
              <div className="bg-gradient-to-b from-[#024A9B] to-[#0568D8] h-[25px]  text-center p-1 ">
                <h2 className="text-white font-semibold text-[15px] m-0">
                  Biểu đồ giá
                </h2>
              </div>

              <div>
                {Object.keys(dataTechnicalIndex).length !== 0 ? (
                  <Candlestick data={dataTechnicalIndex.chart} />
                ) : (
                  <div className="h-[365px]">Loading...</div>
                )}
              </div>

              <div className="columnChart">
                <div className="bg-gradient-to-b from-[#024A9B] to-[#0568D8] h-[25px] z-30 text-center p-1">
                  <h2 className="text-white font-semibold text-[15px] m-0 leading-[19px] ">
                    Thống kê lệnh Mua- Bán chủ động (nghìn CP)
                  </h2>
                </div>
                <div className="translate-y-[5px] z-0">
                  {Object.keys(dataSalesOrderStatistics).length !== 0 ? (
                    <StackColumnChart data={dataSalesOrderStatistics} />
                  ) : (
                    <div className="h-[150px]">Loading...</div>
                  )}
                </div>
                <LazyLoad offset={300} debounce={200} once>
                  <div>
                    {Object.keys(dataTechnicalIndex).length !== 0 ? (
                      <div className="flex">
                        <table className="w-full h-[250px] border-y-[1px] border-l-[1px] border-r-[0.5px] border-solid border-[#143A65] border-collapse">
                          <thead className="bg-gradient-to-b from-[#024A9B] to-[#0568D8]">
                            <tr className="text-white font-semibold text-center text-[14px]">
                              <td className="p-1">Chỉ báo</td>
                              <td className="p-1">Tín hiệu</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="font-semibold">
                              <td className="text-left text-black">RSI</td>
                              <td
                                className={`text-center ${getColorBaseOnName(
                                  dataTechnicalIndex.rsi.rate,
                                )}`}
                              >
                                {dataTechnicalIndex.rsi.rate}
                              </td>
                            </tr>
                            <tr className="font-semibold">
                              <td className="text-left text-black">CCI</td>
                              <td
                                className={`text-center ${getColorBaseOnName(
                                  dataTechnicalIndex.cci.rate,
                                )}`}
                              >
                                {dataTechnicalIndex.cci.rate}
                              </td>
                            </tr>
                            <tr className="font-semibold">
                              <td className="text-left text-black">
                                Williams %R
                              </td>
                              <td
                                className={`text-center ${getColorBaseOnName(
                                  dataTechnicalIndex.williams.rate,
                                )}`}
                              >
                                {dataTechnicalIndex.williams.rate}
                              </td>
                            </tr>
                            <tr className="font-semibold">
                              <td className="text-left text-black">DI+ DI-</td>
                              <td
                                className={`text-center ${getColorBaseOnName(
                                  dataTechnicalIndex.adx.rate,
                                )}`}
                              >
                                {dataTechnicalIndex.adx.rate}
                              </td>
                            </tr>
                            <tr className="font-semibold">
                              <td className="text-left text-black">
                                STOCHASTIC
                              </td>
                              <td
                                className={`text-center ${getColorBaseOnName(
                                  dataTechnicalIndex.stochastic.rate,
                                )}`}
                              >
                                {dataTechnicalIndex.stochastic.rate}
                              </td>
                            </tr>
                            <tr className="font-semibold">
                              <td className="text-left text-black">
                                STOCHASTIC RSI
                              </td>
                              <td
                                className={`text-center ${getColorBaseOnName(
                                  dataTechnicalIndex.stochasticRsi.rate,
                                )}`}
                              >
                                {dataTechnicalIndex.stochasticRsi.rate}
                              </td>
                            </tr>
                            <tr className="font-semibold">
                              <td className="text-left text-black">MACD</td>
                              <td
                                className={`text-center ${getColorBaseOnName(
                                  dataTechnicalIndex.macd.rate,
                                )}`}
                              >
                                {dataTechnicalIndex.macd.rate}
                              </td>
                            </tr>
                            <tr className="font-semibold">
                              <td className="text-left text-black">
                                MACD Histogram
                              </td>
                              <td
                                className={`text-center ${getColorBaseOnName(
                                  dataTechnicalIndex.macdHistogram.rate,
                                )}`}
                              >
                                {dataTechnicalIndex.macdHistogram.rate}
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table className="w-full h-[250px] border-y-[1px] border-r-[1px] border-l-0 border-solid border-[#143A65] border-collapse">
                          <thead className="bg-gradient-to-b from-[#024A9B] to-[#0568D8]">
                            <tr className="text-white font-semibold text-center text-[14px]">
                              <td className="p-1">Đường trung bình động</td>
                              <td className="p-1">Tín hiệu</td>
                            </tr>
                          </thead>

                          <tbody className="">
                            {dataTechnicalIndex.table?.map((item, index) => {
                              return (
                                <tr
                                  className="text-center font-semibold"
                                  key={index}
                                >
                                  <td className="text-black">{item.name}</td>
                                  <td
                                    className={`text-center ${getColorBaseOnName(
                                      item.single,
                                    )}`}
                                  >
                                    {item.single}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div>Loading...</div>
                    )}
                  </div>
                </LazyLoad>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <FooterAnalysis pageNum={1} />
      </div>
    </div>
  );
};

export default TechPage1;
