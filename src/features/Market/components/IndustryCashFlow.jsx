import React, { useState } from 'react'

const IndustryCashFlow = () => {
    const [activeButton, setActiveButton] = useState('all');

    const handleClick = (button) => {
        setActiveButton(button);
    }

    return (
        <>
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='text-white'>Dòng tiền theo ngành</span>
                <select className={`bg-[#1B496D] p-1 text-[1rem] text-white border-0`}
                    onChange={(event) => {
                    }}>
                    <option value='0'>Phiên gần nhất</option>
                    <option value='1'>...</option>
                    <option value='2'>...</option>
                    <option value='3'>...</option>
                </select>
            </div>
            <div className="pt-3 mb-3 text-white">
                <span>
                    <button
                        onClick={() => {
                            handleClick('all')
                        }}
                        className={activeButton === 'all'
                            ? 'border-none bg-transparent relative text-white md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent text-white md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>Toàn thị trường
                    </button>
                </span>
                <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10">
                    <button
                        onClick={() => {
                            handleClick('HSX')
                        }}
                        className={activeButton === 'HSX'
                            ? 'border-none bg-transparent relative text-white md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent text-white md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>HSX
                    </button>
                </span>
                <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10">
                    <button
                        onClick={() => {
                            handleClick('HNX')
                        }}
                        className={activeButton === 'HNX'
                            ? 'border-none bg-transparent relative text-white md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent text-white md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>HNX
                    </button>
                </span>
                <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10">
                    <button
                        onClick={() => {
                            handleClick('UPCOM')
                        }}
                        className={activeButton === 'UPCOM'
                            ? 'border-none bg-transparent relative text-white md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent text-white md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>UPCOM
                    </button>
                </span>
            </div>
        </>
    )
}

export default IndustryCashFlow