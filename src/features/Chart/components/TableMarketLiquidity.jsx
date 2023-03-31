import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Loading from "../utils/Loading";

const TableMarketLiquidity = () => {
    const dataMarketLiquidity = useSelector(state => state.chart.dataTableMarketLiquidity);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (dataMarketLiquidity.data) {
            setLoading(false)
            setData(dataMarketLiquidity.data)
        }
    }, [dataMarketLiquidity])

    return (
        <>
            <section className="bg-blueGray-50">
                <div className="w-full">
                    <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded ">
                        <div className="block w-full bg-transparent scrollbar-thin scrollbar-thumb-[#436FB5] scrollbar-track-[#151924] h-80 overflow-y-scroll">
                            <table className="items-center w-full border-collapse bg-transparent">
                                <thead className="sticky top-0 bg-[#1E5D8B]">
                                    <tr>
                                        <th className="text-center align-middle px-4 py-3 uppercase text-xs font-semibold text-white">
                                            Mã CK
                                        </th>
                                        <th className="text-center align-middle px-4 py-3 uppercase text-xs font-semibold text-white">
                                            Ngành
                                        </th>
                                        <th className="text-center align-middle px-4 py-3 uppercase text-xs font-semibold text-white">
                                            Giá trị (tỷ đồng)
                                        </th>
                                        <th className="text-center align-middle px-4 py-3 uppercase whitespace-nowrap text-xs font-semibold text-white">
                                            Thay đổi
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {!loading ? (Array.isArray(data) &&
                                        data?.map((item) => {
                                            let color = getColor(item.value_change_percent);
                                            return (
                                                <tr key={item.ticker} className='hover:bg-gray-800'>
                                                    <th className={`text-center align-middle text-sm whitespace-nowrap px-2 py-2 ${color}`}>
                                                        {item.ticker}
                                                    </th>
                                                    <td className={`text-center align-middle text-xs px-2 py-2 font-semibold ${color}`}>
                                                        {item.industry}
                                                    </td>
                                                    <td className={`text-center align-middle text-sm whitespace-nowrap px-2 py-2 font-semibold ${color}`}>
                                                        {item.value.toFixed(2)}
                                                    </td>
                                                    <td className={`text-center align-middle text-sm whitespace-nowrap px-2 py-2 font-semibold ${color}`}>
                                                        {item.value_change_percent.toFixed(2)}%
                                                    </td>
                                                </tr>
                                            )
                                        })) : (<tr><td colSpan={4}><div className="mt-16"><Loading /></div></td></tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default TableMarketLiquidity;

function getColor(item) {
    let color = "";
    if (item === 0) color = "text-yellow-500";
    else if (item < "0") color = "text-red-500";
    else color = "text-green-500";

    return color;
}