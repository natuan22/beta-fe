import React, { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";
import {
  fetchDataAreaChart1,
  fetchDataAreaChart2,
  fetchDataEvents,
  fetchDataGeneralIndustry,
  fetchDataGoodsDetail,
  fetchDataMacroNews,
  fetchDataNews,
  fetchDataRateDetail,
  fetchDataTableDetail,
  fetchDataWidthMarket,
} from "../../Chart/thunk";
import { useDispatch } from "react-redux";
import AnalysisReport from "../components/IndexMarket/AnalysisReport";
import ChartInfo from "../components/IndexMarket/ChartInfo";
import BarChart from "../components/IndexMarket/BarChart";
import ThanhKhoan from "../components/IndexMarket/ThanhKhoan";
import MarketMap from "../components/IndexMarket/MarketMap";
import GeneralIndustry from "../components/IndexMarket/GeneralIndustry";
import News from "../components/IndexMarket/News";
import Events from "../components/IndexMarket/Events";
import MarketBreadth from "../components/IndexMarket/MarketBreadth";
import TableLiquidity from "../components/IndexMarket/TableLiquidity";
import { fetchDataBienDongThiTruong, fetchDataLineChartMarket } from "../thunk";
import GoodsDetail from "../../Chart/components/GoodsDetail";
import RateDetail from "../../Chart/components/RateDetail";

const IndexMarket = () => {
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = useState("GoodsDetail");

  const handleClick = (button) => {
    setActiveButton(button);
  };

  useEffect(() => {
    dispatch(fetchDataNews);
    dispatch(fetchDataGeneralIndustry("all"));
    dispatch(fetchDataTableDetail);
    dispatch(fetchDataMacroNews);
    dispatch(fetchDataEvents);
    dispatch(fetchDataWidthMarket("VNINDEX"));
    dispatch(fetchDataAreaChart1);
    dispatch(fetchDataAreaChart2);
    dispatch(fetchDataLineChartMarket("VNINDEX", "0"));
    dispatch(fetchDataBienDongThiTruong("VNINDEX"));
    dispatch(fetchDataGoodsDetail);
    dispatch(fetchDataRateDetail);
  }, [dispatch]);

  return (
    <>
      <div className="container mx-auto md:w-[90%] lg:w-[90%] xl:w-full">
        <div className="lg:block xl:flex">
          <div className="xl:w-[60%]">
            <div className="grid xs:grid-cols-none md:grid-cols-none lg:grid-cols-2 xl:grid-cols-2">
              <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
                <LazyLoad offset={300} debounce={200} once>
                  <ChartInfo />
                </LazyLoad>
              </div>

              <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
                <div>
                  <LazyLoad offset={300} debounce={200} once>
                    <BarChart />
                  </LazyLoad>
                </div>

                <div>
                  <LazyLoad offset={300} debounce={200} once>
                    <MarketBreadth />
                  </LazyLoad>
                </div>
              </div>
            </div>
          </div>
          <div className="xl:w-[40%]">
            <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
              <div>
                <div className="border-solid border-[#25558d] border-b-2 border-t-0 border-x-0 pt-[9px]">
                  <span className="dark:text-white text-black font-semibold">
                    Thanh khoản trong phiên
                  </span>
                </div>
                <LazyLoad offset={300} debounce={200} once>
                  <ThanhKhoan />
                </LazyLoad>
              </div>
              <div className="border-solid border-[#25558d] border-b-2 border-t-0 border-x-0">
                <span className="dark:text-white text-black font-semibold">
                  Biến động ngành
                </span>
              </div>
              <LazyLoad offset={300} debounce={200} once>
                <GeneralIndustry />
              </LazyLoad>
            </div>
          </div>
        </div>
        <div className="mt-[5px] lg:block xl:flex">
          <div className="xl:w-[60%]">
            <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
              <div className="border-solid border-[#25558d] border-b-2 border-t-0 border-x-0 pt-[6px]">
                <span className="dark:text-white text-black font-semibold">
                  Bản đồ thị trường
                </span>
              </div>
              <LazyLoad offset={300} debounce={200} once>
                <MarketMap />
              </LazyLoad>
            </div>
          </div>

          <div className="xl:w-[40%]">
            <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
              <div className="h-[481px]">
                <div className="mb-4">
                  <span>
                    <button
                      onClick={() => {
                        handleClick("GoodsDetail");
                      }}
                      className={
                        activeButton === "GoodsDetail"
                          ? "border-none bg-transparent relative dark:text-white text-black md:text-base tabUnderline cursor-pointer font-semibold"
                          : "border-none bg-transparent dark:text-white text-black md:text-base cursor-pointer"
                      }
                    >
                      Giá hàng hoá
                    </button>
                  </span>
                  <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10 xxs:pl-5">
                    <button
                      onClick={() => {
                        handleClick("RateDetail");
                      }}
                      className={
                        activeButton === "RateDetail"
                          ? "border-none bg-transparent relative dark:text-white text-black md:text-base tabUnderline cursor-pointer font-semibold"
                          : "border-none bg-transparent dark:text-white text-black md:text-base cursor-pointer"
                      }
                    >
                      Tỷ giá
                    </button>
                  </span>
                </div>

                {activeButton === "GoodsDetail" ? (
                  <LazyLoad offset={300} debounce={200} once>
                    <GoodsDetail type={1} />
                  </LazyLoad>
                ) : (
                  <LazyLoad offset={300} debounce={200} once>
                    <RateDetail type={1} />
                  </LazyLoad>
                )}
                {/* <TableLiquidity /> */}
              </div>
            </div>
          </div>
        </div>

        {/* <div className="mt-[5px] md:block lg:flex justify-center">
          <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md lg:w-[48%] xl:w-[500px] 2xl:w-[480px] h-[700px]">
            <div className="border-solid border-[#25558d] border-b-2 border-t-0 border-x-0">
              <span className="dark:text-white text-black text-[1.2rem] font-semibold">
                Tin tức thị trường
              </span>
            </div>
            <News />
          </div>

          <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md lg:w-[52%] xl:w-[500px] 2xl:w-[480px] h-[700px]">
            <div className="border-solid border-[#25558d] border-b-2 border-t-0 border-x-0">
              <span className="dark:text-white text-black text-[1.2rem] font-semibold">
                Lịch sự kiện
              </span>
            </div>
            <Events />
          </div>

          <div className="lg:hidden xl:block mx-[5px] my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md xl:w-[500px] 2xl:w-[480px] h-[700px]">
            <div className="border-solid border-[#25558d] border-b-2 border-t-0 border-x-0">
              <span className="dark:text-white text-black text-[1.2rem] font-semibold">
                Báo cáo phân tích
              </span>
            </div>
            <AnalysisReport />
          </div>
        </div>
        <div className="xxs:hidden xs:hidden md:hidden lg:block xl:hidden mx-[5px] my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md h-[700px]">
          <div className="border-solid border-[#25558d] border-b-2 border-t-0 border-x-0">
            <span className="dark:text-white text-black text-[1.2rem] font-semibold">
              Báo cáo phân tích
            </span>
          </div>
          <AnalysisReport />
        </div> */}
      </div>
    </>
  );
};

export default IndexMarket;
