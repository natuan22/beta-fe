import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../Chart/utils/Loading'
import { fetchDataInvestorTransaction } from '../../thunk';

const InvestorTransaction = () => {
    const dispatch = useDispatch();
    const { dataInvestorTransaction } = useSelector((state) => state.market);
    const [queryApi, setQueryApi] = useState({
        type: 0,
        investorType: 0,
    });

    useEffect(() => {
        dispatch(fetchDataInvestorTransaction(queryApi.type, queryApi.investorType));
    }, [dispatch, queryApi]);

    const handleQueryApiType = (type) => {
        setQueryApi((prev) => ({ ...prev, type }));
    };

    const handleQueryApiInvestorType = (investorType) => {
        setQueryApi((prev) => ({ ...prev, investorType }));
    };

    return (
        <>
            <div className="md:flex sm:block items-center justify-between border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0">
                <div>
                    <span className="dark:text-white text-black text-[0.9rem] font-semibold">Diễn biến giao dịch nhóm nhà đầu tư </span>
                    <select
                        onChange={(e) => {
                            handleQueryApiInvestorType(e.target.value);
                        }}
                        className={`dark:bg-[#151924] bg-gray-100 text-[0.9rem] text-[#0097B2] border-0 md:inline sm:hidden xs:hidden xxs:hidden`}
                    >
                        <option value="0">khối ngoại</option>
                        <option value="1">tự doanh</option>
                        <option value="2">cá nhân</option>
                    </select>
                </div>
                <div className="flex items-center justify-center">
                    <select
                        onChange={(e) => {
                            handleQueryApiInvestorType(e.target.value);
                        }}
                        className={`dark:bg-[#151924] bg-gray-100 text-[0.9rem] text-[#0097B2] border-0 md:hidden sm:inline`}
                    >
                        <option value="0">khối ngoại</option>
                        <option value="1">tự doanh</option>
                        <option value="2">cá nhân</option>
                    </select>
                    <select
                        onChange={(e) => {
                            handleQueryApiType(e.target.value);
                        }}
                        className={`bg-[#1B496D] p-1 ml-2 text-[0.9rem] text-white border-0`}
                    >
                        <option value="0">Phiên gần nhất</option>
                        <option value="1">5 phiên</option>
                        <option value="2">1 tháng</option>
                        <option value="3">YtD</option>
                    </select>
                </div>
            </div>
            <section className="bg-blueGray-50 pt-1.5">
                <div className="w-full">
                    <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded">
                        <div className="block w-full scrollbar-thin scrollbar-thumb-[#436FB5] dark:scrollbar-track-[#151924] scrollbar-track-transparent overflow-y-scroll bg-transparent h-[350px]">
                            <table className="items-center w-full border-collapse bg-transparent">
                                <thead className="bg-[#1E5D8B] z-10" style={{ position: 'sticky', top: 0 }}>
                                    <tr>
                                        <th className="text-center align-middle px-3 py-3 text-sm whitespace-nowrap font-semibold text-white">
                                            Mã cổ phiếu
                                        </th>
                                        <th className="text-center align-middle px-3 py-3 text-sm whitespace-nowrap font-semibold text-white">
                                            Giá
                                        </th>
                                        <th className="text-center align-middle px-3 py-3 text-sm font-semibold text-white">
                                            Khối lượng mua (triệu CP)
                                        </th>
                                        <th className="text-center align-middle px-3 py-3 text-sm font-semibold text-white">
                                            Giá trị mua (tỷ VNĐ)
                                        </th>
                                        <th className="text-center align-middle px-3 py-3 text-sm font-semibold text-white">
                                            Khối lượng bán (triệu CP)
                                        </th>
                                        <th className="text-center align-middle px-3 py-3 text-sm font-semibold text-white">
                                            Giá trị bán (tỷ VNĐ)
                                        </th>
                                        <th className="text-center align-middle px-3 py-3 text-sm font-semibold text-white">
                                            Giá trị ròng (tỷ VNĐ)
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {dataInvestorTransaction?.length ? (
                                        dataInvestorTransaction?.map((item, index) => {
                                            return (
                                                <tr className="dark:text-white text-black text-center text-[13px] dark:hover:bg-gray-800 hover:bg-gray-300 duration-500" key={index}>
                                                    <th className="text-left px-1.5 align-middle p-3.5" >{item.code}</th>
                                                    <td className="text-center px-1.5 align-middle whitespace-nowrap p-3.5 font-semibold">{item.price}</td>
                                                    <td className="text-center px-1.5 align-middle whitespace-nowrap p-3.5 font-semibold">{(item.buyVol / 1000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                    <td className="text-center px-1.5 align-middle whitespace-nowrap p-3.5 font-semibold">{(item.buyVal / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                    <td className="text-center px-1.5 align-middle whitespace-nowrap p-3.5 font-semibold"> {(item.sellVol / 1000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} </td>
                                                    <td className="text-center px-1.5 align-middle whitespace-nowrap p-3.5 font-semibold"> {(item.sellVal / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} </td>
                                                    <td className="text-center px-1.5 align-middle whitespace-nowrap p-3.5 font-semibold"> {((item.buyVal - item.sellVal) / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr><td colSpan={6}><div className="mt-16 text-center"><Loading /></div></td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default InvestorTransaction