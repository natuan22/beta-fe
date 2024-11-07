import React, { useEffect, useRef, useState } from "react";
import { hashTbAnalyzeReport } from "../utils/componentChild";

function AnalyzeReport() {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("userAnalyzeReportTabCurrent"),
  );
  const tabsRef = useRef([]);

  const handleTabClick = (index) => {
    setActiveTab(index);
    localStorage.setItem("userAnalyzeReportTabCurrent", index);
  };

  useEffect(() => {
    const activeButton = tabsRef.current[activeTab];
    const movingBackground = document.querySelector(".moving-background");
    if (activeButton && movingBackground) {
      movingBackground.style.left = `${activeButton.offsetLeft}px`;
      movingBackground.style.width = `${activeButton.offsetWidth}px`;
    }
  }, [activeTab]);

  const tabLabels = Object.keys(hashTbAnalyzeReport);
  const TabContent = Object.values(hashTbAnalyzeReport)[activeTab];

  return (
    <div className="tab">
      <div className="flex flex-col justify-center mt-4">
        <div className="tab-container w-auto flex justify-evenly bg-[#195070] py-1 rounded-3xl z-0 relative mt-1.5">
          <div className="moving-background absolute h-full top-0 bg-[#35adf2] transition-all duration-500 rounded-full z-0"></div>
          {tabLabels.map((label, index) => (
            <button
              key={index}
              className={`relative z-10 ${
                activeTab === index ? "active " : ""
              } w-[50%] cursor-pointer py-1 text-[14px] border-0 rounded-full font-bold text-white bg-transparent`}
              onClick={() => handleTabClick(index)}
              ref={(el) => (tabsRef.current[index] = el)}
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

export default AnalyzeReport;
