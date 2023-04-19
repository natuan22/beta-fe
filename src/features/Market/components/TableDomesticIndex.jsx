import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../Chart/utils/Loading";

const TableDomesticIndex = () => {
    const dataTable = useSelector((state) => state.chart.dataTableDetail);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (dataTable.data) {
            setLoading(false);
            setData(dataTable.data)
        }
    }, [dataTable]);

    return (
        <>
            <section>
                <div className="w-full">
                    <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded">
                        <div className="block w-full bg-transparent xs:min-h-[300px] md:min-h-[300px] lg:min-h-[300px] xl:min-h-[300px] 2xl:min-h-[300px]">
                            <table className="items-center w-full border-collapse bg-transparent">
                                <thead>
                                    <tr className='bg-[#1E5D8B]'>
                                        <th className="text-center align-middle px-1.5 py-2 text-sm font-semibold text-white">
                                            Chỉ số
                                        </th>
                                        <th className="text-center align-middle px-1.5 py-2 text-sm font-semibold text-white">
                                            Điểm số
                                        </th>
                                        <th className="text-center align-middle px-1.5 py-2 text-sm font-semibold text-white">
                                            % Thay đổi
                                        </th>
                                        <th className="text-center align-middle px-1.5 py-2 text-sm font-semibold text-white">
                                            Khối lượng
                                        </th>
                                        <th className="text-center align-middle px-1.5 py-2 text-sm font-semibold text-white">
                                            Giá trị
                                        </th>
                                        <th className="text-center align-middle px-1.5 py-2 text-sm font-semibold text-white">
                                            GTNN ròng
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {!loading ? (Array.isArray(data) &&
                                        data.map((item, index) => {
                                            let color = getColor(item.percent_d)
                                            let color2 = getColor(item.net_value_foreign)
                                            return (
                                                <tr key={index} className='hover:bg-gray-800'>
                                                    <th className="text-left px-3 align-middle xs:text-xs md:text-sm lg:text-sm xl:text-[13px] whitespace-nowrap p-3.5 text-white">
                                                        {item.ticker}
                                                    </th>
                                                    <td className={`text-center px-1.5 align-middle xs:text-xs md:text-sm lg:text-sm xl:text-sm whitespace-nowrap p-3.5 font-semibold ${color}`}>
                                                        {item.price}
                                                    </td>
                                                    <td className={`text-center px-1.5 align-middle xs:text-xs md:text-sm lg:text-sm xl:text-sm whitespace-nowrap p-3.5 font-semibold ${color}`}>
                                                        {item.percent_d.toFixed(2)}%
                                                    </td>
                                                    <td className={`text-center px-1.5 align-middle xs:text-xs md:text-sm lg:text-sm xl:text-sm whitespace-nowrap p-3.5 font-semibold ${color}`}>
                                                        {item.volume}
                                                    </td>
                                                    <td className={`text-center px-1.5 align-middle xs:text-xs md:text-sm lg:text-sm xl:text-sm whitespace-nowrap p-3.5 font-semibold ${color}`}>
                                                        {item.value}
                                                    </td>
                                                    <td className={`text-center px-1.5 align-middle xs:text-xs md:text-sm lg:text-sm xl:text-sm whitespace-nowrap p-3.5 font-semibold ${color2}`}>
                                                        {item.net_value_foreign}
                                                    </td>
                                                </tr>
                                            )
                                        })) : (<tr><td colSpan={6}><div className="mt-16"><Loading /></div></td></tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default TableDomesticIndex;

function getColor(item) {
    let color = "";
    if (item === 0) color = "text-yellow-500";
    else if (item < 0) color = "text-red-500";
    else color = "text-green-500";

    return color;
}