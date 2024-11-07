import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataChartBusinessReport } from "../../../../thunk";
import ChartColumn from "../../components/ChartColumn";
import ChartColumnLine from "../../components/ChartColumnLine";

const ChartCKBusinessReport = ({ queryApiBusinessFinance }) => {
  const dispatch = useDispatch();
  const { dataChartBusinessReport } = useSelector((state) => state.stock);
  const [timeLine, setTimeLine] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    dispatch(
      fetchDataChartBusinessReport(
        queryApiBusinessFinance.stock,
        queryApiBusinessFinance.order,
      ),
    );
  }, [dispatch, queryApiBusinessFinance]);

  useEffect(() => {
    if (dataChartBusinessReport?.length > 0) {
      let modifiedArray;

      if (queryApiBusinessFinance.order === "0") {
        modifiedArray = dataChartBusinessReport.map((item) => {
          const modifiedName = `${
            item.name.trim().charAt(0).toUpperCase() +
            item.name.slice(1).toLowerCase()
          }`;
          const year = item.date.slice(0, 4);
          const quarter = item.date.slice(4);
          // chuoi.charAt(0).toUpperCase() + chuoi.slice(1)
          return {
            ...item,
            name: modifiedName,
            date: `Quý ${quarter}/${year}`,
          };
        });
      } else {
        modifiedArray = dataChartBusinessReport.map((item) => {
          const modifiedName = `${
            item.name.trim().charAt(0).toUpperCase() +
            item.name.slice(1).toLowerCase()
          }`;
          return { ...item, name: modifiedName, date: `Năm ${item.date}` };
        });
      }

      const uniqueDates = [...new Set(modifiedArray?.map((item) => item.date))];
      setTimeLine(uniqueDates);

      const result = [];

      modifiedArray?.forEach((item) => {
        const name = item.name;
        const value = +(item.value / queryApiBusinessFinance.unit).toFixed(2);
        const per = +item.per.toFixed(2);
        const color = item.color;

        const existingObj = result.find((obj) => obj.name === name);

        if (existingObj) {
          existingObj.data.push(value);
          existingObj.perData.push(per);
        } else {
          result.push({
            name: name,
            data: [value],
            perData: [per],
            color,
          });
        }
      });

      let modifiedData = [];

      result.forEach((item) => {
        let newDataItem = {
          name: item.name,
          data: item.data,
          color: item.color,
          type: "column",
          yAxis: 0,
        };
        let newPerDataItem = {
          name: item.name,
          data: item.perData,
          color: item.color,
          type: "spline",
          yAxis: 1,
        };

        modifiedData.push(newDataItem);
        modifiedData.push(newPerDataItem);
      });
      modifiedData = modifiedData.map((item) => {
        if (item.name === "Doanh thu hoạt động" && item.type === "spline") {
          return {
            ...item,
            color: "#FE0211",
            name: "Tăng trưởng lợi nhuận hoạt động",
          };
        } else if (
          item.name === "Doanh thu hoạt động tài chính" &&
          item.type === "spline"
        ) {
          return {
            ...item,
            color: "#0BFF23",
            name: "Tăng trưởng lợi nhuận tài chính",
          };
        }
        return item;
      });
      setData(modifiedData);
    }
  }, [dataChartBusinessReport, queryApiBusinessFinance]);

  return (
    <div>
      <div>
        <div className="dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5">
          Lợi nhuận hoạt động
        </div>
        <ChartColumnLine
          data={Array.isArray(data) && data.slice(0, 3)}
          timeLine={timeLine}
        />
      </div>
      <div>
        <div className="dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5">
          Lợi nhuận tài chính
        </div>
        <ChartColumnLine
          data={Array.isArray(data) && data.slice(4, 7)}
          timeLine={timeLine}
        />
      </div>
      <div className="grid xl:grid-cols-2 lg:grid-cols-none gap-3">
        <div>
          <div className="dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5">
            Lợi nhuận kế toán trước thuế
          </div>
          <ChartColumn
            data={Array.isArray(data) && data.slice(8, 9)}
            timeLine={timeLine}
          />
        </div>
        <div>
          <div className="dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5">
            Lợi nhuận kế toán sau thuế
          </div>
          <ChartColumn
            data={Array.isArray(data) && data.slice(10, 11)}
            timeLine={timeLine}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartCKBusinessReport;
