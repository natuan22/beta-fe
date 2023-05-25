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
<<<<<<< HEAD
            <div className="pt-5 pb-2 flex justify-center items-center">
              <div className="flex  md:flex-row md:justify-around sm:flex-col sm:items-center xs:flex-col xs:items-center xxs:flex-col xxs:items-center w-[100%]">
                <div className=" actionHover relative">
=======
            <div className="h-auto pt-5 pb-2 flex justify-center ">
              <div className="flex  md:flex-row md:justify-around sm:flex-col sm:items-center xs:flex-col xs:items-center xxs:flex-col xxs:items-center w-[50%]">
                <div className="px-2 relative">
>>>>>>> c8a2782ab811ac2d6e5f11e6da22bc04c7056bae
                  <a href="https://zalo.me/1623670409453822014" target="_blank" rel="noopener noreferrer">
                    <img className="xl:w-[670px] xl:h-[500px] lg:w-[447px] lg:h-[333px] md:w-[350px] md:h-[261px] sm:w-[350px] sm:h-[261px] xs:w-[350px] xs:h-[261px] xxs:w-[223px] xxs:h-[167px]" src={`${apiUrl}/resources/images/chat-bot-zalo.png`}
                      alt={`error-404-${localStorage.getItem('theme')}`} />
                  </a>

                </div>
<<<<<<< HEAD
                <div className=" actionHover relative ">
=======
                <div className="px-2 relative">
>>>>>>> c8a2782ab811ac2d6e5f11e6da22bc04c7056bae
                  <a href="https://t.me/betaEmarketbot" target="_blank" rel="noopener noreferrer">
                    <img className="xl:w-[670px] xl:h-[500px] lg:w-[447px] lg:h-[333px] md:w-[350px] md:h-[261px] sm:w-[350px] sm:h-[261px] xs:w-[350px] xs:h-[261px] xxs:w-[223px] xxs:h-[167px]" src={`${apiUrl}/resources/images/chat-bot-tele.png`}
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