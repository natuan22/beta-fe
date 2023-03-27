import React from 'react'
import { NavLink } from 'react-router-dom'

const TechAndValuation = () => {
  return (
    <div className='text-white text-xl'>
      <NavLink to='/thi-truong/ky-thuat-va-dinh-gia/hieu-suat'>Hiệu suất</NavLink>
      <NavLink to='/thi-truong/ky-thuat-va-dinh-gia/dinh-gia'>Định giá</NavLink>
      <NavLink to='/thi-truong/ky-thuat-va-dinh-gia/ky-thuat'>Kỹ thuật</NavLink>
    </div>
  )
}

export default TechAndValuation