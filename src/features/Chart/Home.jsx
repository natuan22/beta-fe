import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Banner from "./components/Banner";
import BarChartLeft from "./components/BarChartLeft";
import BarChartRight from "./components/BarChartRight";
import Carousel from "./components/Carousel";
import GeneralIndustry from "./components/GeneralIndustry";
import News from "./components/News";
import Top10Sell from "./components/Top10Sell";
import Top10Buy from "./components/Top10Buy";
import TreemapChart from "./components/TreemapChart";
import LineChart from "./components/LineChart";
import chartStyle from "./utils/Chart.module.css";
import TableDetail from "./components/TableDetail";
import GoodsDetail from "./components/GoodsDetail";
import Top10Incr from "./components/Top10Incr";
import Top10Decr from "./components/Top10Decr";
import TreeMapChart2 from "./components/TreeMapChart2";
import RateDetail from "./components/RateDetail";
import AreaChart from "./components/AreaChart";
import TableBienDong from "./components/TableBienDong";
import Footer from "../../components/Footer";
import StackingAreas from "./components/StackingAreas";
import {
  fetchDataCarousel,
  fetchDataTableDetail,
  fetchDataBarChartRight,
  fetchDataBarChartLeft,
  fetchDataNews,
  fetchDataTop10Sell,
  fetchDataTop10Buy,
  fetchDataGoodsDetail,
  fetchDataRateDetail,
  fetchDataGeneralIndustry,
  fetchDataDiemAnhHuong5PhienGiam,
  fetchDataDiemAnhHuong5PhienTang,
  fetchDataTreeMap,
  fetchDataAreaChart1,
  fetchDataAreaChart2,
  fetchDataWidthMarket,
  fetchDataTableBienDong,
} from "./thunk";
import NetVolumeTrade from "./components/NetVolumeTrade";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataNews)
    dispatch(fetchDataRateDetail)
    dispatch(fetchDataTop10Sell("HSX"))
    dispatch(fetchDataTop10Buy("HSX"))
    dispatch(fetchDataDiemAnhHuong5PhienGiam("hose"))
    dispatch(fetchDataDiemAnhHuong5PhienTang("hose"))
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchDataCarousel);
    dispatch(fetchDataTableDetail);
    dispatch(fetchDataBarChartRight);
    dispatch(fetchDataBarChartLeft("VNINDEX"));
    dispatch(fetchDataGoodsDetail)
    dispatch(fetchDataGeneralIndustry)
    dispatch(fetchDataTreeMap("HSX"))
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchDataAreaChart1)
    dispatch(fetchDataAreaChart2)
    dispatch(fetchDataWidthMarket('HNX'))
    dispatch(fetchDataTableBienDong)
  }, [dispatch])

  return (
    <>
      <div className="mx-auto bg-slate-800">
        <div className="flex">
          <div className="w-[5%]">
            <Banner />
          </div>

          <div className='w-[95%]'>
            <Carousel />

            <div>
              <div className="lg:block xl:flex ">
                <div className="xl:w-[60%]">
                  <div className="grid xs:grid-cols-none sm:grid-cols-none md:grid-cols-none lg:grid-cols-[2fr_2fr] xl:grid-cols-[2fr_2fr]">
                    <div className="mx-1 my-1 px-1.5 py-1.5 bg-[#151924]">
                      <TableDetail />
                    </div>

                    <div className="mx-1 my-1 px-1.5 py-1.5 bg-[#151924] xs:min-h-[352px] xxs:min-h-[332px] sm:min-h-[312px] md:min-h-[336px] lg:min-h-[350px]">
                      <LineChart />
                    </div>
                    <div className="mx-1 my-1 px-1.5 py-1.5 bg-[#151924]">
                      <div className="text-center bg-[#020203]">
                        <span className="font-semibold uppercase text-amber-500">
                          Nhóm cổ phiếu dẫn dắt thị trường
                        </span>
                        <select className={`${chartStyle.selectStyle} border-none bg-[#020203] text-amber-500`}
                          onChange={(event) => {
                            dispatch(dispatch(fetchDataBarChartLeft(event.target.value)));
                          }}>
                          <option value="VNINDEX">VNINDEX</option>
                          <option value="HNX">HNX</option>
                          <option value="VN30">VN30</option>
                        </select>
                        <BarChartLeft />
                      </div>
                    </div>

                    <div className="text-center mx-1 my-1 px-1.5 py-1.5 bg-[#151924]">
                      <div className="bg-[#020203]">
                        <span className="font-semibold uppercase text-amber-500">
                          Top nước ngoài mua bán ròng
                        </span>
                        <BarChartRight />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:w-[80%] xl:w-[40%] lg:translate-x-[14%] xl:translate-x-0 ">
                  <div className="mx-2 mt-1 px-1.5 py-1.5 bg-[#151924] sm:h-[430px] md:h-[465px] lg:h-[450px] xl:h-[664px]">
                    <GeneralIndustry />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="xl:flex lg:block">
                <div className="xl:w-[60%]">
                  <div className="grid gap-0.5 md:grid-cols-none lg:grid-cols-[2fr_2fr] xl:grid-cols-[2fr_2fr]">
                    <div className="mx-1 my-1 px-1.5 py-1.5 bg-[#151924] h-[380px]">
                      <GoodsDetail />
                    </div>

                    <div className="mx-1 my-1 px-1.5 py-1.5 bg-[#151924] h-[380px]">
                      <RateDetail />
                    </div>
                  </div>

                  <div className="mx-1 my-1 px-1.5 py-1.5 bg-[#151924] h-[385px]">
                    <News />
                  </div>
                </div>

                <div className="lg:w-[80%] xl:w-[40%] lg:translate-x-[14%] xl:translate-x-0">
                  <div className="mx-2 mt-1 px-1.5 py-1.5 bg-[#151924]">
                    <div className="grid grid-cols-2 bg-[#020203]">
                      <div className="text-center mx-1">
                        <span className="font-semibold uppercase text-amber-500">
                          Top 10 cổ phiếu giảm mạnh nhất sàn
                        </span>
                        <select className={`${chartStyle.selectStyle} border-none bg-[#020203] text-amber-500`} onChange={(event) => {
                          dispatch(dispatch(fetchDataDiemAnhHuong5PhienGiam(event.target.value)));
                        }}>
                          <option value="hose">HSX</option>
                          <option value="hnx">HNX</option>
                          <option value="upcom">UPCOM</option>
                        </select>
                        <span className="font-semibold uppercase text-amber-500">qua 05 phiên gần nhất</span>
                        <Top10Decr />
                      </div>

                      <div className="text-center mx-1">
                        <span className="font-semibold uppercase text-amber-500">
                          Top 10 cổ phiếu tăng mạnh nhất sàn
                        </span>
                        <select className={`${chartStyle.selectStyle} border-none bg-[#020203] text-amber-500`} onChange={(event) => {
                          dispatch(dispatch(fetchDataDiemAnhHuong5PhienTang((event.target.value))))
                        }}>
                          <option value="hose">HSX</option>
                          <option value="hnx">HNX</option>
                          <option value="upcom">UPCOM</option>
                        </select>
                        <span className="font-semibold uppercase text-amber-500">qua 05 phiên gần nhất</span>
                        <Top10Incr />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="lg:block xl:flex">
                <div className="xl:w-[60%] xs:hidden sm:hidden md:hidden xl:block ">
                  <div className="mx-1 my-1 px-1.5 py-1.5 bg-[#151924] h-[710px]">
                    <div>
                      <select className="ml-[363px] mb-[10px]" onChange={(event) => {
                        dispatch(dispatch(fetchDataTreeMap(event.target.value)));
                      }}>
                        <option value="HSX">HSX</option>
                        <option value="HNX">HNX</option>
                        <option value="UPCOM">UPCOM</option>
                      </select>
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
                <div className="lg:w-[80%] xl:w-[40%] lg:translate-x-[14%] xl:translate-x-0">
                  <div className="mx-2 mt-1 px-1.5 py-1.5 bg-[#151924]">
                    <div className="grid grid-cols-2 bg-[#020203]">
                      <div className="text-center mx-1">
                        <span className="font-semibold uppercase text-amber-500">
                          Top 10 khối ngoại bán nhiều nhất sàn
                        </span>
                        <select className={`${chartStyle.selectStyle} border-none bg-[#020203] text-amber-500`}
                          onChange={(event) => {
                            dispatch(dispatch(fetchDataTop10Sell(event.target.value)));
                          }}
                        >
                          <option value="HSX">HSX</option>
                          <option value="HNX">HNX</option>
                          <option value="UPCOM">UPCOM</option>
                        </select>
                        <span className="font-semibold uppercase text-amber-500">qua 05 phiên gần nhất</span>
                        <Top10Sell />
                      </div>

                      <div className="text-center mx-1">
                        <span className="font-semibold uppercase text-amber-500">
                          Top 10 khối ngoại mua nhiều nhất sàn
                        </span>
                        <select className={`${chartStyle.selectStyle} border-none bg-[#020203] text-amber-500`}
                          onChange={(event) => {
                            dispatch(dispatch(fetchDataTop10Buy((event.target.value))))
                          }}
                        >
                          <option value="HSX">HSX</option>
                          <option value="HNX">HNX</option>
                          <option value="UPCOM">UPCOM</option>
                        </select>
                        <span className="font-semibold uppercase text-amber-500">qua 05 phiên gần nhất</span>
                        <Top10Buy />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="xl:w-[60%] xl:hidden">
                  <div className="mx-1 my-1 px-1.5 py-1.5 bg-[#151924] h-[710px]">
                    <div>
                      <select className="xs:ml-[125px] sm:ml-[255px] md:ml-[315px] lg:ml-[435px] mb-[10px]" onChange={(event) => {
                        dispatch(dispatch(fetchDataTreeMap(event.target.value)));
                      }}>
                        <option value="HSX">HSX</option>
                        <option value="HNX">HNX</option>
                        <option value="UPCOM">UPCOM</option>
                      </select>
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
              <div className="lg:block xl:flex mx-2 my-1 px-1.5 py-1.5 bg-[#151924]">
                <div className="xl:w-[65%]">
                  <div className="mx-2 my-1 px-1.5 py-1.5">
                    <AreaChart />
                  </div>
                </div>
                <div className="xl:w-[35%]">
                  <div className="px-1.5 py-1.5">
                    <TableBienDong />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="xl:flex lg:block mx-2 my-1 px-1.5 py-1.5 bg-[#151924]">
                <div className="xl:w-[65%]">
                  <div>
                    <StackingAreas />
                  </div>
                </div>
                <div className="xl:w-[35%]">
                  <div className="">
                    {/* <TableBienDong /> */}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div>
                <NetVolumeTrade />
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
};

export default Home;