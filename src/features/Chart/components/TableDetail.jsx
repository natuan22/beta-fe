import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../utils/Loading";

const TableDetail = () => {
  const dataTable = useSelector((state) => state.chart.dataTableDetail);
  console.log(dataTable);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dataTable[0]) {
      setLoading(false);
      setData(dataTable)
      console.log('change')
    }
  }, [dataTable]);


  if (loading) {
    return <Loading />;
  } else {
    return (
      <div style={{ border: "solid 1px black" }} className="p-2">
        <table className="table-auto " style={{ width: "100%" }}>
          <thead>
            <tr className="font-bold text-sm ">
              <th className="w-24 text-left">Chỉ số</th>
              <th className="w-25 text-left">Điểm </th>
              <th className="w-32 mr-3">Thay đổi (điểm)</th>
              <th className="w-25">Thay đổi (%)</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) &&
              data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="font-semibold text-base">{item.ticker}</td>
                    {item.close_price < "0" ? (
                      <td className="font-semibold text-red-500">
                        {item.close_price}
                      </td>
                    ) : (
                      <td className="font-semibold text-green-500">
                        {item.close_price}
                      </td>
                    )}
                    {item.percent_d < "0" ? (
                      <td className="font-semibold text-red-500 text-center">
                        {item.percent_d}%
                      </td>
                    ) : (
                      <td className="font-semibold text-green-500 text-center">
                        {item.percent_d}%
                      </td>
                    )}
                    {item.percent_d < "0" ? (
                      <td className="font-semibold text-red-500 text-center">
                        {item.percent_d}%
                      </td>
                    ) : (
                      <td className="font-semibold text-green-500 text-center">
                        {item.percent_d}%
                      </td>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default TableDetail;
