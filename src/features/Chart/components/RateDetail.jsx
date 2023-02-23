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
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
          <div className="block w-full" style={{ height: '25.5rem' }}>
            <table className="items-center bg-transparent w-full border-collapse">
              <thead className="bg-slate-300">
                <tr>
                  <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle py-3 text-sm whitespace-nowrap font-semibold">
                    Tỷ giá
                  </th>
                  <th className="text-center px-3 bg-blueGray-50 text-blueGray-500 align-middle py-3 text-sm whitespace-nowrap font-semibold">
                    Giá trị
                  </th>
                  <th className="text-center px-3 bg-blueGray-50 text-blueGray-500 align-middle py-3 text-sm whitespace-nowrap font-semibold">
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
                      <tr key={index}>
                        <th className="text-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-blueGray-700 ">
                          {item.name}
                        </th>
                        <td className={`${color} text-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 font-semibold`}>
                          <CurrencyFormat value={item.price.toFixed(2)} displayType={'text'} thousandSeparator={true} />
                        </td>
                        <td className={`${color} text-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 font-semibold`}>
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


