import React from "react";
import { useSelector } from "react-redux";
import {
  DownCircleOutlined,
  UpCircleOutlined,
} from "@ant-design/icons/lib/icons";
import Marquee from "react-fast-marquee";

const Carousel = () => {
  const dataCarousel = useSelector((state) => state.chart.dataCarousel);
  console.log(dataCarousel);
  return (
    <div className=" bg-slate-700 ">
      <Marquee  speed={100} pauseOnHover="true" gradient="false" >
        <div className="flex">
          {dataCarousel.recordset?.map((item, index)=> {
            return (
              <div>
                <span>{item.ticker}: {item.diemso}</span>
              </div>
            )
          })}
        </div>
      </Marquee>
    </div>
  );
};

export default Carousel;
