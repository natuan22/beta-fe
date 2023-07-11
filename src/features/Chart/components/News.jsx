import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { fetchDataNews } from "../thunk";
import "../utils/marquee.css";

const News = () => {
  const dispatch = useDispatch();
  const dataNews = useSelector((state) => state.chart.dataNews);
  const blogNewsRef = useRef(null);

  useEffect(() => {
    dispatch(fetchDataNews);
  }, []);

  useEffect(() => {
    if (dataNews.data?.length > 0) {
      adjustBlogNewsSize();
      window.addEventListener("resize", adjustBlogNewsSize);
    }

    return () => {
      window.removeEventListener("resize", adjustBlogNewsSize);
    };
  }, [dataNews.data]);


  const adjustBlogNewsSize = () => {
    const blogNewsElement = blogNewsRef.current;
    if (blogNewsElement && blogNewsElement !== null) {
      const childCount = blogNewsElement.childElementCount;
      const firstChild = blogNewsElement.firstElementChild;
      const childWidth = firstChild ? firstChild.offsetWidth : 0;
      const newWidth = childCount * childWidth;
      blogNewsElement.style.width = `${newWidth}px`;
    }
  };

  return (
    <div className="dark:bg-black bg-white p-2 overflow-x-hidden">
      <div ref={blogNewsRef} className={`animate-[marquee_400s_linear_infinite] blog-news h-full flex flex-nowrap`}>
        {dataNews.data?.map((item, index) => {
          return (
            <a key={index} className="card no-underline text-white" href={item.Href} target="_blank" rel="noopener noreferrer">
              <div className="card-body flex w-[350px] h-[90px] m-1">
                <div className="card-img">
                  <img src={item.Img} alt={item.Title} width={120} height={95} />
                </div>
                <div className="h-full flex flex-col justify-around ml-1">
                  <div className="card-text">
                    <p className="line-clamp-2 text-[0.75rem] font-semibold dark:text-white text-black items-center justify-center">{item.Title}</p>
                    <p className="line-clamp-2 text-[0.7rem] dark:text-white text-black items-center justify-center mt-1.5">{item.SubTitle}</p>
                    <span className="text-[0.65rem] dark:text-white text-black items-center justify-center">{moment(item.Date).format("DD/MM/YYYY - HH:mm")}</span>
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default News;
