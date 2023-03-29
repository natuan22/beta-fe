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
    if (dataGoods.data) {
      setLoading(false);
      setData(dataGoods.data);
    }
  }, [dataGoods]);

  return (
    <section className="bg-blueGray-50">
      <div className="w-full">
        <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full mb-6 ">
          <div className="block w-full overflow-y-scroll scrollbar-thin scrollbar-thumb-[#436FB5] scrollbar-track-[#151924] h-[380px] bg-transparent">
            <table className="items-center w-full border-collapse bg-transparent">
              <thead className="sticky top-0 bg-[#1E5D8B]">
                <tr className="bg-[#1E5D8B]">
                  <th className="align-middle px-3 py-3 text-sm font-semibold text-center text-white">
                    Hàng hóa
                  </th>
                  <th className="align-middle px-3 py-3 text-sm font-semibold text-right text-white">
                    Giá
                  </th>
                  <th className="align-middle px-3 py-3 text-sm font-semibold text-right text-white">
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
                      <tr key={index} className='hover:bg-gray-800'>
                        <th className="text-left align-middle md:text-sm xs:text-xs whitespace-nowrap px-3 py-3.5 text-white">
                          {item.name} ({item.unit})
                        </th>
                        <td className={`text-right align-middle md:text-sm xs:text-xs whitespace-nowrap px-3 py-3.5 font-semibold ${color}`}>
                          <CurrencyFormat value={item.price.toFixed(2)} displayType={'text'} thousandSeparator={true} />
                        </td>
                        <td className={`text-right align-middle md:text-sm xs:text-xs whitespace-nowrap px-3 py-3.5 font-semibold ${color}`}>
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