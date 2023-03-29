import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const TechAndValuation = () => {
  return (
    <div className='text-white text-xl'>
      <NavLink to='hieu-suat'>Hiệu suất</NavLink>
      <NavLink to='dinh-gia'>Định giá</NavLink>
      <NavLink to='ky-thuat'>Kỹ thuật</NavLink>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default TechAndValuation