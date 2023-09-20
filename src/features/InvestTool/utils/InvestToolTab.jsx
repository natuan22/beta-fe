import React from "react";
import { NavLink } from "react-router-dom";
import "./styles/btnTabStyle.css"

const InvestToolTab = () => {
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
                        to="/cong-cu-dau-tu/bo-loc-co-phieu"
                    >
                        Bộ lọc cổ phiếu
                    </NavLink>
                    <NavLink
                        className={(params) => {
                            if (params.isActive) {
                                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center  relative";
                            } else {
                                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center opacity-70 ";
                            }
                        }}
                        to="/cong-cu-dau-tu/gia-lap-dau-tu"
                    >
                        Giả lập đầu tư
                    </NavLink>
                    <NavLink
                        className={(params) => {
                            if (params.isActive) {
                                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center  relative";
                            } else {
                                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center opacity-70 ";
                            }
                        }}
                        to="/cong-cu-dau-tu/khuyen-nghi-dau-tu"
                    >
                        Theo dõi danh mục
                    </NavLink>
                    <NavLink
                        className={(params) => {
                            if (params.isActive) {
                                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center  relative";
                            } else {
                                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center opacity-70 ";
                            }
                        }}
                        to="/cong-cu-dau-tu/kien-thuc-dau-tu"
                    >
                        Kiến thức đầu tư
                    </NavLink>
                    <NavLink
                        className={(params) => {
                            if (params.isActive) {
                                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center  relative";
                            } else {
                                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center opacity-70 ";
                            }
                        }}
                        to="/cong-cu-dau-tu/thuat-toan-giao-dich"
                    >
                        Thuật toán giao dịch
                    </NavLink>
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
                        to="/cong-cu-dau-tu/bo-loc-co-phieu"
                    >
                        Bộ lọc cổ phiếu
                    </NavLink>
                    <NavLink
                        className={(params) => {
                            if (params.isActive) {
                                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center  relative";
                            } else {
                                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center opacity-70 ";
                            }
                        }}
                        to="/cong-cu-dau-tu/gia-lap-dau-tu"
                    >
                        Giả lập đầu tư
                    </NavLink>
                </div>
                <div className="flex justify-around mb-2">
                    <NavLink
                        className={(params) => {
                            if (params.isActive) {
                                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center  relative";
                            } else {
                                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center opacity-70 ";
                            }
                        }}
                        to="/cong-cu-dau-tu/khuyen-nghi-dau-tu"
                    >
                        Theo dõi danh mục
                    </NavLink>
                    <NavLink
                        className={(params) => {
                            if (params.isActive) {
                                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center  relative";
                            } else {
                                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center opacity-70 ";
                            }
                        }}
                        to="/cong-cu-dau-tu/kien-thuc-dau-tu"
                    >
                        Kiến thức đầu tư
                    </NavLink>
                    <NavLink
                        className={(params) => {
                            if (params.isActive) {
                                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center  relative";
                            } else {
                                return "no-underline buttonStyle text-white mx-1 font-bold w-[30%] text-center opacity-70 ";
                            }
                        }}
                        to="/cong-cu-dau-tu/thuat-toan-giao-dich"
                    >
                        Thuật toán giao dịch
                    </NavLink>
                </div>
            </div>
        </>
    );
};

export default InvestToolTab;
