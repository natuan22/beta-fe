import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Loading from '../../../../Chart/utils/Loading';
import { getColor } from '../../../../Chart/utils/utils';

const TableLiabilitiesGrowth = () => {
    const { dataTableLiabilitiesGrowth } = useSelector((state) => state.market);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (dataTableLiabilitiesGrowth) {
            setLoading(false);
            setData(dataTableLiabilitiesGrowth)
        }
    }, [dataTableLiabilitiesGrowth])

    return (
        <section className="bg-blueGray-50 pt-1.5">
            <div className="w-full">
                <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded">
                    <div className="block w-full scrollbar-thin scrollbar-thumb-[#436FB5] dark:scrollbar-track-[#151924] scrollbar-track-transparent overflow-y-scroll bg-transparent h-[350px]">
                        <table className="items-center w-full border-collapse bg-transparent">
                            <thead className="sticky top-0 bg-[#1E5D8B] z-10">
                                <tr>
                                    <th className="text-center align-middle px-3 py-[19px] text-[14px] md:whitespace-nowrap sm:whitespace-normal font-semibold text-white">
                                        Cổ phiếu
                                    </th>
                                    <th className="text-center align-middle px-3 py-[19px] text-[14px] font-semibold text-white">
                                        Tăng trưởng nợ ngắn hạn (%)
                                    </th>
                                    <th className="text-center align-middle px-3 py-[19px] text-[14px] font-semibold text-white">
                                        Tăng trưởng nợ dài hạn (%)
                                    </th>
                                    <th className="text-center align-middle px-3 py-[19px] text-[14px] font-semibold text-white">
                                        Tỷ số thanh toán nhanh (Lần)
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {!loading ? (
                                    Array.isArray(data) &&
                                    data.map((item, index) => {
                                        let colorNoNganHan = getColor(item.noNganHan);
                                        let colorNoDaiHan = getColor(item.noDaiHan);

                                        return (
                                            <tr key={index} className="dark:hover:bg-gray-800 hover:bg-gray-300 duration-500">
                                                <th className={`text-center align-middle whitespace-nowrap px-1 py-2.5 md:text-base sm:text-sm xs:text-sm xxs:text-xs dark:text-white text-black`}>
                                                    {item.code}
                                                </th>
                                                <td className={`${colorNoNganHan} text-center align-middle whitespace-nowrap px-1 py-2.5 md:text-base sm:text-sm xs:text-sm xxs:text-xs font-semibold`}>
                                                    {item.noNganHan.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </td>
                                                <td className={`${colorNoDaiHan} text-center align-middle whitespace-nowrap px-1 py-2.5 md:text-base sm:text-sm xs:text-sm xxs:text-xs font-semibold`}>
                                                    {item.noDaiHan.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </td>
                                                <td className={`text-center align-middle whitespace-nowrap px-1 py-2.5 md:text-base sm:text-sm xs:text-sm xxs:text-xs font-semibold dark:text-white text-black`}>
                                                    {item.tiSoThanhToanNhanh.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </td>
                                            </tr>
                                        )
                                    })
                                ) : (
                                    <tr><td colSpan={4}><div className="mt-16"><Loading /></div></td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TableLiabilitiesGrowth