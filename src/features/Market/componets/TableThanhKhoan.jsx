import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../Chart/utils/Loading";
import socket from "../../Chart/utils/socket";

const TableThanhKhoan = () => {
    const dataTable = useSelector((state) => state.chart.dataTableDetail);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (dataTable.data) {
            setLoading(false);
            setData(dataTable.data)
        }
    }, [dataTable]);

    useEffect(() => {
        socket.on("listen-chi-so-trong-nuoc", (newData) => {
            setData(newData)
        });
    }, [])

    return (
        <>
            <section>
                <div className="w-full">
                    <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded">
                        <div className="block w-full xs:min-h-[352px] xxs:min-h-[332px] sm:min-h-[312px] md:min-h-[336px] lg:min-h-[350px] xl:min-h-[350px] bg-transparent">
                            <table className="items-center w-full border-collapse bg-transparent">
                                <thead>
                                    <tr className='bg-[#1E5D8B]'>
                                        <th className="text-center align-middle px-3 py-2 text-[0.7rem] font-semibold text-white">
                                            Cổ phiếu
                                        </th>
                                        <th className="text-center align-middle px-3 py-2 text-[0.7rem] font-semibold text-white">
                                            Tỷ lệ đóng góp (%)
                                        </th>
                                        <th className="text-center align-middle px-3 py-2 text-[0.7rem] font-semibold text-white">
                                            GT giao dịch (tỷ)
                                        </th>
                                        <th className="text-center align-middle px-3 py-2 text-[0.7rem] font-semibold text-white">
                                            KL Giao dịch (tr CP)
                                        </th>
                                        <th className="text-center align-middle px-3 py-2 text-[0.7rem] font-semibold text-white">
                                            Chênh lệch cung-cầu (KL)
                                        </th>
                                        <th className="text-center align-middle px-3 py-2 text-[0.7rem] font-semibold text-white">
                                            Chênh lệch cung-cầu (GT)
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr><td colSpan={6}><Loading /></td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default TableThanhKhoan;