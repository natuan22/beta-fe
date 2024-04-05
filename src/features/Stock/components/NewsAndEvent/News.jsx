import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../Chart/utils/Loading";
import { fetchDataNews } from "../../thunk";

const News = ({ queryApiNewsEvents }) => {
  const dispatch = useDispatch();
  const { dataNews } = useSelector((state) => state.stock);
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(20);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchDataNews(queryApiNewsEvents.stock, queryApiNewsEvents.type));
  }, [dispatch, queryApiNewsEvents]);

  useEffect(() => {
    if (dataNews) {
      setLoading(false);
      setData(Array.isArray(dataNews) && dataNews.slice(0, currentPage));
    }
  }, [dataNews, currentPage]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseIframe = () => {
    setSelectedItem(null);
  };

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target;
    if (scrollTop + clientHeight >= scrollHeight * 1 && dataNews.length > 0) {
      setCurrentPage((prevLimit) => prevLimit + 10);
      setData([...data, ...dataNews.slice(currentPage, currentPage + 10)]);
    }
  };
  return (
    <div className="grid xl:grid-cols-2 lg:grid-cols-none">
      <div className="h-[800px] overflow-auto " onScroll={handleScroll}>
        {!loading ? (
          Array.isArray(data) &&
          data.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => handleItemClick(item)}
                className={`mx-2 my-2 cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-300 flex flex-col justify-center h-[59px]`}
              >
                <h4 className="dark:text-white text-black mb-1">
                  {item.title}
                </h4>
              </div>
            );
          })
        ) : (
          <div className="h-[800px] flex items-center justify-center">
            <Loading />
          </div>
        )}
      </div>
      <div className="h-[800px] border-solid xl:border-l-[1px] lg:border-l-0 md:border-l-0 sm:border-l-0 xs:border-l-0 xxs:border-l-0 border-r-0 xl:border-t-0 lg:border-t-[1px] md:border-t-[1px] sm:border-t-[1px] xs:border-t-[1px] xxs:border-t-[1px] border-b-0 border-[#D9D9D9]">
        {selectedItem ? (
          <div className="relative">
            <div
              class="close cursor-pointer md:block sm:hidden xs:hidden xxs:hidden"
              onClick={handleCloseIframe}
            />
            <iframe
              src={selectedItem.href}
              title={selectedItem.title}
              className="2xl:w-[704px] xl:w-[632px] lg:w-[1014px] md:w-[758px] sm:w-[415px] xs:w-[365px] xxs:w-[310px] h-[796px]"
            />
          </div>
        ) : (
          <div className="h-[800px] flex items-center justify-center dark:text-white text-black uppercase font-bold">
            Chọn bài bạn muốn đọc
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
