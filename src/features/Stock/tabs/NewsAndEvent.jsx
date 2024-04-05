import React, { useEffect, useState } from "react";
import Loading from "../../Chart/utils/Loading";
import Events from "../components/NewsAndEvent/Events";
import News from "../components/NewsAndEvent/News";
import useQueryApi from "../components/Overview/utils/custom/useQueryApi/useQueryApi";
import "../utils/style/styleButton.css";
const NewsAndEvent = ({ codeUrl }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { queryApiNewsEvents, handleQueryApiNewsEvents } = useQueryApi(codeUrl);
  const [activeBtn, setActiveBtn] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 700);
  }, []);

  return (
    <div className="container mx-auto">
      {isLoading ? (
        <div className="mt-4">
          <div>
            <div className="md:flex sm:block">
              <div className="w-[150px] border-solid border-[#34A3F3] border-b-2 border-t-0 border-x-0">
                <span className="dark:text-white text-black font-semibold uppercase">
                  Lịch sự kiện
                </span>
              </div>
              <div className="flex md:mt-0 sm:mt-4 xs:mt-4 xxs:mt-4 justify-center">
                <button
                  className={`custom-btn sm:ml-7 xs:ml-0 ${
                    activeBtn === 0 ? "active-btn" : "btn-2"
                  }`}
                  onClick={() => {
                    setActiveBtn(0);
                    handleQueryApiNewsEvents(0);
                  }}
                >
                  {queryApiNewsEvents.stock}
                </button>
                <button
                  className={`custom-btn ml-5 ${
                    activeBtn === 1 ? "active-btn" : "btn-2"
                  }`}
                  onClick={() => {
                    setActiveBtn(1);
                    handleQueryApiNewsEvents(1);
                  }}
                >
                  Ngành
                </button>
                <button
                  className={`all-market ml-5 ${
                    activeBtn === 2 ? "active-btn" : "btn-2"
                  }`}
                  onClick={() => {
                    setActiveBtn(2);
                    handleQueryApiNewsEvents(2);
                  }}
                >
                  Toàn thị trường
                </button>
              </div>
            </div>
            <Events queryApiNewsEvents={queryApiNewsEvents} />
          </div>
          <div className="mt-4">
            <div className="w-[150px] border-solid border-[#34A3F3] border-b-2 border-t-0 border-x-0">
              <span className="dark:text-white text-black font-semibold uppercase">
                Tin tức
              </span>
            </div>
            <News queryApiNewsEvents={queryApiNewsEvents} />
          </div>
        </div>
      ) : (
        <div className="h-[300px] flex items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default NewsAndEvent;
