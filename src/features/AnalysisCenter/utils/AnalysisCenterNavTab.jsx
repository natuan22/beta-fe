import React from "react";
import { NavLink } from "react-router-dom";
import "../../../utils/style/buttonStyle.css";

const AnalysisCenterNavTab = () => {
  return (
    <>
      <div className="sm:block xs:hidden xxs:hidden">
        <div className="flex justify-around mb-2">
          <NavLink
            className={(params) => {
              if (params.isActive) {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center relative";
              } else {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center opacity-60";
              }
            }}
            to="/trung-tam-phan-tich/nhan-dinh-thi-truong"
          >
            Nhận định thị trường
          </NavLink>
          <NavLink
            className={(params) => {
              if (params.isActive) {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center relative !text-[11px]";
              } else {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center opacity-60 !text-[11px]";
              }
            }}
            to="/trung-tam-phan-tich/phan-tich-doanh-nghiep"
          >
            Phân tích doanh nghiệp
          </NavLink>
          <NavLink
            className={(params) => {
              if (params.isActive) {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center relative";
              } else {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center opacity-60";
              }
            }}
            to="/trung-tam-phan-tich/bao-cao-nganh"
          >
            Báo cáo ngành
          </NavLink>
          <NavLink
            className={(params) => {
              if (params.isActive) {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center relative";
              } else {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center opacity-60";
              }
            }}
            to="/trung-tam-phan-tich/phan-tich-ky-thuat"
          >
            Phân tích kỹ thuật
          </NavLink>
          <NavLink
            className={(params) => {
              if (params.isActive) {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center relative";
              } else {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center opacity-60";
              }
            }}
            to="/trung-tam-phan-tich/bao-cao-vi-mo"
          >
            Báo cáo vĩ mô
          </NavLink>
          <NavLink
            className={(params) => {
              if (params.isActive) {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center relative";
              } else {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center opacity-60";
              }
            }}
            to="/trung-tam-phan-tich/bao-cao-chien-luoc"
          >
            Báo cáo chiến lược
          </NavLink>
        </div>
      </div>

      <div className="sm:hidden xs:block">
        <div className="flex justify-around mb-3">
          <NavLink
            className={(params) => {
              if (params.isActive) {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center relative";
              } else {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center opacity-60";
              }
            }}
            to="/trung-tam-phan-tich/nhan-dinh-thi-truong"
          >
            Nhận định thị trường
          </NavLink>
          <NavLink
            className={(params) => {
              if (params.isActive) {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center relative !text-[11px]";
              } else {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center opacity-60 !text-[11px]";
              }
            }}
            to="/trung-tam-phan-tich/phan-tich-doanh-nghiep"
          >
            Phân tích doanh nghiệp
          </NavLink>
          <NavLink
            className={(params) => {
              if (params.isActive) {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center relative";
              } else {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center opacity-60";
              }
            }}
            to="/trung-tam-phan-tich/bao-cao-nganh"
          >
            Báo cáo ngành
          </NavLink>
        </div>
        <div className="flex justify-around mb-2">
          <NavLink
            className={(params) => {
              if (params.isActive) {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center relative";
              } else {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center opacity-60";
              }
            }}
            to="/trung-tam-phan-tich/phan-tich-ky-thuat"
          >
            Phân tích kỹ thuật
          </NavLink>
          <NavLink
            className={(params) => {
              if (params.isActive) {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center relative";
              } else {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center opacity-60";
              }
            }}
            to="/trung-tam-phan-tich/bao-cao-vi-mo"
          >
            Báo cáo vĩ mô
          </NavLink>
          <NavLink
            className={(params) => {
              if (params.isActive) {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center relative";
              } else {
                return "buttonStyle no-underline text-white mx-1 font-bold w-[30%] text-center opacity-60";
              }
            }}
            to="/trung-tam-phan-tich/bao-cao-chien-luoc"
          >
            Báo cáo chiến lược
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AnalysisCenterNavTab;
