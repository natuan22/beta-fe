import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchDataHotIndustry } from "../thunk";

const Checkbox = ({ children }) => {
    const dispatch = useDispatch();
    const [exchange, setExchange] = useState("all");
    const [type, setType] = useState("8");
    const [order, setOrder] = useState("0");
    useEffect(() => {
        dispatch(fetchDataHotIndustry)
    }, [])
    useEffect(() => {
        dispatch({
            type: "QUERY",
            payload: { exchange, type, order },
        });
    }, [exchange, type, order, dispatch]);

    const onExchangeChange = (e) => {
        setExchange(e.target.value);
    };

    const ontypeChange = (e) => {
        setType(e.target.value);
    };

    const onOrderChange = (e) => {
        setOrder(e.target.value);
    };

    return (
        <div>
            <div>
                <div className="xl:flex lg:block">
                    <div className="xl:w-[65%] md:block sm:hidden xs:hidden xxs:hidden">
                        <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
                            <div className="grid grid-cols-4 gap-3">
                                <div>
                                    <div className="border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0">
                                        <span className="dark:text-white text-black font-semibold">
                                            Sàn giao dịch
                                        </span>
                                    </div>
                                    <div>
                                        <label className="material-checkbox py-3 dark:text-white text-black">
                                            <input
                                                type="checkbox"
                                                name="exchange"
                                                value="all"
                                                id="all"
                                                checked={exchange === "all"}
                                                onChange={onExchangeChange}
                                            />
                                            <span className="checkmark"></span>
                                            <span className="text-sm">Toàn thị trường</span>
                                        </label>
                                        <label className="material-checkbox py-3 dark:text-white text-black">
                                            <input
                                                type="checkbox"
                                                name="exchange"
                                                value="hose"
                                                id="hose"
                                                checked={exchange === "hose"}
                                                onChange={onExchangeChange}
                                            />
                                            <span className="checkmark"></span>
                                            <span className="text-sm">HOSE</span>
                                        </label>
                                        <label className="material-checkbox py-3 dark:text-white text-black">
                                            <input
                                                type="checkbox"
                                                name="exchange"
                                                value="hnx"
                                                id="hnx"
                                                checked={exchange === "hnx"}
                                                onChange={onExchangeChange}
                                            />
                                            <span className="checkmark"></span>
                                            <span className="text-sm">HNX</span>
                                        </label>
                                        <label className="material-checkbox py-3 dark:text-white text-black">
                                            <input
                                                type="checkbox"
                                                name="exchange"
                                                value="upcom"
                                                id="upcom"
                                                checked={exchange === "upcom"}
                                                onChange={onExchangeChange}
                                            />
                                            <span className="checkmark"></span>
                                            <span className="text-sm">UPCOM</span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <div className="border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0">
                                        <span className="dark:text-white text-black font-semibold">
                                            Khung thời gian
                                        </span>
                                    </div>
                                    <div>
                                        <label className="material-checkbox py-3 dark:text-white text-black">
                                            <input
                                                type="checkbox"
                                                name="type"
                                                value="2"
                                                id="2ky"
                                                checked={type === "2"}
                                                onChange={ontypeChange}
                                            />
                                            <span className="checkmark"></span>
                                            <span className="text-sm">2 kỳ gần nhất</span>
                                        </label>
                                        <label className="material-checkbox py-3 dark:text-white text-black">
                                            <input
                                                type="checkbox"
                                                name="type"
                                                value="4"
                                                id="4ky"
                                                checked={type === "4"}
                                                onChange={ontypeChange}
                                            />
                                            <span className="checkmark"></span>
                                            <span className="text-sm">4 kỳ gần nhất</span>
                                        </label>
                                        <label className="material-checkbox py-3 dark:text-white text-black">
                                            <input
                                                type="checkbox"
                                                name="type"
                                                value="8"
                                                id="8ky"
                                                checked={type === "8"}
                                                onChange={ontypeChange}
                                            />
                                            <span className="checkmark"></span>
                                            <span className="text-sm">8 kỳ gần nhất</span>
                                        </label>
                                        <label className="material-checkbox py-3 dark:text-white text-black">
                                            <input
                                                type="checkbox"
                                                name="type"
                                                value="12"
                                                id="12ky"
                                                checked={type === "12"}
                                                onChange={ontypeChange}
                                            />
                                            <span className="checkmark"></span>
                                            <span className="text-sm">12 kỳ gần nhất</span>
                                        </label>
                                        <label className="material-checkbox py-3 dark:text-white text-black">
                                            <input
                                                type="checkbox"
                                                name="type"
                                                value="20"
                                                id="20ky"
                                                checked={type === "20"}
                                                onChange={ontypeChange}
                                            />
                                            <span className="checkmark"></span>
                                            <span className="text-sm">20 kỳ gần nhất</span>
                                        </label>
                                    </div>

                                    <div className="border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0">
                                        <span className="dark:text-white text-black font-semibold">
                                            Quy chuẩn dữ liệu tài chính
                                        </span>
                                    </div>
                                    <div>
                                        <label className="material-checkbox py-3 dark:text-white text-black">
                                            <input
                                                type="checkbox"
                                                name="order"
                                                value="0"
                                                id="quarter"
                                                checked={order === "0"}
                                                onChange={onOrderChange}
                                            />
                                            <span className="checkmark"></span>
                                            Tài chính theo quý
                                        </label>
                                        <label className="material-checkbox py-3 dark:text-white text-black">
                                            <input
                                                type="checkbox"
                                                name="order"
                                                value="1"
                                                id="year"
                                                checked={order === "1"}
                                                onChange={onOrderChange}
                                            />
                                            <span className="checkmark"></span>
                                            Tài chính theo năm
                                        </label>
                                    </div>
                                </div>
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
