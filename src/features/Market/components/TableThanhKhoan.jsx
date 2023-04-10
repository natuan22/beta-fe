import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../Chart/utils/Loading";
import socket from "../../Chart/utils/socket";

const TableThanhKhoan = () => {
    const [activeButton, setActiveButton] = useState('1day');
    const dataTable = useSelector((state) => state.chart.dataTableDetail);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleClick = (button) => {
        setActiveButton(button);
    }

    const buttonStyle = {
        backgroundColor: 'transparent',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        fontSize: '0.9rem',
        padding: '0.375rem 0.5rem'
    }

    const activeButtonStyle = {
        backgroundColor: '#275F88',
        color: '#fff',
    }

    useEffect(() => {
        if (dataTable.data) {
            setLoading(false);
            setData(dataTable.data)
        }
    }, [dataTable]);

    return (
        <>
            <div className="bg-[#2D303A] flex justify-around items-center rounded-full mb-2">
                <button
                    style={activeButton === '1day' ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                    onClick={() => {
                        handleClick('1day')
                    }}
                    className='uppercase'>1 ngày</button>
                <button
                    style={activeButton === '5days' ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                    onClick={() => {
                        handleClick('5days')
                    }}
                    className='uppercase'>5 ngày</button>
                <button
                    style={activeButton === '1week' ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                    onClick={() => {
                        handleClick('1week')
                    }}
                    className='uppercase'>1 tuần</button>
                <button
                    style={activeButton === 'YtD' ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                    onClick={() => {
                        handleClick('YtD')
                    }}
                    className=''>YtD</button>
            </div>
            <div>
                <span className='text-white text-[0.9rem] pl-[2px]'>Top đóng góp thanh khoản theo: </span>
                <select className={`bg-[#151924] text-[0.9rem] text-[#0097B2] border-0`}>
                    <option value="1">Cổ phiếu</option>
                    <option value="2">...</option>
                    <option value="3">...</option>
                </select>
                <span className='text-white text-[0.9rem] pl-[15px]'>Sàn </span>
                <select className={`bg-[#151924] text-[0.9rem] text-[#0097B2] border-0`}>
                    <option value="1">HOSE</option>
                    <option value="2">HNX</option>
                    <option value="3">UPCOM</option>
                    <option value="4">VN30</option>
                </select>
            </div>
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
                                    <tr><td colSpan={6}><div className="mt-16"><Loading /></div></td></tr>
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