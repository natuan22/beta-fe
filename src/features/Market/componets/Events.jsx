import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Loading from '../../Chart/utils/Loading';

const Events = () => {
    const dataEvents = useSelector((state) => state.chart.dataEvents);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (dataEvents.data) {
            setLoading(false);
            setData(dataEvents.data)
        }
    }, [dataEvents])

    return (
        <section className="bg-blueGray-50" >
            <div className="w-full">
                <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full mb-6 rounded ">
                    <div className="block w-full h-96 scrollbar-thin scrollbar-thumb-[#217EBE] scrollbar-track-[#151924] overflow-y-scroll bg-transparent">
                        <table className="items-center bg-transparent w-full border-collapse">
                            <thead className="sticky top-0 bg-[#1E5D8B]">
                                <tr>
                                    <th className="text-center align-middle px-3 py-3 text-sm whitespace-nowrap font-semibold text-white">
                                        Mã chứng khoán
                                    </th>
                                    <th className="text-center align-middle px-3 py-3 text-sm whitespace-nowrap font-semibold text-white">
                                        Loại sự kiện
                                    </th>
                                    <th className="text-center align-middle px-3 py-3 text-sm whitespace-nowrap font-semibold text-white">
                                        Ngày
                                    </th>
                                    <th className="text-center align-middle px-3 py-3 text-sm whitespace-nowrap font-semibold text-white">
                                        Nội dung sự kiện
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr><td colSpan={4}><Loading /></td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Events

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(date) {
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join('/');
}