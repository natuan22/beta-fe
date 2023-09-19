import React from "react";
import "../utils/styles/btnFilterStyle.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchRangeMinMax } from "../thunk";
import { hashTbStockFilter } from "../utils/hashTb";
import { useState } from "react";
import SliderInput from "../utils/SliderInput";
import "../utils/styles/btnDel.css";

const StockFilter = () => {
    const dispatch = useDispatch();
    const { dataRangeMinMax } = useSelector((state) => state.investTool);
    const [selectedKey, setSelectedKey] = useState(null);
    const [arrSliderInput, setArrSliderInput] = useState([]);
    const [arrToCallApi, setArrToCallApi] = useState([])
    const [isChecked, setIsChecked] = useState(true)
    const handleElementClick = (key) => {
        setSelectedKey(key);
    };

    const handleCriteriaClick = (key) => {
        // Kiểm tra xem key đã tồn tại trong mảng arrSliderInput chưa
        if (!arrSliderInput.includes(key)) {
            // Nếu chưa tồn tại, thêm key vào mảng
            setArrSliderInput([...arrSliderInput, key]);
        }
    };
    const getMinMaxByKey = (key) => {
        const minMaxData = dataRangeMinMax.find((item) => item.key === key);
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
        setArrSliderInput(updatedArr);
    };
    // const toggleKeyInArray = (key) => {
    //     if (arrSliderInput.includes(key)) {
    //         // Nếu key đã tồn tại trong mảng, xóa nó ra khỏi mảng
    //         const updatedArr = arrSliderInput.filter((item) => item !== key);
    //         setArrSliderInput(updatedArr);
    //     } else {
    //         // Nếu key chưa tồn tại trong mảng, thêm nó vào
    //         setArrSliderInput([...arrSliderInput, key]);
    //     }
    // };
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked); // Đảo ngược trạng thái của checkbox
    };

    useEffect(() => {
        dispatch(fetchRangeMinMax());
    }, [dispatch]);
    return (
        <div>
            <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                    <div className="grid grid-cols-12 gap-1 pb-2">
                        <div className="col-span-2 flex items-center">
                            <button className="bg-[#2790BD] rounded-lg text-white font-semibold text-xs px-[9px] py-1 btnInfoFilter">
                                Bộ lọc nâng cao
                            </button>
                        </div>
                        <div className="col-span-10 grid grid-cols-4 gap-2">
                            <button className="bg-[#2790BD] text-white font-bold flex items-center justify-evenly px-2 py-1 rounded-lg btnInfoFilter">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="17"
                                    height="16"
                                    viewBox="0 0 17 16"
                                    fill="none"
                                >
                                    <path
                                        d="M1.00879 13.8333V2.16667C1.00879 1.24619 1.75498 0.5 2.67546 0.5H11.9851C12.4271 0.5 12.851 0.675592 13.1636 0.988158L15.5206 3.34517C15.8332 3.65774 16.0088 4.08166 16.0088 4.52369V13.8333C16.0088 14.7538 15.2626 15.5 14.3421 15.5H2.67546C1.75498 15.5 1.00879 14.7538 1.00879 13.8333Z"
                                        stroke="white"
                                    />
                                    <path
                                        d="M5.67548 5.5H11.3421C11.6183 5.5 11.8421 5.27614 11.8421 5V1C11.8421 0.723858 11.6183 0.5 11.3421 0.5H5.67548C5.39933 0.5 5.17548 0.723858 5.17548 1V5C5.17548 5.27614 5.39933 5.5 5.67548 5.5Z"
                                        stroke="white"
                                    />
                                    <path
                                        d="M3.50879 9.33333V15.5H13.5088V9.33333C13.5088 9.05716 13.285 8.83333 13.0088 8.83333H4.00879C3.73265 8.83333 3.50879 9.05716 3.50879 9.33333Z"
                                        stroke="white"
                                    />
                                </svg>
                                <span>Lưu bộ lọc</span>
                            </button>
                            <button className="bg-[#2790BD] text-white font-bold flex items-center justify-evenly px-2 py-1 rounded-lg btnInfoFilter">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="17"
                                    height="16"
                                    viewBox="0 0 17 16"
                                    fill="none"
                                >
                                    <path
                                        d="M1.57841 2.64286H16.0088L13.7303 11.2143H3.85689L1.57841 2.64286ZM1.57841 2.64286L1.00879 0.5"
                                        stroke="white"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M6.88892 6.92856H8.40791M8.40791 6.92856H9.9269M8.40791 6.92856V5.21428M8.40791 6.92856V8.64285"
                                        stroke="white"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M7.65446 14.2143C7.65446 14.9243 7.14438 15.5 6.51522 15.5C5.88603 15.5 5.37598 14.9243 5.37598 14.2143"
                                        stroke="white"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M12.2113 14.2143C12.2113 14.9243 11.7013 15.5 11.0721 15.5C10.4429 15.5 9.93286 14.9243 9.93286 14.2143"
                                        stroke="white"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                                <span>
                                    Thêm vào
                                    <br /> Watchlist
                                </span>
                            </button>
                            <select className="bg-[#2790BD] btnInfoFilter text-white font-bold">
                                <option value="none" selected disabled hidden>
                                    Bộ lọc của bạn
                                </option>
                                <option>Bộ lọc 1</option>
                                <option>Bộ lọc 2</option>
                                <option>Bộ lọc 3</option>
                                <option>Bộ lọc 4</option>
                                <option>Bộ lọc 5</option>
                            </select>
                            <select className="bg-[#2790BD] btnInfoFilter text-white font-bold">
                                <option value="none" selected disabled hidden>
                                    Sàn giao dịch
                                </option>
                                <option>HOSE</option>
                                <option>HNX</option>
                                <option>UPCOM</option>
                            </select>
                            <button className="bg-[#2790BD] text-white font-bold flex items-center justify-evenly px-2 py-1 rounded-lg btnInfoFilter">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="17"
                                    height="16"
                                    viewBox="0 0 17 16"
                                    fill="none"
                                >
                                    <path
                                        d="M10.0088 14.7105H2.50879C1.68036 14.7105 1.00879 14.0036 1.00879 13.1316V2.07895C1.00879 1.20692 1.68036 0.5 2.50879 0.5H14.5088C15.3372 0.5 16.0088 1.20692 16.0088 2.07895V9.18421"
                                        stroke="white"
                                        stroke-linecap="round"
                                    />
                                    <path
                                        d="M1.00879 3.6579H16.0088"
                                        stroke="white"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M3.25879 2.08684L3.26629 2.07806"
                                        stroke="white"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M5.50879 2.08684L5.51629 2.07806"
                                        stroke="white"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M7.75879 2.08684L7.76629 2.07806"
                                        stroke="white"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M14.1338 10.7632V15.5M14.1338 15.5L12.2588 13.5263M14.1338 15.5L16.0088 13.5263"
                                        stroke="white"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                                <span>
                                    Tải xuống
                                    <br /> kết quả
                                </span>
                            </button>
                            <button className="bg-[#2790BD] text-white font-bold flex items-center justify-evenly px-2 py-1 rounded-lg btnInfoFilter">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="17"
                                    height="16"
                                    viewBox="0 0 17 16"
                                    fill="none"
                                >
                                    <path
                                        d="M15.3832 5C14.2229 2.35114 11.5733 0.5 8.49017 0.5C4.59158 0.5 1.38601 3.46001 1.00879 7.25"
                                        stroke="white"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M12.2494 5H15.5575C15.8067 5 16.0087 4.79853 16.0087 4.55V1.25"
                                        stroke="white"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M1.63437 11C2.79457 13.6488 5.44422 15.5 8.52732 15.5C12.4259 15.5 15.6315 12.54 16.0087 8.75"
                                        stroke="white"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M4.76806 11H1.4599C1.21076 11 1.00879 11.2015 1.00879 11.45V14.75"
                                        stroke="white"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                                <span>Tạo mới bộ lọc</span>
                            </button>
                            <select className="bg-[#2790BD] btnInfoFilter text-white font-bold text-[11px]">
                                <option value="none" selected disabled hidden>
                                    Bộ lọc mẫu của BETA
                                </option>
                                <option></option>
                                <option></option>
                                <option></option>
                                <option></option>
                            </select>
                            <select className="bg-[#2790BD] btnInfoFilter text-white font-bold text-[10px]">
                                <option value="none" selected disabled hidden>
                                    Ngành nghề kinh doanh
                                </option>
                                <option></option>
                                <option></option>
                                <option></option>
                                <option></option>
                            </select>
                        </div>
                    </div>
                    <hr />
                    <div className="text-white flex justify-between items-center">
                        <div className="w-[30%] h-[350px]  ">
                            <span> Yếu tố cần lọc</span>
                            <div className="bg-[#2b2b2b] h-full p-2">
                                <div className="bg-[#2b2b2b] flex flex-col justify-evenly h-[60%]">
                                    {Object.keys(hashTbStockFilter).map((key) => {
                                        return (
                                            <span
                                                key={key}
                                                onClick={() => handleElementClick(key)}
                                                className={`cursor-pointer ${selectedKey === key ? "bg-gray-500" : ""
                                                    }`}
                                            >
                                                {key}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="w-[70%]  ml-2 h-[350px] ">
                            <span>Lựa chọn các tiêu chí lọc</span>
                            <div className="bg-[#2b2b2b] h-[350px] p-2">
                                <div className=" h-full ">
                                    <div className="h-[80%] flex flex-col justify-evenly">
                                        {selectedKey &&
                                            hashTbStockFilter[selectedKey].map((item) => {
                                                return (
                                                    <span
                                                        onClick={() => handleCriteriaClick(item.key)}
                                                        className="cursor-pointer"
                                                        key={item.key}
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
                </div>
                <div className="text-white border border-white border-solid">
                    <div className="bg-[#154162] text-center font-semibold border border-white border-solid">
                        Tương tác các chỉ tiêu đã chọn
                    </div>
                    <div>
                        {arrSliderInput.map((key, index) => {
                            const minMax = getMinMaxByKey(key);
                            const name = Object.values(hashTbStockFilter)
                                .flatMap(items => items)
                                .find(item => item.key === key)?.name;
                            if (minMax && name) {
                                return (
                                    <div
                                        key={index}
                                        className="flex w-full justify-around items-center mb-2 mt-2"
                                    >
                                        <div className="w-[30%] flex items-center  justify-around">
                                            <span>{name}</span>
                                            <label className="material-checkbox py-2 px-2 text-white">
                                                <input onChange={() => handleCheckboxChange(key)} checked={isChecked} type="checkbox" name="exchange" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>
                                        <div className="w-[40%]">
                                            <SliderInput
                                                min={Math.floor(minMax.min)}
                                                max={Math.ceil(minMax.max)}
                                            />
                                        </div>
                                        <button onClick={() => handleDelElement(key)} class="btn btn-del">
                                            <svg
                                                viewBox="0 0 15 17.5"
                                                height="17.5"
                                                width="15"
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="icon"
                                                fill="white"
                                            >
                                                <path
                                                    transform="translate(-2.5 -1.25)"
                                                    d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z"
                                                    id="Fill"
                                                ></path>
                                            </svg>
                                        </button>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockFilter;
