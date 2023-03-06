import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const TableBienDong = () => {
    const dataBienDong = useSelector(state => state.chart.dataTableBienDong);
    const [data, setData] = useState([])

    useEffect(() => {
        if (dataBienDong) {
            setData(dataBienDong.data)
        }
    }, [dataBienDong])

    return (
        <>
            <section className="bg-blueGray-50">
                <div className="w-full">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded ">
                        <div className="block w-full bg-[#000000] xl:overflow-x-hidden xxs:overflow-x-scroll xs:overflow-x-scroll">
                            <table className="items-center bg-transparent w-full border-collapse bg-[#000000]">
                                <thead className="bg-gradient-to-b from-cyan-800 to-black">
                                    <tr>
                                        <th className="text-center align-middle px-[5px] py-3 uppercase text-sm font-semibold text-amber-500">
                                            Khung biến động
                                        </th>
                                        {data?.map(item => {
                                            return (
                                                <th key={item.ticker} className="text-center align-middle px-1 py-3 uppercase text-xs font-semibold text-amber-500">
                                                    {item.ticker}
                                                </th>
                                            )
                                        })}
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr className='hover:bg-gray-900'>
                                        <th className=" sticky top-0text-center align-middle uppercase text-sm px-1 py-3.5 text-white">
                                            Phiên trước
                                        </th>
                                        {data?.map(item => {
                                            let color = getColor(item.day_change_percent)
                                            return (
                                                <td key={item.ticker} className={`${color} text-center align-middle text-sm whitespace-nowrap px-1 py-2.5 font-semibold`}>
                                                    {item.day_change_percent.toFixed(2)}%
                                                </td>
                                            )
                                        })}
                                    </tr>
                                    <tr className='hover:bg-gray-900'>
                                        <th className="text-center align-middle uppercase text-sm px-1 py-3.5 text-white">
                                            Trung bình tuần
                                        </th>
                                        {data?.map(item => {
                                            let color = getColor(item.week_change_percent)
                                            return (
                                                <td key={item.ticker} className={`${color} text-center align-middle text-sm whitespace-nowrap px-1 py-2.5 font-semibold`}>
                                                    {item.week_change_percent.toFixed(2)}%
                                                </td>
                                            )
                                        })}
                                    </tr>
                                    <tr className='hover:bg-gray-900'>
                                        <th className="text-center align-middle uppercase text-sm px-1 py-3.5 text-white">
                                            Trung bình tháng
                                        </th>
                                        {data?.map(item => {
                                            let color = getColor(item.month_change_percent)
                                            return (
                                                <td key={item.ticker} className={`${color} text-center align-middle text-sm whitespace-nowrap px-1 py-2.5 font-semibold`}>
                                                    {item.month_change_percent.toFixed(2)}%
                                                </td>
                                            )
                                        })}
                                    </tr>
                                    <tr className='hover:bg-gray-900'>
                                        <th className="text-center align-middle uppercase text-sm px-1 py-3.5 text-white">
                                            Trung bình năm
                                        </th>
                                        {data?.map(item => {
                                            let color = getColor(item.year_change_percent)
                                            return (
                                                <td key={item.ticker} className={`${color} text-center align-middle text-sm whitespace-nowrap px-1 py-2.5 font-semibold`}>
                                                    {item.year_change_percent.toFixed(2)}%
                                                </td>
                                            )
                                        })}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default TableBienDong;

function getColor(item) {
    let color = ''
    if (item === 0)
        color = 'text-yellow-500'
    else if (item < '0')
        color = 'text-red-500'
    else
        color = 'text-green-500'

    return color
}