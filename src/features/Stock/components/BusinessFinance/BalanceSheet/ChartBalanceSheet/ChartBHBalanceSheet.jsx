import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataChartBalanceSheet } from "../../../../thunk";
import ChartColumn from "../../components/ChartColumn";

const ChartBHBalanceSheet = ({ queryApiBusinessFinance }) => {
  const dispatch = useDispatch();
  const { dataChartBalanceSheet } = useSelector((state) => state.stock);
  const [timeLine, setTimeLine] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    dispatch(
      fetchDataChartBalanceSheet(
        queryApiBusinessFinance.stock,
        queryApiBusinessFinance.order
      )
    );
  }, [dispatch, queryApiBusinessFinance]);

  useEffect(() => {
    if (dataChartBalanceSheet?.length > 0) {
      let modifiedArray;

      if (queryApiBusinessFinance.order === "0") {
        modifiedArray = dataChartBalanceSheet.map((item) => {
          const year = item.date.slice(0, 4);
          const quarter = item.date.slice(4);

          return { ...item, date: `Quý ${quarter}/${year}` };
        });
      } else {
        modifiedArray = dataChartBalanceSheet.map((item) => {
          return { ...item, date: `Năm ${item.date}` };
        });
      }

      const uniqueDates = [...new Set(modifiedArray?.map((item) => item.date))];
      setTimeLine(uniqueDates);

      const result = [];

      modifiedArray?.forEach((item) => {
        const name = item.name;
        const value = +(item.value / queryApiBusinessFinance.unit).toFixed(2);
        const color = item.color;

        const existingObj = result.find((obj) => obj.name === name);

        if (existingObj) {
          existingObj.data.push(value);
        } else {
          result.push({
            name: name,
            data: [value],
            color,
          });
        }
      });
      setData(result);
    }
  }, [dataChartBalanceSheet, queryApiBusinessFinance]);

  return (
    <div>
      <div className="grid xl:grid-cols-3 lg:grid-cols-none gap-3">
        <div>
          <div className="dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5">
            Tiền
          </div>
          <ChartColumn
            data={Array.isArray(data) && data.slice(0, 1)}
            timeLine={timeLine}
          />
        </div>
        <div>
          <div className="dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5">
            Hàng tồn kho
          </div>
          <ChartColumn
            data={Array.isArray(data) && data.slice(1, 2)}
            timeLine={timeLine}
          />
        </div>
        <div>
          <div className="dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5">
            Tổng cộng tài sản
          </div>
          <ChartColumn
            data={Array.isArray(data) && data.slice(2, 3)}
            timeLine={timeLine}
          />
        </div>
        <div>
          <div className="dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5">
            Nợ phải trả
          </div>
          <ChartColumn
            data={Array.isArray(data) && data.slice(3, 4)}
            timeLine={timeLine}
          />
        </div>
        <div>
          <div className="dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5">
            Vốn chủ sở hữu
          </div>
          <ChartColumn
            data={Array.isArray(data) && data.slice(4, 5)}
            timeLine={timeLine}
          />
        </div>
        <div>
          <div className="dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5">
            Lợi ích cổ dông thiểu số
          </div>
          <ChartColumn
            data={Array.isArray(data) && data.slice(5, 6)}
            timeLine={timeLine}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartBHBalanceSheet;
