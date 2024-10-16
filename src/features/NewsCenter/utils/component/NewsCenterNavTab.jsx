import React from "react";
import { NavLink } from "react-router-dom";
import "../../../../utils/style/buttonStyle.css";

const NewsCenterNavTab = () => {
  return (
    <>
      <div className="sm:block xs:hidden xxs:hidden">
        <div className="flex justify-around mt-3 mb-2">
          {/* <NavLink
            className={(params) => {
              if (params.isActive) {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center relative";
              } else {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center opacity-60";
              }
            }}
            to="/trung-tam-tin-tuc/bao-cao-phan-tich"
          >
            Báo cáo phân tích
          </NavLink> */}
          <NavLink
            className={(params) => {
              if (params.isActive) {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center relative";
              } else {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center opacity-60";
              }
            }}
            to="/trung-tam-tin-tuc/bo-loc-tin-tuc"
          >
            Bộ lọc tin tức
          </NavLink>
          <NavLink
            className={(params) => {
              if (params.isActive) {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center relative";
              } else {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center opacity-60";
              }
            }}
            to="/trung-tam-tin-tuc/tin-doanh-nghiep"
          >
            Tin doanh nghiệp
          </NavLink>
          <NavLink
            className={(params) => {
              if (params.isActive) {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center relative";
              } else {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center opacity-60";
              }
            }}
            to="/trung-tam-tin-tuc/tin-tuc-vi-mo"
          >
            Tin tức vĩ mô
          </NavLink>
        </div>
      </div>

      <div className="sm:hidden xs:block">
        <div className="flex justify-around mt-3 mb-2">
          {/* <NavLink
            className={(params) => {
              if (params.isActive) {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center relative";
              } else {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center opacity-60";
              }
            }}
            to="/trung-tam-tin-tuc/bao-cao-phan-tich"
          >
            Báo cáo phân tích
          </NavLink> */}
          <NavLink
            className={(params) => {
              if (params.isActive) {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center relative";
              } else {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center opacity-60";
              }
            }}
            to="/trung-tam-tin-tuc/bo-loc-tin-tuc"
          >
            Bộ lọc tin tức
          </NavLink>
        </div>
        <div className="flex justify-around mt-3 mb-2">
          <NavLink
            className={(params) => {
              if (params.isActive) {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center relative";
              } else {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center opacity-60";
              }
            }}
            to="/trung-tam-tin-tuc/tin-doanh-nghiep"
          >
            Tin doanh nghiệp
          </NavLink>
          <NavLink
            className={(params) => {
              if (params.isActive) {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center relative";
              } else {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center opacity-60";
              }
            }}
            to="/trung-tam-tin-tuc/tin-tuc-vi-mo"
          >
            Tin tức vĩ mô
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default NewsCenterNavTab;
