import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import imgDefault from "../../../app/asset/img/img-news.png";
import Loading from "../../Chart/utils/Loading";

const BuildAnalysisCenter = () => {
  const dataAnalysisCenter = useSelector(
    (state) => state.analysisCenter.dataAnalysisCenter
  );
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (dataAnalysisCenter) {
      setLoading(false);
    }
  }, [dataAnalysisCenter]);

  const handleCloseIframe = () => {
    setSelectedItem(null);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="grid xl:grid-cols-5 lg:grid-cols-none">
      <div className="xl:col-span-2 h-[800px] scrollbar-thin scrollbar-thumb-[#436FB5] dark:scrollbar-track-[#151924] scrollbar-track-transparent overflow-y-scroll">
        {loading ? (
          <div className="h-[800px] flex items-center justify-center">
            <Loading />
          </div>
        ) : dataAnalysisCenter && dataAnalysisCenter.length > 0 ? (
          dataAnalysisCenter.map((item, index) => (
            <div key={index}>
              <div
                className="p-2 m-2 cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-300"
                onClick={() => handleItemClick(item)}
              >
                <a
                  className="md:hidden sm:block no-underline"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex">
                    <div className="w-[20%] text-center">
                      <img
                        src={imgDefault}
                        alt="img-default"
                        className="xs:w-[80px] xxs:w-[70px] xs:h-[80px] xxs:h-[70px]"
                      />
                    </div>
                    <div className="w-[80%]">
                      <div className="text-[#2094c5] font-semibold px-2 py-1">
                        {item.title}
                      </div>
                      <div className="dark:text-white text-black font-medium text-sm px-2 py-1">
                        {item.date}
                      </div>
                    </div>
                  </div>
                </a>
                <div className="md:block sm:hidden xs:hidden xxs:hidden">
                  <div className="flex">
                    <div className="w-[20%] text-center">
                      <img
                        src={imgDefault}
                        alt="img-default"
                        className="xs:w-[80px] xxs:w-[70px] xs:h-[80px] xxs:h-[70px]"
                      />
                    </div>
                    <div className="w-[80%]">
                      <div className="text-[#2094c5] font-semibold px-2 py-1">
                        {item.title}
                      </div>
                      <div className="dark:text-white text-black font-medium text-sm px-2 py-1">
                        {item.date}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="my-0 border-t-[1px] border-[#00000030]" />
            </div>
          ))
        ) : (
          <div className="p-10 text-center dark:text-white text-black">
            Nội dung đang cập nhật. Chúng tôi xin lỗi về sự bất tiện này!
          </div>
        )}
      </div>

      <div className="xl:col-span-3 md:block sm:hidden xs:hidden xxs:hidden">
        {selectedItem ? (
          <div className="relative">
            <div
              class="close cursor-pointer md:block sm:hidden xs:hidden xxs:hidden"
              onClick={handleCloseIframe}
            />
            <iframe
              src={`${selectedItem.link}#toolbar=0&navpanes=0&scrollbar=0`}
              className="2xl:w-[858px] xl:w-[774px] lg:w-[917px] md:w-[687px] sm:w-[393px] xs:w-[343px] xxs:w-[290px] h-[796px]"
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

export default BuildAnalysisCenter;
