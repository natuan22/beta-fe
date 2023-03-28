import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../Chart/utils/Loading";
import socket from "../../Chart/utils/socket";

const TableDomesticIndex = () => {
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
                                        <th className="text-center align-middle px-3 py-2 text-sm font-semibold text-white">
                                            Chỉ số
                                        </th>
                                        <th className="text-center align-middle px-3 py-2 text-sm font-semibold text-white">
                                            Điểm số
                                        </th>
                                        <th className="text-center align-middle px-3 py-2 text-sm font-semibold text-white">
                                            % Thay đổi
                                        </th>
                                        <th className="text-center align-middle px-3 py-2 text-sm font-semibold text-white">
                                            Khối lượng
                                        </th>
                                        <th className="text-center align-middle px-3 py-2 text-sm font-semibold text-white">
                                            Giá trị
                                        </th>
                                        <th className="text-center align-middle px-3 py-2 text-sm font-semibold text-white">
                                            GTNN ròng
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

export default TableDomesticIndex;