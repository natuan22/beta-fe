import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
const hashTbTechAndValuation = {
  "Hiệu suất": "hieu-suat",
  "Sức khoẻ tài chính": "suc-khoe-tai-chinh",
  "Kỹ thuật": "ky-thuat",
};
const TechAndValuation = () => {
  const [activeNavlink, setActiveNavlink] = useState();
  const location = useLocation();
  const navRef = useRef([]);
  const handleActiveNav = (index) => {
    setActiveNavlink(index);
  };

  useEffect(() => {
    if (location.pathname === "/thi-truong/hieu-suat-va-dinh-gia/hieu-suat") {
      setActiveNavlink(0);
    } else if (
      location.pathname ===
      "/thi-truong/hieu-suat-va-dinh-gia/suc-khoe-tai-chinh"
    ) {
      setActiveNavlink(1);
    } else if (
      location.pathname === "/thi-truong/hieu-suat-va-dinh-gia/ky-thuat"
    ) {
      setActiveNavlink(2);
    }
  }, [location.pathname]);

  useEffect(() => {
    const activedNav = navRef.current[activeNavlink];
    const movingBackground = document.querySelector(".moving-background");
    if (activedNav && movingBackground) {
      movingBackground.style.left = `${activedNav.offsetLeft}px`;
      movingBackground.style.width = `${activedNav.offsetWidth}px`;
    }
  }, [activeNavlink]);

  return (
    <>
      <div className="container mx-auto">
        <div className="relative flex justify-around mt-5 bg-[#195070] h-auto items-center rounded-full">
          <div className="moving-background absolute h-full top-0 bg-[#35adf2] transition-all duration-500 rounded-full "></div>
          {Object.entries(hashTbTechAndValuation).map(
            ([label, value], index) => (
              <NavLink
                ref={(el) => (navRef.current[index] = el)}
                to={value}
                key={index}
                onClick={() => handleActiveNav(index)}
                className={`${
                  activeNavlink === index ? "active" : ""
                } z-10 w-2/6 bg-transparent text-white rounded-full no-underline text-center leading-8 md:text-lg sm:text-[17px] xs:text-[15px] xxs:text-[13px]`}
              >
                {label}
              </NavLink>
            ),
          )}
        </div>
        <div className="h-auto text-white">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default TechAndValuation;
