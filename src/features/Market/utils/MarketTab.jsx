import React from "react";
import { NavLink } from "react-router-dom";
import "../../../utils/style/buttonStyle.css";

const MarketTab = () => {
  return (
    <>
      <div className="sm:block xs:hidden xxs:hidden">
        <div className="flex justify-around mb-3">
          <NavLink
            className={(params) => {
              if (params.isActive) {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center  relative";
              } else {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center opacity-70 ";
              }
            }}
            to="/thi-truong/chi-so-thi-truong"
          >
            Chỉ số thị trường
          </NavLink>
          <NavLink
            className={(params) => {
              if (params.isActive) {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center  relative";
              } else {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center opacity-70 ";
              }
            }}
            to="/thi-truong/dong-tien-thi-truong"
          >
            Dòng tiền thị trường
          </NavLink>
          {/* <NavLink
            className={(params) => {
              if (params.isActive) {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center  relative";
              } else {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center opacity-70 ";
              }
            }}
            to="/thi-truong/hieu-suat-va-dinh-gia"
          >
            Hiệu suất & định giá
          </NavLink>
          <NavLink
            className={(params) => {
              if (params.isActive) {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center  relative";
              } else {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center opacity-70 ";
              }
            }}
            to="/thi-truong/thi-truong-quoc-te"
          >
            Thị trường quốc tế
          </NavLink> */}
        </div>
      </div>

      <div className="sm:hidden xs:block">
        <div className="flex justify-around mb-3">
          <NavLink
            className={(params) => {
              if (params.isActive) {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center  relative";
              } else {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center opacity-70 ";
              }
            }}
            to="/thi-truong/chi-so-thi-truong"
          >
            Chỉ số thị trường
          </NavLink>
          <NavLink
            className={(params) => {
              if (params.isActive) {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center  relative";
              } else {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center opacity-70 ";
              }
            }}
            to="/thi-truong/dong-tien-thi-truong"
          >
            Dòng tiền thị trường
          </NavLink>
        </div>
        {/* <div className="flex justify-around mb-2">
          <NavLink
            className={(params) => {
              if (params.isActive) {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center  relative";
              } else {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center opacity-70 ";
              }
            }}
            to="/thi-truong/hieu-suat-va-dinh-gia"
          >
            Hiệu suất & định giá
          </NavLink>
          <NavLink
            className={(params) => {
              if (params.isActive) {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center  relative";
              } else {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center opacity-70 ";
              }
            }}
            to="/thi-truong/thi-truong-quoc-te"
          >
            Thị trường quốc tế
          </NavLink>
        </div> */}
      </div>
    </>
  );
};

export default MarketTab;
