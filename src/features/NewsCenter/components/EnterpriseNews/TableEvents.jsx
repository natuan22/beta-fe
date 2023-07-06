import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../Chart/utils/Loading';
import { fetchTableEvents } from '../../thunk';

const TableEvents = () => {
    const dispatch = useDispatch();
    const { dataTableEvents } = useSelector(state => state.newsCenter)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(fetchTableEvents('hnx'));
    }, []);

    useEffect(() => {
        if (dataTableEvents) {
            setLoading(false);
            setData(dataTableEvents)
        }
    }, [dataTableEvents])

    return (
        <div>
            <section className="bg-blueGray-50 mt-2">
                <div className="w-full">
                    <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full mb-6 rounded ">
                        <div className="block w-full h-96 scrollbar-thin scrollbar-thumb-[#436FB5] dark:scrollbar-track-[#151924] scrollbar-track-transparent overflow-y-scroll bg-transparent">
                            <table className="items-center bg-transparent w-full border-collapse">
                                <thead className="sticky top-0 bg-[#1E5D8B]">
                                    <tr>
                                        <th className="text-center align-middle px-3 py-3 whitespace-nowrap font-semibold text-white">
                                            Mã chứng khoán
                                        </th>
                                        <th className="text-center align-middle px-3 py-3 whitespace-nowrap font-semibold text-white">
                                            Sàn
                                        </th>
                                        <th className="text-center align-middle px-3 py-3 whitespace-nowrap font-semibold text-white">
                                            Ngày GDKHQ
                                        </th>
                                        <th className="text-center align-middle px-3 py-3 whitespace-nowrap font-semibold text-white">
                                            Ngày ĐKCC
                                        </th>
                                        <th className="text-center align-middle px-3 py-3 whitespace-nowrap font-semibold text-white">
                                            Ngày thực hiện
                                        </th>
                                        <th className="text-center align-middle px-3 py-3 whitespace-nowrap font-semibold text-white">
                                            Nội dung sự kiện
                                        </th>
                                        <th className="text-center align-middle px-3 py-3 whitespace-nowrap font-semibold text-white">
                                            Loại sự kiện
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {!loading ? (Array.isArray(data) &&
                                        data.map((item, index) => {
                                            return (
                                                <tr key={index} className='dark:hover:bg-gray-800 hover:bg-gray-300 duration-500'>
                                                    <th className="text-center align-middle px-3 p-3.5 dark:text-white text-black text-sm">
                                                        {item.code}
                                                    </th>
                                                    <td className="text-center align-middle px-3 p-4 dark:text-white text-black text-sm">
                                                        {item.floor}
                                                    </td>
                                                    <td className="text-center align-middle px-3 p-4 dark:text-white text-black text-sm">
                                                        {moment(item.date_gdkhq).format('DD-MM-YYYY')}
                                                    </td>
                                                    <td className="text-center align-middle px-3 p-4 dark:text-white text-black text-sm">
                                                        {moment(item.date_dkcc).format('DD-MM-YYYY')}
                                                    </td>
                                                    <td className="text-center align-middle px-3 p-4 dark:text-white text-black text-sm">
                                                        {moment(item.date).format('DD-MM-YYYY')}
                                                    </td>
                                                    <td className="text-left align-middle px-3 p-4 dark:text-white text-black text-sm">
                                                        {item.content}
                                                    </td>
                                                    <td className="text-center align-middle px-3 p-4 dark:text-white text-black text-sm">
                                                        {item.type}
                                                    </td>
                                                </tr>
                                            )
                                        })) : (<tr><td colSpan={7}><div className="mt-16"><Loading /></div></td></tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section ></div>
    )
}

export default TableEvents