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
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
          <div className="block w-full overflow-y-scroll" style={{ height: '25.5rem' }}>
            <table className="items-center bg-transparent w-full border-collapse">
              <thead className="sticky top-0 bg-slate-300">
                <tr>
                  <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle py-3 text-sm whitespace-nowrap font-semibold">
                    Hàng hóa
                  </th>
                  <th className="text-center px-3 bg-blueGray-50 text-blueGray-500 align-middle py-3 text-sm whitespace-nowrap font-semibold">
                    Giá
                  </th>
                  <th className="text-center px-3 bg-blueGray-50 text-blueGray-500 align-middle py-3 text-sm font-semibold">
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
                      <tr key={index}>
                        <th className="text-left border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          {item.name}
                        </th>
                        <td className={`text-center font-semibold border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 ${color}`}>
                          <CurrencyFormat value={item.price.toFixed(2)} displayType={'text'} thousandSeparator={true} />
                        </td>
                        <td className={`text-center font-semibold border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 ${color}`}>
                          {item.Day}
                        </td>
                      </tr>
                    )
                  })) : (<td colSpan={3}><Loading /></td>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GoodsDetail;
