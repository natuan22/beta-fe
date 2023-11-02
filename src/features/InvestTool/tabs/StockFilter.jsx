import { Button, Popover } from 'antd'
import React, { useState, useEffect } from 'react'
import '../utils/styles/btnFilterStyle.css'
import { useDispatch, useSelector } from "react-redux";
import { fetchDataStockFilter, fetchRangeMinMax } from "../thunk";
import { hashTbStockFilter, hashTbIndustry, hashTbExchange } from "../utils/hashTb";
import SliderInput from "../utils/SliderInput";
import "../utils/styles/btnDel.css";
import TableStockFilter from '../components/StockFilter/TableStockFilter';

const StockFilter = () => {
    const dispatch = useDispatch();
    const [openYourFilter, setOpenYourFilter] = useState(false);
    const [openExchange, setExchange] = useState(false);
    const [openIndustry, setIndustry] = useState(false);
    const [openSampleFilter, setOpenSampleFilter] = useState(false);
    const [valueYourFilter, setValueYourFilter] = useState('Bộ lọc của bạn');
    const [valueSampleFilter, setSampleFilter] = useState('Bộ lọc mẫu của BETA');
    const { dataRangeMinMax } = useSelector((state) => state.investTool);
    const [selectedKey, setSelectedKey] = useState(null);
    const [arrSliderInput, setArrSliderInput] = useState([]);
    const [arrSliderCheckbox, setArrSliderCheckbox] = useState([]);
    const [isCheckAllIndustry, setIsCheckAllIndustry] = useState(true)
    const [selectedExchange, setSelectedExchange] = useState(['HOSE', 'HNX', 'UPCOM']);
    const [selectedIndustry, setSelectedIndustry] = useState(['Bảo hiểm', 'Bất động sản', 'Công nghệ', 'Dầu khí', 'Dịch vụ bán lẻ', 'Dịch vụ tài chính', 'Dịch vụ tiện ích', 'Đồ dùng cá nhân và đồ gia dụng', 'Du lịch & Giải trí', 'Hàng hóa và dịch vụ công nghiệp', 'Hóa chất', 'Ngân hàng', 'Ôtô & linh kiện phụ tùng ', 'Phương tiện truyền thông', 'Thực phẩm & Đồ uống', 'Viễn thông', 'Xây dựng & Vật liệu', 'Tài nguyên', 'Y tế']);
    const [formData, setFormData] = useState({
        'filter': [],
        'exchange': selectedExchange.map((exchange) => hashTbExchange[exchange]).join(','),
        'industry': selectedIndustry.map((industry) => hashTbIndustry[industry]).join(','),
    });

    useEffect(() => {
        if (formData.filter.length > 0)
            dispatch(fetchDataStockFilter(formData));
    }, [dispatch, formData, formData.filter])
    console.log({ formData })
    useEffect(() => {
        const exchangeValue = selectedExchange.map((exchange) => hashTbExchange[exchange]).join(',');
        setFormData((prevData) => ({
            ...prevData,
            'exchange': exchangeValue,
        }));
    }, [selectedExchange]);

    useEffect(() => {
        const industryValue = selectedIndustry.map((industry) => hashTbIndustry[industry]).join(',');
        setFormData((prevData) => ({
            ...prevData,
            'industry': industryValue,
        }));
    }, [selectedIndustry]);

    const handleSelectedIndustry = (name) => {
        // Xử lý khi người dùng chọn một mục
        let updatedSelectedIndustry;
        if (selectedIndustry.includes(name)) {
            updatedSelectedIndustry = selectedIndustry.filter(item => item !== name);
        } else {
            updatedSelectedIndustry = [...selectedIndustry, name];
        }

        // Kiểm tra xem tất cả các ngành có được chọn không
        const allSelected = Object.keys(hashTbIndustry).every(industry => updatedSelectedIndustry.includes(industry));

        // Cập nhật trạng thái của nút "Chọn tất cả"
        setIsCheckAllIndustry(allSelected);
        setSelectedIndustry(updatedSelectedIndustry);
    };

    const handleSelectedExchange = (name) => {
        // Xử lý khi người dùng chọn một mục
        if (selectedExchange.includes(name)) {
            setSelectedExchange(selectedExchange.filter(item => item !== name));
        } else {
            setSelectedExchange([...selectedExchange, name]);
        }
    };

    const onClickValueYourFilter = (newValue) => {
        setValueYourFilter(newValue.target.innerHTML)
        setOpenYourFilter(false);
    }

    const onClickSampleFilter = (newValue) => {
        setSampleFilter(newValue.target.innerHTML)
        setOpenSampleFilter(false);
    }

    const handleElementClick = (key) => {
        setSelectedKey(key);
    };

    useEffect(() => {
        dispatch(fetchRangeMinMax());
    }, [dispatch]);

    const handleCriteriaClick = (key) => {
        // Kiểm tra xem key đã tồn tại trong mảng arrSliderInput chưa
        if (!arrSliderInput.includes(key)) {
            // Nếu chưa tồn tại, thêm key vào mảng
            setArrSliderInput([...arrSliderInput, key]);
            setArrSliderCheckbox([...arrSliderCheckbox, key])

        }
    };
    const getMinMaxByKey = (key) => {
        const minMaxData = dataRangeMinMax?.find((item) => item.key === key);
        if (minMaxData) {
            return {
                min: minMaxData.min,
                max: minMaxData.max,
            };
        }
        return null;
    };

    const handleDelElement = (keyToDelete) => {
        const updatedArr = arrSliderInput.filter((key) => key !== keyToDelete);
        const updateArrCheckbox = arrSliderCheckbox.filter(key => key !== keyToDelete)
        setArrSliderCheckbox(updateArrCheckbox)
        setArrSliderInput(updatedArr);

        // Xóa object tương ứng trong mảng filter của formData
        const updatedFilter = formData.filter.filter((filterItem) => filterItem.key !== keyToDelete);

        // Cập nhật formData với mảng filter mới
        setFormData({
            ...formData,
            filter: updatedFilter,
        });
    };

    const toggleKeyInArray = (key) => {
        if (arrSliderCheckbox.includes(key)) {
            // Nếu key đã tồn tại trong mảng, xóa nó ra khỏi mảng
            const updatedArr = arrSliderCheckbox.filter((item) => item !== key);
            setArrSliderCheckbox(updatedArr);
        } else {
            // Nếu key chưa tồn tại trong mảng, thêm nó vào
            setArrSliderCheckbox([...arrSliderCheckbox, key]);
        }
    };
    return (
        <div className='p-2'>
            <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-4'>
                <div>
                    <div className='pb-3'>
                        <div className='grid md:grid-cols-2 sm:grid-cols-none gap-2'>
                            <div className='grid grid-cols-2 gap-2'>
                                <button className='bg-[#2790BD] border-none text-white font-bold flex items-center justify-evenly px-2 py-1 rounded-lg btnInfoFilter active:bg-[#154162]'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                        <path d="M1.00879 13.8333V2.16667C1.00879 1.24619 1.75498 0.5 2.67546 0.5H11.9851C12.4271 0.5 12.851 0.675592 13.1636 0.988158L15.5206 3.34517C15.8332 3.65774 16.0088 4.08166 16.0088 4.52369V13.8333C16.0088 14.7538 15.2626 15.5 14.3421 15.5H2.67546C1.75498 15.5 1.00879 14.7538 1.00879 13.8333Z" stroke="white" />
                                        <path d="M5.67548 5.5H11.3421C11.6183 5.5 11.8421 5.27614 11.8421 5V1C11.8421 0.723858 11.6183 0.5 11.3421 0.5H5.67548C5.39933 0.5 5.17548 0.723858 5.17548 1V5C5.17548 5.27614 5.39933 5.5 5.67548 5.5Z" stroke="white" />
                                        <path d="M3.50879 9.33333V15.5H13.5088V9.33333C13.5088 9.05716 13.285 8.83333 13.0088 8.83333H4.00879C3.73265 8.83333 3.50879 9.05716 3.50879 9.33333Z" stroke="white" />
                                    </svg>
                                    <span>Lưu bộ lọc</span>
                                </button>
                                <button className='bg-[#2790BD] border-none text-white font-bold flex items-center justify-evenly px-2 py-1 rounded-lg btnInfoFilter active:bg-[#154162]'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                        <path d="M1.57841 2.64286H16.0088L13.7303 11.2143H3.85689L1.57841 2.64286ZM1.57841 2.64286L1.00879 0.5" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6.88892 6.92856H8.40791M8.40791 6.92856H9.9269M8.40791 6.92856V5.21428M8.40791 6.92856V8.64285" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M7.65446 14.2143C7.65446 14.9243 7.14438 15.5 6.51522 15.5C5.88603 15.5 5.37598 14.9243 5.37598 14.2143" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12.2113 14.2143C12.2113 14.9243 11.7013 15.5 11.0721 15.5C10.4429 15.5 9.93286 14.9243 9.93286 14.2143" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>Thêm vào<br /> Watchlist</span>
                                </button>
                                <button className='bg-[#2790BD] border-none text-white font-bold flex items-center justify-evenly px-2 py-1 rounded-lg btnInfoFilter active:bg-[#154162]'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                        <path d="M10.0088 14.7105H2.50879C1.68036 14.7105 1.00879 14.0036 1.00879 13.1316V2.07895C1.00879 1.20692 1.68036 0.5 2.50879 0.5H14.5088C15.3372 0.5 16.0088 1.20692 16.0088 2.07895V9.18421" stroke="white" strokeLinecap="round" />
                                        <path d="M1.00879 3.6579H16.0088" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M3.25879 2.08684L3.26629 2.07806" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M5.50879 2.08684L5.51629 2.07806" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M7.75879 2.08684L7.76629 2.07806" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M14.1338 10.7632V15.5M14.1338 15.5L12.2588 13.5263M14.1338 15.5L16.0088 13.5263" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>Tải xuống<br /> kết quả</span>
                                </button>
                                <button className='bg-[#2790BD] border-none text-white font-bold flex items-center justify-evenly px-2 py-1 rounded-lg btnInfoFilter active:bg-[#154162]'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                        <path d="M15.3832 5C14.2229 2.35114 11.5733 0.5 8.49017 0.5C4.59158 0.5 1.38601 3.46001 1.00879 7.25" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12.2494 5H15.5575C15.8067 5 16.0087 4.79853 16.0087 4.55V1.25" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M1.63437 11C2.79457 13.6488 5.44422 15.5 8.52732 15.5C12.4259 15.5 15.6315 12.54 16.0087 8.75" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M4.76806 11H1.4599C1.21076 11 1.00879 11.2015 1.00879 11.45V14.75" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>Tạo mới bộ lọc</span>
                                </button>
                            </div>
                            <div className='grid grid-cols-2 gap-2'>
                                {/* YOUR FILTER */}
                                <Popover
                                    content={
                                        <div className='bg-[#034460] text-white overflow-auto border text-center'>
                                            <div className='border-solid border-b-2 border-t-0 border-x-0 cursor-pointer' onClick={onClickValueYourFilter}>Bộ lọc 1</div>
                                            <div className='border-solid border-b-2 border-t-0 border-x-0 cursor-pointer' onClick={onClickValueYourFilter}>Bộ lọc 2</div>
                                            <div className='border-solid border-b-2 border-t-0 border-x-0 cursor-pointer' onClick={onClickValueYourFilter}>Bộ lọc 3</div>
                                            <div className='border-solid border-b-2 border-t-0 border-x-0 cursor-pointer' onClick={onClickValueYourFilter}>Bộ lọc 4</div>
                                        </div>
                                    }
                                    placement="bottom"
                                    trigger="click"
                                    open={openYourFilter}
                                    onOpenChange={(visible) => setOpenYourFilter(visible)}
                                    showArrow={false}
                                    overlayClassName="btnFilter"
                                >
                                    <Button className='bg-[#2790BD] btnInfoFilter border-none items-center flex justify-evenly h-[41px] px-2 py-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                            <path d="M1.00879 13.6759V12.8524C1.00879 9.6688 3.33429 7.08797 6.20295 7.08797" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M11.2516 7.34614C11.7278 6.76582 12.5506 6.76582 13.0268 7.34614C13.2675 7.63947 13.6134 7.79849 13.9705 7.77996C14.677 7.74331 15.2588 8.38902 15.2258 9.17307C15.2091 9.56933 15.3524 9.95325 15.6167 10.2204C16.1396 10.7489 16.1396 11.662 15.6167 12.1905C15.3524 12.4577 15.2091 12.8416 15.2258 13.2378C15.2588 14.0219 14.677 14.6676 13.9705 14.631C13.6134 14.6124 13.2675 14.7714 13.0268 15.0648C12.5506 15.6451 11.7278 15.6451 11.2516 15.0648C11.0109 14.7714 10.6649 14.6124 10.3079 14.631C9.60141 14.6676 9.01959 14.0219 9.05261 13.2378C9.0693 12.8416 8.92602 12.4577 8.66171 12.1905C8.13881 11.662 8.13881 10.7489 8.66171 10.2204C8.92602 9.95325 9.0693 9.56933 9.05261 9.17307C9.01959 8.38902 9.60141 7.74331 10.3079 7.77996C10.6649 7.79849 11.0109 7.63947 11.2516 7.34614Z" stroke="white" />
                                            <path d="M10.9248 11.2055L11.7344 12.1038L13.3533 10.3071" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M6.20295 7.08797C7.84215 7.08797 9.17104 5.61317 9.17104 3.79398C9.17104 1.97477 7.84215 0.5 6.20295 0.5C4.56372 0.5 3.23486 1.97477 3.23486 3.79398C3.23486 5.61317 4.56372 7.08797 6.20295 7.08797Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className='text-white ml-2 font-bold'>{valueYourFilter}</span>
                                        <span className='ml-2'>
                                            {openYourFilter ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="8" viewBox="0 0 13 8" fill="none">
                                                    <path d="M12 7L6.5 1.5L1 7" stroke="white" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="8" viewBox="0 0 13 8" fill="none">
                                                    <path d="M1.00879 1L6.50879 6.5L12.0088 1" stroke="white" />
                                                </svg>
                                            )}
                                        </span>
                                    </Button>
                                </Popover>

                                {/* EXCHANGE */}
                                <Popover
                                    content={
                                        <div className='bg-[#034460] text-white overflow-auto border text-center'>
                                            {Object.keys(hashTbExchange).map((exchange, index) => (
                                                <label key={index} className="material-checkbox py-2 px-2 text-white">
                                                    <input
                                                        type="checkbox"
                                                        name="exchange"
                                                        value={exchange}
                                                        id={exchange}
                                                        checked={selectedExchange.includes(exchange)}
                                                        onChange={() => handleSelectedExchange(exchange)}
                                                    />
                                                    <span className="checkmark"></span>
                                                    <span className='text-sm'>{exchange}</span>
                                                </label>
                                            ))}
                                        </div>
                                    }
                                    placement="bottom"
                                    trigger="click"
                                    open={openExchange}
                                    onOpenChange={(visible) => setExchange(visible)}
                                    showArrow={false}
                                    overlayClassName="btnFilter"
                                >
                                    <Button className='bg-[#2790BD] btnInfoFilter border-none items-center flex justify-evenly h-[41px] px-2 py-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                            <path d="M15.0102 0.5H11.9541L12.3369 4.66667C12.3369 4.66667 13.1025 5.5 14.2509 5.5C15.0755 5.5 15.6369 5.07037 15.888 4.82808C15.9881 4.73152 16.0247 4.58409 16.0027 4.44051L15.4633 0.9178C15.4264 0.676708 15.2347 0.5 15.0102 0.5Z" stroke="white" />
                                            <path d="M11.954 0.5L12.3368 4.66667C12.3368 4.66667 11.5712 5.5 10.4228 5.5C9.2744 5.5 8.50879 4.66667 8.50879 4.66667V0.5H11.954Z" stroke="white" />
                                            <path d="M8.50871 0.5V4.66667C8.50871 4.66667 7.7431 5.5 6.59468 5.5C5.44627 5.5 4.68066 4.66667 4.68066 4.66667L5.06347 0.5H8.50871Z" stroke="white" />
                                            <path d="M5.06356 0.5H2.00746C1.78291 0.5 1.59127 0.676708 1.55435 0.9178L1.01494 4.44052C0.992961 4.58409 1.02958 4.73152 1.12964 4.82808C1.3807 5.07037 1.94214 5.5 2.76672 5.5C3.91513 5.5 4.68076 4.66667 4.68076 4.66667L5.06356 0.5Z" stroke="white" />
                                            <path d="M1.62354 5.5V13.8333C1.62354 14.7538 2.30908 15.5 3.15475 15.5H13.8733C14.719 15.5 15.4045 14.7538 15.4045 13.8333V5.5" stroke="white" />
                                            <path d="M10.683 15.5V10.5C10.683 9.57951 9.99747 8.83334 9.15178 8.83334H7.62056C6.7749 8.83334 6.08936 9.57951 6.08936 10.5V15.5" stroke="white" strokeMiterlimit="16" />
                                        </svg>
                                        <span className='text-white ml-2 font-bold'>Sàn giao dịch</span>
                                        <span className='m-2.JSON()'>                                        {openExchange ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="8" viewBox="0 0 13 8" fill="none">
                                                <path d="M12 7L6.5 1.5L1 7" stroke="white" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="8" viewBox="0 0 13 8" fill="none">
                                                <path d="M1.00879 1L6.50879 6.5L12.0088 1" stroke="white" />
                                            </svg>
                                        )}
                                        </span>
                                    </Button>
                                </Popover>

                                {/* SAMPLE FILTER */}
                                <Popover
                                    content={
                                        <div className='bg-[#034460] text-white overflow-auto border text-center'>
                                            <div className='border-solid border-b-2 border-t-0 border-x-0 cursor-pointer' onClick={onClickSampleFilter}>Bộ lọc Canslim</div>
                                            <div className='border-solid border-b-2 border-t-0 border-x-0 cursor-pointer' onClick={onClickSampleFilter}>Bộ lọc SEPA</div>
                                            <div className='border-solid border-b-2 border-t-0 border-x-0 cursor-pointer' onClick={onClickSampleFilter}>Bộ lọc Tăng trưởng</div>
                                            <div className='border-solid border-b-2 border-t-0 border-x-0 cursor-pointer' onClick={onClickSampleFilter}>Bộ lọc Dưới định giá</div>
                                            <div className='border-solid border-b-2 border-t-0 border-x-0 cursor-pointer' onClick={onClickSampleFilter}>Bộ lọc Ổn định</div>
                                        </div>
                                    }
                                    placement="bottom"
                                    trigger="click"
                                    open={openSampleFilter}
                                    onOpenChange={(visible) => setOpenSampleFilter(visible)}
                                    showArrow={false}
                                    overlayClassName="btnFilter"
                                >
                                    <Button className='bg-[#2790BD] btnInfoFilter border-none items-center flex justify-evenly h-[41px] px-2 py-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                            <path d="M1.00879 15V1C1.00879 0.723858 1.23265 0.5 1.50879 0.5H15.5088C15.785 0.5 16.0088 0.723858 16.0088 1V15C16.0088 15.2762 15.785 15.5 15.5088 15.5H1.50879C1.23265 15.5 1.00879 15.2762 1.00879 15Z" stroke="white" />
                                            <path d="M11.0088 5.08333C10.438 4.5125 9.43271 4.11545 8.50879 4.09059M8.50879 4.09059C7.40954 4.06101 6.42546 4.55831 6.42546 5.91667C6.42546 8.41666 11.0088 7.16666 11.0088 9.66666C11.0088 11.0925 9.78896 11.7052 8.50879 11.6592M8.50879 4.09059V2.58333M6.00879 10.5C6.54586 11.2161 7.54446 11.6245 8.50879 11.6592M8.50879 11.6592V13.4167" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className='text-white ml-1 font-bold text-[11px]'>{valueSampleFilter}</span>
                                        <span className='ml-1'>
                                            {openSampleFilter ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="8" viewBox="0 0 13 8" fill="none">
                                                    <path d="M12 7L6.5 1.5L1 7" stroke="white" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="8" viewBox="0 0 13 8" fill="none">
                                                    <path d="M1.00879 1L6.50879 6.5L12.0088 1" stroke="white" />
                                                </svg>
                                            )}
                                        </span>
                                    </Button>
                                </Popover>

                                {/* INDUSTRY */}
                                <Popover
                                    content={
                                        <div className='bg-[#034460] text-white overflow-auto border text-center h-[120px]'>
                                            <label className="material-checkbox py-2 px-2 text-white">
                                                <input
                                                    type="checkbox"
                                                    name="industry"
                                                    value={'all'}
                                                    id={'all'}
                                                    checked={isCheckAllIndustry}
                                                    onChange={() => {
                                                        if (isCheckAllIndustry) {
                                                            setSelectedIndustry([]);
                                                        } else {
                                                            setSelectedIndustry(Object.keys(hashTbIndustry));
                                                        }
                                                        setIsCheckAllIndustry(!isCheckAllIndustry);
                                                    }}
                                                />
                                                <span className="checkmark"></span>
                                                <span className='text-xs text-left'>Chọn tất cả</span>
                                            </label>
                                            {Object.keys(hashTbIndustry).map((industry, index) => (
                                                <label key={index} className="material-checkbox py-2 px-2 text-white">
                                                    <input
                                                        type="checkbox"
                                                        name="industry"
                                                        value={industry}
                                                        id={industry}
                                                        checked={selectedIndustry.includes(industry)}
                                                        onChange={() => handleSelectedIndustry(industry)}
                                                    />
                                                    <span className="checkmark"></span>
                                                    <span className='text-xs text-left'>{industry}</span>
                                                </label>
                                            ))}
                                        </div>
                                    }
                                    placement="bottom"
                                    trigger="click"
                                    open={openIndustry}
                                    onOpenChange={(visible) => setIndustry(visible)}
                                    showArrow={false}
                                    overlayClassName="btnFilter"
                                >
                                    <Button className='bg-[#2790BD] btnInfoFilter border-none items-center flex justify-evenly h-[41px] px-2 py-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                            <path d="M13.5089 6.81579C13.5089 6.02632 12.6755 5.23684 11.0089 5.23684C10.757 5.23684 10.4714 5.23684 10.1757 5.23684C8.79504 5.23684 7.67554 4.17646 7.67554 2.86842V0.5" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M13.5088 15.5H16.0088V8.39476H13.5088V11.9474M13.5088 15.5V11.9474M13.5088 15.5H1.00879V12.3421L3.92546 9.97371L7.25879 11.9474L10.5921 9.97371L13.5088 11.9474" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M16.0089 6.81579C16.0089 2.07895 12.6755 2.07895 12.6755 2.07895C12.6755 2.07895 16.0089 2.47368 16.0089 0.5" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className='text-white ml-1 font-bold text-[10px]'>Ngành nghề kinh doanh</span>
                                        <span className='ml-1'>
                                            {openIndustry ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="8" viewBox="0 0 13 8" fill="none">
                                                    <path d="M12 7L6.5 1.5L1 7" stroke="white" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="8" viewBox="0 0 13 8" fill="none">
                                                    <path d="M1.00879 1L6.50879 6.5L12.0088 1" stroke="white" />
                                                </svg>
                                            )}
                                        </span>
                                    </Button>
                                </Popover>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="text-white grid md:grid-cols-12 sm:grid-cols-none gap-3 pt-3">
                        <div className="md:col-span-4 sm:col-span-full">
                            <div className='text-center border border-solid border-t-2 border-b-0 border-x-0 border-[#2790BD] bg-[#154162] p-1'>Yếu tố cần lọc</div>
                            <div className="bg-[#2b2b2b] h-[350px] p-2 border border-solid border-b-0 border-t-2 border-x-0">
                                <div className="bg-[#2b2b2b] flex flex-col">
                                    {Object.keys(hashTbStockFilter).map((key, index) => {
                                        return (
                                            <span
                                                key={index}
                                                onClick={() => handleElementClick(key)}
                                                className={`hover:bg-[#477386] rounded-md my-1 cursor-pointer px-1 py-2 ${selectedKey === key ? "bg-gray-500" : ""
                                                    }`}
                                            >
                                                {key}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-8 sm:col-span-full">
                            <div className='text-center border border-solid border-t-2 border-b-0 border-x-0 border-[#2790BD] bg-[#154162] p-1'>Lựa chọn các tiêu chí lọc</div>
                            <div className="bg-[#2b2b2b] h-[350px] p-2 border border-solid border-b-0 border-t-2 border-x-0">
                                <div className="flex flex-col">
                                    {selectedKey &&
                                        hashTbStockFilter[selectedKey].map((item, index) => {
                                            return (
                                                <span
                                                    onClick={() => handleCriteriaClick(item.key)}
                                                    className="hover:bg-[#477386] rounded-md my-1 cursor-pointer px-1 py-2"
                                                    key={index}
                                                >
                                                    {item.name}
                                                </span>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-white border dark:border-white border-black border-solid h-[512px] overflow-y-auto">
                    <div className="bg-[#154162] p-1 text-center font-semibold border border-[#2790BD] border-solid border-t-2 border-b-0 border-x-0">
                        Tương tác các chỉ tiêu đã chọn
                    </div>
                    <div className='border dark:border-white border-black border-solid border-t-2 border-b-0 border-x-0'>
                        {arrSliderInput.map((key, index) => {
                            const minMax = getMinMaxByKey(key);
                            const name = Object.values(hashTbStockFilter)
                                .flatMap((items) => items)
                                .find((item) => item.key === key)?.name;
                            if (minMax && name) {
                                return (
                                    <div key={index} className="flex justify-between items-center my-1 mx-2" >
                                        <div className="w-[95%] flex items-center justify-between">
                                            <div className='w-[30%] flex items-center justify-between'>
                                                <div className='text-xs dark:text-white text-black'>{name}</div>
                                                <label className="material-checkbox py-2 px-2 text-white">
                                                    <input checked={arrSliderCheckbox?.includes(key)}
                                                        type="checkbox"
                                                        name="exchange"
                                                        onChange={() => toggleKeyInArray(key)} />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </div>
                                            <div className="w-[70%]">
                                                <SliderInput
                                                    sliderKey={key}
                                                    min={Math.floor(minMax.min)}
                                                    max={Math.ceil(minMax.max)}
                                                    formData={formData}
                                                    arrCheckbox={arrSliderCheckbox}
                                                    setFormData={setFormData}
                                                />
                                            </div>
                                        </div>
                                        <div className='w-[3%] ml-[55px] '>
                                            <button onClick={() => handleDelElement(key)} className="btn btn-del">
                                                <svg
                                                    viewBox="0 0 15 17.5"
                                                    height="17.5"
                                                    width="15"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="icon"
                                                    fill="gray"
                                                >
                                                    <path
                                                        transform="translate(-2.5 -1.25)"
                                                        d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z"
                                                        id="Fill"
                                                    ></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
            </div>
            <TableStockFilter arrSliderCheckbox={arrSliderCheckbox} />
        </div>
    )
}

export default StockFilter