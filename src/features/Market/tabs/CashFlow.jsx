import clsx from 'clsx';
import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const CashFlow = () => {
  return (
    <>
      <div className='container mx-auto'>
        <div className="flex justify-around mt-4 bg-[#195070] h-auto items-center rounded-full">
          <NavLink
            to="dong-tien-dinh-danh"
            className={(params) => {
              const classes =
                " w-[50%] text-white rounded-full no-underline text-center leading-8";
              if (params.isActive) {
                return clsx("bg-[#35ADF2]", classes);
              }
              return clsx("bg-transparent", classes);
            }}
          >
            Dòng tiền định danh
          </NavLink>
          <NavLink
            to="dong-tien-phi-dinh-danh"
            className={(params) => {
              const classes =
                " w-[50%] text-white rounded-full no-underline text-center leading-8";
              if (params.isActive) {
                return clsx("bg-[#35ADF2]", classes);
              }
              return clsx("bg-transparent", classes);
            }}
          >
            Dòng tiền phi định danh
          </NavLink>
        </div>
        <div className='h-auto text-white'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default CashFlow