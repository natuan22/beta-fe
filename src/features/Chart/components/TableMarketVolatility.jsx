import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Loading from "../utils/Loading";
import socket from "../utils/socket";
import { getColor } from "../utils/utils";

const TableMarketVolatility = () => {
    const dataMarketVolatility = useSelector(state => state.chart.dataTableMarketVolatility);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (dataMarketVolatility?.data) {
            setLoading(false);
            setData(dataMarketVolatility.data)
        }
    }, [dataMarketVolatility])

    useEffect(() => {
        if (dataMarketVolatility?.data) {
            socket.on("listen-bien-dong-thi-truong", (newData) => {
                setData(newData)
            })
        }
    }, [dataMarketVolatility])

    return (
        <>
            <section className="bg-blueGray-50">
                <div className="w-full">
                    <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded ">
                        <div className="block w-full bg-transparent scrollbar-thin scrollbar-thumb-[#217EBE] scrollbar-track-transparent xl:overflow-x-hidden xs:overflow-x-scroll">
                            <table className="items-center bg-transparent w-full border-collapse">
                                <thead className="bg-[#1E5D8B]">
                                    <tr>
                                        <th className="text-center align-middle xxs:text-[7px] px-[5px] py-3 uppercase text-sm font-semibold text-white">
                                            Khung biến động
                                        </th>
                                        {!loading ? (Array.isArray(data) && data?.map(item => {
                                            return (
                                                <th key={item.ticker} className="text-center align-middle xxs:text-[7px] px-1 py-3 uppercase text-xs font-semibold text-white">
                                                    {item.ticker}
                                                </th>
                                            )
                                        })) : (<th colSpan={5}><Loading /></th>)}
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr className='dark:hover:bg-gray-800 hover:bg-gray-300 duration-500'>
                                        <th className=" sticky top-0text-center align-middle xxs:text-[7px] uppercase text-sm px-1 py-3.5 dark:text-white text-black">
                                            Phiên trước
                                        </th>
                                        {data?.map(item => {
                                            let color = getColor(item.day_change_percent)
                                            return (
                                                <td key={item.ticker} className={`${color} text-center align-middle xxs:text-[7px] text-sm whitespace-nowrap px-1 py-2.5 font-semibold`}>
                                                    {item.day_change_percent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                                                </td>
                                            )
                                        })}
                                    </tr>
                                    <tr className='dark:hover:bg-gray-800 hover:bg-gray-300 duration-500'>
                                        <th className="text-center align-middle xxs:text-[7px] uppercase text-sm px-1 py-3.5 dark:text-white text-black">
                                            Trung bình tuần
                                        </th>
                                        {data?.map(item => {
                                            let color = getColor(item.week_change_percent)
                                            return (
                                                <td key={item.ticker} className={`${color} text-center align-middle xxs:text-[7px] text-sm whitespace-nowrap px-1 py-2.5 font-semibold`}>
                                                    {item.week_change_percent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                                                </td>
                                            )
                                        })}
                                    </tr>
                                    <tr className='dark:hover:bg-gray-800 hover:bg-gray-300 duration-500'>
                                        <th className="text-center align-middle xxs:text-[7px] uppercase text-sm px-1 py-3.5 dark:text-white text-black">
                                            Trung bình tháng
                                        </th>
                                        {data?.map(item => {
                                            let color = getColor(item.month_change_percent)
                                            return (
                                                <td key={item.ticker} className={`${color} text-center align-middle xxs:text-[7px] text-sm whitespace-nowrap px-1 py-2.5 font-semibold`}>
                                                    {item.month_change_percent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                                                </td>
                                            )
                                        })}
                                    </tr>
                                    <tr className='dark:hover:bg-gray-800 hover:bg-gray-300 duration-500'>
                                        <th className="text-center align-middle xxs:text-[7px] uppercase text-sm px-1 py-3.5 dark:text-white text-black">
                                            Trung bình năm
                                        </th>
                                        {data?.map(item => {
                                            let color = getColor(item.year_change_percent)
                                            return (
                                                <td key={item.ticker} className={`${color} text-center align-middle xxs:text-[7px] text-sm whitespace-nowrap px-1 py-2.5 font-semibold`}>
                                                    {item.year_change_percent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
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

export default TableMarketVolatility;
