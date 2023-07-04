import React from "react";
import { NavLink } from "react-router-dom";
import "./tabStyle.css";
const MarketTab = () => {
  return (
    <div className="flex justify-around mb-3">
      <NavLink
        className={(params) => {
          if (params.isActive) {
            return "no-underline button dark:text-white text-black xs:text-[0.9rem] md:text-[1rem] lg:text-[1rem] xl:text-[1.2rem] 2xl:text-[1.2rem] font-bold w-[25%] text-center  relative";
          } else {
            return "no-underline button dark:text-white text-black xs:text-[0.9rem] md:text-[1rem] lg:text-[1rem] xl:text-[1.2rem] 2xl:text-[1.2rem] font-bold w-[25%] text-center opacity-70 ";
          }
        }}
        to="/thi-truong/chi-so-thi-truong"
      >
        Chỉ số thị trường
      </NavLink>
      <NavLink
        className={(params) => {
          if (params.isActive) {
            return "no-underline button dark:text-white text-black xs:text-[0.9rem] md:text-[1rem] lg:text-[1rem] xl:text-[1.2rem] 2xl:text-[1.2rem] font-bold w-[25%] text-center  relative";
          } else {
            return "no-underline button dark:text-white text-black xs:text-[0.9rem] md:text-[1rem] lg:text-[1rem] xl:text-[1.2rem] 2xl:text-[1.2rem] font-bold w-[25%] text-center opacity-70 ";
          }
        }}
        to="/thi-truong/dong-tien-thi-truong"
      >
        Dòng tiền thị trường
      </NavLink>
      <NavLink
        className={(params) => {
          if (params.isActive) {
            return "no-underline button dark:text-white text-black xs:text-[0.9rem] md:text-[1rem] lg:text-[1rem] xl:text-[1.2rem] 2xl:text-[1.2rem] font-bold w-[25%] text-center  relative";
          } else {
            return "no-underline button dark:text-white text-black xs:text-[0.9rem] md:text-[1rem] lg:text-[1rem] xl:text-[1.2rem] 2xl:text-[1.2rem] font-bold w-[25%] text-center opacity-70 ";
          }
        }}
        to="/thi-truong/hieu-suat-va-dinh-gia"
      >
        Hiệu suất & định giá
      </NavLink>
      <NavLink
        className={(params) => {
          if (params.isActive) {
            return "no-underline button dark:text-white text-black xs:text-[0.9rem] md:text-[1rem] lg:text-[1rem] xl:text-[1.2rem] 2xl:text-[1.2rem] font-bold w-[25%] text-center  relative";
          } else {
            return "no-underline button dark:text-white text-black xs:text-[0.9rem] md:text-[1rem] lg:text-[1rem] xl:text-[1.2rem] 2xl:text-[1.2rem] font-bold w-[25%] text-center opacity-70 ";
          }
        }}
        to="/thi-truong/thi-truong-quoc-te"
      >
        Thị trường quốc tế
      </NavLink>
    </div>
  );
};

export default MarketTab;
