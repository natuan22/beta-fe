import React, { useEffect } from "react";
import {
  fetchDataAreaChart1,
  fetchDataAreaChart2,
  fetchDataEvents,
  fetchDataGeneralIndustry,
  fetchDataLineChart,
  fetchDataMacroNews,
  fetchDataMarketMap,
  fetchDataNews,
  fetchDataTableDetail,
  fetchDataWidthMarket,
} from "../../Chart/thunk";
import { useDispatch } from "react-redux";
import AnalysisReport from "../components/IndexMarket/AnalysisReport";
import ChartInfo from "../components/IndexMarket/ChartInfo";
import TableDomesticIndex from "../components/IndexMarket/TableDomesticIndex";
import BarChart from "../components/IndexMarket/BarChart";
import DoRongThiTruong from "../components/IndexMarket/DoRongThiTruong";
import TableThanhKhoan from "../components/IndexMarket/TableThanhKhoan";
import ThanhKhoan from "../components/IndexMarket/ThanhKhoan";
import MarketMap from "../components/IndexMarket/MarketMap";
import GeneralIndustry from "../components/IndexMarket/GeneralIndustry";
import News from "../components/IndexMarket/News";
import Events from "../components/IndexMarket/Events";

const IndexMarket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataNews);
    dispatch(fetchDataLineChart("0"));
    dispatch(fetchDataGeneralIndustry("all"));
    dispatch(fetchDataTableDetail);
    dispatch(fetchDataMarketMap("all", "0"));
    dispatch(fetchDataMacroNews);
    dispatch(fetchDataEvents);
    dispatch(fetchDataWidthMarket("VNINDEX"));
    dispatch(fetchDataAreaChart1);
    dispatch(fetchDataAreaChart2);
  }, [dispatch]);

  return (
    <>
      <div className="container mx-auto md:w-[90%] lg:w-[90%] xl:w-full">
        <div className="md:block lg:flex justify-center">
          <div className="mx-1 my-1 px-[8px] py-[8px] bg-[#151924]">
            <div>
              <ChartInfo />
            </div>
            <div className="mt-2">
              <TableDomesticIndex />
            </div>
          </div>
          <div className="lg:hidden xl:block mx-1 my-1 px-[8px] py-[8px] bg-[#151924]">
            <div>
              <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0 pt-[11px]'>
                <span className='text-white text-[0.9rem] pl-[2px]'>Top đóng góp điểm số theo: </span>
                <div className="sm:block md:inline text-center">
                  <select className={`bg-[#151924] text-[0.9rem] ml-1.5 text-[#0097B2] border-0`}>
                    <option value="0">Cổ phiếu</option>
                    <option value="1">Ngành LV1</option>
                    <option value="2">Ngành LV2</option>
                    <option value="3">Ngành LV3</option>
                  </select>
                  <select
                    className={`bg-[#1B496D] ml-3 p-1 text-[0.9rem] text-white border-0`}
                  >
                    <option value="1">Phiên gần nhất</option>
                    <option value="2">5 phiên</option>
                    <option value="3">1 tháng</option>
                    <option value="4">YtD</option>
                  </select>
                </div>
              </div>
              <div>
                <BarChart />
              </div>
            </div>

            <div className="md:w-full xl:w-[416px]">
              <div className="border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0 pt-[11px]">
                <span className="text-white text-[0.9rem] xs:ml-[32px] sm:ml-[82px] md:ml-[190px] lg:ml-[95px] xl:ml-[95px] 2xl:ml-[95px]">
                  Diễn biến độ rộng thị trường
                </span>
                <select
                  className={`bg-[#1B496D] ml-[17px] p-1 text-[0.9rem] text-white border-0`}
                >
                  <option value="1">Phiên gần nhất</option>
                  <option value="2">01 tháng</option>
                  <option value="3">01 quý</option>
                  <option value="4">01 năm</option>
                </select>
              </div>
              <div>
                <DoRongThiTruong />
              </div>
            </div>
          </div>
          <div className="mx-1 my-1 px-[8px] py-[8px] bg-[#151924]">
            <div className="pt-2">
              <TableThanhKhoan />
            </div>
            <hr />
            <div>
              <div className="text-center mb-1 mt-2">
                <span className="text-white text-[1rem]">
                  Thanh khoản trong phiên
                </span>
              </div>
              <ThanhKhoan />
            </div>
          </div>
        </div>

        <div className="xs:hidden md:hidden lg:flex xl:hidden my-1.5 mx-1 px-[8px] py-[8px] bg-[#151924] ">
          <div className="w-[50%]">
            <div className="border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0 pt-[11px]">
              <span className="text-white text-[0.9rem]">Top đóng góp điểm số theo: </span>
              <select
                className={`bg-[#151924] text-[0.9rem] text-[#0097B2] border-0 ml-[15px]`}
              >
                <option value="0">Cổ phiếu</option>
                <option value="1">Ngành LV1</option>
                <option value="2">Ngành LV2</option>
                <option value="3">Ngành LV3</option>
              </select>
              <select
                className={`bg-[#1B496D] ml-[15px] p-1 text-[0.9rem] text-white border-0`}
              >
                <option value="1">Phiên gần nhất</option>
                <option value="2">5 phiên</option>
                <option value="3">1 tháng</option>
                <option value="4">YtD</option>
              </select>
            </div>
            <div>
              <BarChart />
            </div>
          </div>

          <div className="w-[50%]">
            <div className="border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0 pt-[11px]">
              <span className="text-white text-[0.9rem] ml-[120px]">
                Diễn biến độ rộng thị trường
              </span>
              <select
                className={`bg-[#1B496D] ml-[20px] p-1 text-[0.9rem] text-white border-0`}
              >
                <option value="1">Phiên gần nhất</option>
                <option value="2">01 tháng</option>
                <option value="3">01 quý</option>
                <option value="4">01 năm</option>
              </select>
            </div>
            <div>
              <DoRongThiTruong />
            </div>
          </div>
        </div>

        <div className="mt-[5px] md:block xl:flex">
          <div className="xl:w-[60%] mx-1 my-1 px-[8px] py-[8px] bg-[#151924]">
            <div className="border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0">
              <span className="text-white text-[1.2rem] font-bold">
                Bản đồ thị trường
              </span>
            </div>
            <MarketMap />
          </div>

          <div className="xl:w-[40%] mx-1 my-1 px-[8px] py-[8px] bg-[#151924]">
            <div className="border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0">
              <span className="text-white text-[1.2rem] font-bold">
                Biến động ngành
              </span>
            </div>
            <GeneralIndustry />
          </div>
        </div>

        <div className="mt-[5px] md:block lg:flex justify-center">
          <div className="mx-1 my-1 px-[8px] py-[8px] bg-[#151924] lg:w-[48%] xl:w-[500px] 2xl:w-[480px] h-[700px]">
            <div className="border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0">
              <span className="text-white text-[1.2rem] font-bold">
                Tin tức thị trường
              </span>
            </div>
            <News />
          </div>

          <div className="mx-1 my-1 px-[8px] py-[8px] bg-[#151924] lg:w-[52%] xl:w-[500px] 2xl:w-[480px] h-[700px]">
            <div className="border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0">
              <span className="text-white text-[1.2rem] font-bold">
                Lịch sự kiện
              </span>
            </div>
            <Events />
          </div>

          <div className="lg:hidden xl:block mx-[5px] my-1 px-[8px] py-[8px] bg-[#151924] xl:w-[500px] 2xl:w-[480px] h-[700px]">
            <div className="border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0">
              <span className="text-white text-[1.2rem] font-bold">
                Báo cáo phân tích
              </span>
            </div>
            <AnalysisReport />
          </div>
        </div>
        <div className="xs:hidden md:hidden lg:block xl:hidden mx-[5px] my-1 px-[8px] py-[8px] bg-[#151924] h-[700px]">
          <div className="border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0">
            <span className="text-white text-[1.2rem] font-bold">
              Báo cáo phân tích
            </span>
          </div>
          <AnalysisReport />
        </div>
      </div>
    </>
  );
};

export default IndexMarket;
