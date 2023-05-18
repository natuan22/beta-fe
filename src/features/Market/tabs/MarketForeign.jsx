import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import clsx from 'clsx';

const MarketForeign = () => {
  return (
    <>
      <div className='container mx-auto'>
        <div className="flex justify-around mt-5 bg-[#195070] h-auto items-center rounded-full">
          <NavLink
            to="chi-so-the-gioi"
            className={(params) => {
              const classes =
                " w-2/6 text-white rounded-full no-underline text-center leading-8 md:text-lg sm:text-[15px] xs:text-[13px] xxs:text-xs";
              if (params.isActive) {
                return clsx("bg-[#35ADF2]", classes);
              }
              return clsx("bg-transparent", classes);
            }}
          >
            Chỉ số thế giới
          </NavLink>
          <NavLink
            to="thi-truong-hang-hoa"
            className={(params) => {
              const classes =
                " w-2/6 text-white rounded-full no-underline text-center leading-8 md:text-lg sm:text-[15px] xs:text-[13px] xxs:text-[11px]";
              if (params.isActive) {
                return clsx("bg-[#35ADF2]", classes);
              }
              return clsx("bg-transparent", classes);
            }}
          >
            Thị trường hàng hóa
          </NavLink>
          <NavLink
            to="thi-truong-tien-so"
            className={(params) => {
              const classes =
                " w-2/6 text-white rounded-full no-underline text-center leading-8 md:text-lg sm:text-[15px] xs:text-[13px] xxs:text-xs";
              if (params.isActive) {
                return clsx("bg-[#35ADF2]", classes);
              }
              return clsx("bg-transparent", classes);
            }}
          >
            Thị trường tiền số
          </NavLink>
        </div>
        <div className='h-auto text-white'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default MarketForeign