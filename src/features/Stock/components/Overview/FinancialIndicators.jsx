import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../Chart/utils/Loading";
import { fetchDataFinancialIndicators } from "../../thunk";
import formatNumberCurrency from "../../../../helper/formatNumberCurrency";

const FinancialIndicators = ({ queryApi }) => {
  const dispatch = useDispatch();
  const { dataFinancialIndicator } = useSelector((state) => state.stock);
  const [dates, setDates] = useState();
  const [dataTb, setDataTb] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchDataFinancialIndicators(queryApi.stock, queryApi.order, queryApi.type));
  }, [dispatch, queryApi]);

  useEffect(() => {
    if (dataFinancialIndicator?.length > 0) {
      setLoading(false);
      let modifiedArray;

      if (queryApi.order === 0) {
        modifiedArray = dataFinancialIndicator.map((item) => {
          const year = item.date.slice(0, 4);
          const quarter = item.date.slice(4);

          return { ...item, date: `Quý ${quarter}/${year}` };
        });
      } else {
        modifiedArray = dataFinancialIndicator.map((item) => {
          const year = item.date.slice(0, 4);

          return { ...item, date: `Năm ${year}` };
        });
      }

      const dates = [...new Set(modifiedArray?.map((item) => item.date))];
      setDates(dates);
      const newData = {};
      modifiedArray.forEach((item) => {
        if (!newData[item.name]) {
          newData[item.name] = [];
        }
        newData[item.name].push(item.value);
      });
      setDataTb(
        Object.entries(newData).map(([name, values]) => ({ name, values }))
      );
    }
  }, [dataFinancialIndicator]);
console.log(dataFinancialIndicator)
  return (
    <div>
      <section className="pt-4">
        <div className="w-full">
          <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded">
            <div className="block bg-transparent xxs:w-[317px] xs:w-[373px] sm:w-[423px] md:w-full scrollbar-thin scrollbar-thumb-[#436FB5] dark:scrollbar-track-[#151924] scrollbar-track-transparent md:overflow-hidden sm:overflow-x-scroll xs:overflow-x-scroll xxs:overflow-x-scroll">
              <table className="items-center w-full border-collapse bg-transparent h-[294px]">
                <thead className="bg-[#1D5F8D]">
                  <tr>
                    <th className="bg-[#34A3F3] text-center uppercase align-middle px-[27px] py-[15px] whitespace-nowrap font-extrabold text-black">
                      Chỉ số tài chính
                    </th>
                    {Array.isArray(dates) &&
                      dates?.map((item) => (
                        <th
                          key={item}
                          className="text-center align-middle px-3 py-[15px] text-xs font-semibold text-white"
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
                        className="dark:hover:bg-gray-800 hover:bg-gray-300 duration-500"
                      >
                        <th
                          className={`text-left align-middle whitespace-nowrap px-1 py-[14px] text-sm dark:text-white text-black`}
                        >
                          {item.name}
                        </th>
                        {item.values.map((value, index) => (
                          <td
                            key={index}
                            className={`text-sm text-center align-middle whitespace-nowrap px-1 py-[14px] font-semibold dark:text-white text-black`}
                          >
                            {item.name === "ROE" || item.name === "ROA" ? (
                              <span>{formatNumberCurrency(value * 100)}%</span>
                            ) : (
                              formatNumberCurrency(value)
                            )}
                          </td>
                        ))}
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

export default FinancialIndicators;
