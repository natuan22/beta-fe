import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../../Chart/utils/Loading';
import { getColor } from '../../../../Chart/utils/utils';
import { fetchDataTableEquityGrowth } from '../../../thunk';

const TableEquityGrowth = (props) => {
    const dispatch = useDispatch()
    const { dataTableEquityGrowth } = useSelector((state) => state.market);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        dispatch(fetchDataTableEquityGrowth(props.exchange, props.industryQuery));
    }, [dispatch, props]);

    useEffect(() => {
        if (dataTableEquityGrowth) {
            setLoading(false);
            setData(dataTableEquityGrowth)
        }
    }, [dataTableEquityGrowth])

    return (
        <section className="bg-blueGray-50 pt-1.5">
            <div className="w-full">
                <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded">
                    <div className="block w-full scrollbar-thin scrollbar-thumb-[#436FB5] dark:scrollbar-track-[#151924] scrollbar-track-transparent overflow-y-scroll bg-transparent h-[350px]">
                        <table className="items-center w-full border-collapse bg-transparent">
                            <thead className="sticky top-0 bg-[#1E5D8B] z-10">
                                <tr>
                                    <th className="text-center align-middle px-2.5 py-3 text-[13px] md:whitespace-nowrap sm:whitespace-normal font-semibold text-white">
                                        Cổ phiếu
                                    </th>
                                    <th className="text-center align-middle px-2.5 py-3 text-[13px] font-semibold text-white">
                                        Tăng trưởng Vốn góp của chủ sở hữu(%)
                                    </th>
                                    <th className="text-center align-middle px-2.5 py-3 text-[13px] font-semibold text-white">
                                        Tăng trưởng Thặng dư vốn cổ phần (%)
                                    </th>
                                    <th className="text-center align-middle px-2.5 py-3 text-[13px] font-semibold text-white">
                                        Tăng trưởng LNST chưa phân phối (%)
                                    </th>
                                    <th className="text-center align-middle px-2.5 py-3 text-[12px] font-semibold text-white">
                                        Tăng trưởng Lợi ích cổ đông không kiểm soát (%)
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {!loading ? (
                                    Array.isArray(data) &&
                                    data.map((item, index) => {
                                        let colorVonChuSoHuu = getColor(item.vonChuSoHuu);
                                        let colorLaiChuPhanPhoi = getColor(item.laiChuPhanPhoi);
                                        let colorThangDuVon = getColor(item.thangDuVon);
                                        let colorLoiIchCoDong = getColor(item.loiIchCoDong);

                                        return (
                                            <tr key={index} className="dark:hover:bg-gray-800 hover:bg-gray-300 duration-500">
                                                <th className={`text-center align-middle whitespace-nowrap px-1 py-2.5 md:text-base sm:text-sm xs:text-sm xxs:text-xs`}>
                                                    {item.code}
                                                </th>
                                                <td className={`${colorVonChuSoHuu} text-center align-middle whitespace-nowrap px-1 py-2.5 md:text-base sm:text-sm xs:text-sm xxs:text-xs font-semibold`}>
                                                    {item.vonChuSoHuu.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </td>
                                                <td className={`${colorLaiChuPhanPhoi} text-center align-middle whitespace-nowrap px-1 py-2.5 md:text-base sm:text-sm xs:text-sm xxs:text-xs font-semibold`}>
                                                    {item.laiChuPhanPhoi.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </td>
                                                <td className={`${colorThangDuVon} text-center align-middle whitespace-nowrap px-1 py-2.5 md:text-base sm:text-sm xs:text-sm xxs:text-xs font-semibold`}>
                                                    {item.thangDuVon.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </td>
                                                <td className={`${colorLoiIchCoDong} text-center align-middle whitespace-nowrap px-1 py-2.5 md:text-base sm:text-sm xs:text-sm xxs:text-xs font-semibold`}>
                                                    {item.loiIchCoDong.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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

export default TableEquityGrowth