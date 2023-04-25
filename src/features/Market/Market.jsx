import React, { Fragment, useEffect, useState } from "react";
import News from "../Chart/components/News";
import InternationalIndex from "../Chart/components/InternationalIndex";
import { Outlet, useLocation } from "react-router-dom";
import MarketTab from "./utils/MarketTab";
import Banner from "../Chart/components/Banner";
import { useDispatch } from "react-redux";
import { fetchDataInternationalIndex, fetchDataNews } from "../Chart/thunk";
import LayOut from "../../HOCs/Layout";
import Footer from "../../components/Footer";
const apiUrl = process.env.REACT_APP_BASE_URL;

const Market = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const [bannerDisplay, setBannerDisplay] = useState(false)

  useEffect(() => {
    if (location.pathname === "/thi-truong" || location.pathname === '/thi-truong/dong-tien-thi-truong' || location.pathname === '/thi-truong/ky-thuat-va-dinh-gia' || location.pathname === '/thi-truong/thi-truong-quoc-te') {
      setBannerDisplay(true);
    } else {
      setBannerDisplay(false);
    }
  }, [location]);
  console.log(bannerDisplay)
  useEffect(() => {
    dispatch(fetchDataNews);
    dispatch(fetchDataInternationalIndex);
  }, [dispatch]);
  return (
    <LayOut>
      <div>
        <InternationalIndex />
        <News />
      </div>
      <Banner />
      <div className="container mx-auto">
        <div>
          <div className="px-11">
            <MarketTab />
          </div>

          <div>
            <Outlet />
          </div>
        </div>
        <div className="p-5" >
          {bannerDisplay ?
            <div className="flex flex-col justify-center items-center">
              <div>
                <img className="w-[500px] h-[350px] mr-5" src={`${apiUrl}/resources/images/advertise.png`} alt="imgAdvertise" />
                <img className="w-[500px] h-[350px]" src={`${apiUrl}/resources/images/advertise1.png`} alt="imgAdvertise" />
              </div>
            </div> : <Fragment></Fragment>}
        </div>
        <Footer />
      </div>
    </LayOut>
  );
};

export default Market;
