import { Select, Tooltip } from "antd";
import { motion } from "framer-motion";
import moment from "moment";
import React, { useState } from "react";
import { FaAngleDoubleDown } from "react-icons/fa";
import formatNumberCurrency from "../../../../../helper/formatNumberCurrency";
import { getColorBaseOnValue } from "../../../../../helper/getColorBaseOnValue";
import Loading from "../../../../Chart/utils/Loading";
import "./styles/closeButton.css";
import "./styles/selectCodeNews.css";
import { getApi } from "../../../../../helper/getApi";
import LazyLoad from "react-lazyload";

const TableNews = ({ data, loading }) => {
  const [clickItem, setClickItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState([]);
  const [visibleNewsItems, setVisibleNewsItems] = useState({});

  const handleItemClick = (item) => {
    setClickItem(item);
  };

  const handleCloseIframe = () => {
    setClickItem(null);
  };

  const handleChange = (value) => {
    setSelectedItem(value);
    setVisibleNewsItems({}); // Reset visible news items when selection changes
  };

  const handleShowMore = (e, code, totalNews) => {
    e.stopPropagation(); // Prevent the click event from propagating
    setVisibleNewsItems((prev) => ({
      ...prev,
      [code]: totalNews,
    }));
  };

  const options = data?.map((item) => ({
    label: item.code,
    value: item.code,
  }));

  // Lọc dữ liệu dựa trên selectedItem
  const filteredData = selectedItem.length
    ? data.filter((item) => selectedItem.includes(item.code))
    : data;

  const handleStockClick = async (code) => {
    try {
      const response = await getApi(`/api/v1/shares/search?key_search=${code}`);
      const type = response[0].type;
      const url = `/co-phieu/${code}-${type}`;
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  return (
    <div className="shadow-lg">
      <div className="mx-1 mt-2">
        <Select
          mode="multiple"
          allowClear
          style={{
            width: "48.6%",
            height: "40px",
          }}
          placeholder="Chọn mã cổ phiếu"
          onChange={handleChange}
          options={options}
          className="select-code-news"
        />
      </div>
      <div className="my-2 grid grid-cols-2">
        <div className="h-[650px] 2xl:w-[716px] xl:w-[644px] lg:w-[384px] md:w-[330px] overflow-auto scrollbar-thin scrollbar-thumb-[#0050AD] dark:scrollbar-track-[#151924] scrollbar-track-transparent">
          {!loading ? (
            Array.isArray(filteredData) &&
            filteredData.map((item, index) => {
              const visibleNewsCount = visibleNewsItems[item.code] || 5;
              const visibleNews = item.news.slice(0, visibleNewsCount + 1); // Include the 6th item partially
              const totalNews = item.news.length;

              return (
                <div key={index} className="mx-1 mt-1 relative">
                  <Tooltip
                    placement="bottom"
                    title={
                      <span className="">
                        Click vào mã cổ phiếu để xem báo cáo
                      </span>
                    }
                    color={"linear-gradient(to bottom, #E6EFF9, #61A6F6)"}
                  >
                    <div
                      onClick={() => handleStockClick(item.code)}
                      className={`${getColorBaseOnValue(
                        item.perChange,
                      )} px-2 py-1 font-semibold text-lg z-10 sticky top-0 bg-[#d9e9fd] rounded-lg shadow-lg border border-[#2D4CEF] border-solid cursor-pointer`}
                    >
                      {item.code}:{" "}
                      {formatNumberCurrency(item.closePrice * 1000)} (
                      {item.perChange.toFixed(2)}%)
                    </div>
                  </Tooltip>
                  {visibleNews.map((newsItem, newsIndex) => (
                    <motion.div
                      className={`flex py-2 pl-2 cursor-pointer hover:bg-gray-100 hover:bg-opacity-20 ${
                        newsIndex === 5 && visibleNewsCount < totalNews
                          ? "relative h-[58px] overflow-hidden"
                          : ""
                      }`}
                      onClick={() => handleItemClick(newsItem)}
                      key={newsIndex}
                      whileHover={{
                        scale: 1.01,
                        transition: { duration: 1 },
                      }} // Áp dụng hiệu ứng khi hover
                      initial={{ opacity: 0, y: 10 }} // Thiết lập trạng thái ban đầu
                      animate={{ opacity: 1, y: 0 }} // Thiết lập trạng thái hiển thị
                    >
                      <motion.img
                        src={newsItem.img}
                        alt={newsItem.title}
                        width={150}
                        height={100}
                        initial={{ opacity: 0 }} // Thiết lập trạng thái ban đầu
                        animate={{ opacity: 1 }} // Thiết lập trạng thái hiển thị
                        transition={{ duration: 1 }}
                      />
                      <motion.div
                        className={`py-2 pl-2`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                      >
                        <motion.div className="dark:text-gray-300 text-black font-semibold line-clamp-2">
                          {newsItem.title}
                        </motion.div>
                        <motion.div className="dark:text-gray-300 text-black text-[0.8rem]">
                          {moment(newsItem.date).format("DD.MM.YYYY")}
                        </motion.div>
                      </motion.div>
                      {newsIndex === 5 && visibleNewsCount < totalNews && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-60 flex justify-center items-center h-full"
                          onClick={(e) =>
                            handleShowMore(e, item.code, totalNews)
                          }
                          whileHover={{ scale: 1.1 }}
                        >
                          <FaAngleDoubleDown className="w-[25px] h-[25px] text-center text-[#023e8a]" />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              );
            })
          ) : (
            <div className="h-[646px] flex items-center justify-center">
              <Loading />
            </div>
          )}
        </div>

        <div>
          {clickItem ? (
            <div className="relative md:block sm:hidden xs:hidden xxs:hidden">
              <div
                className="close cursor-pointer"
                onClick={handleCloseIframe}
              />
              <iframe
                src={clickItem.href}
                title={clickItem.title}
                className="h-[646px] 2xl:w-[716px] xl:w-[644px] lg:w-[384px] md:w-[330px]"
              />
            </div>
          ) : (
            <div className="h-[646px] flex items-center justify-center dark:text-white text-black uppercase font-bold">
              Chọn tin để đọc
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableNews;
