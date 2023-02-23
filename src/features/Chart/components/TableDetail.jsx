import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../utils/Loading";

const TableDetail = () => {
  const dataTable = useSelector((state) => state.chart.dataTableDetail);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dataTable[0]) {
      setLoading(false);
      setData(dataTable)
    }
  }, [dataTable]);

  return (
    <>
      <section className="bg-blueGray-50">
        <div className="w-full">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded ">
            <div className="block w-full" style={{ height: '400px' }}>
              <table className="items-center bg-transparent w-full border-collapse">
                <thead className="bg-slate-300">
                  <tr>
                    <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle py-3 text-sm whitespace-nowrap font-semibold">
                      Chỉ số
                    </th>
                    <th className="text-center px-3 bg-blueGray-50 text-blueGray-500 align-middle py-3 text-sm whitespace-nowrap font-semibold">
                      Điểm
                    </th>
                    <th className="text-center px-3 bg-blueGray-50 text-blueGray-500 align-middle py-3 text-sm font-semibold">
                      Thay đổi (điểm)
                    </th>
                    <th className="text-center px-3 bg-blueGray-50 text-blueGray-500 align-middle py-3 text-sm font-semibold">
                      Thay đổi (%)
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {!loading ? (Array.isArray(data) &&
                    data.map((item, index) => {
                      let color = ''
                      if (item.percent_d === '0.00%')
                        color = 'text-yellow-500'
                      else if (item.percent_d < '0')
                        color = 'text-red-500'
                      else
                        color = 'text-green-500'
                      return (
                        <tr key={index}>
                          <th className="text-left border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap text-left text-blueGray-700" style={{ padding: '18px' }}>
                            {item.ticker}
                          </th>
                          <td className={`text-center font-semibold border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap ${color}`} style={{ padding: '18px' }}>
                            {item.close_price}
                          </td>
                          <td className={`text-center font-semibold border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap ${color}`} style={{ padding: '18px' }}>
                            {/* {(item.close_price * item.percent_d / 100).toFixed(2)} */}
                            ko bít
                          </td>
                          <td className={`text-center font-semibold border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap ${color}`} style={{ padding: '18px' }}>
                            {item.percent_d}%
                          </td>
                        </tr>
                      )
                    })) : (<td colSpan={4}><Loading /></td>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TableDetail;
