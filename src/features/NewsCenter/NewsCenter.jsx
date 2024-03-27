import React, { useEffect, useState, Fragment } from "react";
import { Outlet, useLocation } from "react-router-dom";
import LayOut from "../../HOCs/Layout";
import NewsCenterNavTab from "./utils/component/NewsCenterNavTab";
import InternationalIndex from "../Chart/components/InternationalIndex";
import Footer from "../../components/Footer";
const apiUrl = process.env.REACT_APP_BASE_URL;

const NewsCenter = () => {
  const location = useLocation();
  const [bannerDisplay, setBannerDisplay] = useState(false);

  useEffect(() => {
    if (location.pathname === "/trung-tam-tin-tuc") {
      setBannerDisplay(true);
    } else {
      setBannerDisplay(false);
    }
  }, [location]);

  return (
    <LayOut>
      <div>
        <InternationalIndex />
      </div>
      <div className="container mx-auto">
        <div>
          <div>
            <NewsCenterNavTab />
          </div>
          <div>
            <Outlet />
          </div>
        </div>
        <div>
          {bannerDisplay ? (
            <div className="h-auto pt-5 pb-2 flex justify-center ">
              <div className="flex md:flex-row md:justify-around sm:flex-col sm:items-center xs:flex-col xs:items-center xxs:flex-col xxs:items-center">
                <div className="px-2 relative">
                  <a
                    href="https://zalo.me/1623670409453822014"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className="xl:w-[712px] xl:h-[500px] lg:w-[505px] lg:h-[333px] md:w-[370px] md:h-[261px] sm:w-[350px] sm:h-[261px] xs:w-[350px] xs:h-[261px] xxs:w-[223px] xxs:h-[167px]"
                      src={`${apiUrl}/resources/images/banner1.png`}
                      alt="zalo-banner"
                    />
                  </a>
                </div>
                <div className="px-2 relative">
                  <a
                    href="https://t.me/betaEmarketbot"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className="xl:w-[712px] xl:h-[500px] lg:w-[505px] lg:h-[333px] md:w-[370px] md:h-[261px] sm:w-[350px] sm:h-[261px] xs:w-[350px] xs:h-[261px] xxs:w-[223px] xxs:h-[167px]"
                      src={`${apiUrl}/resources/images/banner2.png`}
                      alt="tele-banner"
                    />
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

export default NewsCenter;
