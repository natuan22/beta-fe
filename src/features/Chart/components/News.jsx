
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const News = () => {
    const dataNews = useSelector((state) => state.chart.dataNews.recordset);
    const [data, setData] = useState(dataNews)

    useEffect(() => {
        setData(dataNews)
    }, [dataNews])

    const sortedData = data && data ? [...data].sort((a, b) => new Date(b.NgayDKCC) - new Date(a.NgayDKCC)) : []
    const news = sortedData.slice(0, 30)

    return (
        <>
            <section className="bg-blueGray-50">
                <div className="w-full">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="block w-full h-80 overflow-y-scroll">
                            <table className="items-center bg-transparent w-full border-collapse">
                                <thead className="sticky top-0 bg-slate-300">
                                    <tr>
                                        <th className="w-20 px-3 bg-blueGray-50 text-blueGray-500 align-middle py-3 text-sm uppercase whitespace-nowrap font-semibold">
                                            Mã chứng khoán
                                        </th>
                                        <th className="w-40 text-center px-3 bg-blueGray-50 text-blueGray-500 align-middle py-3 text-sm uppercase whitespace-nowrap font-semibold">
                                            Loại sự kiện
                                        </th>
                                        <th className="w-20 text-center px-3 bg-blueGray-50 text-blueGray-500 align-middle py-3 text-sm uppercase whitespace-nowrap font-semibold">
                                            Ngày
                                        </th>
                                        <th className="w-64 text-center px-3 bg-blueGray-50 text-blueGray-500 align-middle py-3 text-sm uppercase whitespace-nowrap font-semibold">
                                            Nội dung sự kiện
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {news.map(item => {
                                        return (
                                            <tr>
                                                <th className="text-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                    {item.ticker}
                                                </th>
                                                <td className="text-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 ">
                                                    {item.LoaiSuKien}
                                                </td>
                                                <td className="text-center border-t-0 px-6 align-center border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                                                    {formatDate(new Date(Date.parse(item.NgayDKCC)))}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm p-4">
                                                    {item.NoiDungSuKien}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
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

