import React, { useState, useRef, useEffect } from 'react';
import { hashTb } from '../utils/antComponentChild';

function DomesticMacro() {
    const [activeTab, setActiveTab] = useState(localStorage.getItem('userTabCurrent'));
    const tabsRef = useRef([]);

    const handleTabClick = (index) => {
        setActiveTab(index);
        localStorage.setItem('userTabCurrent', index)

    };

    useEffect(() => {
        const activeButton = tabsRef.current[activeTab];
        const movingBackground = document.querySelector('.moving-background');
        if (activeButton && movingBackground) {
            movingBackground.style.left = `${activeButton.offsetLeft}px`;
            movingBackground.style.width = `${activeButton.offsetWidth}px`;
        }
    }, [activeTab]);

    const tabLabels = Object.keys(hashTb);
    const TabContent = Object.values(hashTb)[activeTab];

    return (
        <div className='tab'>
            <div className='flex flex-col justify-center items-center mt-4'>
                <div className="tab-container w-auto flex justify-evenly bg-[#195070] px-5 py-1 rounded-3xl z-0 relative mt-1.5">
                    <div className="moving-background absolute h-full top-0 bg-[#35adf2] transition-all duration-500 rounded-full z-0"></div>
                    {tabLabels.map((label, index) => (
                        <button
                            key={index}
                            className={`relative z-10 ${activeTab === index ? 'active ' : ''} cursor-pointer mr-3 xl:px-7 lg:px-4 md:px-2 sm:px-1 xs:px-1 xxs:px-1 xl:text-[14px] lg:text-[11px] md:text-[11px] sm:text-[7px] xs:text-[5px] xxs:text-[4px] py-2 w-auto h-[33px] border-0 rounded-full font-bold text-white bg-transparent`}
                            onClick={() => handleTabClick(index)}
                            ref={el => tabsRef.current[index] = el}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="tab-content">
                <TabContent />
            </div>
        </div>
    );
}

export default DomesticMacro;
