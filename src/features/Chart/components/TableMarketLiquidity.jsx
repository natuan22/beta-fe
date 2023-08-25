import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loading from "../utils/Loading";
import { fetchDataTableMarketLiquidity } from "../thunk";
import { getColor } from "../utils/utils";

const hashTb = {
    "Tăng mạnh nhất": "Tăng mạnh nhất",
    "Giảm mạnh nhất": "Giảm mạnh nhất",
    "Đóng góp cao nhất": "Đóng góp cao nhất",
    "Đóng góp thấp nhất": "Đóng góp thấp nhất",
};

const TableMarketLiquidity = () => {
    const dispatch = useDispatch();
    const dataMarketLiquidity = useSelector(state => state.chart.dataTableMarketLiquidity);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    const [activeButton, setActiveButton] = useState('0');
    const buttonRef = useRef([]);

    const handleActiveButton = (index) => {
        setActiveButton(index);
    };

    useEffect(() => {
        const activeBtn = buttonRef.current[activeButton]
        const movingBackground = document.querySelector('.moving-background')
        if (activeBtn && movingBackground) {
            movingBackground.style.left = `${activeBtn.offsetLeft}px`;
            movingBackground.style.width = `${activeBtn.offsetWidth}px`;
        }
    }, [activeButton])

    useEffect(() => {
        if (dataMarketLiquidity.data) {
            setLoading(false)
            setData(dataMarketLiquidity.data)
        }
    }, [dataMarketLiquidity])

    return (
        <>
            <div className="relative dark:bg-[#2D303A] bg-gray-400 flex justify-around items-center rounded-full mb-3">
                <div className="moving-background absolute h-full top-0 bg-[#275F88] transition-all duration-500 rounded-full z-0"></div>
                {Object.entries(hashTb).map(([label], index) => (
                    <button
                        ref={el => buttonRef.current[index] = el}
                        key={index}
                        onClick={() => {
                            handleActiveButton(index)
                            dispatch(dispatch(fetchDataTableMarketLiquidity(index)))
                        }}
                        className="2xl:text-[11.5px] xl:text-[10.6px] lg:text-[14px] md:text-[14px] xs:text-[12px] z-10 bg-transparent text-white border-none px-[0.9rem] py-[0.5rem] cursor-pointer"
                    >
                        {label}
                    </button>
                ))}
            </div>

            <section className="bg-blueGray-50">
                <div className="w-full">
                    <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded ">
                        <div className="block w-full bg-transparent scrollbar-thin scrollbar-thumb-[#436FB5] scrollbar-track-transparent h-80 overflow-y-scroll">
                            <table className="items-center w-full border-collapse bg-transparent">
                                <thead className="sticky top-0 bg-[#1E5D8B]">
                                    <tr>
                                        <th className="text-center align-middle xxs:text-[9px] px-4 py-3 uppercase text-xs font-semibold text-white">
                                            Mã CK
                                        </th>
                                        <th className="text-center align-middle xxs:text-[9px] px-4 py-3 uppercase text-xs font-semibold text-white">
                                            Ngành
                                        </th>
                                        <th className="text-center align-middle xxs:text-[9px] px-4 py-3 uppercase text-xs font-semibold text-white">
                                            Giá trị (tỷ VNĐ)
                                        </th>
                                        <th className="text-center align-middle xxs:text-[9px] px-4 py-3 uppercase whitespace-nowrap text-xs font-semibold text-white">
                                            Thay đổi
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {!loading ? (Array.isArray(data) &&
                                        data?.map((item) => {
                                            let color = getColor(item.value_change_percent);
                                            return (
                                                <tr key={item.ticker} className='dark:hover:bg-gray-800 hover:bg-gray-300 duration-500'>
                                                    <th className={`text-center align-middle xxs:text-[9px] text-sm whitespace-nowrap px-2 py-2 ${color}`}>
                                                        {item.ticker}
                                                    </th>
                                                    <td className={`text-center align-middle xxs:text-[9px] text-xs px-2 py-2 font-semibold ${color}`}>
                                                        {item.industry}
                                                    </td>
                                                    <td className={`text-center align-middle xxs:text-[9px] text-sm whitespace-nowrap px-2 py-2 font-semibold ${color}`}>
                                                        {(item.value / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </td>
                                                    <td className={`text-center align-middle xxs:text-[9px] text-sm whitespace-nowrap px-2 py-2 font-semibold ${color}`}>
                                                        {item.value_change_percent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                                                    </td>
                                                </tr>
                                            )
                                        })) : (<tr><td colSpan={4}><div className="mt-16"><Loading /></div></td></tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default TableMarketLiquidity;