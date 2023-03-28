import React from 'react'
import { NavLink } from 'react-router-dom'

const MarketForeign = () => {
  return (
    <div className='text-white text-xl'>
      <NavLink to='/thi-truong/thi-truong-quoc-te/chi-so-the-gioi'>Chỉ số thế giới</NavLink>
      <NavLink to='/thi-truong/thi-truong-quoc-te/thi-truong-hang-hoa'>Thị trường hàng hóa</NavLink>
      <NavLink to='/thi-truong/thi-truong-quoc-te/thi-truong-tien-so'>Thị trường tiền số</NavLink>
    </div>
  )
}

export default MarketForeign