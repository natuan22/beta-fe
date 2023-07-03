import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "antd";
import Marquee from "react-fast-marquee";
import moment from "moment";
import { fetchDataNews } from "../thunk";

const News = () => {
  const dataNews = useSelector((state) => state.chart.dataNews);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchDataNews)
  }, [])
  return (
    <>
      <div className="dark:bg-black bg-white">
        <Marquee pauseOnHover={true} gradientColor="[0,0,0]">
          <div className="blog-news flex h-[130px]">
            {dataNews.data?.map((item, index) => {
              return (
                <Card
                  bodyStyle={{
                    paddingTop: "15px",
                    paddingBottom: "10px",
                    paddingLeft: "0px",
                    paddingRight: "10px",
                  }}
                  key={index}
                  bordered={false}
                  className="w-[355px] h-[90px] dark:bg-black bg-white"
                >
                  <div className="flex items-center">
                    <a
                      href={item.Href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={item.Img}
                        alt={item.Title}
                        width={120}
                        height={95}
                      />
                    </a>
                    <div className="ml-1">
                      <a
                        href={item.Href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p className="line-clamp-2 text-[0.75rem] font-semibold dark:text-white text-black items-center justify-center">
                          {item.Title}
                        </p>
                      </a>
                      <a
                        href={item.Href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p className="line-clamp-2 text-[0.7rem] dark:text-white text-black items-center justify-center">
                          {item.SubTitle}
                        </p>
                      </a>
                      <span className="text-[0.65rem] dark:text-white text-black items-center justify-center">
                        {moment(item.Date).format("DD/MM/YYYY - HH:mm")}
                      </span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </Marquee>
      </div>
    </>
  );
};

export default News;
