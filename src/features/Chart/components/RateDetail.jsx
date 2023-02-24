import React, { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { useSelector } from 'react-redux';
import Loading from '../utils/Loading';

const RateDetail = () => {
  const dataRateDetail = useSelector(state => state.chart.dataRateDetail.data)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dataRateDetail) {
      setLoading(false)
      setData(dataRateDetail)
    }
  }, [dataRateDetail])

  return (
    <section className="bg-blueGray-50">
      <div className="w-full">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded ">
          <div className="block w-full min-h-[380px] bg-[#000000]">
            <table className="items-center bg-transparent w-full border-collapse bg-[#000000]">
              <thead className="bg-gradient-to-b from-cyan-800 to-black">
                <tr>
                  <th className="text-center align-middle px-4 py-3 text-sm whitespace-nowrap font-semibold text-amber-500">
                    Tỷ giá
                  </th>
                  <th className="text-center align-middle px-4 py-3 text-sm whitespace-nowrap font-semibold text-amber-500">
                    Giá trị
                  </th>
                  <th className="text-center align-middle px-4 py-3 text-sm whitespace-nowrap font-semibold text-amber-500">
                    Thay đổi
                  </th>
                </tr>
              </thead>

              <tbody>
                {!loading ? (Array.isArray(data) &&
                  data?.map((item, index) => {
                    let color = ''
                    if (item['1D'] === '0.00%')
                      color = 'text-yellow-500'
                    else if (item['1D'] < '0')
                      color = 'text-red-500'
                    else
                      color = 'text-green-500'

                    return (
                      <tr key={index} className='hover:bg-gray-900'>
                        <th className="text-center align-middle text-sm whitespace-nowrap px-3 py-3.5 text-white">
                          {item.name}
                        </th>
                        <td className={`text-center align-middle text-sm whitespace-nowrap px-3 py-3.5 font-semibold ${color}`}>
                          <CurrencyFormat value={item.price.toFixed(2)} displayType={'text'} thousandSeparator={true} />
                        </td>
                        <td className={`text-center align-middle text-sm whitespace-nowrap px-3 py-3.5 font-semibold ${color}`}>
                          {item['1D']}
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
  )
}

export default RateDetail;


