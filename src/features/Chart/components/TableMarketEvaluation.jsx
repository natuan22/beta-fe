import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Loading from "../utils/Loading";
import { getColor, getText } from "../utils/utils";

const TableMarketEvaluation = () => {
    const dataMarketEvaluation = useSelector(state => state.chart.dataMarketEvaluation);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (dataMarketEvaluation?.data) {
            setLoading(false);
            setData(dataMarketEvaluation.data)
        }
    }, [dataMarketEvaluation])

    return (
        <>
            <section className="bg-blueGray-50">
                <div className="w-full">
                    <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded ">
                        <div className="block w-full bg-transparent scrollbar-thin scrollbar-thumb-[#217EBE] scrollbar-track-transparent xl:overflow-x-hidden xs:overflow-x-scroll">
                            <table className="items-center bg-transparent w-full border-collapse">
                                <thead className="bg-[#1E5D8B] ">
                                    <tr >
                                        <th className="text-center align-middle xxs:text-[6px] px-[5px] py-3 uppercase text-sm font-semibold text-white">
                                            Khung biến động
                                        </th>

                                        {Array.isArray(data) && data?.map(item => (
                                            <th key={item.Ticker} className="text-center align-middle xxs:text-[6px] px-1 py-3 uppercase text-xs font-semibold text-white">
                                                {item.Ticker}
                                            </th>
                                        ))}

                                    </tr>
                                </thead>

                                <tbody>
                                    <tr className='dark:hover:bg-gray-800 hover:bg-gray-300 duration-500'>
                                        <th className=" sticky top-0text-center align-middle xxs:text-[6px] uppercase text-sm px-1 py-3.5 dark:text-white text-blacks">
                                            Ngày
                                        </th>
                                        {data?.map(item => {
                                            let color = getColor(item.sigd)
                                            let text = getText(item.sigd)
                                            return (
                                                <td key={item.Ticker} className={`${color} text-center align-middle xxs:text-[6px] text-xs whitespace-nowrap px-1 py-2.5 font-semibold`}>
                                                    {text}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                    <tr className='dark:hover:bg-gray-800 hover:bg-gray-300 duration-500'>
                                        <th className="text-center align-middle xxs:text-[6px] uppercase text-sm px-1 py-3.5 dark:text-white text-blacks">
                                            Tuần
                                        </th>
                                        {data?.map(item => {
                                            let color = getColor(item.sigw)
                                            let text = getText(item.sigw)
                                            return (
                                                <td key={item.Ticker} className={`${color} text-center align-middle xxs:text-[6px] text-xs whitespace-nowrap px-1 py-2.5 font-semibold`}>
                                                    {text}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                    <tr className='dark:hover:bg-gray-800 hover:bg-gray-300 duration-500'>
                                        <th className="text-center align-middle xxs:text-[6px] uppercase text-sm px-1 py-3.5 dark:text-white text-blacks">
                                            Tháng
                                        </th>
                                        {data?.map(item => {
                                            let color = getColor(item.sigm)
                                            let text = getText(item.sigm)
                                            return (
                                                <td key={item.Ticker} className={`${color} text-center align-middle xxs:text-[6px] text-xs whitespace-nowrap px-1 py-2.5 font-semibold`}>
                                                    {text}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                    <tr className='dark:hover:bg-gray-800 hover:bg-gray-300 duration-500'>
                                        <th className="text-center align-middle xxs:text-[6px] uppercase text-sm px-1 py-3.5 dark:text-white text-blacks">
                                            Năm
                                        </th>
                                        {data?.map(item => {
                                            let color = getColor(item.sigy)
                                            let text = getText(item.sigy)

                                            return (
                                                <td key={item.Ticker} className={`${color} text-center align-middle xxs:text-[6px] text-xs whitespace-nowrap px-1 py-2.5 font-semibold`}>
                                                    {text}
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

export default TableMarketEvaluation;


