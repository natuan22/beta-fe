import React, { useEffect, useLayoutEffect } from "react";
import { getColor } from "../../Chart/utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataInfoHeader } from "../thunk";
import CandleChart from "./CandleChart";
import { useNavigate } from "react-router-dom";
import socket from "../../Chart/utils/socket";
import { useState } from "react";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import { Skeleton } from "@mui/material";
import imgDefault from "../utils/img/default-image.jpg";
import formatNumberCurrency from "../../../helper/formatNumberCurrency";
const resourceURL = process.env.REACT_APP_RESOURCE_URL;

const StockInfo = ({ codeUrl }) => {
  const dispatch = useDispatch();
  const code = codeUrl.split("-")[0];
  const type = codeUrl.split("-")[1];
  const { dataInfoHeader, dataInfoHeaderStatus } = useSelector(
    (state) => state.stock
  );
  const [data, setData] = useState();
  const [dataChart, setDataChart] = useState([]);
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchDataInfoHeader(code, type));
  }, [dispatch, code, type]);

  useLayoutEffect(() => {
    if (dataInfoHeaderStatus === 400) {
      nav("/trang-khong-ton-tai");
    }
  }, [dataInfoHeaderStatus, nav]);

  useEffect(() => {
    if (dataInfoHeader) {
      setLoading(false);
      setData(dataInfoHeader);
    }
  }, [dataInfoHeader]);

  useEffect(() => {
    socket.on(`listen-co-phieu-${code}`, (newData) => {
      setDataChart([newData.time, newData.closePrice * 1000]);
      setData((prevData) => ({
        ...prevData,
        ...newData,
      }));
    });

    return () => {
      socket.off(`listen-co-phieu-${code}`);
    };
  }, [code]);

  const [showFullSummary, setShowFullSummary] = useState(false);
  const [showCollapsedSummary, setShowCollapsedSummary] = useState(true);

  const toggleSummary = () => {
    setShowFullSummary(!showFullSummary);
    setShowCollapsedSummary(false);
  };

  const collapseSummary = () => {
    setShowFullSummary(false);
    setShowCollapsedSummary(true);
  };

  const countWords = (text) => {
    return (
      text?.trim().split(/\s+/).length + text?.trim().split(/\s+/).length - 1
    );
  };

  useEffect(() => {
    setShowFullSummary(countWords(dataInfoHeader?.summary) <= 459);
  }, [dataInfoHeader]);

  return (
    <div>
      {!loading ? (
        <div>
          <div className="px-[20px] pt-[30px] overflow-y-auto">
            <table className="border border-[#34A3F3] border-solid border-collapse w-full">
              <tbody>
                <tr>
                  <td
                    className="dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid"
                    rowSpan={3}
                  >
                    <div>
                      <p className="font-semibold">GIÁ</p>
                      <p
                        className={`lg:text-2xl md:text-base lg:leading-[53px] md:leading-10 ${getColor(
                          data.perChange
                        )}`}
                      >
                        {formatNumberCurrency(data.closePrice * 1000)}
                      </p>
                      <p className={`font-bold ${getColor(data.perChange)}`}>
                        {data.change &&
                          data.change.toLocaleString("vi-VN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        /(
                        {data.perChange &&
                          data.perChange.toLocaleString("vi-VN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        %)
                      </p>
                    </div>
                  </td>
                  <td
                    className="dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid"
                    colSpan={3}
                  >
                    <p className="font-semibold">{data.exchange} (%)</p>
                  </td>
                  <td
                    className="dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid"
                    rowSpan={3}
                  >
                    <p className="font-semibold">KLGD</p>
                    <p className="lg:text-2xl md:text-base lg:leading-[70px] md:leading-10">
                      {data.kldg && formatNumberCurrency(data.kldg)}
                    </p>
                  </td>
                  <td
                    className="dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid"
                    rowSpan={3}
                  >
                    <p className="font-semibold">P/E</p>
                    <p className="lg:text-2xl md:text-base lg:leading-[70px] md:leading-10">
                      {data.pe &&
                        data.pe.toLocaleString("vi-VN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                    </p>
                  </td>
                  <td
                    className="dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid"
                    rowSpan={3}
                  >
                    <p className="font-semibold">P/B</p>
                    <p className="lg:text-2xl md:text-base lg:leading-[70px] md:leading-10">
                      {data.pb &&
                        data.pb.toLocaleString("vi-VN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                    </p>
                  </td>
                  <td
                    className="dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid"
                    rowSpan={3}
                  >
                    <p className="font-semibold">VỐN HOÁ (TỶ)</p>
                    <p className="lg:text-2xl md:text-base lg:leading-[70px] md:leading-10">
                      {data.vh && formatNumberCurrency(data.vh / 1000000000)}
                    </p>
                  </td>
                  <td
                    className="dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid"
                    rowSpan={3}
                  >
                    <p className="font-semibold">ROAE</p>
                    <p className="lg:text-2xl md:text-base lg:leading-[70px] md:leading-10">
                      {data.roae &&
                        data.roae.toLocaleString("vi-VN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      %
                    </p>
                  </td>
                  <td
                    className="dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid"
                    rowSpan={3}
                  >
                    <p className="font-semibold">ROAA</p>
                    <p className="lg:text-2xl md:text-base lg:leading-[70px] md:leading-10">
                      {data.roaa &&
                        data.roaa.toLocaleString("vi-VN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      %
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid font-semibold">
                    1W
                  </td>
                  <td className="dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid font-semibold">
                    1M
                  </td>
                  <td className="dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid font-semibold">
                    1Y
                  </td>
                </tr>
                <tr>
                  <td className="dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid font-bold">
                    <p className={`${getColor(data.p_week)}`}>
                      {data.p_week &&
                        data.p_week.toLocaleString("vi-VN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      %
                    </p>
                  </td>
                  <td className="dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid font-bold">
                    <p className={`${getColor(data.p_month)}`}>
                      {data.p_month &&
                        data.p_month.toLocaleString("vi-VN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      %
                    </p>
                  </td>
                  <td className="dark:text-white text-black p-3 text-center border border-[#34A3F3] border-solid font-bold">
                    <p className={`${getColor(data.p_year)}`}>
                      {data.p_year &&
                        data.p_year.toLocaleString("vi-VN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      %
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr className="h-px my-7 bg-[#34A3F3] border-0"></hr>
          <div className="flex mb-7">
            <div
              className={`bg-[#004FA9] text-white xxs:px-4 xs:px-4 sm:px-9 py-2 rounded-xl font-semibold`}
            >
              {data.code}
            </div>
            <div className="bg-[#004FA9] text-white ml-4 xxs:px-4 xs:px-4 sm:px-24 py-2 rounded-xl font-semibold">
              {data.industry}
            </div>
          </div>
          <div className="grid lg:grid-cols-12 md:grid-cols-none gap-3">
            <div className="lg:col-span-3 md:col-span-full">
              <span className="dark:text-white text-black uppercase font-bold">
                {data.company}
              </span>
              <div className="p-4 flex justify-center">
                <img
                  className="object-contain xl:w-[262px] lg:w-[222px] md:w-[262px] sm:w-[262px] xs:w-[262px] xxs:w-[262px] h-[145px]"
                  src={`${resourceURL}${data.image}`}
                  onError={(event) => {
                    event.target.src = imgDefault;
                    event.onerror = null;
                  }}
                  alt="companyImg"
                />
              </div>
            </div>
            <div className={`lg:col-span-4 md:col-span-full`}>
              <div className="flex justify-between">
                <span className="dark:text-white text-black font-semibold">
                  Tên tiếng anh: {data.company_eng}{" "}
                </span>
                {showCollapsedSummary &&
                  countWords(dataInfoHeader?.summary) > 459 && (
                    <span
                      onClick={toggleSummary}
                      className="text-[#8BFF62] hover:text-blue-500 hover:underline duration-500 cursor-pointer"
                    >
                      <BsCaretDownFill />
                    </span>
                  )}
                {showFullSummary &&
                  countWords(dataInfoHeader?.summary) > 459 && (
                    <span
                      onClick={collapseSummary}
                      className="text-[#8BFF62] hover:text-blue-500 hover:underline duration-500 cursor-pointer"
                    >
                      <BsCaretUpFill />
                    </span>
                  )}
              </div>
              <div
                className={`${
                  showFullSummary && countWords(dataInfoHeader?.summary) > 459
                    ? "overflow-y-scroll h-[310px]"
                    : ""
                }`}
              >
                <p
                  className={`dark:text-white text-black text-justify pt-2 text-sm pr-[5px] ${
                    showFullSummary ? "" : "line-clamp-15"
                  }`}
                >
                  {dataInfoHeader.summary}
                </p>
              </div>
            </div>
            <div className="lg:col-span-5 md:col-span-full">
              <CandleChart code={code} dataChart={dataChart} />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Skeleton
            variant="rectangular"
            height={100}
            sx={{ bgcolor: "grey.900" }}
            className="mx-[20px] mt-[30px]"
          />
          <hr className="h-px my-7 bg-[#34A3F3] border-0"></hr>
          <div className="flex mb-7">
            <Skeleton
              variant="rounded"
              width={105}
              height={30}
              sx={{ bgcolor: "grey.900" }}
            />
            <Skeleton
              variant="rounded"
              width={269}
              height={30}
              sx={{ bgcolor: "grey.900" }}
              className="ml-4"
            />
          </div>
          <div className="grid lg:grid-cols-12 md:grid-cols-none gap-3">
            <div className="lg:col-span-3 md:col-span-full">
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem", bgcolor: "grey.900" }}
              />

              <div className="p-4 flex justify-center">
                <Skeleton
                  variant="rounded"
                  height={145}
                  sx={{ bgcolor: "grey.900" }}
                  className="xl:w-[262px] lg:w-[222px] md:w-[262px] sm:w-[262px] xs:w-[262px] xxs:w-[262px]"
                />
              </div>
            </div>
            <div className="lg:col-span-4 md:col-span-full">
              <div className="flex justify-between">
                <Skeleton
                  variant="text"
                  width={333}
                  sx={{ fontSize: "1rem", bgcolor: "grey.900" }}
                />
              </div>
              <div className="mt-2">
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "3rem", bgcolor: "grey.900" }}
                />
              </div>
            </div>
            <div className="lg:col-span-5 md:col-span-full">
              <Skeleton
                variant="rounded"
                height={200}
                sx={{ bgcolor: "grey.900" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockInfo;
