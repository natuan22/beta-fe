import React, { Fragment, useEffect, useState } from "react";
import News from "../Chart/components/News";
import InternationalIndex from "../Chart/components/InternationalIndex";
import { Outlet, useLocation } from "react-router-dom";
import MarketTab from "./utils/MarketTab";
import Banner from "../Chart/components/Banner";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataInternationalIndex, fetchDataNews } from "../Chart/thunk";
import LayOut from "../../HOCs/Layout";
import Footer from "../../components/Footer";
const apiUrl = process.env.REACT_APP_BASE_URL;

const Market = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const [theme, setTheme] = useState(localStorage.getItem('theme'))
  const color = useSelector((state) => state.color.colorTheme);

  const [bannerDisplay, setBannerDisplay] = useState(false)
  useEffect(() => {
    if (location.pathname === "/thi-truong" || location.pathname === '/thi-truong/dong-tien-thi-truong' || location.pathname === '/thi-truong/ky-thuat-va-dinh-gia' || location.pathname === '/thi-truong/thi-truong-quoc-te') {
      setBannerDisplay(true);
    } else {
      setBannerDisplay(false);
    }
  }, [location]);

  useEffect(() => {
    setTheme(color);
  }, [color]);

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
        <div>
          {bannerDisplay ? (
            <div className="pt-5 pb-2 flex justify-center items-center">
              <div className="flex md:flex-row md:justify-around sm:flex-col sm:items-center xs:flex-col xs:items-center xxs:flex-col xxs:items-center w-[50%]">
                <div className="mr-5">
                  <a href="https://zalo.me/1623670409453822014" target="_blank" rel="noopener noreferrer">
                    <img className="w-[300px] h-[300px]" src={`${apiUrl}/resources/images/chat-bot-zalo-${localStorage.getItem('theme')}.png`}
                      alt={`error-404-${localStorage.getItem('theme')}`} />
                  </a>
                </div>
                <div className="mr-5">
                  <a href="https://t.me/betaEmarketbot" target="_blank" rel="noopener noreferrer">
                    <img className="w-[300px] h-[300px]" src={`${apiUrl}/resources/images/chat-bot-tele-${localStorage.getItem('theme')}.png`}
                      alt={`error-404-${localStorage.getItem('theme')}`} />
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <Fragment></Fragment>
          )}
        </div>
        <Footer />
      </div>
    </LayOut>
  );
};

export default Market;
