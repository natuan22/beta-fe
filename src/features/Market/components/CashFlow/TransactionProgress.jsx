import React from 'react'
import Loading from '../../../Chart/utils/Loading'

const TransactionProgress = () => {
    return (
        <>
            <div className="border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0">
                <span className="text-white text-[0.9rem]">Diễn biến giao dịch nhóm nhà đầu tư </span>
                <select
                    className={`bg-[#151924] text-[0.9rem] text-[#0097B2] border-0`}
                >
                    <option value="0">khối ngoại</option>
                    <option value="1">...</option>
                    <option value="2">...</option>
                    <option value="3">...</option>
                </select>
                <select
                    className={`bg-[#1B496D] p-1 text-[0.9rem] text-white border-0`}
                >
                    <option value="1">Phiên gần nhất</option>
                    <option value="2">...</option>
                    <option value="3">...</option>
                    <option value="4">...</option>
                </select>
            </div>
            <section className="bg-blueGray-50 pt-1.5">
                <div className="w-full">
                    <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded">
                        <div className="block w-full scrollbar-thin scrollbar-thumb-[#217EBE] scrollbar-track-[#151924] overflow-y-scroll bg-transparent h-[450px]">
                            <table className="items-center w-full border-collapse bg-transparent">
                                <thead className="sticky top-0 bg-[#1E5D8B] z-10">
                                    <tr>
                                        <th className="text-center align-middle px-3 py-3 text-sm whitespace-nowrap font-semibold text-white">
                                            Mã cổ phiếu
                                        </th>
                                        <th className="text-center align-middle px-3 py-3 text-sm whitespace-nowrap font-semibold text-white">
                                            Giá
                                        </th>
                                        <th className="text-center align-middle px-3 py-3 text-sm whitespace-nowrap font-semibold text-white">
                                            Khối lượng mua
                                        </th>
                                        <th className="text-center align-middle px-3 py-3 text-sm whitespace-nowrap font-semibold text-white">
                                            Giá trị mua
                                        </th>
                                        <th className="text-center align-middle px-3 py-3 text-sm whitespace-nowrap font-semibold text-white">
                                            Khối lượng bán
                                        </th>
                                        <th className="text-center align-middle px-3 py-3 text-sm whitespace-nowrap font-semibold text-white">
                                            Giá trị bán
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {/* <tr key={index} className="hover:bg-gray-800">
                                        <th className={`text-left align-middle px-2 py-2.5`}>
                                            {item.industry}
                                        </th>
                                        <td className={`align-middle whitespace-nowrap px-2 py-2.5 font-semibold`}>
                                            <span className="text-left px-1.5">
                                                {getIcon(item.day_change_percent)}
                                            </span>
                                            <span className="text-right px-px">
                                                {item.day_change_percent.toFixed(2)}%
                                            </span>
                                        </td>
                                    </tr> */}

                                    <tr><td colSpan={6}><div className="mt-16"><Loading /></div></td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default TransactionProgress