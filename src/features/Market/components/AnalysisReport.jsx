import React, { useState } from 'react'

function AnalysisReport() {
    const [activeButton, setActiveButton] = useState('coSo');

    const handleClick = (button) => {
        setActiveButton(button);
    }

    return (
        <>
            <div className="pt-3 mb-3 text-white">
                <span>
                    <button
                        onClick={() => {
                            handleClick('coSo')
                        }}
                        className={activeButton === 'coSo'
                            ? 'border-none bg-transparent relative text-white xs:text-[0.95rem] md:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent text-white xs:text-[0.95rem] md:text-[1.1rem] cursor-pointer'}>Thị trường cơ sở
                    </button>
                </span>
                <span className='pl-5'>
                    <button
                        onClick={() => {
                            handleClick('phaiSinh')
                        }}
                        className={activeButton === 'phaiSinh'
                            ? 'border-none bg-transparent relative text-white xs:text-[0.95rem] md:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent text-white xs:text-[0.95rem] md:text-[1.1rem] cursor-pointer'}>Thị trường phái sinh
                    </button>
                </span>
                <span className='pl-5'>
                    <button
                        onClick={() => {
                            handleClick('doanhNghiep')
                        }}
                        className={activeButton === 'doanhNghiep'
                            ? 'border-none bg-transparent relative text-white xs:text-[0.95rem] md:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent text-white xs:text-[0.95rem] md:text-[1.1rem] cursor-pointer'}>Doanh nghiệp
                    </button>
                </span>
            </div>
        </>
    )
}

export default AnalysisReport