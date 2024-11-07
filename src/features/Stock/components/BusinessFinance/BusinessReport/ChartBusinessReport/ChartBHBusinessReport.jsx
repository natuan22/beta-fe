import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataChartBusinessReport } from "../../../../thunk";
import ChartColumnLine from "../../components/ChartColumnLine";

const ChartBHBusinessReport = ({ queryApiBusinessFinance }) => {
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
          const modifiedName = `${item.name.toLowerCase()}`;
          const year = item.date.slice(0, 4);
          const quarter = item.date.slice(4);
          return {
            ...item,
            name: modifiedName,
            date: `Quý ${quarter}/${year}`,
          };
        });
      } else {
        modifiedArray = dataChartBusinessReport.map((item) => {
          const modifiedName = `${item.name.toLowerCase()}`;
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
          type: "spline",
          yAxis: 1,
          color: "#F0CA00",
        };

        modifiedData.push(newDataItem);
        modifiedData.push(newPerDataItem);
      });
      modifiedData = modifiedData.map((item) => {
        if (item.type === "spline") {
          return { ...item, name: `tăng trưởng ${item.name}` };
        }
        return item;
      });
      modifiedData = modifiedData.map((item) => {
        const modifiedName = `${
          item.name.trim().charAt(0).toUpperCase() +
          item.name.slice(1).toLowerCase()
        }`;
        return { ...item, name: modifiedName };
      });
      setData(modifiedData);
    }
  }, [dataChartBusinessReport, queryApiBusinessFinance]);

  return (
    <div>
      <div className="grid xl:grid-cols-3 lg:grid-cols-none gap-3">
        <div>
          <div className="dark:text-white text-black font-semibold mt-10 mb-2 text-center">
            Doanh thu thuần hoạt động Kinh doanh Bảo hiểm
          </div>
          <ChartColumnLine
            data={Array.isArray(data) && data.slice(0, 2)}
            timeLine={timeLine}
          />
        </div>
        <div>
          <div className="dark:text-white text-black font-semibold mt-10 mb-2 text-center">
            Lợi nhuận gộp hoạt động kinh doanh bảo hiểm
          </div>
          <ChartColumnLine
            data={Array.isArray(data) && data.slice(2, 4)}
            timeLine={timeLine}
          />
        </div>
        <div>
          <div className="dark:text-white text-black font-semibold mt-10 mb-2 text-center">
            Chi phí hoạt động kinh doanh bảo hiểm
          </div>
          <ChartColumnLine
            data={Array.isArray(data) && data.slice(4, 6)}
            timeLine={timeLine}
          />
        </div>
        <div>
          <div className="dark:text-white text-black font-semibold mt-10 mb-2 text-center">
            Tổng lợi nhuận trước thuế
          </div>
          <ChartColumnLine
            data={Array.isArray(data) && data.slice(6, 8)}
            timeLine={timeLine}
          />
        </div>
        <div>
          <div className="dark:text-white text-black font-semibold mt-10 mb-2 text-center">
            Lợi nhuận sau thuế TNDN
          </div>
          <ChartColumnLine
            data={Array.isArray(data) && data.slice(8, 10)}
            timeLine={timeLine}
          />
        </div>
        <div>
          <div className="dark:text-white text-black font-semibold mt-10 mb-2 text-center">
            Tổng chi bồi thường bảo hiểm
          </div>
          <ChartColumnLine
            data={Array.isArray(data) && data.slice(10, 12)}
            timeLine={timeLine}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartBHBusinessReport;
