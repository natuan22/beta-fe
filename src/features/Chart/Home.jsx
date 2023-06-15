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
import LineChart from "./components/LineChart";
import chartStyle from "./utils/Chart.module.css";
import TableDetail from "./components/TableDetail";
import GoodsDetail from "./components/GoodsDetail";
import TopROC from "./components/TopROC";
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
  fetchDataNews,
  fetchDataMarketEvaluation,
  fetchDataLineChartHomePage,
  fetchDataCashFlowAllocation,
} from "./thunk";
import LayOut from "../../HOCs/Layout";

import CashFlowAllocation from "./components/CashFlowAllocation";
import TreeMapSell from "./components/TreeMapSell";
import TreeMapBuy from "./components/TreeMapBuy";


const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataEvents);
    dispatch(fetchDataNews);
    dispatch(fetchDataRateDetail);
    dispatch(fetchDataTopNetForeignChange("hose"));
    dispatch(fetchDataROC5Phien("hose"));
    dispatch(fetchDataTableMarketVolatility);
    dispatch(fetchDataTableMarketLiquidity("0"));
    dispatch(fetchDataGoodsDetail);
    dispatch(fetchDataMarketEvaluation);
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchDataInternationalIndex);
    dispatch(fetchDataTableDetail);
    dispatch(fetchDataBarChartRight('hose'));
    dispatch(fetchDataBarChartLeft("hsx"));
    dispatch(fetchDataGeneralIndustry('all'));
    dispatch(fetchDataTreeMapSell("hose"));
    dispatch(fetchDataTreeMapBuy("hose"));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchDataAreaChart1);
    dispatch(fetchDataAreaChart2);
    dispatch(fetchDataWidthMarket("vnindex"));
    dispatch(fetchDataLineChartHomePage('vnindex'))
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
              <div className="lg:block xl:flex">
                <div className="xl:w-[60%]">
                  <div className="grid xs:grid-cols-none md:grid-cols-none lg:grid-cols-2 xl:grid-cols-2">
                    <div className="mx-2 my-2 px-1.5 py-1.5 dark:bg-[#151924] bg-gray-100 shadow-md">
                      <TableDetail />
                    </div>

                    <div className="mx-2 my-2 px-1.5 py-1.5 dark:bg-[#151924] shadow-md bg-gray-100 xs:h-[352px] md:h-[336px] lg:h-[350px] xl:h-[344px] 2xl:h-[344px]">
                      <div className='text-center font-semibold uppercase text-sm dark:text-white text-black'>Diễn biến chỉ số VNINDEX trong phiên</div>
                      <LineChart />
                    </div>
                    <div className="mx-2 my-2 px-1.5 py-1.5 dark:bg-[#151924] bg-gray-100 shadow-md">
                      <div className="text-center dark:bg-[#151924] bg-gray-100">

                        <BarChartLeft />
                      </div>
                    </div>

                    <div className="text-center mx-2 my-2 px-1.5 py-1.5 dark:bg-[#151924] bg-gray-100 shadow-md">
                      <div className="dark:bg-[#151924] bg-gray-100">
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
                  <div className="grid gap-0.5 md:grid-cols-none lg:grid-cols-2 xl:grid-cols-2">
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
                <div className="xl:w-[60%] xxs:hidden xs:hidden md:hidden xl:block">
                  <div className="mx-2 my-2 px-1.5 py-1.5 dark:bg-[#151924] bg-gray-100 shadow-md h-[725px]">
                    <div id="treemap" className="grid grid-cols-2 gap-0.5">
                      <div >
                        <TreeMapBuy />
                      </div>

                      <div  >
                        <TreeMapSell />
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
                        <option value="hose">HSX</option>
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
                  <div className="mx-2 my-2 px-1.5 py-1.5 dark:bg-[#151924] bg-gray-100 shadow-md xxs:h-[765px] xs:h-[745px] sm:h-[750px] md:h-[725px] lg:h-[725px]">
                    <div className="grid grid-cols-2 gap-0.5">
                      <div>
                        <TreeMapBuy />
                      </div>

                      <div>
                        <TreeMapSell />
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
                    <h3 className="p-2 uppercase">Thanh khoản thị trường sàn HSX</h3>
                  </div>
                  <div >
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
            {/* <TestChart /> */}
            <Footer />
          </div>
        </div>
      </div >
    </LayOut>
  );
};

export default Home;