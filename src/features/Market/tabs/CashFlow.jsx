import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const CashFlow = () => {
  return (
    <div className='container mx-auto'>
    <div className=' flex justify-around mt-3 '>
      <NavLink className='text-white no-underline w-[50%] text-center' to='dong-tien-dinh-danh'>Dòng tiền định danh</NavLink>
      <NavLink className='text-white no-underline w-[50%] text-center' to='dong-tien-phi-dinh-danh'>Dòng tiền phi định danh</NavLink>
    </div>
    <div className='h-auto text-white'>
      <Outlet />
    </div>
    </div>
  )
}

export default CashFlow