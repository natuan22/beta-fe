import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from "react-icons/bs";
import Marquee from "react-fast-marquee";

const InternationalIndex = () => {
  const dataInternationalIndex = useSelector((state) => state.chart.dataInternationalIndex);
  const [speed, setSpeed] = useState();

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= '1920')
        setSpeed(60)
      else if (window.innerWidth >= '1536')
        setSpeed(50)
      else if (window.innerWidth >= '1280')
        setSpeed(40)
      else if (window.innerWidth >= '1024')
        setSpeed(30)
      else if (window.innerWidth >= '768')
        setSpeed(20)
      else if (window.innerWidth >= '640')
        setSpeed(15)
      else if (window.innerWidth >= '425')
        setSpeed(10)
      else if (window.innerWidth >= '375')
        setSpeed(10)
    }
    handleResize()

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-black pt-2">
      <Marquee speed={speed} pauseOnHover="true" gradientColor="[0,0,0]">
        <div className="flex">
          {dataInternationalIndex.data?.map((item, index) => {
            return (
              <div key={index} className="flex flex-col items-center ml-4 bg-gradient-to-b from-[#217EBE] to-black" style={{  padding: "5px" }}>
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
                      style={{ fontSize: "13px", color: "#00BF63" }}
                    />
                  )}
                  <span className="ml-1.5 text-xs text-white">
                    {(item.diemso - (item.diemso / (1 + item.percent_d / 100))).toFixed(2)} ({item.percent_d}%)
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      </Marquee>
    </div>
  );
};

export default InternationalIndex;

