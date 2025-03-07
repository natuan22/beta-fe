import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../Chart/utils/Loading";
import { getColor } from "../../../Chart/utils/utils";
import { fetchDataListEnterpriseNews } from "../../thunk";
import { apiUrl } from "../../../../services/config";

const ListEnterpriseNews = () => {
  const dispatch = useDispatch();
  const { dataListEnterpriseNews } = useSelector((state) => state.newsCenter);
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(20);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchDataListEnterpriseNews);
  }, [dispatch]);

  useEffect(() => {
    if (dataListEnterpriseNews) {
      setLoading(false);
      setData(
        Array.isArray(dataListEnterpriseNews) &&
          dataListEnterpriseNews.slice(0, currentPage),
      );
    }
  }, [dataListEnterpriseNews, currentPage]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseIframe = () => {
    setSelectedItem(null);
  };

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target;
    if (
      scrollTop + clientHeight >= scrollHeight * 1 &&
      dataListEnterpriseNews.length > 0
    ) {
      setCurrentPage((prevLimit) => prevLimit + 10);
      setData([
        ...data,
        ...dataListEnterpriseNews.slice(currentPage, currentPage + 10),
      ]);
    }
  };

  return (
    <div className="grid xl:grid-cols-2 lg:grid-cols-none">
      <div
        className="h-[800px] overflow-auto scrollbar-thin scrollbar-thumb-[#0050AD] dark:scrollbar-track-[#151924] scrollbar-track-transparent"
        onScroll={handleScroll}
      >
        {!loading ? (
          Array.isArray(data) &&
          data.map((item, index) => {
            let color = getColor(item.perChange);
            return (
              <div
                key={index}
                onClick={() => handleItemClick(item)}
                className={`mx-1 my-4 p-2 cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-300`}
              >
                <a
                  className="md:hidden sm:block no-underline"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className={`${color}`}>
                    {item.code} {item.closePrice} {item.change} (
                    {item.perChange.toFixed(2)}%)
                  </div>
                  <h4 className="dark:text-white text-black mb-1">
                    {item.code}: {item.title}
                  </h4>
                  <div className="dark:text-[#E7DDB3] text-[#faad14] text-[0.85rem]">
                    {moment(item.date).format("DD.MM.YYYY")}
                  </div>
                </a>
                <div className="md:block sm:hidden xs:hidden xxs:hidden">
                  <div className={`${color}`}>
                    {item.code} {item.closePrice} {item.change} (
                    {item.perChange.toFixed(2)}%)
                  </div>
                  <h4 className="dark:text-white text-black mb-1">
                    {item.code}: {item.title}
                  </h4>
                  <div className="dark:text-[#E7DDB3] text-[#faad14] text-[0.85rem]">
                    {moment(item.date).format("DD.MM.YYYY")}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="h-[800px] flex items-center justify-center">
            <Loading />
          </div>
        )}
      </div>

      <div className="">
        {selectedItem ? (
          <div className="relative">
            <div
              class="close cursor-pointer md:block sm:hidden xs:hidden xxs:hidden"
              onClick={handleCloseIframe}
            />
            <iframe
              src={apiUrl + '/api/v1/news/proxy?url=' + selectedItem.href}
              title={selectedItem.title}
              className="2xl:w-[704px] xl:w-[632px] lg:w-[890px] md:w-[660px] sm:w-[393px] xs:w-[343px] xxs:w-[290px] h-[796px]"
            />
          </div>
        ) : (
          <div className="h-[800px] flex items-center justify-center dark:text-white text-black uppercase font-bold">
            Chọn tin để đọc
          </div>
        )}
      </div>
    </div>
  );
};

export default ListEnterpriseNews;
