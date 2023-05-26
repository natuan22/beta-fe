import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../../Chart/utils/Loading';
import { getColor } from '../../../../Chart/utils/utils';
import { fetchDataTableLiquidityGrowth } from '../../../thunk';

const TableLiquidityGrowth = (props) => {
    const dispatch = useDispatch()
    const { dataTableLiquidityGrowth } = useSelector((state) => state.market);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        dispatch(fetchDataTableLiquidityGrowth(props.exchange, props.industryQuery));
    }, [dispatch, props]);

    useEffect(() => {
        if (dataTableLiquidityGrowth) {
            setLoading(false);
            setData(dataTableLiquidityGrowth)
        }
    }, [dataTableLiquidityGrowth])

    return (
        <section className="bg-blueGray-50 pt-1.5">
            <div className="w-full">
                <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded">
                    <div className="block w-full scrollbar-thin scrollbar-thumb-[#436FB5] dark:scrollbar-track-[#151924] scrollbar-track-transparent overflow-y-scroll bg-transparent h-[330px]">
                        <table className="items-center w-full border-collapse bg-transparent">
                            <thead className="sticky top-0 bg-[#1E5D8B] z-10">
                                <tr>
                                    <th className="text-center align-middle px-3 py-3 text-[13px] whitespace-nowrap font-semibold text-white">
                                        Cổ phiếu
                                    </th>
                                    <th className="text-center align-middle px-3 py-3 text-[13px] font-semibold text-white">
                                        Tăng trưởng thanh khoản so với quý gần nhất (%)
                                    </th>
                                    <th className="text-center align-middle px-3 py-3 text-[13px] font-semibold text-white">
                                        Tăng trưởng thanh khoản so với cùng kỳ năm trước (%)
                                    </th>
                                    <th className="text-center align-middle px-3 py-3 text-[13px] font-semibold text-white">
                                        Tăng trưởng thanh khoản qua 04 năm (%)
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {!loading ? (
                                    Array.isArray(data) &&
                                    data.map((item, index) => {
                                        let colorQuarter = getColor(item.perQuarter);
                                        let colorQuarterLastYear = getColor(item.perQuarterLastYear);
                                        let colorFourYear = getColor(item.perFourYear);

                                        return (
                                            <tr key={index} className="dark:hover:bg-gray-800 hover:bg-gray-300 duration-500">
                                                <th className={`text-center align-middle whitespace-nowrap px-1 py-2.5 dark:text-white text-black`}>
                                                    {item.code}
                                                </th>
                                                <td className={`${colorQuarter} text-center align-middle whitespace-nowrap px-1 py-2.5 font-semibold`}>
                                                    {item.perQuarter.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </td>
                                                <td className={`${colorQuarterLastYear} text-center align-middle whitespace-nowrap px-1 py-2.5 font-semibold`}>
                                                    {item.perQuarterLastYear.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </td>
                                                <td className={`${colorFourYear} text-center align-middle whitespace-nowrap px-1 py-2.5 font-semibold`}>
                                                    {item.perFourYear.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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

export default TableLiquidityGrowth
