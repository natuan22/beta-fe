import React from "react";
import { useSelector } from "react-redux";
import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from "react-icons/bs";
import Marquee from "react-fast-marquee";

const Carousel = () => {
  const dataCarousel = useSelector((state) => state.chart.dataCarousel);

  return (
    <div className="bg-gray-800">
      <Marquee speed={70} pauseOnHover="true" gradientColor="[0,0,0]">
        <div className="flex">
          {dataCarousel.data?.map((item, index) => {
            return (
              <div key={index} className="flex flex-col items-center ml-4 bg-gradient-to-b  from-[#144e74] to-[#112533]" style={{ border: "1px solid transparent", padding: "5px" }}>
                <span className="mx-2 text-sm font-semibold text-white">
                  {item.ticker}: {item.diemso}
                </span>
                <p>
                  {item.percent_d < 0 ? (
                    <BsFillArrowDownCircleFill
                      style={{ fontSize: "13px", color: "red" }}
                    />
                  ) : (
                    <BsFillArrowUpCircleFill
                      style={{ fontSize: "13px", color: "lightgreen" }}
                    />
                  )}
                  {item.percent_d < 0 ? (
                    <span className="ml-3 text-xs text-red-500">
                      {item.percent_d}%
                    </span>
                  ) : (
                    <span className="ml-3 text-xs text-green-500">
                      {item.percent_d}%
                    </span>
                  )}
                </p>
              </div>
            );
          })}
        </div>
      </Marquee>
    </div>
  );
};

export default Carousel;

