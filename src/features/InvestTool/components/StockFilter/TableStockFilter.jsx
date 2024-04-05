import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import RenderTableStockFilter from "../../utils/RenderTableStockFilter";
const hashTb = {
  "Tiêu chí lọc": "Tiêu chí lọc",
  "Tổng quan": "Tổng quan",
  "Cơ bản": "Cơ bản",
  "Kỹ thuật": "Kỹ thuật",
  "Tùy chọn": "Tùy chọn",
};
const TableStockFilter = ({ arrSliderCheckbox }) => {
  const { dataStockFilter } = useSelector((state) => state.investTool);
  const { count, data } = dataStockFilter;
  const [activeButton, setActiveButton] = useState(0);
  const buttonRef = useRef([]);

  useEffect(() => {
    if (arrSliderCheckbox.length > 0) {
      const activeBtn = buttonRef.current[activeButton];
      const movingBackground = document.querySelector(".moving-background");
      if (activeBtn && movingBackground) {
        movingBackground.style.left = `${activeBtn.offsetLeft}px`;
        movingBackground.style.width = `${activeBtn.offsetWidth}px`;
      }
    }
  }, [activeButton, arrSliderCheckbox]);

  const handleActiveButton = (index) => {
    setActiveButton(index);
  };

  return (
    <div>
      <div className="pt-3">
        {arrSliderCheckbox.length > 0 ? (
          <>
            <div className="flex justify-between relative items-center rounded-full mb-3 lg:w-[800px] md:w-full">
              <div className="moving-background absolute h-[3px] top-[30px] bg-bgMoving transition-all duration-500 rounded-full z-0"></div>
              {Object.entries(hashTb).map(([label], index) => (
                <div
                  ref={(el) => (buttonRef.current[index] = el)}
                  key={index}
                  onClick={() => {
                    handleActiveButton(index);
                  }}
                  className="z-10 bg-transparent dark:text-white text-black border-none px-[0.9rem] py-[0.5rem] cursor-pointer md:text-base sm:text-xs xs:text-[11px] xxs:text-[8px]"
                >
                  {label}
                </div>
              ))}
            </div>
            <RenderTableStockFilter
              arrSliderCheckbox={arrSliderCheckbox}
              data={data}
              activeButton={activeButton}
            />
          </>
        ) : (
          <div className="h-[170px] dark:text-white text-black font-semibold items-center justify-center flex">
            Xin hãy chọn tiêu chí
          </div>
        )}
      </div>
    </div>
  );
};

export default TableStockFilter;
