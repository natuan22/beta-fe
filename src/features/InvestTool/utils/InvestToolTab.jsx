import React from "react";
import { NavLink } from "react-router-dom";
import "../../../utils/style/buttonStyle.css";

const InvestToolTab = () => {
  return (
    <>
      <div className="sm:block xs:hidden xxs:hidden">
        <div className="flex justify-around mb-3">
          <NavLink
            className={(params) => {
              if (params.isActive) {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center";
              } else {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center opacity-60 hover:opacity-100";
              }
            }}
            to="/cong-cu-dau-tu/danh-muc-theo-doi"
          >
            Danh mục theo dõi
          </NavLink>
          <NavLink
            className={(params) => {
              if (params.isActive) {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center";
              } else {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center opacity-60 hover:opacity-100";
              }
            }}
            to="/cong-cu-dau-tu/bo-loc"
          >
            Bộ lọc
          </NavLink>
          <NavLink
            className={(params) => {
              if (params.isActive) {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center";
              } else {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center opacity-60 hover:opacity-100";
              }
            }}
            to="/cong-cu-dau-tu/canh-bao-tin-hieu"
          >
            Cảnh báo tín hiệu
          </NavLink>
          <NavLink
            className={(params) => {
              if (params.isActive) {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center";
              } else {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center opacity-60 hover:opacity-100";
              }
            }}
            to="/cong-cu-dau-tu/chien-luoc-giao-dich"
          >
            Chiến lược giao dịch
          </NavLink>
          {/* <NavLink
            className={(params) => {
              if (params.isActive) {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center";
              } else {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center opacity-60 hover:opacity-100";
              }
            }}
            to="/cong-cu-dau-tu/beta-smart"
          >
            BETA SMART
          </NavLink> */}
          <NavLink
            className={(params) => {
              if (params.isActive) {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center";
              } else {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center opacity-60 hover:opacity-100";
              }
            }}
            to="/cong-cu-dau-tu/kien-thuc-dau-tu"
          >
            Kiến thức đầu tư
          </NavLink>
        </div>
      </div>

      <div className="sm:hidden xs:block">
        <div className="flex justify-around mb-3">
          <NavLink
            className={(params) => {
              if (params.isActive) {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center";
              } else {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center opacity-60 hover:opacity-100";
              }
            }}
            to="/cong-cu-dau-tu/danh-muc-theo-doi"
          >
            Danh mục theo dõi
          </NavLink>
          <NavLink
            className={(params) => {
              if (params.isActive) {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center";
              } else {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center opacity-60 hover:opacity-100";
              }
            }}
            to="/cong-cu-dau-tu/bo-loc"
          >
            Bộ lọc
          </NavLink>
          <NavLink
            className={(params) => {
              if (params.isActive) {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center";
              } else {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center opacity-60 hover:opacity-100";
              }
            }}
            to="/cong-cu-dau-tu/canh-bao-tin-hieu"
          >
            Cảnh báo tín hiệu
          </NavLink>
        </div>
        <div className="flex justify-around mb-2">
          <NavLink
            className={(params) => {
              if (params.isActive) {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center";
              } else {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center opacity-60 hover:opacity-100";
              }
            }}
            to="/cong-cu-dau-tu/chien-luoc-giao-dich"
          >
            Chiến lược giao dịch
          </NavLink>
          {/* <NavLink
            className={(params) => {
              if (params.isActive) {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center";
              } else {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center opacity-60 hover:opacity-100";
              }
            }}
            to="/cong-cu-dau-tu/beta-smart"
          >
            BETA SMART
          </NavLink> */}
          <NavLink
            className={(params) => {
              if (params.isActive) {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center";
              } else {
                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center opacity-60 hover:opacity-100";
              }
            }}
            to="/cong-cu-dau-tu/kien-thuc-dau-tu"
          >
            Kiến thức đầu tư
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default InvestToolTab;
