import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataHotIndustry } from '../thunk';
import { useEffect } from 'react';

const apiUrl = process.env.REACT_APP_BASE_URL;
const hashTb = {
    'Bảo hiểm': 'baoHiem',
    'Bất động sản': 'batDongSan',
    'Công nghệ': 'congNghe',
    'Dầu khí': 'dauKhi',
    'Dịch vụ bán lẻ': 'banLe',
    'Dịch vụ tài chính': 'taiChinh',
    'Dịch vụ tiện ích': 'tienIch',
    'Đồ dùng cá nhân và đồ gia dụng': 'doGiaDung',
    'Du lịch & Giải trí': 'duLich',
    'Hàng hóa và dịch vụ công nghiệp': 'hangHoa',
    'Hóa chất': 'hoaChat',
    'Ngân hàng': 'nganHang',
    'Ôtô & linh kiện phụ tùng ': 'oto',
    'Phương tiện truyền thông': 'truyenThong',
    'Thực phẩm & Đồ uống': 'thucPham',
    'Viễn thông': 'vienThong',
    'Xây dựng & Vật liệu': 'xayDung',
    'Tài nguyên': 'taiNguyen',
    'Y tế': 'yTe',
}
const Checkbox = ({ children }) => {
    const dispatch = useDispatch()
    const [exchange, setExchange] = useState("all")
    const [type, setType] = useState("8")
    const [order, setOrder] = useState("0")
    const [industry, setIndustry] = useState(['batDongSan'])
    const { dataHotIndustry } = useSelector(state => state.market)
    const industryQuery = industry?.join(',')
    useEffect(() => {
        dispatch(fetchDataHotIndustry)
    }, [dispatch])
    useEffect(() => {
        if (dataHotIndustry?.length > 0) {
            const formattedData = dataHotIndustry.map(item => hashTb[item.industry]);
            setIndustry(formattedData)
        }
    }, [dataHotIndustry])
    useEffect(() => {
        dispatch({
            type: 'QUERY',
            payload: { exchange, type, order, industryQuery, }
        })
    }, [exchange, type, order, industry])

    const handleIndustryChange = e => {
        const { value, checked } = e.target
        if (checked) {
            setIndustry(prev => [...prev, value])
        } else {
            setIndustry(prev => prev.filter(industry => industry !== value))
        }
    }

    const onExchangeChange = e => {
        setExchange(e.target.value)
    }

    const ontypeChange = e => {
        setType(e.target.value)
    }

    const onOrderChange = e => {
        setOrder(e.target.value)
    }


    const createHotImage = (industry) => {
        if (dataHotIndustry?.length > 0 && dataHotIndustry?.some(item => hashTb[item.industry] === industry)) {
            if (industry === 'hangHoa' || industry === 'oto' || industry === 'truyenThong' || industry === 'thucPham') {
                return (
                    <img className='relative w-[50px] h-[30px] top-[-15px] md:left-[-15px] sm:left-0'
                        src={`${apiUrl}/resources/icons/hot.png`}
                        alt='icon'
                    />
                );
            } else {
                return (
                    <img className='relative w-[50px] h-[30px] top-[-10px]'
                        src={`${apiUrl}/resources/icons/hot.png`}
                        alt='icon'
                    />
                );
            }

        }
        return null;
    };

    return (
        <div>
            <div>
                <div className='xl:flex lg:block'>
                    {/* respon 2xl -> sm */}
                    <div className='xl:w-[65%] md:block sm:hidden xs:hidden xxs:hidden'>
                        <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
                            <div className='grid grid-cols-4 gap-5'>
                                <div>
                                    <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                        <span className='dark:text-white text-black font-semibold'>Sàn giao dịch</span>
                                    </div>
                                    <div>
                                        <label className="material-checkbox py-3 dark:text-white text-black">
                                            <input type="checkbox" name="exchange" value="all" id="all" checked={exchange === "all"} onChange={onExchangeChange} />
                                            <span className="checkmark"></span>
                                            <span className='text-sm'>Toàn thị trường</span>
                                        </label>
                                        <label className="material-checkbox py-3 dark:text-white text-black">
                                            <input type="checkbox" name="exchange" value="hose" id="hose" checked={exchange === "hose"} onChange={onExchangeChange} />
                                            <span className="checkmark"></span>
                                            <span className='text-sm'>HOSE</span>
                                        </label>
                                        <label className="material-checkbox py-3 dark:text-white text-black">
                                            <input type="checkbox" name="exchange" value="hnx" id="hnx" checked={exchange === "hnx"} onChange={onExchangeChange} />
                                            <span className="checkmark"></span>
                                            <span className='text-sm'>HNX</span>
                                        </label>
                                        <label className="material-checkbox py-3 dark:text-white text-black">
                                            <input type="checkbox" name="exchange" value="upcom" id="upcom" checked={exchange === "upcom"} onChange={onExchangeChange} />
                                            <span className="checkmark"></span>
                                            <span className='text-sm'>UPCOM</span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                        <span className='dark:text-white text-black font-semibold'>Ngành nghề (LV2)</span>
                                    </div>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="industry" value="baoHiem" id="baoHiem" checked={industry.includes("baoHiem")} onChange={handleIndustryChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm md:text-[12px] lg:text-sm'>Bảo hiểm</span>
                                        {createHotImage("baoHiem")}
                                    </label>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="industry" value="batDongSan" id="batDongSan" checked={industry.includes("batDongSan")} onChange={handleIndustryChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm md:text-[12px] lg:text-sm'>Bất động sản</span>
                                        {createHotImage("batDongSan")}

                                    </label>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="industry" value="congNghe" id="congNghe" checked={industry.includes("congNghe")} onChange={handleIndustryChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm md:text-[12px] lg:text-sm'>Công nghệ</span>
                                        {createHotImage("congNghe")}
                                    </label>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="industry" value="dauKhi" id="dauKhi" checked={industry.includes("dauKhi")} onChange={handleIndustryChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm md:text-[12px] lg:text-sm'>Dầu khí</span>
                                        {createHotImage("dauKhi")}

                                    </label>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="industry" value="banLe" id="banLe" checked={industry.includes("banLe")} onChange={handleIndustryChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm md:text-[12px] lg:text-sm'>Dịch vụ bán lẻ</span>
                                        {createHotImage("banLe")}
                                    </label>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="industry" value="tienIch" id="tienIch" checked={industry.includes("tienIch")} onChange={handleIndustryChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm md:text-[12px] lg:text-sm'>Dịch vụ tiện ích</span>
                                        {createHotImage("tienIch")}
                                    </label>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="industry" value="taiChinh" id="taiChinh" checked={industry.includes("taiChinh")} onChange={handleIndustryChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm md:text-[12px] lg:text-sm'>Dịch vụ tài chính</span>
                                        {createHotImage("taiChinh")}
                                    </label>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="industry" value="doGiaDung" id="doGiaDung" checked={industry.includes("doGiaDung")} onChange={handleIndustryChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm md:text-[12px] lg:text-sm'>Đồ dùng cá nhân và đồ gia dụng</span>
                                        {createHotImage("doGiaDung")}
                                    </label>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="industry" value="duLich" id="duLich" checked={industry.includes("duLich")} onChange={handleIndustryChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm md:text-[12px] lg:text-sm'>Du lịch & Giải trí</span>
                                        {createHotImage("duLich")}
                                    </label>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="industry" value="yTe" id="yTe" checked={industry.includes("yTe")} onChange={handleIndustryChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm md:text-[12px] lg:text-sm'>Y tế</span>
                                        {createHotImage("yTe")}
                                    </label>
                                </div>

                                <div>
                                    <br></br>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="industry" value="hangHoa" id="hangHoa" checked={industry.includes("hangHoa")} onChange={handleIndustryChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm md:text-[12px] lg:text-sm'>Hàng hóa và dịch vụ công nghiệp</span>
                                        {createHotImage("hangHoa")}

                                    </label>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="industry" value="hoaChat" id="hoaChat" checked={industry.includes("hoaChat")} onChange={handleIndustryChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm md:text-[12px] lg:text-sm'>Hóa chất</span>
                                        {createHotImage("hoaChat")}

                                    </label>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="industry" value="nganHang" id="nganHang" checked={industry.includes("nganHang")} onChange={handleIndustryChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm md:text-[12px] lg:text-sm'>Ngân hàng</span>
                                        {createHotImage("nganHang")}

                                    </label>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="industry" value="oto" id="oto" checked={industry.includes("oto")} onChange={handleIndustryChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm md:text-[12px] lg:text-sm'>Ôtô & linh kiện phụ tùng</span>
                                        {createHotImage("oto")}

                                    </label>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="industry" value="truyenThong" id="truyenThong" checked={industry.includes("truyenThong")} onChange={handleIndustryChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm md:text-[12px] lg:text-sm'>Phương tiện truyền thông</span>
                                        {createHotImage("truyenThong")}

                                    </label>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="industry" value="taiNguyen" id="taiNguyen" checked={industry.includes("taiNguyen")} onChange={handleIndustryChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm md:text-[12px] lg:text-sm'>Tài nguyên</span>
                                        {createHotImage("taiNguyen")}

                                    </label>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="industry" value="thucPham" id="thucPham" checked={industry.includes("thucPham")} onChange={handleIndustryChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm md:text-[12px] lg:text-sm'>Thực phẩm & Đồ uống</span>
                                        {createHotImage("thucPham")}

                                    </label>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="industry" value="vienThong" id="vienThong" checked={industry.includes("vienThong")} onChange={handleIndustryChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm md:text-[12px] lg:text-sm'>Viễn thông</span>
                                        {createHotImage("vienThong")}

                                    </label>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="industry" value="xayDung" id="xayDung" checked={industry.includes("xayDung")} onChange={handleIndustryChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm md:text-[12px] lg:text-sm'>Xây dựng & Vật liệu</span>
                                        {createHotImage("xayDung")}

                                    </label>
                                </div>

                                <div>
                                    <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                        <span className='dark:text-white text-black font-semibold'>Khung thời gian</span>
                                    </div>
                                    <div>
                                        <label className="material-checkbox py-3 dark:text-white text-black">
                                            <input type="checkbox" name="type" value="2" id="2ky" checked={type === "2"} onChange={ontypeChange} />
                                            <span className="checkmark"></span>
                                            <span className='text-sm'>2 kỳ gần nhất</span>
                                        </label>
                                        <label className="material-checkbox py-3 dark:text-white text-black">
                                            <input type="checkbox" name="type" value="4" id="4ky" checked={type === "4"} onChange={ontypeChange} />
                                            <span className="checkmark"></span>
                                            <span className='text-sm'>4 kỳ gần nhất</span>
                                        </label>
                                        <label className="material-checkbox py-3 dark:text-white text-black">
                                            <input type="checkbox" name="type" value="8" id="8ky" checked={type === "8"} onChange={ontypeChange} />
                                            <span className="checkmark"></span>
                                            <span className='text-sm'>8 kỳ gần nhất</span>
                                        </label>
                                        <label className="material-checkbox py-3 dark:text-white text-black">
                                            <input type="checkbox" name="type" value="12" id="12ky" checked={type === "12"} onChange={ontypeChange} />
                                            <span className="checkmark"></span>
                                            <span className='text-sm'>12 kỳ gần nhất</span>
                                        </label>
                                        <label className="material-checkbox py-3 dark:text-white text-black">
                                            <input type="checkbox" name="type" value="20" id="20ky" checked={type === "20"} onChange={ontypeChange} />
                                            <span className="checkmark"></span>
                                            <span className='text-sm'>20 kỳ gần nhất</span>
                                        </label>
                                    </div>

                                    <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                        <span className='dark:text-white text-black font-semibold'>Quy chuẩn dữ liệu tài chính</span>
                                    </div>
                                    <div>
                                        <label className="material-checkbox py-3 dark:text-white text-black">
                                            <input type="checkbox" name="order" value="0" id="quarter" checked={order === "0"} onChange={onOrderChange} />
                                            <span className="checkmark"></span>
                                            Tài chính theo quý
                                        </label>
                                        <label className="material-checkbox py-3 dark:text-white text-black">
                                            <input type="checkbox" name="order" value="1" id="year" checked={order === "1"} onChange={onOrderChange} />
                                            <span className="checkmark"></span>
                                            Tài chính theo năm
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* respon sm -> xxs */}
                    <div className='xl:w-[65%] md:hidden sm:block'>
                        <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
                            <div>
                                <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                    <span className='dark:text-white text-black font-semibold'>Sàn giao dịch</span>
                                </div>
                                <div>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="exchange" value="all" id="all" checked={exchange === "all"} onChange={onExchangeChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm'>Toàn thị trường</span>
                                    </label>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="exchange" value="hose" id="hose" checked={exchange === "hose"} onChange={onExchangeChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm'>HOSE</span>
                                    </label>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="exchange" value="hnx" id="hnx" checked={exchange === "hnx"} onChange={onExchangeChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm'>HNX</span>
                                    </label>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="exchange" value="upcom" id="upcom" checked={exchange === "upcom"} onChange={onExchangeChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm'>UPCOM</span>
                                    </label>
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-5'>

                                <div>
                                    <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                        <span className='dark:text-white text-black font-semibold'>Ngành nghề (LV2)</span>
                                    </div>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="industry" value="baoHiem" id="baoHiem" checked={industry.includes("baoHiem")} onChange={handleIndustryChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm xxs:text-[11px]'>Bảo hiểm</span>
                                        {createHotImage("baoHiem")}
                                    </label>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="industry" value="batDongSan" id="batDongSan" checked={industry.includes("batDongSan")} onChange={handleIndustryChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm xxs:text-[11px]'>Bất động sản</span>
                                        {createHotImage("batDongSan")}
                                    </label>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="industry" value="congNghe" id="congNghe" checked={industry.includes("congNghe")} onChange={handleIndustryChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm xxs:text-[11px]'>Công nghệ</span>
                                        {createHotImage("congNghe")}
                                    </label>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="industry" value="dauKhi" id="dauKhi" checked={industry.includes("dauKhi")} onChange={handleIndustryChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm xxs:text-[11px]'>Dầu khí</span>
                                        {createHotImage("dauKhi")}
                                    </label>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="industry" value="banLe" id="banLe" checked={industry.includes("banLe")} onChange={handleIndustryChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm xxs:text-[11px]'>Dịch vụ bán lẻ</span>
                                        {createHotImage("banLe")}
                                    </label>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="industry" value="tienIch" id="tienIch" checked={industry.includes("tienIch")} onChange={handleIndustryChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm xxs:text-[11px]'>Dịch vụ tiện ích</span>
                                        {createHotImage("tienIch")}
                                    </label>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="industry" value="taiChinh" id="taiChinh" checked={industry.includes("taiChinh")} onChange={handleIndustryChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm xxs:text-[11px]'>Dịch vụ tài chính</span>
                                        {createHotImage("taiChinh")}
                                    </label>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="industry" value="doGiaDung" id="doGiaDung" checked={industry.includes("doGiaDung")} onChange={handleIndustryChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm xxs:text-[11px]'>Đồ dùng cá nhân và đồ gia dụng</span>
                                        {createHotImage("doGiaDung")}
                                    </label>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="industry" value="duLich" id="duLich" checked={industry.includes("duLich")} onChange={handleIndustryChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm xxs:text-[11px]'>Du lịch & Giải trí</span>
                                        {createHotImage("duLich")}
                                    </label>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="industry" value="yTe" id="yTe" checked={industry.includes("yTe")} onChange={handleIndustryChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm xxs:text-[11px]'>Y tế</span>
                                        {createHotImage("yTe")}
                                    </label>
                                </div>

                                <div>
                                    <br></br>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="industry" value="hangHoa" id="hangHoa" checked={industry.includes("hangHoa")} onChange={handleIndustryChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm xxs:text-[11px]'>Hàng hóa và dịch vụ công nghiệp</span>
                                        {createHotImage("hangHoa")}
                                    </label>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="industry" value="hoaChat" id="hoaChat" checked={industry.includes("hoaChat")} onChange={handleIndustryChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm xxs:text-[11px]'>Hóa chất</span>
                                        {createHotImage("hoaChat")}
                                    </label>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="industry" value="nganHang" id="nganHang" checked={industry.includes("nganHang")} onChange={handleIndustryChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm xxs:text-[11px]'>Ngân hàng</span>
                                        {createHotImage("nganHang")}
                                    </label>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="industry" value="oto" id="oto" checked={industry.includes("oto")} onChange={handleIndustryChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm xxs:text-[11px]'>Ôtô & linh kiện phụ tùng</span>
                                        {createHotImage("oto")}
                                    </label>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="industry" value="truyenThong" id="truyenThong" checked={industry.includes("truyenThong")} onChange={handleIndustryChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm xxs:text-[11px]'>Phương tiện truyền thông</span>
                                        {createHotImage("truyenThong")}
                                    </label>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="industry" value="taiNguyen" id="taiNguyen" checked={industry.includes("taiNguyen")} onChange={handleIndustryChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm xxs:text-[11px]'>Tài nguyên</span>
                                        {createHotImage("taiNguyen")}
                                    </label>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="industry" value="thucPham" id="thucPham" checked={industry.includes("thucPham")} onChange={handleIndustryChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm xxs:text-[11px]'>Thực phẩm & Đồ uống</span>
                                        {createHotImage("thucPham")}
                                    </label>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="industry" value="vienThong" id="vienThong" checked={industry.includes("vienThong")} onChange={handleIndustryChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm xxs:text-[11px]'>Viễn thông</span>
                                        {createHotImage("vienThong")}
                                    </label>
                                    <label className="material-checkbox py-3 dark:text-white text-black">
                                        <input type="checkbox" name="industry" value="xayDung" id="xayDung" checked={industry.includes("xayDung")} onChange={handleIndustryChange} />
                                        <span className="checkmark"></span>
                                        <span className='text-sm xxs:text-[11px]'>Xây dựng & Vật liệu</span>
                                        {createHotImage("xayDung")}
                                    </label>
                                </div>
                            </div>

                            <div className='grid grid-cols-2 gap-5'>
                                <div>
                                    <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                        <span className='dark:text-white text-black font-semibold'>Khung thời gian</span>
                                    </div>
                                    <div>
                                        <label className="material-checkbox py-3 dark:text-white text-black">
                                            <input type="checkbox" name="type" value="2" id="2ky" checked={type === "2"} onChange={ontypeChange} />
                                            <span className="checkmark"></span>
                                            <span className='text-sm'>2 kỳ gần nhất</span>
                                        </label>
                                        <label className="material-checkbox py-3 dark:text-white text-black">
                                            <input type="checkbox" name="type" value="4" id="4ky" checked={type === "4"} onChange={ontypeChange} />
                                            <span className="checkmark"></span>
                                            <span className='text-sm'>4 kỳ gần nhất</span>
                                        </label>
                                        <label className="material-checkbox py-3 dark:text-white text-black">
                                            <input type="checkbox" name="type" value="8" id="8ky" checked={type === "8"} onChange={ontypeChange} />
                                            <span className="checkmark"></span>
                                            <span className='text-sm'>8 kỳ gần nhất</span>
                                        </label>
                                        <label className="material-checkbox py-3 dark:text-white text-black">
                                            <input type="checkbox" name="type" value="12" id="12ky" checked={type === "12"} onChange={ontypeChange} />
                                            <span className="checkmark"></span>
                                            <span className='text-sm'>12 kỳ gần nhất</span>
                                        </label>
                                        <label className="material-checkbox py-3 dark:text-white text-black">
                                            <input type="checkbox" name="type" value="20" id="20ky" checked={type === "20"} onChange={ontypeChange} />
                                            <span className="checkmark"></span>
                                            <span className='text-sm'>20 kỳ gần nhất</span>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                        <span className='dark:text-white text-black font-semibold sm:text-[15px] xs:text-[13px] xxs:text-[11px]'>Quy chuẩn dữ liệu tài chính</span>
                                    </div>
                                    <div>
                                        <label className="material-checkbox py-3 dark:text-white text-black">
                                            <input type="checkbox" name="order" value="0" id="quarter" checked={order === "0"} onChange={onOrderChange} />
                                            <span className="checkmark"></span>
                                            Tài chính theo quý
                                        </label>
                                        <label className="material-checkbox py-3 dark:text-white text-black">
                                            <input type="checkbox" name="order" value="1" id="year" checked={order === "1"} onChange={onOrderChange} />
                                            <span className="checkmark"></span>
                                            Tài chính theo năm
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='xl:w-[35%]'>
                        <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
                            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                <span className='dark:text-white text-black font-semibold'>Các chỉ số đánh giá hiệu suất là gì?</span>
                            </div>
                            <div className='ml-5'>
                                <ul className='text-justify dark:text-white text-black mt-2'>
                                    <li>Chỉ báo ROC (The Rate of Change) hay còn gọi là tỷ lệ thay đổi, là công cụ dựa vào giá nhằm đo lường tốc độ biến thiên giá cả trong hai thời điểm khác nhau. Chỉ báo này đồng thời được tính toán thông qua việc so sánh sự biến đổi giá tại giai đoạn đó.</li>
                                    <li className='mt-[2px]'>EBITDA được viết tắt theo cụm từ Earning Before Interest, Taxes, Depreciation and Amortization, có nghĩa là lợi nhuận trước thuế, khấu hao và lãi vay. Đây là thuật ngữ dùng để lợi nhuận trước thuế của một doanh nghiệp, tổ chức nào đó. Phần lợi nhuận này vẫn bao gồm thuế, các khoản vay và chưa trừ khấu hao.</li>
                                    <li className='mt-px'>Tính thanh khoản, một khái niệm trong tài chính, chỉ mức độ mà một tài sản bất kì có thể được mua hoặc bán trên thị trường mà không làm ảnh hưởng nhiều đến giá thị trường của tài sản đó. Một tài sản có tính thanh khoản cao nếu nó có thể được bán nhanh chóng mà giá bán không giảm đáng kể , thường được đặc trưng bởi số lượng giao dịch lớn.</li>
                                    <li className='mt-[2px]'>EPS hay còn được gọi là Earning Per Share, chỉ số tài chính này là tỷ suất thu nhập dựa trên cổ phần. Như vậy chỉ số EPS sẽ cho thấy phần lợi nhuận thu được dựa vào một cổ phiếu. Trên mỗi khoản đầu tư từ ban đầu, EPS chính là phần lợi nhuận thu được vì vậy mà nó còn được xem là chỉ số giúp xác định khả năng của một công ty hoặc dự án đầu tư sinh lợi. EPS cũng chính là lợi nhuận mà công ty phân bổ dành cho một cổ phiếu bình thường và đang được lưu hành tại thị trường.</li>
                                    <li className='mt-px'>Cổ tức là khoản lợi nhuận ròng được trả cho mỗi cổ phần bằng tiền mặt hoặc bằng tài sản khác từ nguồn lợi nhuận còn lại của công ty cổ phần sau khi đã thực hiện nghĩa vụ tài chính. </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {children}
        </div>
    );
};

export default Checkbox;
