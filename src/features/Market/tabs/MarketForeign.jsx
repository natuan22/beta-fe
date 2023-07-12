import React, { useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
const hashTbMarketForeign = {
  "Chỉ số thế giới": "chi-so-the-gioi",
  "Thị trường hàng hóa": "thi-truong-hang-hoa",
  "Thị trường tiền số": "thi-truong-tien-so"
}

const MarketForeign = () => {
  const [activeNavlink, setActiveNavlink] = useState()
  const location = useLocation()
  const navRef = useRef([])
  const handleActiveNav = (index) => {
    setActiveNavlink(index);
  };

  useEffect(() => {
    if (location.pathname === '/thi-truong/thi-truong-quoc-te/chi-so-the-gioi') {
      setActiveNavlink(0)
    } else if (location.pathname === '/thi-truong/thi-truong-quoc-te/thi-truong-hang-hoa') {
      setActiveNavlink(1)
    } else if (location.pathname === '/thi-truong/thi-truong-quoc-te/thi-truong-tien-so') {
      setActiveNavlink(2)
    }
  }, [location.pathname])

  useEffect(() => {
    const activedNav = navRef.current[activeNavlink]
    const movingBackground = document.querySelector('.moving-background')
    if (activedNav && movingBackground) {
      movingBackground.style.left = `${activedNav.offsetLeft}px`;
      movingBackground.style.width = `${activedNav.offsetWidth}px`;
    }
  }, [activeNavlink])
  return (
    <>
      <div className='container mx-auto'>
        <div className="relative flex justify-around mt-5 bg-[#195070] h-auto items-center rounded-full">
          <div className="moving-background absolute h-full top-0 bg-[#35adf2] transition-all duration-500 rounded-full "></div>
          {Object.entries(hashTbMarketForeign).map(([label, value], index) => (
            <NavLink
              ref={el => navRef.current[index] = el}
              to={value}
              key={index}
              onClick={() => handleActiveNav(index)}
              className={`${activeNavlink === index ? 'active' : ''} z-10 w-2/6 bg-transparent text-white rounded-full no-underline text-center leading-8 md:text-lg sm:text-[15px] xs:text-[13px] xxs:text-[11px]`}
            >
              {label}
            </NavLink>
          ))}
        </div>
        <div className='h-auto text-white'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default MarketForeign