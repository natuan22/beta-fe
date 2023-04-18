import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Chart/utils/Loading";
import socket from "../../Chart/utils/socket";
import { fecthDataTableThanhKhoan } from "../thunk";

const   TableThanhKhoan = () => {
    const dispatch = useDispatch()
    const [activeButton, setActiveButton] = useState('1day');
    const dataTable = useSelector((state) => state.chart.dataTableDetail);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [queryApi, setQueryApi] = useState({
        exchange:'HNX',
        type:0,
        order:0
    })
    useEffect(()=> {
        dispatch(fecthDataTableThanhKhoan(queryApi.exchange,queryApi.type, queryApi.order))
    },[dispatch])
    console.log(queryApi.exchange)
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
                        setQueryApi({
                            ...queryApi,
                            order: 0
                        })
                    }}
                    className='uppercase'>1 ngày</button>
                <button
                    style={activeButton === '5days' ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                    onClick={() => {
                        handleClick('5days')
                        setQueryApi({
                            ...queryApi,
                            order: 1
                        })
                    }}
                    className='uppercase'>5 ngày</button>
                <button
                    style={activeButton === '1week' ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                    onClick={() => {
                        handleClick('1week')
                        setQueryApi({
                            ...queryApi,
                            order: 2
                        })
                    }}
                    className='uppercase'>1 tuần</button>
                <button
                    style={activeButton === 'YtD' ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                    onClick={() => {
                        handleClick('YtD')
                        setQueryApi({
                            ...queryApi,
                            order: 3
                        })
                    }}
                    className=''>YtD</button>
            </div>
            <div>
                <span className='text-white text-[0.9rem] pl-[2px]'>Top đóng góp thanh khoản theo: </span>
                <select onChange={(e)=> {
                    setQueryApi({
                        ...queryApi,
                        type: e.target.value
                    })
                    console.log(queryApi)
                }} className={`bg-[#151924] text-[0.9rem] text-[#0097B2] border-0`}>
                    <option value="0">Cổ phiếu</option>
                    <option value="1">Ngành Lv1</option>
                    <option value="2">Ngành Lv2</option>
                    <option value="3">Ngành Lv3</option>
                </select>
                <span className='text-white text-[0.9rem] pl-[15px]'>Sàn </span>
                <select className={`bg-[#151924] text-[0.9rem] text-[#0097B2] border-0`}>
                    <option value="HOSE">HOSE</option>
                    <option value="HNX">HNX</option>
                    <option value="UPCOM">UPCOM</option>
                    <option value="VN30">VN30</option>
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