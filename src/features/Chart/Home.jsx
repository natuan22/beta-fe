import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Banner from "./components/Banner";
import BarChartLeft from "./components/BarChartLeft";
import BarChartRight from "./components/BarChartRight";
import InternationalIndex from "./components/InternationalIndex";
import GeneralIndustry from "./components/GeneralIndustry";
import Events from "./components/Events";
import Top10Sell from "./components/Top10Sell";
import Top10Buy from "./components/Top10Buy";
import TreemapChart from "./components/TreemapChart";
import LineChart from "./components/LineChart";
import chartStyle from "./utils/Chart.module.css";
import TableDetail from "./components/TableDetail";
import GoodsDetail from "./components/GoodsDetail";
import TopROC from "./components/TopROC";
import TreeMapChart2 from "./components/TreeMapChart2";
import RateDetail from "./components/RateDetail";
import AreaChart from "./components/AreaChart";
import TableMarketVolatility from "./components/TableMarketVolatility";
import Footer from "../../components/Footer";
import StackingAreas from "./components/StackingAreas";
import NetVolumeTrade from "./components/NetVolumeTrade";
import TableMarketLiquidity from "./components/TableMarketLiquidity";
import News from "./components/News";
import TableMarketEvaluation from "./components/TableMarketEvaluation";
import {
  fetchDataInternationalIndex,
  fetchDataTableDetail,
  fetchDataBarChartRight,
  fetchDataBarChartLeft,
  fetchDataEvents,
  fetchDataTopNetForeignChange,
  fetchDataGoodsDetail,
  fetchDataRateDetail,
  fetchDataGeneralIndustry,
  fetchDataROC5Phien,
  fetchDataTreeMapSell,
  fetchDataTreeMapBuy,
  fetchDataAreaChart1,
  fetchDataAreaChart2,
  fetchDataWidthMarket,
  fetchDataTableMarketVolatility,
  fetchDataTableMarketLiquidity,
  fetchDataNetVolume,
  fetchDataNews,
  fetchDataMarketEvaluation,
  fetchDataLineChartHomePage,
  fetchDataCashFlowAllocation,
} from "./thunk";
import LayOut from "../../HOCs/Layout";
import TableTest from "./ElecticTable/TableTest";
import CashFlowAllocation from "./components/CashFlowAllocation";

