import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react'
import { fetchDataTotalOutstandingDebtAndBondInterest } from "../../thunk";
import Loading from "../../../Chart/utils/Loading";

const TotalOutstandingDebtAndBondInterest = () => {
    const dispatch = useDispatch()
    const { dataTotalOutstandingDebtAndBondInterest } = useSelector(state => state.macro)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(fetchDataTotalOutstandingDebtAndBondInterest)
    }, [dispatch]);

    useEffect(() => {
        if (dataTotalOutstandingDebtAndBondInterest) {
            setLoading(false);
            const modifiedArray = Array.isArray(dataTotalOutstandingDebtAndBondInterest) && dataTotalOutstandingDebtAndBondInterest?.map(item => {
                const name = item.name.replace("Công ty cổ phần", "CTCP").replace("CÔNG TY CỔ PHẦN", "CTCP").replace("Công ty CP", "CTCP").replace("Công ty Cổ phần", "CTCP").replace("Công ty cổ phẩn", "CTCP")

                return { ...item, name };
            })
            setData(modifiedArray)
        }
    }, [dataTotalOutstandingDebtAndBondInterest]);

    return (
        <div>
            <section className="bg-blueGray-50 pt-1.5">
                <div className="w-full">
                    <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded">
                        <div className="block xxs:w-[295px] xs:w-[350px] sm:w-[400px] md:w-[670px] lg:w-[897px] xl:w-full scrollbar-thin scrollbar-thumb-[#436FB5] dark:scrollbar-track-[#151924] scrollbar-track-transparent overflow-x-scroll bg-transparent h-[350px]">
                            <table className="items-center w-full border-collapse bg-transparent">
                                <thead className="bg-[#1E5D8B] z-10" style={{ position: 'sticky', top: 0 }}>
                                    <tr>
                                        <th className="bg-[#1E5D8B] text-center align-middle px-3 py-[19px] whitespace-nowrap font-semibold text-sm text-white">
                                            Doanh nghiệp
                                        </th>
                                        <th className="bg-[#1E5D8B] text-center align-middle px-3 py-[19px] whitespace-nowrap font-semibold text-sm text-white">
                                            Tổng dư nợ ( tỷ vnđ)
                                        </th>
                                        <th className="bg-[#1E5D8B] text-center align-middle px-3 py-[19px] whitespace-nowrap font-semibold text-sm text-white">
                                            Lãi suất TP bình quân (%)
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {!loading ? (Array.isArray(data) && data.map((item, index) => (
                                        <tr key={index} className="dark:hover:bg-gray-800 hover:bg-gray-300 duration-500">
                                            <th className={`text-left align-middle px-1 py-[14px] text-sm dark:text-white text-black`}>
                                                {item.name}
                                            </th>
                                            <th className={`text-center align-middle whitespace-nowrap px-1 py-[14px] text-sm dark:text-white text-black`}>
                                                {(item.total / 1000000000).toLocaleString('en-US', { maximumFractionDigits: 2 })}
                                            </th>
                                            <th className={`text-center align-middle whitespace-nowrap px-1 py-[14px] text-sm dark:text-white text-black`}>
                                                {item.interest_rate.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                                            </th>
                                        </tr>
                                    ))) : (<tr><td colSpan={3}><div className="mt-16"><Loading /></div></td></tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default TotalOutstandingDebtAndBondInterest