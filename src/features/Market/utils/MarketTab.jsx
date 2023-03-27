import React from "react";
import { NavLink } from "react-router-dom";
import "./tabStyle.css";
const MarketTab = () => {
  return (
    <div className="flex justify-around ">
      <NavLink
        className={(params) => {
          if (params.isActive) {
            return "no-underline text-white font-bold w-[25%] text-center tabUnderline relative";
          } else {
            return "no-underline text-white font-bold w-[25%] text-center";
          }
        }}
        to="/thi-truong/chi-so-thi-truong"
      >
        Chỉ số thị trường
      </NavLink>
      <NavLink
        className={(params) => {
          if (params.isActive) {
            return "no-underline text-white font-bold w-[25%] text-center tabUnderline relative";
          } else {
            return "no-underline text-white font-bold w-[25%] text-center";
          }
        }}
        to="/thi-truong/dong-tien-thi-truong"
      >
        Dòng tiền thị trường
      </NavLink>
      <NavLink
        className={(params) => {
          if (params.isActive) {
            return "no-underline text-white font-bold w-[25%] text-center tabUnderline relative";
          } else {
            return "no-underline text-white font-bold w-[25%] text-center";
          }
        }}
        to="/thi-truong/ky-thuat-va-dinh-gia"
      >
        Kỹ thuật & đinh giá
      </NavLink>
      <NavLink
        className={(params) => {
          if (params.isActive) {
            return "no-underline text-white font-bold w-[25%] text-center tabUnderline relative";
          } else {
            return "no-underline text-white font-bold w-[25%] text-center";
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
