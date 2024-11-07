import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../Chart/utils/Loading";
import { getColorText } from "../../../../Chart/utils/utils";
import { fetchDataTableBalanceSheet } from "../../../thunk";
import { checkUpperCaseAndValue } from "../../../../../helper/checkUpperCaseAndValue";

const TableBalanceSheet = ({ queryApiBusinessFinance }) => {
  const dispatch = useDispatch();
  const { dataTableBalanceSheet } = useSelector((state) => state.stock);
  const [dates, setDates] = useState();
  const [dataTb, setDataTb] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(
      fetchDataTableBalanceSheet(
        queryApiBusinessFinance.stock,
        queryApiBusinessFinance.order,
      ),
    );
  }, [dispatch, queryApiBusinessFinance]);

  useEffect(() => {
    if (dataTableBalanceSheet?.length > 0) {
      setLoading(false);
      let modifiedArray;

      if (queryApiBusinessFinance.order === "0") {
        modifiedArray = dataTableBalanceSheet.map((item) => {
          const year = item.date.slice(0, 4);
          const quarter = item.date.slice(4);

          return { ...item, date: `Quý ${quarter}/${year}` };
        });
      } else {
        modifiedArray = dataTableBalanceSheet.map((item) => {
          return { ...item, date: `Năm ${item.date}` };
        });
      }

      const dates = [...new Set(modifiedArray?.map((item) => item.date))];
      setDates(dates);
      const newData = {};
      modifiedArray.forEach((item) => {
        if (!newData[item.name]) {
          newData[item.name] = [];
        }
        newData[item.name].push(item.value / queryApiBusinessFinance.unit);
      });
      setDataTb(
        Object.entries(newData).map(([name, values]) => ({ name, values })),
      );
    }
  }, [dataTableBalanceSheet, queryApiBusinessFinance]);

  return (
    <div>
      <section className="pt-8 pb-4">
        <div className="w-full">
          <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded">
            <div className="block bg-transparent scrollbar-thin scrollbar-thumb-[#0050AD] dark:scrollbar-track-[#151924] scrollbar-track-transparent 2xl:overflow-x-hidden xl:overflow-x-scroll lg:overflow-x-scroll md:overflow-x-scroll sm:overflow-x-scroll xs:overflow-x-scroll xxs:overflow-x-scroll">
              <table className="items-center border-collapse bg-transparent w-full">
                <thead className="bg-[#0050AD]">
                  <tr>
                    <th className="sticky left-0 z-10 bg-[#0050AD] text-left align-middle lg:px-3 md:px-36 sm:px-20 xs:px-10 xxs:px-10 py-[15px] whitespace-nowrap font-extrabold text-white">
                      Chỉ tiêu
                    </th>
                    {Array.isArray(dates) &&
                      dates?.map((item) => (
                        <th
                          key={item}
                          className="text-right align-middle px-1 py-[15px] text-sm whitespace-nowrap font-semibold text-white"
                        >
                          {item}
                        </th>
                      ))}
                  </tr>
                </thead>

                <tbody>
                  {!loading ? (
                    Array.isArray(dataTb) &&
                    dataTb.map((item) => (
                      <tr
                        key={item.name}
                        className={`dark:hover:bg-gray-800 hover:bg-gray-300 duration-500 ${getColorText(
                          item.name,
                        )} border-solid border-b-[1px] border-x-0 border-t-0 border-[#D9D9D9] border-opacity-40`}
                      >
                        <th
                          className={`sticky left-0 z-10 dark:bg-black bg-white text-left align-middle lg:whitespace-nowrap md:whitespace-normal  px-1 pt-[15px] pb-[2px] text-sm`}
                        >
                          {item.name}
                        </th>
                        {item.values.map((value, index) => {
                          return (
                            <td
                              key={index}
                              className={`text-sm text-right align-middle whitespace-nowrap px-1 pt-[15px] pb-[2px] font-semibold`}
                            >
                              {checkUpperCaseAndValue(item.name, value)}
                            </td>
                          );
                        })}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>
                        <div>
                          <Loading />
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TableBalanceSheet;