const Home = () => {
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(fetchDataEvents);
    dispatch(fetchDataNews);
    dispatch(fetchDataRateDetail);
    dispatch(fetchDataTopNetForeignChange("HSX"));
    dispatch(fetchDataROC5Phien("hose"));
    dispatch(fetchDataTableMarketVolatility);
    dispatch(fetchDataTableMarketLiquidity("0"));
    dispatch(fetchDataGoodsDetail);
    dispatch(fetchDataMarketEvaluation);
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchDataInternationalIndex);
    dispatch(fetchDataTableDetail);
    dispatch(fetchDataBarChartRight);
    dispatch(fetchDataBarChartLeft("VNINDEX"));
    dispatch(fetchDataGeneralIndustry('all'));
    dispatch(fetchDataTreeMapSell("HSX"));
    dispatch(fetchDataTreeMapBuy("HSX"));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchDataAreaChart1);
    dispatch(fetchDataAreaChart2);
    dispatch(fetchDataWidthMarket("VNINDEX"));
    dispatch(fetchDataNetVolume("vnindex"));
    dispatch(fetchDataLineChartHomePage())
    dispatch(fetchDataCashFlowAllocation)
  }, [dispatch]);

  return (
    <LayOut>
      <div className="px-1.5 sticky top-0 z-20">
        <InternationalIndex />
        <News />
      </div>

      <div className="container mx-auto bg-black xl:w-full lg:w-[90%] md:w-[90%]">
        <div>
          <Banner />

          <div className="dark:bg-black bg-white">
            <div>
              <div className="lg:block xl:flex ">
                <div className="xl:w-[60%]">
                  <div className="grid xs:grid-cols-none md:grid-cols-none lg:grid-cols-[2fr_2fr] xl:grid-cols-[2fr_2fr]">
                    <div className="mx-2 my-2 px-1.5 py-1.5 dark:bg-[#151924] bg-gray-100 shadow-md">
                      <TableDetail />
                    </div>

                    <div className="mx-2 my-2 px-1.5 py-1.5 dark:bg-[#151924] shadow-md bg-gray-100 xs:h-[352px] md:h-[336px] lg:h-[350px] xl:h-[344px] 2xl:h-[344px]">
                      <LineChart />
                    </div>
                    <div className="mx-2 my-2 px-1.5 py-1.5 dark:bg-[#151924] bg-gray-100 shadow-md">
                      <div className="text-center dark:bg-[#151924] bg-gray-100">
                        <div>
                          <span className="font-semibold uppercase text-sm dark:text-white text-black">
                            Nhóm cổ phiếu dẫn dắt thị trường
                          </span>

                          <select
                            className={`${chartStyle.selectStyle} dark:bg-[#151924] bg-gray-100 dark:hover:bg-gray-900 hover:bg-gray-300 ml-2 rounded-lg p-1 text-base text-[#0097B2]`}
                            onChange={(event) => {
                              dispatch(
                                dispatch(
                                  fetchDataBarChartLeft(event.target.value)
                                )
                              );
                            }}
                          >
                            <option value="VNINDEX">VNINDEX</option>
                            <option value="HNX">HNX</option>
                            <option value="VN30">VN30</option>
                          </select>
                        </div>
                        <BarChartLeft />
                      </div>
                    </div>

                    <div className="text-center mx-2 my-2 px-1.5 py-1.5 dark:bg-[#151924] bg-gray-100 shadow-md">
                      <div className="dark:bg-[#151924] bg-gray-100">
                        <div className="h-[29px]">
                          <span className="font-semibold uppercase dark:text-white text-black">
                            Top nước ngoài mua bán ròng
                          </span>
                        </div>

                        <BarChartRight />
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" xl:w-[40%] xl:translate-x-0 ">
                  <div className="mx-2 mt-2 px-1.5 py-1.5 shadow-md dark:bg-[#151924] bg-gray-100 xs:h-[438px] md:h-[465px] lg:h-[450px] xl:h-[752px] 2xl:h-[751px]">
                    <GeneralIndustry />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="xl:flex lg:block">
                <div className="xl:w-[60%]">
                  <div className="grid gap-0.5 md:grid-cols-none lg:grid-cols-[2fr_2fr] xl:grid-cols-[2fr_2fr]">
                    <div className="mx-2 my-2 px-1.5 py-1.5 dark:bg-[#151924] bg-gray-100 h-[380px] shadow-md">
                      <GoodsDetail />
                    </div>

                    <div className="mx-2 my-2 px-1.5 py-1.5 dark:bg-[#151924] bg-gray-100 h-[380px] shadow-md">
                      <RateDetail />
                    </div>
                  </div>

                  <div className="mx-2 my-2 px-1.5 py-1.5 dark:bg-[#151924] bg-gray-100 h-[385px] shadow-md">
                    <Events />
                  </div>
                </div>
                <div className="xl:w-[40%] xl:translate-x-0">
                  <TopROC />
                </div>
              </div>
            </div>

            <div>
              <div className="lg:block xl:flex">
                <div className="xl:w-[60%] xs:hidden md:hidden xl:block">
                  <div className="mx-2 my-2 px-1.5 py-1.5 dark:bg-[#151924] bg-gray-100 shadow-md h-[742px]">
                    <div className="grid grid-cols-2 gap-0.5">
                      <div className="text-center py-2">
                        <span className="dark:text-white text-black uppercase text-lg">
                          Khối ngoại mua ròng sàn
                          <select
                            className={`${chartStyle.selectStyle} dark:bg-[#151924] bg-gray-100 dark:hover:bg-gray-900 hover:bg-gray-300 ml-2 rounded-lg p-1 text-base text-[#0097B2]`}
                            onChange={(event) => {
                              dispatch(
                                dispatch(
                                  fetchDataTreeMapBuy(event.target.value)
                                )
                              );
                            }}
                          >
                            <option value="HSX">HSX</option>
                            <option value="HNX">HNX</option>
                            <option value="UPCOM">UPCOM</option>
                          </select>
                        </span>
                      </div>
                      <div className="text-center py-2">
                        <span className="dark:text-white text-black uppercase text-lg">
                          Khối ngoại bán ròng sàn
                          <select
                            className={`${chartStyle.selectStyle} dark:bg-[#151924] bg-gray-100 dark:hover:bg-gray-900 hover:bg-gray-300 ml-2 rounded-lg p-1 text-base text-[#0097B2]`}
                            onChange={(event) => {
                              dispatch(
                                dispatch(
                                  fetchDataTreeMapSell(event.target.value)
                                )
                              );
                            }}
                          >
                            <option value="HSX">HSX</option>
                            <option value="HNX">HNX</option>
                            <option value="UPCOM">UPCOM</option>
                          </select>
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-center pb-[10px]">
                      <hr className="xl:w-[818px] 2xl:w-[818px] xl:translate-x-[-5px] 2xl:translate-x-[-5px] bg-gradient-to-r from-cyan-500 to-blue-500 opacity-100 h-[5px] " />
                    </div>
                    <div className="grid grid-cols-2 gap-0.5">
                      <div>
                        <TreemapChart />
                      </div>

                      <div>
                        <TreeMapChart2 />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="xl:w-[40%] xl:translate-x-0">
                  <div className="mx-2 mt-2 px-1.5 py-1.5 dark:bg-[#151924] bg-gray-100 shadow-md">
                    <div className="dark:bg-[#151924] bg-gray-100 text-center px-20 pt-[19px]">
                      <span className="font-semibold text-base uppercase dark:text-white text-black">
                        Top 10 khối ngoại mua/bán nhiều nhất sàn
                      </span>
                      <select
                        className={`${chartStyle.selectStyle} dark:bg-[#151924] bg-gray-100 dark:hover:bg-gray-900 hover:bg-gray-300 mx-2 rounded-lg p-1 text-base text-[#0097B2]`}
                        onChange={(event) => {
                          dispatch(
                            dispatch(
                              fetchDataTopNetForeignChange(event.target.value)
                            )
                          );
                        }}
                      >
                        <option value="HSX">HSX</option>
                        <option value="HNX">HNX</option>
                        <option value="UPCOM">UPCOM</option>
                      </select>
                      <span className="font-semibold uppercase dark:text-white text-black">
                        qua 05 phiên gần nhất
                      </span>
                    </div>
                    <div className="grid grid-cols-2 dark:bg-[#151924] bg-gray-100">
                      <div className="text-center mx-2">
                        <Top10Sell />
                      </div>

                      <div className="text-center mx-2">
                        <Top10Buy />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="xl:w-[60%] xl:hidden">
                  <div className="mx-2 my-2 px-1.5 py-1.5 dark:bg-[#151924] bg-gray-100 shadow-md xs:h-[800px] lg:h-[745px] md:h-[770px]">
                    <div className="grid grid-cols-2 gap-0.5">
                      <div className="text-center py-2">
                        <span className="dark:text-white text-black uppercase text-lg">
                          Khối ngoại mua ròng sàn
                          <select
                            className={`${chartStyle.selectStyle} dark:bg-[#151924] bg-gray-100 dark:hover:bg-gray-900 hover:bg-gray-300 ml-2 rounded-lg p-1 text-base text-[#0097B2]`}
                            onChange={(event) => {
                              dispatch(
                                dispatch(
                                  fetchDataTreeMapBuy(event.target.value)
                                )
                              );
                            }}
                          >
                            <option value="HSX">HSX</option>
                            <option value="HNX">HNX</option>
                            <option value="UPCOM">UPCOM</option>
                          </select>
                        </span>
                      </div>
                      <div className="text-center py-2">
                        <span className="dark:text-white text-black uppercase text-lg">
                          Khối ngoại bán ròng sàn
                          <select
                            className={`${chartStyle.selectStyle} dark:bg-[#151924] bg-gray-100 dark:hover:bg-gray-900 hover:bg-gray-300 ml-2 rounded-lg p-1 text-base text-[#0097B2]`}
                            onChange={(event) => {
                              dispatch(
                                dispatch(
                                  fetchDataTreeMapSell(event.target.value)
                                )
                              );
                            }}
                          >
                            <option value="HSX">HSX</option>
                            <option value="HNX">HNX</option>
                            <option value="UPCOM">UPCOM</option>
                          </select>
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-center pb-[10px]">
                      <hr className="xs:w-[380px] md:w-[645px] lg:w-[874px] xs:translate-x-[-5px] md:translate-x-[-5px] lg:translate-x-[-5px] bg-gradient-to-r from-cyan-500 to-blue-500 opacity-100 h-[5px] " />
                    </div>
                    <div className="grid grid-cols-2 gap-0.5">
                      <div>
                        <TreemapChart />
                      </div>

                      <div>
                        <TreeMapChart2 />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="lg:block xl:flex mx-2 my-2 px-1.5 py-1.5 dark:bg-[#151924] bg-gray-100 shadow-md">
                <div className="xl:w-[65%]">
                  <div className="text-center dark:text-white text-black">
                    <h3 className="p-2 uppercase">Thanh khoản thị trường</h3>
                  </div>
                  <div className="mx-2 my-2 px-1.5 py-1.5">
                    <AreaChart />
                  </div>
                </div>
                <div className="xl:w-[35%]">
                  <div className="px-1.5 py-1.5">
                    <TableMarketVolatility />
                  </div>
                  <div className="px-1.5 py-1.5">
                    <TableMarketLiquidity />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="xl:flex lg:block mx-2 my-3 px-1.5 py-1.5 dark:bg-[#151924] bg-gray-100 shadow-md">
                <div className="xl:w-[65%]">
                  <div>
                    <div className="text-center dark:text-white text-black">
                      <h3 className="p-2 uppercase">Độ rộng thị trường</h3>
                    </div>
                    <StackingAreas />
                  </div>
                </div>
                <div className="xl:w-[35%]">
                  <div className="">
                    <div className="px-1.5 py-1.5">
                      <TableMarketEvaluation />
                    </div>
                  </div>
                  <div>
                    <div className="text-center dark:text-white text-black">
                      <h3 className="p-2 uppercase">Phân bổ dòng tiền (tỷ VNĐ)</h3>
                    </div>
                    <CashFlowAllocation />
                  </div>
                </div>
              </div>
            </div>
            <div className="mr-2 mx-2 px-1.5 py-1.5 dark:bg-[#151924] bg-gray-100 shadow-md">
              <div>
                <NetVolumeTrade />
              </div>
            </div>
            <TableTest />
            <Footer />
          </div>
        </div>
      </div >
    </LayOut>
  );
};

export default Home;
