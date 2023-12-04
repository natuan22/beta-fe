import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../utils/Loading';
import { getColor } from '../utils/utils';

const RateDetail = () => {
  const dataRateDetail = useSelector(state => state.chart.dataRateDetail)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dataRateDetail.data) {
      setLoading(false)
      setData(dataRateDetail.data)
    }
  }, [dataRateDetail])

  return (
    <section className="bg-blueGray-50">
      <div className="w-full">
        <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full mb-6 rounded ">
          <div className="block w-full min-h-[380px] bg-transparent  overflow-y-scroll scrollbar-thin scrollbar-thumb-[#436FB5] dark:scrollbar-track-[#151924] scrollbar-track-transparent h-[380px]">
            <table className="items-center  w-full border-collapse bg-transparent">
              <thead className="bg-[#1E5D8B] sticky top-0">
                <tr>
                  <th className="text-center align-middle xxs:text-[10px] px-4 py-3 text-sm whitespace-nowrap font-semibold text-white">
                    Tỷ giá
                  </th>
                  <th className="text-center align-middle xxs:text-[10px] px-4 py-3 text-sm whitespace-nowrap font-semibold text-white">
                    Giá trị
                  </th>
                  <th className="text-center align-middle xxs:text-[10px] px-4 py-3 text-sm whitespace-nowrap font-semibold text-white">
                    Thay đổi
                  </th>
                </tr>
              </thead>

              <tbody>
                {!loading ? (Array.isArray(data) &&
                  data?.map((item, index) => {
                    let color = getColor(item.Day)

                    return (
                      <tr key={index} className='dark:hover:bg-gray-800 hover:bg-gray-300 duration-500'>
                        <th className="text-center align-middle xxs:text-[10px] text-sm whitespace-nowrap px-3 py-3.5 dark:text-white text-black">
                          {item.name}
                        </th>
                        <td className={`text-center align-middle xxs:text-[10px] text-sm whitespace-nowrap px-3 py-3.5 font-semibold ${color}`}>
                          {item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className={`text-center align-middle xxs:text-[10px] text-sm whitespace-nowrap px-3 py-3.5 font-semibold ${color}`}>
                          {item.Day}
                        </td>
                      </tr>
                    )
                  })) : (<tr><td colSpan={3}><div className="mt-16"><Loading /></div></td></tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RateDetail;


