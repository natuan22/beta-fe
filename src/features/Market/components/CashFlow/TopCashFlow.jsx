import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../Chart/utils/Loading'
import { fetchDataCashValue } from '../../thunk';

const TopCashFlow = () => {
    const dispatch = useDispatch();
    const { topCashValue } = useSelector((state) => state.market);

    useEffect(() => {
        dispatch(fetchDataCashValue(0));
    }, [dispatch]);

    return (
        <>
            <div className="border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0">
                <span className="text-white text-[0.9rem]">Top giá trị dòng tiền </span>
                <select
                    onChange={(e) => {
                        dispatch(fetchDataCashValue(e.target.value));
                    }}
                    className={`bg-[#1B496D] p-1 text-[0.9rem] text-white border-0`}
                >
                    <option value="0">Phiên gần nhất</option>
                    <option value="1">5 phiên</option>
                    <option value="2">1 tháng</option>
                    <option value="3">YtD</option>
                </select>
            </div>
            <section className="bg-blueGray-50 pt-1.5">
                <div className="w-full">
                    <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded">
                        <div className="block w-full scrollbar-thin scrollbar-thumb-[#217EBE] scrollbar-track-[#151924] overflow-y-scroll bg-transparent h-[350px]">
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
                                            Giá trị dòng tiền
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {topCashValue?.length ? (
                                        topCashValue?.map((item, index) => {
                                            return (
                                                <tr className="dark:text-white text-black text-center text-[13px] dark:hover:bg-gray-800 hover:bg-gray-300 duration-500" key={index}>
                                                    <th className="text-center px-1.5 align-middle p-3.5" >{item.code}</th>
                                                    <td className="text-center px-1.5 align-middle whitespace-nowrap p-3.5 font-semibold">{item.price}</td>
                                                    <td className="text-center px-1.5 align-middle whitespace-nowrap p-3.5 font-semibold">{item.cashFlowValue.toLocaleString()}</td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr><td colSpan={3}><div className="mt-16 text-center"><Loading /></div></td></tr>
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

export default TopCashFlow