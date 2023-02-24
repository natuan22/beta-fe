import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Loading from "../utils/Loading";

const TableBienDong = () => {
    // const dataBienDong = useSelector((state) => state.chart.dataBienDong);
    // const [data, setData] = useState([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     if (dataBienDong[0]) {
    //         setLoading(false);
    //         setData(dataBienDong);
    //     }
    // }, [dataBienDong]);

    return (
        <section className="bg-blueGray-50">
            <div className="w-full">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded ">
                    <div className="block w-full">
                        <table className="items-center bg-transparent w-full border-collapse">
                            <thead className="bg-slate-300">
                                <tr>
                                    <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle py-3 text-sm uppercase font-semibold">
                                        Khung biến động
                                    </th>
                                    <th className="text-center px-3 bg-blueGray-50 text-blueGray-500 align-middle py-3 text-sm uppercase font-semibold">
                                        VNINDEX
                                    </th>
                                    <th className="text-center px-3 bg-blueGray-50 text-blueGray-500 align-middle py-3 text-sm uppercase font-semibold">
                                        VN30
                                    </th>
                                    <th className="text-center px-3 bg-blueGray-50 text-blueGray-500 align-middle py-3 text-sm uppercase font-semibold">
                                        HNX
                                    </th>
                                    <th className="text-center px-3 bg-blueGray-50 text-blueGray-500 align-middle py-3 text-sm uppercase font-semibold">
                                        UPCOM
                                    </th>
                                    <th className="text-center px-3 bg-blueGray-50 text-blueGray-500 align-middle py-3 text-sm uppercase font-semibold">
                                        Tổng
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr className='hover:bg-slate-100'>
                                    <th className="text-center px-6 align-middle text-sm uppercase p-3.5 text-left text-blueGray-700">
                                        Phiên trước
                                    </th>
                                    <td className='text-center font-semibold px-3 align-middle text-sm p-3.5'>
                                        -1.16%
                                    </td>
                                    <td className='text-center font-semibold px-3 align-middle text-sm p-3.5'>
                                        -1.16%
                                    </td>
                                    <td className='text-center font-semibold px-3 align-middle text-sm p-3.5'>
                                        -1.16%
                                    </td>
                                    <td className='text-center font-semibold px-3 align-middle text-sm p-3.5'>
                                        -1.16%
                                    </td>
                                    <td className='text-center font-semibold px-3 align-middle text-sm p-3.5'>
                                        -1.16%
                                    </td>
                                </tr>
                                <tr className='hover:bg-slate-100'>
                                    <th className="text-center px-6 align-middle text-sm uppercase p-3.5 text-left text-blueGray-700">
                                        Trung bình tuần
                                    </th>
                                    <td className='text-center font-semibold px-3 align-middle text-sm p-3.5'>
                                        -1.16%
                                    </td>
                                    <td className='text-center font-semibold px-3 align-middle text-sm p-3.5'>
                                        -1.16%
                                    </td>
                                    <td className='text-center font-semibold px-3 align-middle text-sm p-3.5'>
                                        -1.16%
                                    </td>
                                    <td className='text-center font-semibold px-3 align-middle text-sm p-3.5'>
                                        -1.16%
                                    </td>
                                    <td className='text-center font-semibold px-3 align-middle text-sm p-3.5'>
                                        -1.16%
                                    </td>
                                </tr>
                                <tr className='hover:bg-slate-100'>
                                    <th className="text-center px-6 align-middle text-sm uppercase p-3.5 text-left text-blueGray-700">
                                        Trung bình tháng
                                    </th>
                                    <td className='text-center font-semibold px-3 align-middle text-sm p-3.5'>
                                        -1.16%
                                    </td>
                                    <td className='text-center font-semibold px-3 align-middle text-sm p-3.5'>
                                        -1.16%
                                    </td>
                                    <td className='text-center font-semibold px-3 align-middle text-sm p-3.5'>
                                        -1.16%
                                    </td>
                                    <td className='text-center font-semibold px-3 align-middle text-sm p-3.5'>
                                        -1.16%
                                    </td>
                                    <td className='text-center font-semibold px-3 align-middle text-sm p-3.5'>
                                        -1.16%
                                    </td>
                                </tr>
                                <tr className='hover:bg-slate-100'>
                                    <th className="text-center px-6 align-middle text-sm uppercase p-3.5 text-left text-blueGray-700">
                                        Trung bình năm
                                    </th>
                                    <td className='text-center font-semibold px-3 align-middle text-sm p-3.5'>
                                        -1.16%
                                    </td>
                                    <td className='text-center font-semibold px-3 align-middle text-sm p-3.5'>
                                        -1.16%
                                    </td>
                                    <td className='text-center font-semibold px-3 align-middle text-sm p-3.5'>
                                        -1.16%
                                    </td>
                                    <td className='text-center font-semibold px-3 align-middle text-sm p-3.5'>
                                        -1.16%
                                    </td>
                                    <td className='text-center font-semibold px-3 align-middle text-sm p-3.5'>
                                        -1.16%
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TableBienDong;