import { CaretDownOutlined, CaretRightOutlined, CaretUpOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../Chart/utils/Loading';
import { fetchDataIndustryCashFlow, fetchDataRSI, fetchDataTopNetBuyIndustry } from '../../thunk';

const ENUM = {
    0: '20',
    1: '50',
    2: '100',
    3: '250',
}

const IndustryCashFlow = () => {
    const dispatch = useDispatch();
    const [activeButton, setActiveButton] = useState('all');
    const { dataIndustryCashFlow } = useSelector((state) => state.market);
    const { dataRSI } = useSelector((state) => state.market);
    const { dataTopNetBuyIndustry } = useSelector((state) => state.market);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [dataTopNetBuy, setDataTopNetBuy] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(-1);

    const [handleSession, setHandleSession] = useState(20);
    const [handleType, setHandleType] = useState(0);
    const [handleExchange, setHandleExchange] = useState('all');

    const handleMouseOver = (index) => {
        setHoveredIndex(index);
    };
    const handleMouseOut = () => {
        setHoveredIndex(-1);
    };

    const handleClick = (button) => {
        setActiveButton(button);
    }

    useEffect(() => {
        dispatch(fetchDataIndustryCashFlow('all', 0));
        dispatch(fetchDataRSI('all', 20));
        dispatch(fetchDataTopNetBuyIndustry('all', 0))
    }, [dispatch]);

    useEffect(() => {
        if (dataIndustryCashFlow && dataRSI && dataTopNetBuyIndustry) {
            const newDataWithChanges = Array.isArray(dataRSI) && dataRSI?.map(oldItem => {
                const matchingItem = Array.isArray(dataIndustryCashFlow) && dataIndustryCashFlow.find(newItem => newItem.industry === oldItem.industry)
                if (matchingItem) {
                    return {
                        ...oldItem,
                        retailPerChange: matchingItem.retailPerChange,
                        proprietaryPerChange: matchingItem.proprietaryPerChange,
                        foreignPerChange: matchingItem.foreignPerChange,
                        date: matchingItem.date
                    }
                } else {
                    return oldItem
                }
            })
            setLoading(false);
            setData(newDataWithChanges)
            setDataTopNetBuy(dataTopNetBuyIndustry)
        }
    }, [dataIndustryCashFlow, dataRSI, dataTopNetBuyIndustry])

    const dataTuDoanh = Array.isArray(dataTopNetBuy) && dataTopNetBuy.filter(transaction => transaction.type === 0);
    const dataKhoiNgoai = Array.isArray(dataTopNetBuy) && dataTopNetBuy.filter(transaction => transaction.type === 1);
    const dataCaNhan = Array.isArray(dataTopNetBuy) && dataTopNetBuy.filter(transaction => transaction.type === 2);

    return (
        <>
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black xs:text-base xxs:text-sm font-semibold'>Dòng tiền theo ngành</span>
                <select className={`bg-[#1B496D] p-1 text-[1rem] text-white border-0 xl:ml-[266px] lg:ml-[714px] md:ml-[458px] sm:ml-[115px] xs:ml-[65px] xxs:ml-[29px]`}
                    onChange={(event) => {
                        dispatch(fetchDataTopNetBuyIndustry(handleExchange, event.target.value));
                        dispatch(fetchDataIndustryCashFlow(handleExchange, event.target.value));
                        dispatch(fetchDataRSI(handleExchange, ENUM[event.target.value]));
                        setHandleType(event.target.value)
                        setHandleSession(ENUM[event.target.value])
                    }}>
                    <option value='0'>Phiên gần nhất</option>
                    <option value='1'>5 phiên</option>
                    <option value='2'>20 phiên</option>
                    <option value='3'>YtD</option>
                </select>
            </div>
            <div className="pt-3 mb-3 dark:text-white text-black">
                <span>
                    <button
                        onClick={() => {
                            handleClick('all')
                            dispatch(fetchDataTopNetBuyIndustry('all', handleType));
                            dispatch(fetchDataIndustryCashFlow('all', handleType));
                            dispatch(fetchDataRSI('all', handleSession));
                            setHandleExchange('all')
                        }}
                        className={activeButton === 'all'
                            ? 'border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>Toàn thị trường
                    </button>
                </span>
                <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10 xxs:pl-5">
                    <button
                        onClick={() => {
                            handleClick('HOSE')
                            dispatch(fetchDataTopNetBuyIndustry('HOSE', handleType));
                            dispatch(fetchDataIndustryCashFlow('HOSE', handleType));
                            dispatch(fetchDataRSI('HOSE', handleSession));
                            setHandleExchange('HOSE')
                        }}
                        className={activeButton === 'HOSE'
                            ? 'border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>HSX
                    </button>
                </span>
                <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10 xxs:pl-5">
                    <button
                        onClick={() => {
                            handleClick('HNX')
                            dispatch(fetchDataTopNetBuyIndustry('HNX', handleType));
                            dispatch(fetchDataIndustryCashFlow('HNX', handleType));
                            dispatch(fetchDataRSI('HNX', handleSession));
                            setHandleExchange('HNX')
                        }}
                        className={activeButton === 'HNX'
                            ? 'border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>HNX
                    </button>
                </span>
                <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10 xxs:pl-5">
                    <button
                        onClick={() => {
                            handleClick('UPCOM')
                            dispatch(fetchDataTopNetBuyIndustry('UPCOM', handleType));
                            dispatch(fetchDataIndustryCashFlow('UPCOM', handleType));
                            dispatch(fetchDataRSI('UPCOM', handleSession));
                            setHandleExchange('UPCOM')
                        }}
                        className={activeButton === 'UPCOM'
                            ? 'border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>UPCOM
                    </button>
                </span>
            </div>
            <section className="bg-blueGray-50 pt-1.5">
                <div className="w-full">
                    <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded">
                        <div className="block w-full scrollbar-thin scrollbar-thumb-[#436FB5] dark:scrollbar-track-[#151924] scrollbar-track-transparent overflow-y-scroll bg-transparent xl:h-[733px] lg:h-[460px] md:h-[490px] sm:h-[430px] xs:h-[430px] xxs:h-[430px]">
                            <table className="items-center w-full border-collapse bg-transparent">
                                <thead className="sticky top-0 bg-[#1E5D8B] z-10">
                                    <tr>
                                        <th className="uppercase text-center align-middle px-3 py-3 text-xs whitespace-nowrap font-semibold text-white">
                                            Phân ngành
                                        </th>
                                        <th className="uppercase text-center align-middle px-3 py-3 text-xs whitespace-nowrap font-semibold text-white">
                                            Tự doanh
                                        </th>
                                        <th className="uppercase text-center align-middle px-3 py-3 text-xs whitespace-nowrap font-semibold text-white">
                                            Khối ngoại
                                        </th>
                                        <th className="uppercase text-center align-middle px-3 py-3 text-xs font-semibold text-white">
                                            Cá nhân & TC trong nước
                                        </th>
                                        <th className="uppercase text-center align-middle px-3 py-3 text-xs whitespace-nowrap font-semibold text-white">
                                            Sức mạnh dòng tiền
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {!loading ? (
                                        Array.isArray(data) &&
                                        data.map((item, index) => {
                                            let color = getColor(item.proprietaryPerChange);
                                            let color2 = getColor(item.foreignPerChange);
                                            let color3 = getColor(item.retailPerChange);

                                            let numOfCashGain = item.cashGain;
                                            let numOfCashLost = item.cashLost;
                                            let total = numOfCashGain + numOfCashLost;

                                            return (
                                                <tr key={index} className="dark:hover:bg-gray-800 hover:bg-gray-300 duration-500">
                                                    <th className={`${color} text-left align-middle xxs:text-[10px] lg:text-sm xl:text-xs px-1 py-2.5`}>
                                                        {item.industry}
                                                    </th>
                                                    <td className={`${color} align-middle xxs:text-[10px] lg:text-sm xl:text-xs whitespace-nowrap px-1 py-2.5 font-semibold`}>
                                                        <span className="text-left px-1.5">
                                                            {getIcon(item.proprietaryPerChange)}
                                                        </span>
                                                        <span className="text-right px-px">
                                                            {item.proprietaryPerChange && item.proprietaryPerChange.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                                                        </span>
                                                    </td>
                                                    <td className={`${color2} align-middle xxs:text-[10px] lg:text-sm xl:text-xs whitespace-nowrap px-1 py-2 font-semibold`}>
                                                        <span className="text-left px-1.5">
                                                            {getIcon(item.foreignPerChange)}
                                                        </span>
                                                        <span className="text-right px-px">
                                                            {item.foreignPerChange && item.foreignPerChange.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                                                        </span>
                                                    </td>
                                                    <td className={`${color3} xl:text-left lg:text-center md:text-center align-middle xxs:text-[10px] lg:text-sm xl:text-xs whitespace-nowrap px-1 py-2 font-semibold`}>
                                                        <span className="text-left px-1.5">
                                                            {getIcon(item.retailPerChange)}
                                                        </span>
                                                        <span className="text-right px-px">
                                                            {item.retailPerChange && item.retailPerChange.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                                                        </span>

                                                    </td>
                                                    <td className="align-middle xxs:text-[10px] whitespace-nowrap lg:text-sm xl:text-xs px-1 py-2  ">
                                                        <div
                                                            className="flex relative"
                                                            onMouseOver={() => handleMouseOver(index)}
                                                            onMouseOut={handleMouseOut}
                                                        >
                                                            {hoveredIndex === index && (
                                                                <div className="bg-white text-black text-xs font-medium p-1 rounded-md absolute top-0 translate-x-[-20%] translate-y-[-110%] z-40 ease-in-out duration-500">
                                                                    <span>
                                                                        Tăng: {item.cashGain}
                                                                    </span>
                                                                    <span className="ml-2">
                                                                        Giảm: {item.cashLost}
                                                                    </span>
                                                                </div>
                                                            )}
                                                            <div
                                                                className="h-2.5 bg-green-500"
                                                                style={{
                                                                    width: `${(item.cashGain / total) * 100}%`,
                                                                }}
                                                            ></div>
                                                            <div
                                                                className="bg-red-500 "
                                                                style={{
                                                                    width: `${(item.cashLost / total) * 100}%`,
                                                                }}
                                                            ></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    ) : (
                                        <tr><td colSpan={5}><div className="mt-16"><Loading /></div></td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
            <hr />
            <div className='py-1'>
                <div className='flex dark:text-white text-black'>
                    <div className='w-3/5'>
                        <div className='text-[10px] py-2'>TOP NGÀNH KHỐI NGOẠI MUA RÒNG: <span className='font-semibold md:inline xs:block'>{dataTopNetBuy && dataKhoiNgoai.length > 0 && dataKhoiNgoai[0].industry}</span></div>
                        <div className='text-[10px] py-2'>TOP NGÀNH TỰ DOANH MUA RÒNG: <span className='font-semibold md:inline xs:block'>{dataTopNetBuy && dataTuDoanh.length > 0 && dataTuDoanh[0].industry}</span></div>
                        <div className='text-[10px] py-2'>TOP NGÀNH CÁ NHÂN & TCTN MUA RÒNG: <span className='font-semibold md:inline xs:block'>{dataTopNetBuy && dataCaNhan.length > 0 && dataCaNhan[0].industry}</span></div>
                    </div>
                    <div className='w-2/5'>
                        <div className='grid grid-cols-2'>
                            <div className='text-[10px] py-2'>GT MUA: <span className='text-green-500 font-semibold md:inline xs:block'>{dataTopNetBuy && dataKhoiNgoai.length > 0 && (dataKhoiNgoai[0].buyVal / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} tỷ</span></div>
                            <div className='text-[10px] py-2'>GT BÁN: <span className='text-red-500 font-semibold md:inline xs:block'>{dataTopNetBuy && dataKhoiNgoai.length > 0 && (dataKhoiNgoai[0].sellVal / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} tỷ</span></div>

                            <div className='text-[10px] py-2'>GT MUA: <span className='text-green-500 font-semibold md:inline xs:block'>{dataTopNetBuy && dataTuDoanh.length > 0 && (dataTuDoanh[0].buyVal / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} tỷ</span></div>
                            <div className='text-[10px] py-2'>GT BÁN: <span className='text-red-500 font-semibold md:inline xs:block'>{dataTopNetBuy && dataTuDoanh.length > 0 && (dataTuDoanh[0].sellVal / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} tỷ</span></div>

                            <div className='text-[10px] py-2'>GT MUA: <span className='text-green-500 font-semibold md:inline xs:block'>{dataTopNetBuy && dataCaNhan.length > 0 && (dataCaNhan[0].buyVal / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} tỷ</span></div>
                            <div className='text-[10px] py-2'>GT BÁN: <span className='text-red-500 font-semibold md:inline xs:block'>{dataTopNetBuy && dataCaNhan.length > 0 && (dataCaNhan[0].sellVal / 1000000000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} tỷ</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default IndustryCashFlow

function getColor(item) {
    let color = "";
    if (item === 0) color = "text-yellow-500";
    else if (item < "0") color = "text-red-500";
    else color = "text-green-500";

    return color;
}

function getIcon(item) {
    if (item === 0) return <CaretRightOutlined style={{ fontSize: "18px" }} />;
    else if (item < "0")
        return <CaretDownOutlined style={{ fontSize: "18px" }} />;
    else return <CaretUpOutlined style={{ fontSize: "18px" }} />;
}
