import React, { useState } from "react";
import { BsInfoCircleFill } from "react-icons/bs";
import { Popover } from "antd";
import ChartGauge from "./components/ChartGauge";
import { useSelector } from "react-redux";
import { Rating } from "@mui/material";
import Loading from "../../../Chart/utils/Loading";
import { getTextColorRating } from "../../../Chart/utils/utils";
const contentFinancialHealthAnalysis = (
  <div>
    <span className="text-black font-medium rounded-lg text-sm bg-white p-2 ">
      Ngành nghề kinh doanh
    </span>
  </div>
);

const BussinessAnalysis = ({ queryApi }) => {
  const { dataBussinessAnalysis, dataBussinessAnalysisStatus } = useSelector(
    (state) => state.stock,
  );
  const [showChild, setShowChild] = useState(false);
  const [showChildStates, setShowChildStates] = useState([]);

  const toggleChildVisibility = (index) => {
    const updatedStates = [...showChildStates];
    updatedStates[index] = !updatedStates[index];
    setShowChildStates(updatedStates);
  };

  if (
    dataBussinessAnalysisStatus === 400 ||
    dataBussinessAnalysis.length === 0
  ) {
    return (
      <>
        <div className="border-solid dark:border-white border-b-[1px] border-t-0 border-x-0">
          <span className="dark:text-white text-black font-semibold xl:w-[50%] lg:w-[35%] md:w-[40%] sm:w-[45%] flex justify-between">
            Ngành nghề kinh doanh
            <Popover content={contentFinancialHealthAnalysis}>
              <span className="dark:text-white text-black">
                <BsInfoCircleFill />
              </span>
            </Popover>
          </span>
        </div>
        <div className="dark:text-white text-black h-[300px] flex items-center justify-center">
          Dữ liệu đang được cập nhật
        </div>
      </>
    );
  }

  return (
    <div>
      <div className="border-solid dark:border-white border-b-[1px] border-t-0 border-x-0">
        <span className="dark:text-white text-black font-semibold xl:w-[50%] lg:w-[35%] md:w-[40%] sm:w-[45%] flex justify-between">
          Ngành nghề kinh doanh
          <Popover content={contentFinancialHealthAnalysis}>
            <span className="dark:text-white text-black">
              <BsInfoCircleFill />
            </span>
          </Popover>
        </span>
      </div>
      {dataBussinessAnalysis ? (
        <div>
          <div className="grid sm:grid-cols-2 xs:grid-cols-none items-center">
            <ChartGauge data={dataBussinessAnalysis.totalStar} />
            <div className="dark:text-white text-black text-justify">
              Từ những dữ liệu được ghi nhận chúng tôi đánh giá ngành nghề kinh
              doanh của cổ phiếu {queryApi.stock}{" "}
              {getTextColorRating(dataBussinessAnalysis.totalStar).text} với mức
              điểm số{" "}
              <span
                className={
                  getTextColorRating(dataBussinessAnalysis.totalStar).color
                }
              >
                {dataBussinessAnalysis.totalStar}/5
              </span>
              .
            </div>
          </div>

          <div>
            <ul className="ml-[40px] mt-1">
              {Array.isArray(dataBussinessAnalysis.data) &&
                dataBussinessAnalysis.data?.map((item, index) => {
                  const contentChild = (
                    <div>
                      <span className="text-black font-medium rounded-lg text-sm bg-white p-2">
                        {item.name}
                      </span>
                    </div>
                  );
                  return (
                    <li key={index} className="dark:text-white text-black mb-2">
                      <span className="items-center flex justify-between">
                        <span className="sm:w-[60%] xs:w-[50%] xxs:w-[48%] items-center flex justify-between sm:text-base xs:text-sm xxs:text-xs">
                          {item.name}
                          <Popover
                            content={contentChild}
                            onClick={() => toggleChildVisibility(index)}
                          >
                            <span className="dark:text-white text-black cursor-pointer">
                              <BsInfoCircleFill />
                            </span>
                          </Popover>
                        </span>
                        <span className="flex justify-between items-center text-base">
                          <p className="mr-2">{item.value}</p>
                          <Rating
                            sx={{
                              "& .MuiRating-iconEmpty": {
                                color: "#faaf00",
                              },
                            }}
                            value={item.value}
                            readOnly
                          />
                        </span>
                      </span>
                      {showChildStates[index] && (
                        <div>
                          <ul className="ml-[40px] mt-1">
                            {item.child.map((itemChild, index) => {
                              const contentItemChild = (
                                <div>
                                  <span className="text-black font-medium rounded-lg text-sm bg-white p-2">
                                    {itemChild.name}
                                  </span>
                                </div>
                              );
                              return (
                                <li key={index}>
                                  <span className="items-center flex justify-between">
                                    <span className="w-[56%] flex justify-between">
                                      <span className="text-sm">
                                        {itemChild.name}
                                      </span>
                                      <Popover
                                        content={contentItemChild}
                                        onClick={() => setShowChild(!showChild)}
                                      >
                                        <span className="dark:text-white text-black cursor-pointer">
                                          <BsInfoCircleFill />
                                        </span>
                                      </Popover>
                                    </span>
                                    <span className="flex justify-between items-center">
                                      <p className="text-[15px] mr-2">
                                        {itemChild.value}
                                      </p>
                                      <Rating
                                        sx={{
                                          "& .MuiRating-iconEmpty": {
                                            color: "#faaf00",
                                            fontSize: "20px",
                                          },
                                          "& .MuiRating-iconFilled ": {
                                            fontSize: "20px",
                                          },
                                        }}
                                        value={itemChild.value}
                                        readOnly
                                      />
                                    </span>
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                })}
            </ul>
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

export default BussinessAnalysis;
