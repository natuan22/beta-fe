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
  fetchDataDiemAnhHuong5PhienTang,
  fetchDataDiemAnhHuong5PhienGiam,
  fetchDataKhoaNgoaiMuaRong,
  fetchDataGoodsDetail,
  fetchDataRateDetail,
  fetchDataGeneralIndustry,
} from "./thunk";
import LineChart from "./components/LineChart";
import chartStyle from "./utils/Chart.module.css";
import TableDetail from "./components/TableDetail";
import Top10Incr from "./components/Top10Incr";
import Top10Decr from "./components/Top10Decr";
import TreemapChart from "./components/TreemapChart";
import GoodsDetail from "./components/GoodsDetail";


const Home = () => {
  const dispatch = useDispatch();
  const selectedIndex = useSelector(
    (state) => state.chart.indexApiBarChartLeft
  );
  useEffect(() => {
    dispatch(fetchDataNews);
    dispatch(fetchDataTop10Sell("HSX"));
    dispatch(fetchDataTop10Buy("HSX"));
    dispatch(fetchDataDiemAnhHuong5PhienTang("hose"));
    dispatch(fetchDataDiemAnhHuong5PhienGiam("hose"));
    dispatch(fetchDataKhoaNgoaiMuaRong);
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchDataCarousel);
    dispatch(fetchDataTableDetail);
    dispatch(fetchDataBarChartRight);
    dispatch(fetchDataBarChartLeft("VNINDEX"));
    dispatch(fetchDataGoodsDetail)
    dispatch(fetchDataRateDetail)
    dispatch(fetchDataGeneralIndustry)
  }, [dispatch]);

  return (
    <div className="container mx-auto">
      <div className="flex">
        <div style={{ width: "10%" }}>
          <Banner />
        </div>
        <div style={{ width: "90%" }}>
          <Carousel />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2.5fr 1.5fr",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 2fr",
                gap: "5px",
              }}
            >
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
              <div>
                <BarChartRight />
              </div>
              <div>
                <GoodsDetail />
              </div>
            </div>
            <div>
              <GeneralIndustry />
            </div>

            <div className="grid grid-cols-2">
              <div className="w-auto">
                <span className="font-semibold">
                  TOP 10 CỔ PHIẾU KHỐI NGOẠI BÁN NHIỀU NHẤT SÀN
                </span>
              <div>
                <select
                  className={`${chartStyle.selectStyle} border-none`}
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
                <span className="font-semibold">
                  QUA 05 PHIÊN GẦN NHẤT
                </span>
                <Top10Sell />
              </div>

              <div className="w-auto">
                <span className="font-semibold">
                  TOP 10 CỔ PHIẾU KHỐI NGOẠI MUA NHIỀU NHẤT SÀN
                </span>
              <div>
                <select
                  className={`${chartStyle.selectStyle} border-none`}
                  onChange={(event) => {
                    dispatch(dispatch(fetchDataTop10Buy(event.target.value)));
                  }}
                >
                  <option value="HSX" selected="selected">
                    HSX
                  </option>
                  <option value="HNX">HNX</option>
                  <option value="UPCOM">UPCOM</option>
                </select>
                <span className="font-semibold">
                  QUA 05 PHIÊN GẦN NHẤT
                </span>
                <Top10Buy />
              </div>
            </div>
          </div>

          <div>
            <News />
          </div>
          <div className="grid grid-cols-2">

            <div>
              <span className="font-semibold">
                TOP 10 CỔ PHIẾU GIẢM MẠNH NHẤT SÀN
              </span>
              <select
                className={`${chartStyle.selectStyle} border-none`}
                onChange={(event) => {
                  dispatch(dispatch(fetchDataDiemAnhHuong5PhienGiam(event.target.value)));
                }}
              >
                <option value="hose" selected="selected">
                  HSX
                </option>
                <option value="hnx">HNX</option>
                <option value="upcom">UPCOM</option>
              </select>
              <span className="font-semibold">
                QUA 05 PHIÊN GẦN NHẤT
              </span>
              <Top10Decr />
            </div>
            <div>
              <span className="font-semibold">
                TOP 10 CỔ PHIẾU TĂNG MẠNH NHẤT SÀN
              </span>
              <select
                className={`${chartStyle.selectStyle} border-none`}
                onChange={(event) => {
                  dispatch(dispatch(fetchDataDiemAnhHuong5PhienTang(event.target.value)));
                }}
              >
                <option value="hose" selected="selected">
                  HSX
                </option>
                <option value="hnx">HNX</option>
                <option value="upcom">UPCOM</option>
              </select>
              <span className="font-semibold">
                QUA 05 PHIÊN GẦN NHẤT
              </span>
              <Top10Incr />
            </div>
            <TreemapChart />
          </div>
        </div>
      </div>
    </div >
  );
};

export default Home;
