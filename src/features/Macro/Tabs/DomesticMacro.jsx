import React, { useState, useRef, useEffect } from 'react';
import { hashTb } from '../utils/antComponentChild';

function DomesticMacro() {
    const [activeTab, setActiveTab] = useState(0);
    const tabsRef = useRef([]);

    const handleTabClick = (index) => {
        setActiveTab(index);
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
            <div className='flex flex-col justify-center items-center'>
                <div className="tab-container w-auto flex justify-evenly bg-[#195070] px-5 py-2 rounded-3xl z-0 relative">
                    <div className="moving-background absolute h-full top-0 bg-[#35adf2] transition-all duration-500 rounded-[25px] z-0"></div>
                    {tabLabels.map((label, index) => (
                        <button
                            key={index}
                            className={`relative z-10 ${activeTab === index ? 'active ' : ''} mr-3 px-6 py-2 w-auto h-[35px] border-0 rounded-[25px] text-white font-bold bg-transparent`}
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
