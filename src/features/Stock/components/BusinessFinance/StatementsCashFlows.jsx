import React, { useState } from "react";
import "../../utils/style/styleButton.css";
import useQueryApi from "../Overview/utils/custom/useQueryApi/useQueryApi";
import ChartStatementsCashFlows from "./StatementsCashFlows/ChartStatementsCashFlows";
import TableStatementsCashFlows from "./StatementsCashFlows/TableStatementsCashFlows";

const StatementsCashFlows = ({ codeUrl }) => {
  const [activeBtn, setActiveBtn] = useState(0);
  const {
    queryApiBusinessFinance,
    handleQueryApiBusinessFinanceOrder,
    handleQueryApiBusinessFinanceUnit,
  } = useQueryApi(codeUrl);

  return (
    <div className="container mx-auto">
      <div className="mt-8">
        <div className="md:flex sm:block justify-between">
          <div>
            <button
              className={`statementsCashFlows-btn xs:ml-[54px] xxs:ml-5  ${
                activeBtn === 0
                  ? "statementsCashFlows-active-btn"
                  : "statementsCashFlows-btn-2"
              }`}
              onClick={() => {
                setActiveBtn(0);
              }}
            >
              Bảng
            </button>
            <button
              className={`statementsCashFlows-btn ml-5 ${
                activeBtn === 1
                  ? "statementsCashFlows-active-btn"
                  : "statementsCashFlows-btn-2"
              }`}
              onClick={() => {
                setActiveBtn(1);
              }}
            >
              Biểu đồ
            </button>
          </div>
          <div className="flex sm:flex-row xs:flex-col xxs:flex-col md:mt-0 sm:mt-4 xs:mt-4 xxs:mt-4 justify-center items-center">
            <div className="ml-4">
              <span className="dark:text-white text-black">Thời gian</span>
              <select
                className={`dark:bg-[#151924] h-[41px] bg-gray-100 dark:hover:bg-gray-900 hover:bg-gray-300 ml-2 p-1 text-base dark:text-white text-black border-[#0050AD] border-[3px] outline-0`}
                onChange={(event) => {
                  handleQueryApiBusinessFinanceOrder(event.target.value);
                }}
              >
                <option value="0">Hằng Quý</option>
                <option value="1">Hằng Năm</option>
              </select>
            </div>
            <div className="ml-4 sm:mt-0 xs:mt-2 xxs:mt-2">
              <span className="dark:text-white text-black">Đơn vị</span>
              <select
                className={`dark:bg-[#151924] h-[41px] bg-gray-100 dark:hover:bg-gray-900 hover:bg-gray-300 sm:ml-2 xs:ml-[30px] xxs:ml-[30px] p-1 text-base dark:text-white text-black border-[#0050AD] border-[3px] outline-0`}
                onChange={(event) => {
                  handleQueryApiBusinessFinanceUnit(event.target.value);
                }}
              >
                <option value="1000000000">Tỷ đồng</option>
                <option value="1000000">Triệu đồng</option>
              </select>
            </div>
          </div>
        </div>
        {activeBtn === 0 ? (
          <div>
            <TableStatementsCashFlows
              queryApiBusinessFinance={queryApiBusinessFinance}
            />
          </div>
        ) : (
          <div>
            <ChartStatementsCashFlows
              queryApiBusinessFinance={queryApiBusinessFinance}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatementsCashFlows;
