import React, { useEffect, useState } from 'react'
import Loading from '../../../Chart/utils/Loading';

const TestResults = ({ data }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (data?.length > 0) {
            setLoading(false);
        }
    }, [data])

    return (
        <div>
            <div className="border-solid border-[#9E9E9E] border-b-2 border-t-0 border-x-0 md:w-[405px] sm:w-[265px]">
                <div className="dark:text-white text-black font-semibold flex items-center uppercase">
                    Kết quả kiểm thử
                </div>
            </div>
            <section className="bg-blueGray-50 pt-1.5">
                <div className="w-full">
                    <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded">
                        <div className="block w-full scrollbar-thin scrollbar-thumb-[#436FB5] dark:scrollbar-track-[#151924] scrollbar-track-transparent overflow-x-scroll bg-transparent">
                            <table className="items-center w-full border-collapse bg-transparent">
                                <thead className="bg-[#1D5F8D] z-10">
                                    <tr>
                                        <th className="md:text-base sm:text-sm text-center align-middle px-3 py-5 whitespace-nowrap font-semibold text-white w-[200px] border border-solid border-[#9E9E9E]">
                                            Danh mục
                                        </th>
                                        <th className="md:text-base sm:text-sm text-center align-middle px-3 py-5 font-semibold text-white border border-solid border-[#9E9E9E]">
                                            Vốn ban đầu (Tr)
                                        </th>
                                        <th className="md:text-base sm:text-sm text-center align-middle px-3 py-5 font-semibold text-white border border-solid border-[#9E9E9E]">
                                            Thu được (Tr)
                                        </th>
                                        <th className="md:text-base sm:text-sm text-center align-middle px-3 py-5 font-semibold text-white border border-solid border-[#9E9E9E]">
                                            Lợi nhuận
                                        </th>
                                        <th className="md:text-base sm:text-sm text-center align-middle px-3 py-5 font-semibold text-white border border-solid border-[#9E9E9E]">
                                            Thời gian lãi<br /> thấp nhất
                                        </th>
                                        <th className="md:text-base sm:text-sm text-center align-middle px-3 py-5 font-semibold text-white border border-solid border-[#9E9E9E]">
                                            Thời gian lãi<br /> cao nhất
                                        </th>
                                        <th className="md:text-base sm:text-sm text-center align-middle px-3 py-5 font-semibold text-white border border-solid border-[#9E9E9E]">
                                            Lãi suất TB
                                        </th>
                                        <th className="md:text-base sm:text-sm text-center align-middle px-3 py-5 font-semibold text-white border border-solid border-[#9E9E9E]">
                                            Thời gian lỗ<br /> cao nhất
                                        </th>
                                        <th className="md:text-base sm:text-sm text-center align-middle px-3 py-5 font-semibold text-white border border-solid border-[#9E9E9E]">
                                            Chỉ số Sharpe
                                        </th>
                                        <th className="md:text-base sm:text-sm text-center align-middle px-3 py-5 font-semibold text-white border border-solid border-[#9E9E9E]">
                                            Chỉ số Beta
                                        </th>
                                        <th className="md:text-base sm:text-sm text-center align-middle px-3 py-5 font-semibold text-white border border-solid border-[#9E9E9E]">
                                            Chỉ số Alpha
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {!loading ? (Array.isArray(data) && data.map((item, index) => (
                                        <tr key={index}>
                                            <th className={`md:text-base sm:text-sm text-center align-middle whitespace-nowrap px-1 py-[14px] dark:text-white text-black border border-solid border-[#9E9E9E]`}>
                                                {item.name}
                                            </th>
                                            <td className={`md:text-base sm:text-sm text-center align-middle whitespace-nowrap px-1 py-[14px] font-semibold dark:text-white text-black border border-solid border-[#9E9E9E]`}>
                                                {item.von_ban_dau.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                                            </td>
                                            <td className={`md:text-base sm:text-sm text-center align-middle whitespace-nowrap px-1 py-[14px] font-semibold dark:text-white text-black border border-solid border-[#9E9E9E]`}>
                                                {item.thu_duoc.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                                            </td>
                                            <td className={`md:text-base sm:text-sm text-center align-middle whitespace-nowrap px-1 py-[14px] font-semibold dark:text-white text-black border border-solid border-[#9E9E9E]`}>
                                                {item.loi_nhuan.toLocaleString('en-US', { maximumFractionDigits: 2 })}%
                                            </td>
                                            <td className={`md:text-base sm:text-sm text-center align-middle whitespace-nowrap px-1 py-[14px] font-semibold dark:text-white text-black border border-solid border-[#9E9E9E]`}>
                                                {item.lai_thap_nhat.toLocaleString('en-US', { maximumFractionDigits: 2 })}%
                                            </td>
                                            <td className={`md:text-base sm:text-sm text-center align-middle whitespace-nowrap px-1 py-[14px] font-semibold dark:text-white text-black border border-solid border-[#9E9E9E]`}>
                                                {item.lai_cao_nhat.toLocaleString('en-US', { maximumFractionDigits: 2 })}%
                                            </td>
                                            <td className={`md:text-base sm:text-sm text-center align-middle whitespace-nowrap px-1 py-[14px] font-semibold dark:text-white text-black border border-solid border-[#9E9E9E]`}>
                                                {item.lai_trung_binh.toLocaleString('en-US', { maximumFractionDigits: 2 })}%
                                            </td>
                                            <td className={`md:text-base sm:text-sm text-center align-middle whitespace-nowrap px-1 py-[14px] font-semibold dark:text-white text-black border border-solid border-[#9E9E9E]`}>
                                                {item.lo_cao_nhat === null ? '-' : `${item.lo_cao_nhat.toLocaleString('en-US', { maximumFractionDigits: 2 })}%`}
                                            </td>
                                            <td className={`md:text-base sm:text-sm text-center align-middle whitespace-nowrap px-1 py-[14px] font-semibold dark:text-white text-black border border-solid border-[#9E9E9E]`}>
                                                {item.sharpe.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                                            </td>
                                            <td className={`md:text-base sm:text-sm text-center align-middle whitespace-nowrap px-1 py-[14px] font-semibold dark:text-white text-black border border-solid border-[#9E9E9E]`}>
                                                {item.beta.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                                            </td>
                                            <td className={`md:text-base sm:text-sm text-center align-middle whitespace-nowrap px-1 py-[14px] font-semibold dark:text-white text-black border border-solid border-[#9E9E9E]`}>
                                                {item.alpha.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                                            </td>
                                        </tr>
                                    ))) : (<tr><td colSpan={11} className='h-[144px]'><div><Loading /></div></td></tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default TestResults