import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../../Chart/utils/Loading';

const TableAverageDebtRatio = () => {
    const dispatch = useDispatch()
    const { dataTableAverageDebtRatio } = useSelector((state) => state.market);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (dataTableAverageDebtRatio) {
            setLoading(false);
            setData(dataTableAverageDebtRatio)
        }
    }, [dataTableAverageDebtRatio])

    return (
        <section className="bg-blueGray-50 pt-1.5">
            <div className="w-full">
                <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded">
                    <div className="block w-full scrollbar-thin scrollbar-thumb-[#436FB5] dark:scrollbar-track-[#151924] scrollbar-track-transparent overflow-y-scroll bg-transparent h-[335px]">
                        <table className="items-center w-full border-collapse bg-transparent">
                            <thead className="bg-[#1E5D8B] z-10" style={{ position: 'sticky', top: 0 }}>
                                <tr>
                                    <th className="text-center align-middle px-1 whitespace-nowrap py-[10px] text-[14px] font-semibold text-white">
                                        Ngành
                                    </th>
                                    <th className="text-center align-middle px-1 py-[10px] text-[14px] font-semibold text-white">
                                        Hệ số thanh toán lãi vay bình quân (lần)
                                    </th>
                                    <th className="text-center align-middle px-1 py-[10px] text-[14px] font-semibold text-white">
                                        Tỷ số khả năng trả nợ (DSCR) (lần)
                                    </th>
                                    <th className="text-center align-middle px-1 py-[10px] text-[14px] font-semibold text-white">
                                        Nợ/Tổng tài sản (lần)
                                    </th>
                                    <th className="text-center align-middle px-1 py-[10px] text-[14px] font-semibold text-white">
                                        Nợ/Vốn chủ sở hữu (lần)
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {!loading ? (
                                    Array.isArray(data) &&
                                    data.map((item, index) => {
                                        return (
                                            <tr key={index} className="dark:hover:bg-gray-800 hover:bg-gray-300 duration-500">
                                                <th className={`text-left align-middle px-1 py-2.5 dark:text-white text-black md:text-base sm:text-sm xs:text-sm xxs:text-xs`}>
                                                    {item.industry}
                                                </th>
                                                <td className={`text-center align-middle px-1 py-2.5 dark:text-white text-black font-semibold md:text-base sm:text-sm xs:text-sm xxs:text-xs`}>
                                                    {item.ICR.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </td>
                                                <td className={`text-center align-middle px-1 py-2.5 dark:text-white text-black font-semibold md:text-base sm:text-sm xs:text-sm xxs:text-xs`}>
                                                    {item.DSCR.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </td>
                                                <td className={`text-center align-middle px-1 py-2.5 dark:text-white text-black font-semibold md:text-base sm:text-sm xs:text-sm xxs:text-xs`}>
                                                    {item.TDTA.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </td>
                                                <td className={`text-center align-middle px-1 py-2.5 dark:text-white text-black font-semibold md:text-base sm:text-sm xs:text-sm xxs:text-xs`}>
                                                    {item.DE.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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

export default TableAverageDebtRatio