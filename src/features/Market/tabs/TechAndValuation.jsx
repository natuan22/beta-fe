import clsx from 'clsx';
import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const TechAndValuation = () => {
  return (
    <>
      <div className='container mx-auto'>
        <div className="flex justify-around mt-5 bg-[#195070] h-auto items-center rounded-full">
          <NavLink
            to="hieu-suat"
            className={(params) => {
              const classes =
                " w-2/6 text-white rounded-full no-underline text-center leading-8 text-lg";
              if (params.isActive) {
                return clsx("bg-[#35ADF2]", classes);
              }
              return clsx("bg-transparent", classes);
            }}
          >
            Hiệu suất
          </NavLink>
          <NavLink
            to="suc-khoe-tai-chinh"
            className={(params) => {
              const classes =
                " w-2/6 text-white rounded-full no-underline text-center leading-8 xxs:text-[11px] xs:text-[14px] sm:text-[15px] md:text-lg";
              if (params.isActive) {
                return clsx("bg-[#35ADF2]", classes);
              }
              return clsx("bg-transparent", classes);
            }}
          >
            Sức khoẻ tài chính
          </NavLink>
          <NavLink
            to="ky-thuat"
            className={(params) => {
              const classes =
                " w-2/6 text-white rounded-full no-underline text-center leading-8 text-lg";
              if (params.isActive) {
                return clsx("bg-[#35ADF2]", classes);
              }
              return clsx("bg-transparent", classes);
            }}
          >
            Kỹ thuật
          </NavLink>
        </div>
        <div className='h-auto text-white'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default TechAndValuation