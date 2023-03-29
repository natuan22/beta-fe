import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const MarketForeign = () => {
  return (
    <div className='text-white text-xl'>
      <NavLink to='chi-so-the-gioi'>Chỉ số thế giới</NavLink>
      <NavLink to='thi-truong-hang-hoa'>Thị trường hàng hóa</NavLink>
      <NavLink to='thi-truong-tien-so'>Thị trường tiền số</NavLink>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default MarketForeign