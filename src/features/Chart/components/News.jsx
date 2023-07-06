import React, { useEffect, } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { fetchDataNews } from "../thunk";
import '../utils/marquee.css'
import Marquee from "react-fast-marquee";
const News = () => {
  const dispatch = useDispatch()
  const dataNews = useSelector((state) => state.chart.dataNews);
  useEffect(() => {
    dispatch(fetchDataNews)
  }, [])


  return (
    <Marquee speed={2} pauseOnHover="true" gradientColor="[0,0,0]">
      <div className=" dark:bg-black bg-white p-1 overflow-x-hidden">
        <div className='blog-news h-full  flex flex-nowrap'>
          {dataNews.data?.map((item, index) => {
            return (
              <a key={index} className="card no-underline text-white" href={item.Href}>
                <div className="card-body flex w-[400px] h-[90px] m-2">
                  <div className="card-img  ">
                    <img src={item.Img} alt={item.Title} width={120} height={95} />
                  </div>
                  <div className="h-full flex flex-col  justify-around ml-2">
                    <div className="card-text">
                      <p className="line-clamp-2 text-[0.75rem] font-semibold dark:text-white text-black items-center justify-center">  {item.Title}</p>
                      <p className="line-clamp-2 text-[0.7rem] dark:text-white text-black items-center justify-center"> {item.SubTitle}</p>
                      <span className="text-[0.65rem] dark:text-white text-black items-center justify-center"> {moment(item.Date).format("DD/MM/YYYY - HH:mm")}</span>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </Marquee>
  );
};

export default News;