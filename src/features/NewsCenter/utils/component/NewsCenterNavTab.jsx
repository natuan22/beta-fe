import React from 'react'
import { NavLink } from 'react-router-dom';

const NewsCenterNavTab = () => {
    return (
        <div className="flex justify-around mb-3">
            <NavLink
                className={(params) => {
                    if (params.isActive) {
                        return "no-underline dark:text-white text-black xs:text-[0.9rem] md:text-[1rem] lg:text-[1rem] xl:text-[1.2rem] 2xl:text-[1.2rem] font-bold w-[25%] text-center tabUnderline relative";
                    } else {
                        return "no-underline dark:text-white text-black xs:text-[0.9rem] md:text-[1rem] lg:text-[1rem] xl:text-[1.2rem] 2xl:text-[1.2rem] font-bold w-[25%] text-center";
                    }
                }}
                to="/trung-tam-tin-tuc/bao-cao-phan-tich" >
                Báo cáo phân tích
            </NavLink>
            <NavLink
                className={(params) => {
                    if (params.isActive) {
                        return "no-underline dark:text-white text-black xs:text-[0.9rem] md:text-[1rem] lg:text-[1rem] xl:text-[1.2rem] 2xl:text-[1.2rem] font-bold w-[25%] text-center tabUnderline relative";
                    } else {
                        return "no-underline dark:text-white text-black xs:text-[0.9rem] md:text-[1rem] lg:text-[1rem] xl:text-[1.2rem] 2xl:text-[1.2rem] font-bold w-[25%] text-center";
                    }
                }}
                to="/trung-tam-tin-tuc/bo-loc-tin-tuc">
                Bộ lọc tin tức
            </NavLink>
            <NavLink
                className={(params) => {
                    if (params.isActive) {
                        return "no-underline dark:text-white text-black xs:text-[0.9rem] md:text-[1rem] lg:text-[1rem] xl:text-[1.2rem] 2xl:text-[1.2rem] font-bold w-[25%] text-center tabUnderline relative";
                    } else {
                        return "no-underline dark:text-white text-black xs:text-[0.9rem] md:text-[1rem] lg:text-[1rem] xl:text-[1.2rem] 2xl:text-[1.2rem] font-bold w-[25%] text-center";
                    }
                }}
                to="/trung-tam-tin-tuc/tin-doanh-nghiep">
                Tin doanh nghiệp
            </NavLink>
            <NavLink
                className={(params) => {
                    if (params.isActive) {
                        return "no-underline dark:text-white text-black xs:text-[0.9rem] md:text-[1rem] lg:text-[1rem] xl:text-[1.2rem] 2xl:text-[1.2rem] font-bold w-[25%] text-center tabUnderline relative";
                    } else {
                        return "no-underline dark:text-white text-black xs:text-[0.9rem] md:text-[1rem] lg:text-[1rem] xl:text-[1.2rem] 2xl:text-[1.2rem] font-bold w-[25%] text-center";
                    }
                }}
                to="/trung-tam-tin-tuc/tin-tuc-vi-mo">
                Tin tức vĩ mô
            </NavLink>
        </div>
    )
}


export default NewsCenterNavTab