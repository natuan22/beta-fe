import React from "react";
import { useSelector } from "react-redux";
import Loading from "../utils/Loading";
import { useState, useEffect } from "react";
import CurrencyFormat from "react-currency-format";

const GoodsDetail = () => {
  const dataGoods = useSelector((state) => state.chart.dataGoodsDetail);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dataGoods[0]) {
      setLoading(false);
      setData(dataGoods);
    }
  }, [dataGoods]);

  return (
    <section className="bg-blueGray-50">
      <div className="w-full">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 ">
          <div className="block w-full overflow-y-scroll h-[380px] bg-[#000000]">
            <table className="items-center bg-transparent w-full border-collapse bg-[#000000]">
              <thead className="sticky top-0 bg-gradient-to-b from-cyan-800 to-black">
                <tr className="bg-gradient-to-b from-cyan-800 to-black">
                  <th className="align-middle px-3 py-3 text-sm font-semibold text-center text-amber-500">
                    Hàng hóa
                  </th>
                  <th className="align-middle px-3 py-3 text-sm font-semibold text-right text-amber-500">
                    Giá
                  </th>
                  <th className="align-middle px-3 py-3 text-sm font-semibold text-right text-amber-500">
                    % thay đổi
                  </th>
                </tr>
              </thead>

              <tbody>
                {!loading ? (Array.isArray(data) &&
                  data.map((item, index) => {
                    let color = ''
                    if (item.Day === '0.00%')
                      color = 'text-yellow-500'
                    else if (item.Day < '0')
                      color = 'text-red-500'
                    else
                      color = 'text-green-500'
                    return (
                      <tr key={index} className='hover:bg-gray-900'>
                        <th className="text-left align-middle text-sm whitespace-nowrap px-3 py-3.5 text-white">
                          {item.name}
                        </th>
                        <td className={`text-right align-middle text-sm whitespace-nowrap px-3 py-3.5 font-semibold ${color}`}>
                          <CurrencyFormat value={item.price.toFixed(2)} displayType={'text'} thousandSeparator={true} />
                        </td>
                        <td className={`text-right align-middle text-sm whitespace-nowrap px-3 py-3.5 font-semibold ${color}`}>
                          {item.Day}
                        </td>
                      </tr>
                    )
                  })) : (<tr><td colSpan={3}><Loading /></td></tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GoodsDetail;