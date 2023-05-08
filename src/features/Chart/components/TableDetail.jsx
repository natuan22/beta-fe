import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../utils/Loading";
import socket from "../utils/socket";

const TableDetail = () => {
  const dataTable = useSelector((state) => state.chart.dataTableDetail);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (dataTable.data) {
      setData(dataTable.data)
    }
  }, [dataTable]);

  useEffect(() => {
    socket.on("listen-domestic-index", (newData) => {
      setData(newData)
    });
  }, [data])

  return (
    <>
      <section>
        <div className="w-full">
          <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded">
            <div className="block w-full xs:h-[342px] sm:h-[320px] md:h-[336px] lg:h-[350px] xl:h-[344px] 2xl:h-[344px] bg-transparent">
              <table className="items-center w-full border-collapse bg-transparent">
                <thead>
                  <tr className='bg-[#1E5D8B]'>
                    <th className="text-center align-middle px-3 py-2 text-sm font-semibold text-white">
                      Chỉ số
                    </th>
                    <th className="text-center align-middle px-3 py-2 text-sm font-semibold text-white">
                      Điểm
                    </th>
                    <th className="text-center align-middle px-3 py-2 text-sm font-semibold text-white">
                      Thay đổi (điểm)
                    </th>
                    <th className="text-center align-middle px-3 py-2 text-sm font-semibold text-white">
                      Thay đổi (%)
                    </th>
                  </tr>
                </thead>

                <tbody>




                  {dataTable?.data?.length > 0 ? (Array.isArray(data) &&
                    dataTable?.data?.map((item, index) => {
                      let color = getColor(item.percentIndexChange)
                      return (
                        <tr key={index} className='dark:hover:bg-gray-800 hover:bg-gray-300 duration-500'>
                          <th className="text-left px-5 align-middle xs:text-xs md:text-sm lg:text-sm xl:text-[13px] whitespace-nowrap p-3.5 dark:text-white text-black">
                            {item.comGroupCode}
                          </th>
                          <td className={`text-center px-5 align-middle xs:text-xs md:text-sm lg:text-sm xl:text-sm whitespace-nowrap p-3.5 font-semibold ${color}`}>
                            {item.indexValue}
                          </td>
                          <td className={`text-center px-5 align-middle xs:text-xs md:text-sm lg:text-sm xl:text-sm whitespace-nowrap p-3.5 font-semibold ${color}`}>
                            {item.indexChange.toFixed(2)}
                          </td>
                          <td className={`text-center px-5 align-middle xs:text-xs md:text-sm lg:text-sm xl:text-sm whitespace-nowrap p-3.5 font-semibold ${color}`}>
                            {item.percentIndexChange.toFixed(2)}%
                          </td>
                        </tr>
                      )
                    })) : (<tr><td colSpan={4}><div className="mt-16"><Loading /></div></td></tr>)}
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

function getColor(item) {
  let color = "";
  if (item === 0) color = "text-yellow-500";
  else if (item < "0") color = "text-red-500";
  else color = "text-green-500";

  return color;
}