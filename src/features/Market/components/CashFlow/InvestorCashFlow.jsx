import React, { useState } from 'react'

const InvestorCashFlow = () => {
    const [activeButton, setActiveButton] = useState('all');
    const [activeButton2, setActiveButton2] = useState(1)
    const [activeButton3, setActiveButton3] = useState(5)
    const handleClick = (button) => { setActiveButton(button) }
    const handleClick2 = (button) => { setActiveButton2(button) }
    const handleClick3 = (button) => { setActiveButton3(button) }

    const buttonStyle = {
        backgroundColor: 'transparent',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        padding: '0.375rem 0.5rem'
    }

    const activeButtonStyle = {
        backgroundColor: '#275F88',
        color: '#fff',
    }

    return (
        <>
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black sm:text-base xs:text-[14px] xxs:text-[11px] font-semibold'>Dòng tiền nhà đầu tư theo các nhóm ngành</span>
                <select className={`bg-[#1B496D] p-1 text-[1rem] text-white border-0 xl:ml-[1029px] lg:ml-[613px] md:ml-[357px] sm:ml-[14px] xs:ml-[3px] xxs:ml-[5px]`}
                    onChange={(event) => {
                    }}>
                    <option value='0'>1 tháng</option>
                    <option value='1'>3 tháng</option>
                    <option value='2'>1 năm</option>
                </select>
            </div>
            <div className="pt-3 mb-3 dark:text-white text-black">
                <span>
                    <button
                        onClick={() => {
                            handleClick('all')
                        }}
                        className={activeButton === 'all'
                            ? 'border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>Toàn thị trường
                    </button>
                </span>
                <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10 xxs:pl-5">
                    <button
                        onClick={() => {
                            handleClick('HSX')
                        }}
                        className={activeButton === 'HSX'
                            ? 'border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>HSX
                    </button>
                </span>
                <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10 xxs:pl-5">
                    <button
                        onClick={() => {
                            handleClick('HNX')
                        }}
                        className={activeButton === 'HNX'
                            ? 'border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>HNX
                    </button>
                </span>
                <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10 xxs:pl-5">
                    <button
                        onClick={() => {
                            handleClick('UPCOM')
                        }}
                        className={activeButton === 'UPCOM'
                            ? 'border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>UPCOM
                    </button>
                </span>
            </div>
            <div className='md:flex xxs:block'>
                <div>
                    <div className="dark:bg-[#2D303A] bg-gray-400 flex justify-around items-center rounded-full mb-2 mr-4">
                        <button
                            style={activeButton2 === 1 ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                            onClick={() => {
                                handleClick2(1)
                            }}
                            className='rounded-tl-xl rounded-bl-xl lg:text-[16px] md:text-[13px] sm:text-sm xs:text-[12px] xxs:text-[10px]'>Giá trị mua</button>
                        <button
                            style={activeButton2 === 2 ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                            onClick={() => {
                                handleClick2(2)
                            }}
                            className='lg:text-[16px] md:text-[13px] sm:text-sm xs:text-[12px] xxs:text-[10px]'>Giá trị bán</button>
                        <button
                            style={activeButton2 === 3 ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                            onClick={() => {
                                handleClick2(3)
                            }}
                            className='lg:text-[16px] md:text-[13px] sm:text-sm xs:text-[12px] xxs:text-[10px]'>Giá trị ròng</button>
                        <button
                            style={activeButton2 === 4 ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                            onClick={() => {
                                handleClick2(4)
                            }}
                            className='rounded-tr-xl rounded-br-xl lg:text-[16px] md:text-[13px] sm:text-sm xs:text-[12px] xxs:text-[10px]'>Tổng giá trị GD</button>
                    </div>
                </div>
                <div>
                    <div className="dark:bg-[#2D303A] bg-gray-400 flex justify-around items-center rounded-full mb-2">
                        <button
                            style={activeButton3 === 5 ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                            onClick={() => {
                                handleClick3(5)
                            }}
                            className='rounded-tl-xl rounded-bl-xl lg:text-[16px] md:text-[13px] sm:text-sm xs:text-[12px] xxs:text-[10px]'>Tự doanh</button>
                        <button
                            style={activeButton3 === 6 ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                            onClick={() => {
                                handleClick3(6)
                            }}
                            className='lg:text-[16px] md:text-[13px] sm:text-sm xs:text-[12px] xxs:text-[10px]'>Khối ngoại</button>
                        <button
                            style={activeButton3 === 7 ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                            onClick={() => {
                                handleClick3(7)
                            }}
                            className='lg:text-[16px] md:text-[13px] sm:text-sm xs:text-[12px] xxs:text-[10px]'>Cá nhân & TC</button>
                        <button
                            style={activeButton3 === 8 ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                            onClick={() => {
                                handleClick3(8)
                            }}
                            className='rounded-tr-xl rounded-br-xl lg:text-[16px] md:text-[13px] sm:text-sm xs:text-[12px] xxs:text-[10px]'>Toàn thị trường</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InvestorCashFlow