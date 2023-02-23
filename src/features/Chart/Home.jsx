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
} from "./thunk";

import AreaChart from "./components/AreaChart";
import StackingAreas from "./components/StackingAreas";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataNews);
    dispatch(fetchDataRateDetail);
    dispatch(fetchDataTop10Sell("HSX"));
    dispatch(fetchDataTop10Buy("HSX"));
    dispatch(fetchDataDiemAnhHuong5PhienGiam("hose"));
    dispatch(fetchDataDiemAnhHuong5PhienTang("hose"));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchDataCarousel);
    dispatch(fetchDataTableDetail);
    dispatch(fetchDataBarChartRight);
    dispatch(fetchDataBarChartLeft("VNINDEX"));
    dispatch(fetchDataGoodsDetail);
    dispatch(fetchDataGeneralIndustry);
    dispatch(fetchDataTreeMap("HSX"));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchDataAreaChart1);
    dispatch(fetchDataAreaChart2);
  }, [dispatch]);

  useEffect(()=> {
   dispatch(fetchDataWidthMarket('VNINDEX')) 
  }, [dispatch])
  return (
    <>
      <div className="mx-auto">
        <div className="flex">
          <div style={{ width: "10%" }}>
            <Banner />
          </div>

          <div style={{ width: "90%" }}>
            <Carousel />
            <div className="flex">
              <div style={{ width: "60%" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 2fr",
                    gap: "2px",
                  }}
                >
                  <div className="ml-2 mr-2 mt-3">
                    <TableDetail />
                  </div>

                  <div className="mt-3 ">
                    <LineChart />
                  </div>

                  <div className="mt-3 ">
                    <div className="text-center ">
                      <span className="font-semibold">
                        Nhóm cổ phiếu dẫn dắt thị trường
                      </span>
                      <select
                        className={`${chartStyle.selectStyle} border-none`}
                        onChange={(event) => {
                          dispatch(
                            dispatch(fetchDataBarChartLeft(event.target.value))
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

                  <div className="text-center mt-3">
                    <span className="font-semibold">
                      Top nước ngoài mua bán ròng
                    </span>
                    <BarChartRight />
                  </div>

                  <div className="ml-2 mr-2 mt-3">
                    <GoodsDetail />
                  </div>

                  <div className="ml-2 mr-2 mt-3">
                    <RateDetail />
                  </div>
                </div>

                <div className="ml-2 mr-2 mt-3">
                  <News />
                </div>

                <div className="ml-2 mr-2 mt-3">
                  <div>
                    <select
                      style={{ marginLeft: "363px", marginBottom: "10px" }}
                      onChange={(event) => {
                        dispatch(
                          dispatch(fetchDataTreeMap(event.target.value))
                        );
                      }}
                    >
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

              <div style={{ width: "40%" }}>
                <div className="ml-2 mr-2 mt-3">
                  <GeneralIndustry />
                </div>

                <div className="grid grid-cols-2 gap-0.5">
                  <div className="text-center">
                    <span className="font-semibold">
                      Top 10 cổ phiếu giảm mạnh nhất sàn
                    </span>
                    <select
                      className={`${chartStyle.selectStyle} border-none`}
                      onChange={(event) => {
                        dispatch(
                          dispatch(
                            fetchDataDiemAnhHuong5PhienGiam(event.target.value)
                          )
                        );
                      }}
                    >
                      <option value="hose" selected="selected">
                        HSX
                      </option>
                      <option value="hnx">HNX</option>
                      <option value="upcom">UPCOM</option>
                    </select>
                    <span className="font-semibold">qua 05 phiên gần nhất</span>
                    <Top10Decr />
                  </div>

                  <div className="text-center">
                    <span className="font-semibold">
                      Top 10 cổ phiếu tăng mạnh nhất sàn
                    </span>
                    <select
                      className={`${chartStyle.selectStyle} border-none`}
                      onChange={(event) => {
                        dispatch(
                          dispatch(
                            fetchDataDiemAnhHuong5PhienTang(event.target.value)
                          )
                        );
                      }}
                    >
                      <option value="hose" selected="selected">
                        HSX
                      </option>
                      <option value="hnx">HNX</option>
                      <option value="upcom">UPCOM</option>
                    </select>
                    <span className="font-semibold">qua 05 phiên gần nhất</span>
                    <Top10Incr />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-0.5">
                  <div className="text-center">
                    <span className="font-semibold">
                      Top 10 khối ngoại bán nhiều nhất sàn
                    </span>
                    <select
                      className={`${chartStyle.selectStyle} border-none`}
                      onChange={(event) => {
                        dispatch(
                          dispatch(fetchDataTop10Sell(event.target.value))
                        );
                      }}
                    >
                      <option value="HSX" selected="selected">
                        HSX
                      </option>
                      <option value="HNX">HNX</option>
                      <option value="UPCOM">UPCOM</option>
                    </select>
                    <span className="font-semibold">qua 05 phiên gần nhất</span>
                    <Top10Sell />
                  </div>
                  <div className="text-center">
                    <span className="font-semibold">
                      Top 10 khối ngoại mua nhiều nhất sàn
                    </span>
                    <select
                      className={`${chartStyle.selectStyle} border-none`}
                      onChange={(event) => {
                        dispatch(
                          dispatch(fetchDataTop10Buy(event.target.value))
                        );
                      }}
                    >
                      <option value="HSX" selected="selected">
                        HSX
                      </option>
                      <option value="HNX">HNX</option>
                      <option value="UPCOM">UPCOM</option>
                    </select>
                    <span className="font-semibold">qua 05 phiên gần nhất</span>
                    <Top10Buy />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <AreaChart />
        <div>
          <select
            className={`${chartStyle.selectStyle} border-none`}
            onChange={(event) => {
              dispatch(dispatch(fetchDataWidthMarket(event.target.value)));
            }}
          >
            <option value="VNINDEX" selected="selected">
            VNINDEX
            </option>
            <option value="HNX">HNX</option>
          </select>
          <StackingAreas />
        </div>
      </div>
    </>
  );
};

export default Home;
