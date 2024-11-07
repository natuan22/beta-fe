import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../Chart/utils/Loading";
import { fetchDataCashFlowInvestor, fetchDataTotalMarket } from "../../thunk";
import ColumnPerChart from "./components/InvestorCashFlow/ColumnPerChart";
import ColumnValueChart from "./components/InvestorCashFlow/ColumnValueChart";
import "./utils/btnStyle.css";

const buttonStyle = {
  backgroundColor: "transparent",
  color: "#fff",
  border: "none",
  padding: "0.375rem 0.5rem",
};

const activeButtonStyle = { backgroundColor: "#0050AD", color: "#fff" };

const InvestorCashFlow = () => {
  const dispatch = useDispatch();

  const { dataCashFlowInvestor, dataTotalMarket } = useSelector(
    (state) => state.market,
  );
  const [dataToMap, setDataToMap] = useState();

  const [data, setData] = useState();
  const [dataPer, setDataPer] = useState();
  const [timeLine, setTimeLine] = useState();

  const [isAllMarket, setIsAllMarket] = useState(true);
  const [activeButton, setActiveButton] = useState("all");
  const [activeButton2, setActiveButton2] = useState(1);
  const [activeButton3, setActiveButton3] = useState(8);

  const [canTouch, setCanTouch] = useState(true);

  const [param, setParam] = useState("buyVal");
  const [queryApi, setQueryApi] = useState({
    type: 2,
    investorType: 1,
    exchange: "all",
  });

  const [showValue, setShowValue] = useState(0);

  useEffect(() => {
    dispatch(
      fetchDataCashFlowInvestor(
        queryApi.type,
        queryApi.investorType,
        queryApi.exchange,
      ),
    );
    dispatch(fetchDataTotalMarket(queryApi.exchange, queryApi.type));
  }, [queryApi, dispatch]);

  useEffect(() => {
    if (!isAllMarket && dataCashFlowInvestor?.length > 0) {
      setDataToMap(dataCashFlowInvestor);
    } else if (isAllMarket && dataTotalMarket?.length > 0) {
      setDataToMap(dataTotalMarket);
    }
  }, [dataCashFlowInvestor, dataTotalMarket, isAllMarket]);

  useEffect(() => {
    const processData = (dataMap) => {
      const uniqueDates = [
        ...new Set(dataMap?.map((item) => moment(item.date).format("DD/MM"))),
      ];
      setTimeLine(uniqueDates);

      const totalTransValByDate = dataMap?.reduce((acc, curr) => {
        acc[curr.date] = (acc[curr.date] || 0) + Math.abs(curr[param]);
        return acc;
      }, {});

      const dataWithPercent = dataMap?.map((item) => ({
        ...item,
        percentNew: +Math.abs(
          (item[param] / totalTransValByDate[item.date]) * 100,
        ).toFixed(2),
      }));

      const result = [];
      const resultPer = [];

      dataWithPercent?.forEach((item) => {
        const { industry, color } = item;
        const value = +(item[param] / 1_000_000_000).toFixed(2);
        const valuePer = item.percentNew;

        const existingObj = result.find((obj) => obj.name === industry);
        const existingObjPer = resultPer.find((obj) => obj.name === industry);

        if (existingObj) {
          existingObj.data.push(value);
          existingObjPer.data.push(valuePer);
        } else {
          result.push({ name: industry, data: [value], color });
          resultPer.push({ name: industry, data: [valuePer], color });
        }
      });

      return { output: result, outputPer: resultPer };
    };

    if (dataToMap?.length > 0) {
      const { output, outputPer } = processData(dataToMap);
      setData(output);
      setDataPer(outputPer);
    }
  }, [dataToMap, param]);

  useEffect(() => {
    if (activeButton3 === 8) setActiveButton2(4);
    setParam("transVal");
  }, [activeButton3]);

  // hàm xử lý nút
  const handleClick = (button) => {
    setActiveButton(button);
  };

  const handleClick2 = (button) => {
    setActiveButton2(button);
  };

  const handleClick3 = (button) => {
    setActiveButton3(button);
  };

  // config area chart
  // const optionAreaChart = {
  //   accessibility: { enabled: false },
  //   credits: false,
  //   chart: {
  //     min: 0,
  //     type: "area",
  //     backgroundColor: "transparent",
  //   },
  //   legend: {
  //     enabled: false,
  //     itemStyle: { color: localStorage.getItem("color"), fontWeight: "bold" },
  //   },
  //   title: { text: "" },
  //   xAxis: {
  //     categories: timeLine,
  //     labels: { style: { color: localStorage.getItem("color") }},
  //   },
  //   yAxis: {
  //     max: 100,
  //     min: 0,
  //     title: {
  //       text: "",
  //       style: {
  //         color: localStorage.getItem("color"),
  //       },
  //     },
  //     labels: {
  //       style: {
  //         color: localStorage.getItem("color"),
  //       },
  //       formatter: function () {
  //         return this.value + "%";
  //       },
  //     },
  //     gridLineWidth: 0.1,
  //   },
  //   plotOptions: {
  //     area: {
  //       stacking: "normal", // Thay đổi giá trị stacking thành 'percent'
  //       dataLabels: {
  //         enabled: false,
  //       },
  //     },
  //     series: {
  //       marker: {
  //         radius: 2, // Giá trị bán kính marker
  //       },
  //       tooltip: {
  //         headerFormat: "<span style='font-size: 10px'>{point.key}</span><br/>",
  //         pointFormat:"<span style='color:black'>{series.name}: <b>{point.percentage:.1f}%</b></span><br/>", // Thay đổi format để hiển thị phần trăm
  //         valueDecimals: 3,
  //       },
  //       turboThreshold: 100_000_000,
  //     },
  //   },
  //   // boost: {
  //   //   useGPUTranslations: true,
  //   //   usePreAllocated: true,
  //   // },
  //   series: dataNew,
  // };

  return (
    <div>
      <div className="flex items-center justify-between border-solid border-[#25558d] border-b-2 border-t-0 border-x-0">
        <span className="dark:text-white text-black sm:text-base xs:text-[14px] xxs:text-[11px] font-semibold">
          Dòng tiền nhà đầu tư theo các nhóm ngành
        </span>
        <div>
          <select
            className={`bg-[#0050AD] p-1 text-[1rem] text-white border-0`}
            onChange={(event) => {
              setQueryApi({ ...queryApi, type: event.target.value });
            }}
          >
            <option value="2">1 tháng</option>
            <option value="4">3 tháng</option>
            <option value="5">1 năm</option>
          </select>
        </div>
      </div>
      <div className="pt-3 mb-3 dark:text-white text-black">
        <span>
          <button
            onClick={() => {
              handleClick("all");
              setQueryApi({ ...queryApi, exchange: "all" });
            }}
            className={
              activeButton === "all"
                ? "border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer"
                : "border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer"
            }
          >
            Toàn thị trường
          </button>
        </span>
        <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10 xxs:pl-5">
          <button
            onClick={() => {
              handleClick("HSX");
              setQueryApi({ ...queryApi, exchange: "hose" });
            }}
            className={
              activeButton === "HSX"
                ? "border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer"
                : "border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer"
            }
          >
            HSX
          </button>
        </span>
        <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10 xxs:pl-5">
          <button
            onClick={() => {
              handleClick("HNX");
              setQueryApi({ ...queryApi, exchange: "hnx" });
            }}
            className={
              activeButton === "HNX"
                ? "border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer"
                : "border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer"
            }
          >
            HNX
          </button>
        </span>
        <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10 xxs:pl-5">
          <button
            onClick={() => {
              handleClick("UPCOM");
              setQueryApi({ ...queryApi, exchange: "upcom" });
            }}
            className={
              activeButton === "UPCOM"
                ? "border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer"
                : "border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer"
            }
          >
            UPCOM
          </button>
        </span>
      </div>
      <div className="md:flex xxs:block">
        <div>
          <div className="dark:bg-[#2D303A] bg-gray-400 flex justify-around items-center rounded-full mb-2 mr-4">
            <button
              disabled={canTouch}
              style={
                activeButton2 === 1
                  ? { ...buttonStyle, ...activeButtonStyle }
                  : buttonStyle
              }
              onClick={() => {
                handleClick2(1);
                setParam("buyVal");
              }}
              className={`rounded-tl-xl rounded-bl-xl lg:text-[16px] md:text-[13px] sm:text-sm xs:text-[12px] xxs:text-[10px] ${canTouch ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              Giá trị mua
            </button>
            <button
              disabled={canTouch}
              style={
                activeButton2 === 2
                  ? { ...buttonStyle, ...activeButtonStyle }
                  : buttonStyle
              }
              onClick={() => {
                handleClick2(2);
                setParam("sellVal");
              }}
              className={`lg:text-[16px] md:text-[13px] sm:text-sm xs:text-[12px] xxs:text-[10px] ${canTouch ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              Giá trị bán
            </button>
            <button
              disabled={canTouch}
              style={
                activeButton2 === 3
                  ? { ...buttonStyle, ...activeButtonStyle }
                  : buttonStyle
              }
              onClick={() => {
                handleClick2(3);
                setParam("netVal");
              }}
              className={`lg:text-[16px] md:text-[13px] sm:text-sm xs:text-[12px] xxs:text-[10px] ${canTouch ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              Giá trị ròng
            </button>
            <button
              style={
                activeButton2 === 4
                  ? { ...buttonStyle, ...activeButtonStyle }
                  : buttonStyle
              }
              onClick={() => {
                handleClick2(4);
                setParam("transVal");
              }}
              className="rounded-tr-xl rounded-br-xl lg:text-[16px] md:text-[13px] sm:text-sm xs:text-[12px] xxs:text-[10px] cursor-pointer"
            >
              Tổng giá trị GD
            </button>
          </div>
        </div>
        <div>
          <div className="dark:bg-[#2D303A] bg-gray-400 flex justify-around items-center rounded-full mb-2">
            <button
              style={
                activeButton3 === 5
                  ? { ...buttonStyle, ...activeButtonStyle }
                  : buttonStyle
              }
              onClick={() => {
                handleClick3(5);
                setIsAllMarket(false);
                setCanTouch(false);
                setQueryApi({ ...queryApi, investorType: 1 });
              }}
              className="rounded-tl-xl rounded-bl-xl lg:text-[16px] md:text-[13px] sm:text-sm xs:text-[12px] xxs:text-[10px] cursor-pointer"
            >
              Tự doanh
            </button>
            <button
              style={
                activeButton3 === 6
                  ? { ...buttonStyle, ...activeButtonStyle }
                  : buttonStyle
              }
              onClick={() => {
                handleClick3(6);
                setIsAllMarket(false);
                setCanTouch(false);
                setQueryApi({ ...queryApi, investorType: 0 });
              }}
              className="lg:text-[16px] md:text-[13px] sm:text-sm xs:text-[12px] xxs:text-[10px] cursor-pointer"
            >
              Khối ngoại
            </button>
            <button
              style={
                activeButton3 === 7
                  ? { ...buttonStyle, ...activeButtonStyle }
                  : buttonStyle
              }
              onClick={() => {
                handleClick3(7);
                setIsAllMarket(false);
                setCanTouch(false);
                setQueryApi({ ...queryApi, investorType: 2 });
              }}
              className="lg:text-[16px] md:text-[13px] sm:text-sm xs:text-[12px] xxs:text-[10px] cursor-pointer"
            >
              Cá nhân & TC
            </button>
            <button
              style={
                activeButton3 === 8
                  ? { ...buttonStyle, ...activeButtonStyle }
                  : buttonStyle
              }
              onClick={() => {
                handleClick3(8);
                setIsAllMarket(true);
                setCanTouch(true);
                setDataToMap(dataTotalMarket);
              }}
              className="rounded-tr-xl rounded-br-xl lg:text-[16px] md:text-[13px] sm:text-sm xs:text-[12px] xxs:text-[10px] cursor-pointer"
            >
              Toàn thị trường
            </button>
          </div>
        </div>
      </div>

      <div>
        {dataCashFlowInvestor?.length > 0 && dataTotalMarket?.length > 0 ? (
          <>
            <div className="mt-1">
              <button
                onClick={() => setShowValue(0)}
                className={`custom-btn-line-cash-flow cursor-pointer ${showValue === 0 ? "active-btn-line-cash-flow" : "btn-2-line-cash-flow"}`}
              >
                Giá trị
              </button>
              <button
                onClick={() => setShowValue(1)}
                className={`custom-btn-line-cash-flow cursor-pointer ${showValue === 1 ? "active-btn-line-cash-flow" : "btn-2-line-cash-flow"} ml-3 xs:mt-0 xxs:mt-4`}
              >
                Tỷ trọng
              </button>
            </div>
            <div className="mt-3">
              {showValue === 0 ? (
                <ColumnValueChart data={data} timeLine={timeLine} />
              ) : (
                <ColumnPerChart dataPer={dataPer} timeLine={timeLine} />
              )}
            </div>
          </>
        ) : (
          <div className="mt-12 mb-12 h-[70px]">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestorCashFlow;
