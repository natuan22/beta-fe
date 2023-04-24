import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataNews } from '../../../Chart/thunk';
import Loading from '../../../Chart/utils/Loading';

const News = () => {
    const dispatch = useDispatch()
    const [activeButton, setActiveButton] = useState('all');
    const dataNews = useSelector((state) => state.chart.dataNews);
    const dataMacroNews = useSelector((state) => state.chart.dataMacroNews);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);

    const handleClick = (button) => {
        setActiveButton(button);
    }

    const fetchDataMacroNews = () => {
        if (dataMacroNews.data) {
            setData(dataMacroNews.data)
        }
    }

    useEffect(() => {
        if (dataNews.data) {
            setLoading(false);
            setData(dataNews.data)
        }
    }, [dataNews])

    return (
        <>
            <div className="pt-3 mb-3 text-white">
                <span>
                    <button
                        onClick={() => {
                            handleClick('all')
                            dispatch(dispatch(fetchDataNews))
                        }}
                        className={activeButton === 'all'
                            ? 'border-none bg-transparent relative text-white text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent text-white text-[1.1rem] cursor-pointer'}>Doanh nghiệp
                    </button>
                </span>
                <span className="pl-10">
                    <button
                        onClick={() => {
                            handleClick('vimo')
                            fetchDataMacroNews()
                        }}
                        className={activeButton === 'vimo'
                            ? 'border-none bg-transparent relative text-white text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent text-white text-[1.1rem] cursor-pointer'}>Vĩ mô
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
                                        <th className="text-center align-middle px-3 py-3 text-sm whitespace-nowrap font-semibold text-white">
                                            Ngày
                                        </th>
                                        <th className="text-center align-middle px-3 py-3 text-sm whitespace-nowrap font-semibold text-white">
                                            Nội dung chính
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {!loading ? (Array.isArray(data) &&
                                        data.map((item, index) => {
                                            return (
                                                <tr key={index} className='hover:bg-gray-800'>
                                                    <th className="text-left align-middle whitespace-nowrap px-3 py-3.5 text-white text-[0.8rem]">
                                                        {formatDate(new Date(Date.parse(item.Date)))}
                                                    </th>
                                                    <td className='text-left align-middle px-3 py-3.5 text-white text-[0.8rem]'>
                                                        <a href={item.Href} target="_blank" rel="noopener noreferrer" className='text-white no-underline hover:underline'>{item.Title}</a>
                                                    </td>
                                                </tr>
                                            )
                                        })) : (<tr><td colSpan={2}><div className="mt-16"><Loading /></div></td></tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export default News

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
