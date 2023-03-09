import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../utils/Loading";

const TableDetail = () => {
  const dataTable = useSelector((state) => state.chart.dataTableDetail);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dataTable.data) {
      setLoading(false);
      setData(dataTable.data)
    }
  }, [dataTable]);

  return (
    <>
      <section>
        <div className="w-full">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full rounded">
            <div className="block w-full xs:min-h-[352px] xxs:min-h-[332px] sm:min-h-[312px] md:min-h-[336px] lg:min-h-[350px] xl:min-h-[350px] bg-[#000000]">
              <table className="items-center w-full border-collapse bg-[#000000]">
                <thead>
                  <tr className='bg-gradient-to-b from-cyan-800 to-black'>
                    <th className="text-center align-middle px-3 py-2 text-sm font-semibold text-amber-500">
                      Chỉ số
                    </th>
                    <th className="text-center align-middle px-3 py-2 text-sm font-semibold text-amber-500">
                      Điểm
                    </th>
                    <th className="text-center align-middle px-3 py-2 text-sm font-semibold text-amber-500">
                      Thay đổi (điểm)
                    </th>
                    <th className="text-center align-middle px-3 py-2 text-sm font-semibold text-amber-500">
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
                        <tr key={index} className='hover:bg-gray-900'>
                          <th className="text-left px-5 align-middle xs:text-xs md:text-sm lg:text-sm xl:text-sm whitespace-nowrap p-3.5 text-white">
                            {item.ticker}
                          </th>
                          <td className={`text-center px-5 align-middle xs:text-xs md:text-sm lg:text-sm xl:text-sm whitespace-nowrap p-3.5 font-semibold ${color}`}>
                            {item.close_price}
                          </td>
                          <td className={`text-center px-5 align-middle xs:text-xs md:text-sm lg:text-sm xl:text-sm whitespace-nowrap p-3.5 font-semibold ${color}`}>
                            {item.change_price.toFixed(2)}
                          </td>
                          <td className={`text-center px-5 align-middle xs:text-xs md:text-sm lg:text-sm xl:text-sm whitespace-nowrap p-3.5 font-semibold ${color}`}>
                            {item.percent_d.toFixed(2)}%
                          </td>
                        </tr>
                      )
                    })) : (<tr><td colSpan={4}><Loading /></td></tr>)}
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