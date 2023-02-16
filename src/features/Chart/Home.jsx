import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Banner from "./components/Banner";
import BarChartLeft from "./components/BarChartLeft";
import BarChartRight from "./components/BarChartRight";
import Carousel from "./components/Carousel";
import GeneralIndustry from "./components/GeneralIndustry";
import { fetchDataCarousel, fetchDataBarChartRight, fetchDataBarChartLeft } from "./thunk";
import { setIndex } from "./utils";

const Home = () => {
  const dispatch = useDispatch();
  const selectedIndex = useSelector(
    (state) => state.chart.indexApiBarChartLeft
  );
  const [searchParam, setUseSearchParam] = useSearchParams()
  useEffect(() => {
    dispatch(fetchDataCarousel);

    dispatch(fetchDataBarChartRight);
  }, [dispatch]);

  useEffect(()=> {
    dispatch(fetchDataBarChartLeft(searchParam.get(`selectedIndex`)))
  },[searchParam.get(`selectedIndex`)])




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
            <div style={{display:"grid", gridTemplateColumns:"2fr 2fr" , gap:'5px'}}>
              <div>
                <div>
                  <select
                    value={selectedIndex}
                    onChange={(event) => {
                      dispatch(setIndex(event.target.value));
                      fetchDataBarChartLeft(selectedIndex)
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
