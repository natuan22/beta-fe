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
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded ">
                        <div className="block w-full bg-[#000000] h-80 overflow-y-scroll">
                            <table className="items-center bg-transparent w-full border-collapse bg-[#000000]">
                                <thead className="sticky top-0 bg-gradient-to-b from-cyan-800 to-black">
                                    <tr>
                                        <th className="text-center align-middle px-4 py-3 uppercase text-sm font-semibold text-amber-500">
                                            Mã CK
                                        </th>
                                        <th className="text-center align-middle px-4 py-3 uppercase text-sm font-semibold text-amber-500">
                                            Ngành
                                        </th>
                                        <th className="text-center align-middle px-4 py-3 uppercase text-sm font-semibold text-amber-500">
                                            Giá trị (tỷ đồng)
                                        </th>
                                        <th className="text-center align-middle px-4 py-3 uppercase whitespace-nowrap text-sm font-semibold text-amber-500">
                                            Thay đổi
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {!loading ? (Array.isArray(data) &&
                                        data?.map((item) => {
                                            let color = getColor(item.value_change_percent);
                                            return (
                                                <tr key={item.ticker} className='hover:bg-gray-900'>
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
                                        })) : (<tr><td colSpan={4}><Loading /></td></tr>)}
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