import React, { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
const hashTbCashFlow = {
  "Dòng tiền định danh": "dong-tien-dinh-danh",
  "Dòng tiền phi định danh": "dong-tien-phi-dinh-danh",
};

const CashFlow = () => {
  const location = useLocation()
  const [activeNavlink, setActiveNavlink] = useState();
  const navRef = useRef([]);
  const handleActiveNav = (index) => {
    setActiveNavlink(index);
  };
  useEffect(() => {
    if (location.pathname === '/thi-truong/dong-tien-thi-truong/dong-tien-dinh-danh') {
      setActiveNavlink(0)
    } else if (location.pathname === '/thi-truong/dong-tien-thi-truong/dong-tien-phi-dinh-danh') {
      setActiveNavlink(1)
    }
  }, [location.pathname])
  useEffect(() => {
    const activeNav = navRef.current[activeNavlink]
    const movingBackground = document.querySelector('.moving-background')
    if (activeNav && movingBackground) {
      movingBackground.style.left = `${activeNav.offsetLeft}px`;
      movingBackground.style.width = `${activeNav.offsetWidth}px`;
    }
  }, [activeNavlink])
  return (
    <>
      <div className="container mx-auto">
        {/* <div className="flex justify-around mt-5 bg-[#195070] h-auto items-center rounded-full">
          <NavLink
            to="dong-tien-dinh-danh"
            className={(params) => {
              const classes =
                " w-[50%] text-white rounded-full no-underline text-center leading-8 md:text-lg sm:text-[15px] xs:text-[15px] xxs:text-xs";
              if (params.isActive) {
                return clsx("bg-[#35ADF2]", classes);
              }
              return clsx("bg-transparent", classes);
            }}
          >
            Dòng tiền định danh
          </NavLink>
          <NavLink
            to="dong-tien-phi-dinh-danh"
            className={(params) => {
              const classes =
                " w-[50%] text-white rounded-full no-underline text-center leading-8 md:text-lg sm:text-[15px] xs:text-[15px] xxs:text-xs";
              if (params.isActive) {
                return clsx("bg-[#35ADF2]", classes);
              }
              return clsx("bg-transparent", classes);
            }}
          >
            Dòng tiền phi định danh
          </NavLink>
        </div> */}
        <div className="relative  flex justify-around mt-5 bg-[#195070] h-auto items-center rounded-full">
          <div className="moving-background absolute h-full top-0 bg-[#35adf2] transition-all duration-500 rounded-full z-0"></div>
          {Object.entries(hashTbCashFlow).map(([label, value], index) => (
            <NavLink
              ref={el => navRef.current[index] = el}
              to={value}
              key={index}
              onClick={() => handleActiveNav(index)}
              className="w-[50%] z-10 text-white rounded-full no-underline text-center leading-8 md:text-lg sm:text-[15px] xs:text-[15px] xxs:text-xs"
            >
              {label}
            </NavLink>
          ))}
        </div>
        <div className="h-auto text-white">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default CashFlow;
