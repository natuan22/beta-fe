import React, { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";
import { DoubleRightOutlined } from "@ant-design/icons";
import TableTransactionStatistics from "../components/Overview/TableTransactionStatistics";
import "../utils/style/styleButton.css";
import BusinessResults from "../components/Overview/BusinessResults";
import BalanceSheet from "../components/Overview/BalanceSheet";
import CashFlow from "../components/Overview/CashFlow";
import FinancialIndicators from "../components/Overview/FinancialIndicators";
import SameIndustry from "../components/Overview/SameIndustry";
import Events from "../components/Overview/Events";
import Loading from "../../Chart/utils/Loading";
import useQueryApi from "../components/Overview/utils/custom/useQueryApi/useQueryApi";
import { Popover } from "antd";

const contentTransactionStatistics = (
  <div>
    <span className="text-black font-medium rounded-lg text-sm bg-white p-2 ">
      Nhấn vào để xem chi tiết thống kê giao dịch
    </span>
  </div>
);

const contentNewsAndEvent = (
  <div>
    <span className="text-black font-medium rounded-lg text-sm bg-white p-2 ">
      Nhấn vào để xem chi tiết tin tức và sự kiện
    </span>
  </div>
);

const Overview = ({ handleTabClick, codeUrl }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    queryApi,
    queryApiSameIndustry,
    handleQueryApiOrder,
    handleQueryApiExchange,
  } = useQueryApi(codeUrl);
  const [activeBtn, setActiveBtn] = useState(0);
  const [activeBtnExchange, setActiveBtnExchange] = useState("HOSE");

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 700);
  }, []);

  const handleGoToTransactionStatistics = () => {
    handleTabClick("2");
  };
  const handleGoToNewsAndEvent = () => {
    handleTabClick("4");
  };

  return (
    <div className="container mx-auto">
      {isLoading ? (
        <div className="mt-4">
          <div>
            <span className="border-solid border-[#25558d] border-b-2 border-t-0 border-x-0">
              <span className="dark:text-white text-black font-semibold uppercase">
                Thống kê giao dịch
              </span>
              <Popover content={contentTransactionStatistics}>
                <span
                  className="sm:ml-52 xs:ml-28 xxs:ml-28 text-[#FF7317] cursor-pointer "
                  onClick={handleGoToTransactionStatistics}
                >
                  <DoubleRightOutlined />
                </span>
              </Popover>
            </span>
            <LazyLoad offset={300} debounce={200} once>
              <TableTransactionStatistics codeSearch={queryApi.stock} />
            </LazyLoad>
          </div>
          <div>
            <div className="grid xl:grid-cols-2 lg:grid-cols-none mt-8 gap-10">
              <div>
                <div className="flex">
                  <div className="w-[115px] border-solid border-[#25558d] border-b-2 border-t-0 border-x-0">
                    <span className="dark:text-white text-black font-semibold uppercase">
                      Tài chính
                    </span>
                  </div>
                  <button
                    className={`custom-btn ml-5 ${
                      activeBtn === 0 ? "active-btn" : "btn-2"
                    }`}
                    onClick={() => {
                      setActiveBtn(0);
                      handleQueryApiOrder(0);
                    }}
                  >
                    Theo quý
                  </button>
                  <button
                    className={`custom-btn ml-5 ${
                      activeBtn === 1 ? "active-btn" : "btn-2"
                    }`}
                    onClick={() => {
                      setActiveBtn(1);
                      handleQueryApiOrder(1);
                    }}
                  >
                    Theo năm
                  </button>
                </div>

                <div>
                  <LazyLoad offset={300} debounce={200} once>
                    <BusinessResults queryApi={queryApi} />
                  </LazyLoad>
                </div>

                <div className="xl:mt-[10px] lg:mt-4">
                  <LazyLoad offset={300} debounce={200} once>
                    <BalanceSheet queryApi={queryApi} />
                  </LazyLoad>
                </div>

                <div className="xl:mt-[54.5px] lg:mt-4">
                  <LazyLoad offset={300} debounce={200} once>
                    <CashFlow queryApi={queryApi} />
                  </LazyLoad>
                </div>

                <div className="xl:mt-[9px] lg:mt-4">
                  <LazyLoad offset={300} debounce={200} once>
                    <FinancialIndicators queryApi={queryApi} />
                  </LazyLoad>
                </div>
              </div>

              <div>
                <div>
                  <div className="md:flex sm:block">
                    <div className="w-[317px] border-solid border-[#25558d] border-b-2 border-t-0 border-x-0">
                      <span className="dark:text-white text-black font-semibold uppercase">
                        Doanh nghiệp cùng ngành
                      </span>
                    </div>
                    <div className="flex md:mt-0 sm:mt-4 xs:mt-4 xxs:mt-4 sm:justify-center xs:justify-center xxs:justify-center">
                      <button
                        className={`custom-btn ml-7 ${
                          activeBtnExchange === "HOSE" ? "active-btn" : "btn-2"
                        }`}
                        onClick={() => {
                          setActiveBtnExchange("HOSE");
                          handleQueryApiExchange("HOSE");
                        }}
                      >
                        HOSE
                      </button>
                      <button
                        className={`custom-btn ml-5 ${
                          activeBtnExchange === "HNX" ? "active-btn" : "btn-2"
                        }`}
                        onClick={() => {
                          setActiveBtnExchange("HNX");
                          handleQueryApiExchange("HNX");
                        }}
                      >
                        HNX
                      </button>
                      <button
                        className={`custom-btn ml-5 ${
                          activeBtnExchange === "UPCOM" ? "active-btn" : "btn-2"
                        }`}
                        onClick={() => {
                          setActiveBtnExchange("UPCOM");
                          handleQueryApiExchange("UPCOM");
                        }}
                      >
                        UPCOM
                      </button>
                    </div>
                  </div>
                  <div className="xxs:w-[317px] xs:w-[373px] sm:w-[423px] md:w-full">
                    <LazyLoad offset={300} debounce={200} once>
                      <SameIndustry queryApi={queryApiSameIndustry} />
                    </LazyLoad>
                  </div>
                </div>

                <div className="xl:mt-6 lg:mt-4">
                  <span className="border-solid border-[#25558d] border-b-2 border-t-0 border-x-0">
                    <span className="dark:text-white text-black font-semibold uppercase">
                      Lịch sự kiện
                    </span>
                    <Popover content={contentNewsAndEvent}>
                      <span
                        className="xs:ml-52 xxs:ml-28 text-[#FF7317] cursor-pointer"
                        onClick={handleGoToNewsAndEvent}
                      >
                        <DoubleRightOutlined />
                      </span>
                    </Popover>
                  </span>
                  <div className="xxs:w-[317px] xs:w-[373px] sm:w-[423px] md:w-full">
                    <LazyLoad offset={300} debounce={200} once>
                      <Events codeSearch={queryApi.stock} />
                    </LazyLoad>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="mt-4">
            <div className="sm:w-[373px] xs:w-[200px] xxs:w-[200px] border-solid border-[#25558d] border-b-2 border-t-0 border-x-0">
              <span className="dark:text-white text-black font-semibold uppercase">
                Hồ sơ doanh nghiệp
              </span>
            </div>
            <div className="h-[344px] bg-[#78898B] mt-4"></div>
          </div> */}
        </div>
      ) : (
        <div className="h-[300px] flex items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Overview;
