import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "./components/Banner";
import BarChartLeft from "./components/BarChartLeft";
import BarChartRight from "./components/BarChartRight";
import Carousel from "./components/Carousel";
import GeneralIndustry from "./components/GeneralIndustry";
import News from "./components/News";
import Top10Sell from "./components/Top10Sell";
import Top10Buy from "./components/Top10Buy";
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
} from "./thunk";
import LineChart from "./components/LineChart";
import chartStyle from "./utils/Chart.module.css";
import TableDetail from "./components/TableDetail";
import GoodsDetail from "./components/GoodsDetail";
import Top10Incr from "./components/Top10Incr";
import Top10Decr from "./components/Top10Decr";
import TreeMapChart from "./components/TreemapChart";
import RateDetail from "./components/RateDetail";
import TreeMapChart2 from "./components/TreeMapChart2";

const Home = () => {
  const dispatch = useDispatch();
  const selectedIndex = useSelector(
    (state) => state.chart.indexApiBarChartLeft
  );
  useEffect(() => {
    dispatch(fetchDataNews);
    dispatch(fetchDataTop10Sell("HSX"));
    dispatch(fetchDataTop10Buy("HSX"));
    dispatch(fetchDataDiemAnhHuong5PhienGiam("hose"))
    dispatch(fetchDataDiemAnhHuong5PhienTang("hose"))
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchDataCarousel);
    dispatch(fetchDataTableDetail);
    dispatch(fetchDataBarChartRight);
    dispatch(fetchDataBarChartLeft("VNINDEX"));
    dispatch(fetchDataGoodsDetail)
    dispatch(fetchDataRateDetail)
    dispatch(fetchDataGeneralIndustry)
    dispatch(fetchDataTreeMap("HSX"))
  }, [dispatch]);

  return (
    <div className="mx-auto">
      <div className="flex">
        <div style={{ width: "10%" }}>
          <Banner />
        </div>

        <div style={{ width: "90%" }}>
          <Carousel />
          <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr", gap: "2px", }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr", gap: "2px", }}>
              <div>
                <TableDetail />
              </div>

              <div>
                <LineChart />
              </div>

              <div>
                <div className="text-center">
                  <span className="font-semibold">
                    Nhóm cổ phiếu dẫn dắt thị trường
                  </span>
                  <select
                    className={`${chartStyle.selectStyle} border-none`}
                    value={selectedIndex}
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

              <div className="text-center">
                <span className="font-semibold">
                  Top nước ngoài mua bán ròng
                </span>

                <BarChartRight />
              </div>

              <div>
                <GoodsDetail />
              </div>

              {/* <div>
                <RateDetail />
              </div> */}

            </div>

            <div>
              <GeneralIndustry />
            </div>

            <div>
              <News />
            </div>

            <div className="grid grid-cols-2 gap-0.5">
              <div className="text-center">
                <span className="font-semibold">
                  Top 10 cổ phiếu giảm mạnh nhất sàn
                </span>
                <select className={`${chartStyle.selectStyle} border-none`} onChange={(event) => {
                  dispatch(dispatch(fetchDataDiemAnhHuong5PhienGiam(event.target.value)));
                }}>
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
                <select className={`${chartStyle.selectStyle} border-none`} onChange={(event) => {
                  dispatch(dispatch(fetchDataDiemAnhHuong5PhienTang((event.target.value))))
                }}>
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
            <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr", gap: "2px", }}>
              <div>
                <div>
                  <select
                    onChange={(event) => {
                      dispatch(dispatch(fetchDataTreeMap(event.target.value)));
                    }}
                  >
                    <option value="HSX" selected="selected">
                      HSX
                    </option>
                    <option value="HNX">HNX</option>
                    <option value="UPCOM">UPCOM</option>
                  </select>
                </div>
                <TreeMapChart />
              </div>
              <div>
                <select
                  onChange={(event) => {
                    dispatch(dispatch(fetchDataTreeMap(event.target.value)));
                  }}
                >
                  <option value="HSX" selected="selected">
                    HSX
                  </option>
                  <option value="HNX">HNX</option>
                  <option value="UPCOM">UPCOM</option>
                </select>
                <TreeMapChart2 />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-0.5">
              <div className="text-center">
                <span className="font-semibold">
                  Top 10 khối ngoại bán nhiều nhất sàn
                </span>
                <select className={`${chartStyle.selectStyle} border-none`}
                  onChange={(event) => {
                    dispatch(dispatch(fetchDataTop10Sell(event.target.value)));
                  }}
                >
                  <option value="hsx" selected="selected">
                    HSX
                  </option>
                  <option value="hnx">HNX</option>
                  <option value="upcom">UPCOM</option>
                </select>
                <span className="font-semibold">qua 05 phiên gần nhất</span>
                <Top10Sell />
              </div>
              <div className="text-center">
                <span className="font-semibold">
                  Top 10 khối ngoại mua nhiều nhất sàn
                </span>
                <select className={`${chartStyle.selectStyle} border-none`}
                  onChange={(event) => {
                    dispatch(dispatch(fetchDataTop10Buy((event.target.value))))
                  }}
                >
                  <option value="hsx" selected="selected">
                    HSX
                  </option>
                  <option value="hnx">HNX</option>
                  <option value="upcom">UPCOM</option>
                </select>
                <span className="font-semibold">qua 05 phiên gần nhất</span>
                <Top10Buy />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
