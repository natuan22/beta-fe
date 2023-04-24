import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Loading from '../../../Chart/utils/Loading';

const Events = () => {
    const [activeButton, setActiveButton] = useState('all');
    const dataEvents = useSelector((state) => state.chart.dataEvents);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);

    const handleClick = (button) => {
        setActiveButton(button);
    }

    useEffect(() => {
        if (dataEvents.data) {
            setLoading(false);
            setData(dataEvents.data)
        }
    }, [dataEvents])

    return (
        <>
            <div className="pt-3 mb-3 text-white">
                <span>
                    <button
                        onClick={() => {
                            handleClick('all')
                            setData(dataEvents.data)
                        }}
                        className={activeButton === 'all'
                            ? 'border-none bg-transparent relative text-white md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent text-white md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>Toàn thị trường
                    </button>
                </span>
                <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10">
                    <button
                        onClick={() => {
                            handleClick('HSX')
                            setData(dataEvents.data.filter(item => item.san === 'HOSE'))
                        }}
                        className={activeButton === 'HSX'
                            ? 'border-none bg-transparent relative text-white md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent text-white md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>HSX
                    </button>
                </span>
                <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10">
                    <button
                        onClick={() => {
                            handleClick('HNX')
                            setData(dataEvents.data.filter(item => item.san === 'HNX'))
                        }}
                        className={activeButton === 'HNX'
                            ? 'border-none bg-transparent relative text-white md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent text-white md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>HNX
                    </button>
                </span>
                <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10">
                    <button
                        onClick={() => {
                            handleClick('UPCOM')
                            setData(dataEvents.data.filter(item => item.san === 'UPCoM'))
                        }}
                        className={activeButton === 'UPCOM'
                            ? 'border-none bg-transparent relative text-white md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent text-white md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>UPCOM
                    </button>
                </span>
            </div>
            <section className="bg-blueGray-50 pt-1.5">
                <div className="w-full">
                    <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full mb-6 rounded ">
                        <div className="block w-full h-[600px] scrollbar-thin scrollbar-thumb-[#217EBE] scrollbar-track-[#151924] overflow-y-scroll bg-transparent">
                            <table className="items-center bg-transparent w-full border-collapse">
                                <thead className="sticky top-0 bg-[#1E5D8B]">
                                    <tr>
                                        <th className="text-center align-middle px-3 py-3 text-[0.9rem] whitespace-nowrap font-semibold text-white">
                                            Mã CK
                                        </th>
                                        <th className="text-center align-middle px-3 py-3 text-[0.9rem] whitespace-nowrap font-semibold text-white">
                                            Loại sự kiện
                                        </th>
                                        <th className="text-center align-middle px-3 py-3 text-[0.9rem] whitespace-nowrap font-semibold text-white">
                                            Ngày
                                        </th>
                                        <th className="text-center align-middle px-3 py-3 text-[0.9rem] whitespace-nowrap font-semibold text-white">
                                            Nội dung sự kiện
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {!loading ? (Array.isArray(data) &&
                                        data.map((item, index) => {
                                            return (
                                                <tr key={index} className='hover:bg-gray-800'>
                                                    <th className="text-center align-middle text-[0.8rem] whitespace-nowrap p-3.5 text-white">
                                                        {item.ticker}
                                                    </th>
                                                    <td className="text-center align-middle text-[0.8rem] whitespace-nowrap p-3.5 text-white">
                                                        {item.LoaiSuKien}
                                                    </td>
                                                    <td className="text-center align-center text-[0.8rem] whitespace-nowrap p-3.5 text-white">
                                                        {formatDate(new Date(Date.parse(item.NgayDKCC)))}
                                                    </td>
                                                    <td className="text-left align-middle text-[0.8rem] p-3.5 text-white">
                                                        {item.NoiDungSuKien}
                                                    </td>
                                                </tr>
                                            )
                                        })) : (<tr><td colSpan={4}><div className="mt-16"><Loading /></div></td></tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section >
        </>
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
