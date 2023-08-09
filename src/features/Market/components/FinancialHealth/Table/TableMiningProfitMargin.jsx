import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Loading from '../../../../Chart/utils/Loading';
import { getColor } from '../../../../Chart/utils/utils';

const TableMiningProfitMargin = () => {
    const { dataTableMiningProfitMargin } = useSelector((state) => state.market);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (dataTableMiningProfitMargin) {
            setLoading(false);
            setData(dataTableMiningProfitMargin)
        }
    }, [dataTableMiningProfitMargin])
    // console.log(dataTableMiningProfitMargin)
    return (
        <section className="bg-blueGray-50 pt-1.5">
            <div className="w-full">
                <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded">
                    <div className="block w-full scrollbar-thin scrollbar-thumb-[#436FB5] dark:scrollbar-track-[#151924] scrollbar-track-transparent overflow-y-scroll bg-transparent h-[350px]">
                        <table className="items-center w-full border-collapse bg-transparent">
                            <thead className="bg-[#1E5D8B] z-10" style={{ position: 'sticky', top: 0 }}>
                                <tr>
                                    <th className="text-center align-middle px-2 py-[19px] text-[13px] whitespace-nowrap font-semibold text-white">
                                        Ngành
                                    </th>
                                    <th className="text-center align-middle px-2 py-[19px] text-[13px] font-semibold text-white">
                                        Tỷ suất lợi nhuận gộp biên (%)
                                    </th>
                                    <th className="text-center align-middle px-2 py-[19px] text-[13px] font-semibold text-white">
                                        Tỷ suất lợi nhuận ròng (%)
                                    </th>
                                    <th className="text-center align-middle px-2 py-[19px] text-[13px] font-semibold text-white">
                                        Lợi nhuận trên tài sản (%)
                                    </th>
                                    <th className="text-center align-middle px-2 py-[19px] text-[13px] font-semibold text-white">
                                        Lợi nhuận trên VCSH (%)
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {!loading ? (
                                    Array.isArray(data) &&
                                    data.map((item, index) => {
                                        return (
                                            <tr key={index} className="dark:hover:bg-gray-800 hover:bg-gray-300 duration-500">
                                                <th className={`text-left align-middle whitespace-nowrap px-1 py-2.5 dark:text-white text-black md:text-base sm:text-sm xs:text-sm xxs:text-xs`}>
                                                    {item.industry}
                                                </th>
                                                <td className={`${getColor(item.gpm)} text-center align-middle whitespace-nowrap px-1 py-2.5 font-semibold md:text-base sm:text-sm xs:text-sm xxs:text-xs`}>
                                                    {item.gpm.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </td>
                                                <td className={`${getColor(item.npm)} text-center align-middle whitespace-nowrap px-1 py-2.5 font-semibold md:text-base sm:text-sm xs:text-sm xxs:text-xs`}>
                                                    {item.npm.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </td>
                                                <td className={`${getColor(item.roa)} text-center align-middle whitespace-nowrap px-1 py-2.5 font-semibold md:text-base sm:text-sm xs:text-sm xxs:text-xs`}>
                                                    {item.roa.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </td>
                                                <td className={`${getColor(item.roe)} text-center align-middle whitespace-nowrap px-1 py-2.5 font-semibold md:text-base sm:text-sm xs:text-sm xxs:text-xs`}>
                                                    {item.roe.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </td>
                                            </tr>
                                        )
                                    })
                                ) : (
                                    <tr><td colSpan={5}><div className="mt-16"><Loading /></div></td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TableMiningProfitMargin