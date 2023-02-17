import React from 'react'
import { useSelector } from 'react-redux';

const News = () => {
    const dataNews = useSelector((state) => state.chart.dataNews.recordset);
    return (
        <>
            <div>
                <div className="flex flex-col">
                    <div className="overflow-x sm:-mx-6 lg:-mx-8">
                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="max-h-96 overflow-y-scroll">
                                <table className="min-w-full text-center">
                                    <thead className="border-b sticky top-0 bg-slate-300">
                                        <tr>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                                Mã chứng khoán
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                                Loại sự kiện
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                                Ngày
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                                Nội dung sự kiện
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataNews?.map(item => {
                                            return (
                                                <tr className="bg-white border-b">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> {item.ticker} </td>
                                                    <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                                                        {item.LoaiSuKien}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                                                        {formatDate(new Date(Date.parse(item.NgayDKCC)))}
                                                    </td>
                                                    <td className="text-sm text-justify text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
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
                </div>
            </div>
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

