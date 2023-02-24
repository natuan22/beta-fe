import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Loading from '../utils/Loading';

const News = () => {
    const dataNews = useSelector((state) => state.chart.dataNews.recordset);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (dataNews) {
            setLoading(false);
            setData(dataNews)
        }
    }, [dataNews])

    const sortedData = data && data ? [...data].sort((a, b) => new Date(b.NgayDKCC) - new Date(a.NgayDKCC)) : []
    const news = sortedData.slice(0, 30)

    return (
        <section className="bg-blueGray-50" >
            <div className="w-full">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded ">
                    <div className="block w-full h-96 overflow-y-scroll bg-[#000000]">
                        <table className="items-center bg-transparent w-full border-collapse bg-[#000000]">
                            <thead className="sticky top-0 bg-gradient-to-b from-cyan-800 to-black">
                                <tr>
                                    <th className="text-center align-middle px-3 py-3 text-sm whitespace-nowrap font-semibold text-amber-500">
                                        Mã chứng khoán
                                    </th>
                                    <th className="text-center align-middle px-3 py-3 text-sm whitespace-nowrap font-semibold text-amber-500">
                                        Loại sự kiện
                                    </th>
                                    <th className="text-center align-middle px-3 py-3 text-sm whitespace-nowrap font-semibold text-amber-500">
                                        Ngày
                                    </th>
                                    <th className="text-center align-middle px-3 py-3 text-sm whitespace-nowrap font-semibold text-amber-500">
                                        Nội dung sự kiện
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {!loading ? (Array.isArray(data) &&
                                    news.map((item, index) => {
                                        return (
                                            <tr key={index} className='hover:bg-gray-900'>
                                                <th className="text-center align-middle text-xs whitespace-nowrap px-3 p-3.5 text-white">
                                                    {item.ticker}
                                                </th>
                                                <td className="text-center align-middle text-xs whitespace-nowrap px-10 p-3.5 text-white">
                                                    {item.LoaiSuKien}
                                                </td>
                                                <td className="text-center align-center text-xs whitespace-nowrap px-10 p-3.5 text-white">
                                                    {formatDate(new Date(Date.parse(item.NgayDKCC)))}
                                                </td>
                                                <td className="text-left align-middle text-xs px-3 p-4 text-white">
                                                    {item.NoiDungSuKien}
                                                </td>
                                            </tr>
                                        )
                                    })) : (<td colSpan={4}><Loading /></td>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default News

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(date) {
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join('/');
}

