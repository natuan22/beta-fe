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
} from "./thunk";

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
              <div className="2xl:flex xl:flex lg:block">
                <div className="w-[60%]">
                  <div className="grid gap-0.5 grid-cols-[2fr_2fr]">
                    <div className="mx-1 my-1 px-2 py-2 bg-[#151924]">
                      <TableDetail />
                    </div>

                    <div className="mx-1 my-1 px-2 py-2 bg-[#151924]">
                      <LineChart />
                    </div>

                    <div className="mx-1 my-1 px-2 py-2 bg-[#151924]">
                      <div className="text-center">
                        <span className="font-semibold uppercase text-amber-500">
                          Nhóm cổ phiếu dẫn dắt thị trường
                        </span>
                        <select className={`${chartStyle.selectStyle} border-none bg-[#151924] text-amber-500`}
                          onChange={(event) => {
                            dispatch(dispatch(fetchDataBarChartLeft(event.target.value)));
                          }}>
                          <option value="VNINDEX">VNINDEX</option>
                          <option value="HNX">HNX</option>
                          <option value="VN30">VN30</option>
                        </select>
                      </div>
                      <BarChartLeft />
                    </div>

                    <div className="text-center mx-1 my-1 px-2 py-2 bg-[#151924]">
                      <span className="font-semibold uppercase text-amber-500">
                        Top nước ngoài mua bán ròng
                      </span>
                      <BarChartRight />
                    </div>
                  </div>
                </div>

                <div className="w-[40%]">
                  <div className="ml-2 mr-2 mt-3">
                    <GeneralIndustry />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex">
                <div className="w-[60%]">
                  <div className="grid gap-0.5 grid-cols-[2fr_2fr]">
                    <div className="mx-1 my-1 px-2 py-2 bg-[#151924]">
                      <GoodsDetail />
                    </div>

                    <div className="mx-1 my-1 px-2 py-2 bg-[#151924]">
                      <RateDetail />
                    </div>
                  </div>

                  <div className="mx-1 my-1 px-2 py-2 bg-[#151924]">
                    <News />
                  </div>
                </div>

                <div className="w-[40%] mx-1 my-1 px-2 py-2 bg-[#151924]">
                  <div className="grid grid-cols-2 gap-0.5">
                    <div className="text-center">
                      <span className="font-semibold uppercase text-amber-500">
                        Top 10 cổ phiếu giảm mạnh nhất sàn
                      </span>
                      <select className={`${chartStyle.selectStyle} border-none bg-[#151924] text-amber-500`} onChange={(event) => {
                        dispatch(dispatch(fetchDataDiemAnhHuong5PhienGiam(event.target.value)));
                      }}>
                        <option value="hose" selected="selected">
                          HSX
                        </option>
                        <option value="hnx">HNX</option>
                        <option value="upcom">UPCOM</option>
                      </select>
                      <span className="font-semibold uppercase text-amber-500">qua 05 phiên gần nhất</span>
                      <Top10Decr />
                    </div>

                    <div className="text-center">
                      <span className="font-semibold uppercase text-amber-500">
                        Top 10 cổ phiếu tăng mạnh nhất sàn
                      </span>
                      <select className={`${chartStyle.selectStyle} border-none bg-[#151924] text-amber-500`} onChange={(event) => {
                        dispatch(dispatch(fetchDataDiemAnhHuong5PhienTang((event.target.value))))
                      }}>
                        <option value="hose" selected="selected">
                          HSX
                        </option>
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

            <div>
              <div className="flex">
                <div className="w-[60%] mx-1 my-1 px-2 py-2 bg-[#151924]">
                  <div className="ml-2 mr-2 mt-3" >
                    <div>
                      <select className="ml-[363px] mb-[10px]" onChange={(event) => {
                        dispatch(dispatch(fetchDataTreeMap(event.target.value)));
                      }}>
                        <option value="HSX" selected="selected">
                          HSX
                        </option>
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

                <div className="w-[40%] mx-1 my-1 px-2 py-2 bg-[#151924]">
                  <div className="grid grid-cols-2 gap-0.5">
                    <div className="text-center">
                      <span className="font-semibold uppercase text-amber-500">
                        Top 10 khối ngoại bán nhiều nhất sàn
                      </span>
                      <select className={`${chartStyle.selectStyle} border-none bg-[#151924] text-amber-500`}
                        onChange={(event) => {
                          dispatch(dispatch(fetchDataTop10Sell(event.target.value)));
                        }}
                      >
                        <option value="HSX" selected="selected">
                          HSX
                        </option>
                        <option value="HNX">HNX</option>
                        <option value="UPCOM">UPCOM</option>
                      </select>
                      <span className="font-semibold uppercase text-amber-500">qua 05 phiên gần nhất</span>
                      <Top10Sell />
                    </div>

                    <div className="text-center">
                      <span className="font-semibold uppercase text-amber-500">
                        Top 10 khối ngoại mua nhiều nhất sàn
                      </span>
                      <select className={`${chartStyle.selectStyle} border-none bg-[#151924] text-amber-500`}
                        onChange={(event) => {
                          dispatch(dispatch(fetchDataTop10Buy((event.target.value))))
                        }}
                      >
                        <option value="HSX" selected="selected">
                          HSX
                        </option>
                        <option value="HNX">HNX</option>
                        <option value="UPCOM">UPCOM</option>
                      </select>
                      <span className="font-semibold uppercase text-amber-500">qua 05 phiên gần nhất</span>
                      <Top10Buy />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex">
                <div className="w-[60%]">
                  <div >
                    <AreaChart />
                  </div>
                </div>
                <div className="w-[40%]">
                  <div className="ml-2 mr-2 mt-3">
                    <TableBienDong />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default Home;