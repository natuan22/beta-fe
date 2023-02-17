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
import { fetchDataCarousel,fetchDataTableDetail, fetchDataBarChartRight, fetchDataBarChartLeft, fetchDataNews, fetchDataTop10Sell, fetchDataTop10Buy } from "./thunk";
import LineChart from "./components/LineChart";
import TableDetail from "./components/TableDetail";
import chartStyle from "./utils/Chart.module.css"

const Home = () => {
  const dispatch = useDispatch();
  const selectedIndex = useSelector(
    (state) => state.chart.indexApiBarChartLeft
  );
  useEffect(() => {
    dispatch(fetchDataCarousel);
    dispatch(fetchDataBarChartRight);
    dispatch(fetchDataNews);
    dispatch(fetchDataTop10Sell('HSX'));
    dispatch(fetchDataTop10Buy('HSX'));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchDataTableDetail)
    dispatch(fetchDataBarChartRight)
    dispatch(fetchDataBarChartLeft('VNINDEX'));
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
            <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr", gap: '5px' }}>
              <div>
                <TableDetail />
              </div>
              <div>
                <LineChart />
              </div>
              <div>
                <div className="text-center">
                  <span className="font-semibold">Nhóm cổ phiếu dẫn dắt thị trường</span>
                  <select 
                    className={`${chartStyle.selectStyle} border-none`}
                    value={selectedIndex}
                    onChange={(event) => {
                      dispatch(dispatch(fetchDataBarChartLeft(event.target.value )));
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
            </div>
            <div>
              <GeneralIndustry />
            </div>
            <div className="grid grid-cols-2">
              <div className="w-auto">
                <select onChange={(event) => { dispatch(dispatch(fetchDataTop10Sell(event.target.value))) }}>
                  <option value="HSX" selected="selected">HSX</option>
                  <option value="HNX">HNX</option>
                  <option value="UPCOM">UPCOM</option>
                </select>
                <Top10Sell />
              </div>
              <div className="w-auto">
                <select onChange={(event) => { dispatch(dispatch(fetchDataTop10Buy(event.target.value))) }}>
                  <option value="HSX" selected="selected">HSX</option>
                  <option value="HNX">HNX</option>
                  <option value="UPCOM">UPCOM</option>
                </select>
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
