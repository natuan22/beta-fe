import React from "react";
import { useSelector } from "react-redux";
import HeaderAnalysis from "./HeaderAnalysis";
import FooterAnalysis from "./FooterAnalysis";
import GauChartTech from "./TechPage2/GauChartTech";
import GauChartGen from "./TechPage2/GauChartGen";
import GauChartTrend from "./TechPage2/GauChartTrend";
import formatNumber from "../../../../helper/formatNumber";
import LineChart from "./TechPage2/LineChart";
import LineChartADX from "./TechPage2/LineChartADX";
import LineChart2 from "./TechPage2/LineChart2";
import ColumnChart from "./TechPage2/ColumnChart";
import Table from "./TechPage2/Table";
import LazyLoad from "react-lazyload";

const getColorBaseOnName = (value) => {
  if (value === "Tích cực") return "text-green-500";
  if (value === "Tiêu cực") return "text-red-500";
  if (value === "Trung lập") return "text-yellow-400";
};

const TechPage2 = () => {
  const { dataTechnicalIndex } = useSelector((state) => state.stock);
  return (
    <div className="h-[1152px] w-[800px] bg-white">
      <div className="header">
        <LazyLoad offset={300} debounce={200} once>
          <HeaderAnalysis />
        </LazyLoad>
      </div>

      <div className="content w-[800px] flex flex-col items-center h-[990px]">
        <div className="cont-top flex justify-around w-[780px] translate-y-[-30px] relative">
          {Object.keys(dataTechnicalIndex).length !== 0 ? (
            <>
              <div className=" w-[250px] translate-y-[10px]">
                <GauChartTech data={dataTechnicalIndex.technicalSignal} />
              </div>
              <div className=" w-[250px] translate-y-[10px]">
                <GauChartGen data={dataTechnicalIndex.generalSignal} />
              </div>
              <div className=" w-[250px] translate-y-[10px]">
                <GauChartTrend data={dataTechnicalIndex.trendSignal} />
              </div>
            </>
          ) : (
            <div>Loading...</div>
          )}
        </div>
        {Object.keys(dataTechnicalIndex).length !== 0 ? (
          <div className="cont-mid flex justify-between w-[780px] translate-y-[-40px] pt-3">
            <div>
              <div className="flex justify-between ">
                <div className="h-[130px]">
                  <h2 className="m-0 mb-1 text-[17px]">
                    RSI <span className="font-normal text-[15px] ">(14)</span>
                  </h2>
                  <p className="m-0 mb-1">
                    Giá trị:{" "}
                    <span className="font-semibold text-[#023E8A]">
                      {formatNumber(dataTechnicalIndex.rsi.value)}
                    </span>
                  </p>
                  <p className="m-0 mb-1">
                    Đánh giá:{" "}
                    <span
                      className={`${getColorBaseOnName(
                        dataTechnicalIndex.rsi.rate,
                      )} font-semibold`}
                    >
                      {dataTechnicalIndex.rsi.rate}
                    </span>
                  </p>
                </div>
                <LineChart data={dataTechnicalIndex.rsi.chart} type={1} />
              </div>
              <div className="flex justify-between ">
                <div className="h-[130px]">
                  <h2 className="m-0 mb-1 text-[17px]">
                    CCI <span className="font-normal text-[15px] ">(14)</span>
                  </h2>
                  <p className="m-0 mb-1">
                    Giá trị:{" "}
                    <span className="font-semibold text-[#023E8A]">
                      {formatNumber(dataTechnicalIndex.cci.value)}
                    </span>
                  </p>
                  <p className="m-0 mb-1">
                    Đánh giá:{" "}
                    <span
                      className={`${getColorBaseOnName(
                        dataTechnicalIndex.cci.rate,
                      )} font-semibold`}
                    >
                      {dataTechnicalIndex.cci.rate}
                    </span>
                  </p>
                </div>
                <LineChart data={dataTechnicalIndex.cci.chart} type={2} />
              </div>
              <div className="flex justify-between ">
                <div className="h-[130px]">
                  <h2 className="m-0 mb-1 text-[17px]">
                    Williams %R
                    <span className="font-normal text-[15px] "> (14)</span>
                  </h2>
                  <p className="m-0 mb-1">
                    Giá trị:{" "}
                    <span className="font-semibold text-[#023E8A]">
                      {formatNumber(dataTechnicalIndex.williams.value)}
                    </span>
                  </p>
                  <p className="m-0 mb-1">
                    Đánh giá:{" "}
                    <span
                      className={`${getColorBaseOnName(
                        dataTechnicalIndex.williams.rate,
                      )} font-semibold`}
                    >
                      {dataTechnicalIndex.williams.rate}
                    </span>
                  </p>
                </div>
                <LineChart data={dataTechnicalIndex.williams.chart} type={3} />
              </div>
              <div className="flex justify-between ">
                <div className="h-[130px]">
                  <h2 className="m-0 mb-1 text-[17px]">
                    ADX <span className="font-normal text-[15px] ">(14)</span>
                  </h2>
                  <div className="m-0 mb-1 mr-1">
                    Giá trị:{" "}
                    <span className="text-[#023E8A] font-semibold">
                      {formatNumber(dataTechnicalIndex.adx.value.adx)}
                    </span>
                    <div className="ml-[49px]">
                      <span className="text-[#00BF63] font-semibold">
                        {formatNumber(dataTechnicalIndex.adx.value.pdi)}
                      </span>
                      <span className="text-[#FF0000] px-1 font-semibold">
                        {formatNumber(dataTechnicalIndex.adx.value.mdi)}
                      </span>
                    </div>
                  </div>
                  <p className="m-0 mb-1">
                    Đánh giá:{" "}
                    <span
                      className={`${getColorBaseOnName(
                        dataTechnicalIndex.adx.rate,
                      )} font-semibold`}
                    >
                      {dataTechnicalIndex.adx.rate}
                    </span>
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -top-[13px] left-[40px] z-10">
                    <div className="grid grid-cols-3">
                      <div className="flex items-center justify-end w-[50px] pr-2">
                        <div className="w-[15px] h-[2px] bg-[#00BF63] mr-1"></div>
                        <p className="m-0 text-[12px] font-semibold">DI+</p>
                      </div>
                      <div className="flex items-center w-[50px]">
                        <div className="w-[15px] h-[2px] bg-[#FF0000] mr-1"></div>
                        <p className="m-0 text-[12px] font-semibold">DI-</p>
                      </div>
                      <div className="flex items-center w-[50px]">
                        <div className="w-[15px] h-[2px] bg-[#023E8A] mr-1"></div>
                        <p className="m-0 text-[12px] font-semibold">ADX</p>
                      </div>
                    </div>
                  </div>
                  <LineChartADX data={dataTechnicalIndex.adx.chart} />
                </div>
              </div>
            </div>

            <div className="chart ">
              <div className="flex justify-between ">
                <div className="h-[130px]">
                  <h2 className="m-0 mb-1 text-[17px]">
                    STOCHASTIC{" "}
                    <span className="font-normal text-[15px] ">(14)</span>
                  </h2>
                  <p className="m-0 mb-1">
                    Giá trị:{" "}
                    <span className="text-[#F89637] font-semibold">
                      {formatNumber(dataTechnicalIndex.stochastic.value.k)}
                    </span>
                    <span className="px-1 text-[#023E8A] font-semibold">
                      {formatNumber(dataTechnicalIndex.stochastic.value.d)}
                    </span>
                  </p>
                  <p className="m-0 mb-1">
                    Đánh giá:{" "}
                    <span
                      className={`${getColorBaseOnName(
                        dataTechnicalIndex.stochastic.rate,
                      )} font-semibold`}
                    >
                      {dataTechnicalIndex.stochastic.rate}
                    </span>
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -top-[13px] left-[20px] z-10">
                    <div className="grid grid-cols-2">
                      <div className="flex items-center justify-end w-[100px] pr-2">
                        <div className="w-[15px] h-[2px] bg-[#F89637] mr-1"></div>
                        <p className="m-0 text-[12px] font-semibold">%K</p>
                      </div>
                      <div className="flex items-center w-[100px]">
                        <div className="w-[15px] h-[2px] bg-[#023E8A] mr-1"></div>
                        <p className="m-0 text-[12px] font-semibold">%D</p>
                      </div>
                    </div>
                  </div>
                  <LineChart2
                    data={dataTechnicalIndex.stochastic.chart}
                    type={1}
                  />
                </div>
              </div>
              <div className="flex justify-between ">
                <div className="h-[130px] mr-1">
                  <h2 className="m-0 mb-1 text-[17px]">
                    STOCHASTIC RSI{" "}
                    <span className="font-normal text-[15px] ">(14)</span>
                  </h2>
                  <p className="m-0 mb-1">
                    Giá trị:{" "}
                    <span className="text-[#F89637] font-semibold">
                      {formatNumber(dataTechnicalIndex.stochasticRsi.value.k)}
                    </span>
                    <span className="px-1 text-[#023E8A] font-semibold">
                      {formatNumber(dataTechnicalIndex.stochasticRsi.value.d)}
                    </span>
                  </p>
                  <p className="m-0 mb-1">
                    Đánh giá:{" "}
                    <span
                      className={`${getColorBaseOnName(
                        dataTechnicalIndex.stochasticRsi.rate,
                      )} font-semibold`}
                    >
                      {dataTechnicalIndex.stochasticRsi.rate}
                    </span>
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -top-[13px] left-[20px] z-10">
                    <div className="grid grid-cols-2">
                      <div className="flex items-center justify-end w-[100px] pr-2">
                        <div className="w-[15px] h-[2px] bg-[#F89637] mr-1"></div>
                        <p className="m-0 text-[12px] font-semibold">%K</p>
                      </div>
                      <div className="flex items-center w-[100px]">
                        <div className="w-[15px] h-[2px] bg-[#023E8A] mr-1"></div>
                        <p className="m-0 text-[12px] font-semibold">%D</p>
                      </div>
                    </div>
                  </div>
                  <LineChart2
                    data={dataTechnicalIndex.stochasticRsi.chart}
                    type={1}
                  />
                </div>
              </div>
              <div className="flex justify-between ">
                <div className="h-[130px]">
                  <h2 className="m-0 mb-1 text-[17px]">MACD</h2>
                  <p className="m-0 mb-1">
                    Giá trị:{" "}
                    <span className="text-[#F89637] font-semibold">
                      {formatNumber(dataTechnicalIndex.macd.value.macd)}
                    </span>
                    <span className="px-1 text-[#023E8A] font-semibold">
                      {formatNumber(dataTechnicalIndex.macd.value.signal)}
                    </span>
                  </p>
                  <p className="m-0 mb-1">
                    Đánh giá:{" "}
                    <span
                      className={`${getColorBaseOnName(
                        dataTechnicalIndex.macd.rate,
                      )} font-semibold`}
                    >
                      {dataTechnicalIndex.macd.rate}
                    </span>
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -top-[13px] -left-[35px] z-10">
                    <div className="grid grid-cols-2">
                      <div className="flex items-center justify-end w-[130px] pr-2">
                        <div className="w-[15px] h-[2px] bg-[#F89637] mr-1"></div>
                        <p className="m-0 text-[11px] font-semibold">
                          MACD (12,26)
                        </p>
                      </div>
                      <div className="flex items-center w-[130px]">
                        <div className="w-[15px] h-[2px] bg-[#023E8A] mr-1"></div>
                        <p className="m-0 text-[11px] font-semibold">
                          MACD Signal (12,26,9)
                        </p>
                      </div>
                    </div>
                  </div>
                  <LineChart2 data={dataTechnicalIndex.macd.chart} type={""} />
                </div>
              </div>
              <div className="flex justify-between ">
                <div className="h-[130px]">
                  <h2 className="m-0 mb-1 text-[17px]">MACD Histogram</h2>
                  <p className="m-0 mb-1">
                    Giá trị:{" "}
                    <span className="font-semibold text-[#023E8A]">
                      {formatNumber(dataTechnicalIndex.macdHistogram.value)}
                    </span>
                  </p>
                  <p className="m-0 mb-1">
                    Đánh giá:{" "}
                    <span
                      className={`${getColorBaseOnName(
                        dataTechnicalIndex.macdHistogram.rate,
                      )} font-semibold`}
                    >
                      {dataTechnicalIndex.macdHistogram.rate}
                    </span>
                  </p>
                </div>
                <div className="-translate-y-[10px]">
                  <ColumnChart data={dataTechnicalIndex.macdHistogram.chart} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
        {Object.keys(dataTechnicalIndex).length !== 0 ? (
          <div className="cont-bot translate-y-[-20px]">
            <Table data={dataTechnicalIndex.table} />
          </div>
        ) : (
          <div>Loading....</div>
        )}
      </div>

      <div className="footer">
        <FooterAnalysis pageNum={2} />
      </div>
    </div>
  );
};

export default TechPage2;
