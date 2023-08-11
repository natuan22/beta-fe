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
                    <div className="xl:w-[65%] md:block">
                        <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
                            <div className="grid md:grid-cols-3 sm:grid-cols-none gap-3">
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
                                </div>
                                <div>
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

                    <div className='xl:w-[35%]'>
                        <div className="mx-1 my-1 px-[8px] py-[8px] dark:bg-[#151924] bg-gray-100 shadow-md">
                            <div className="drop-shadow rounded-md sm:block md:hidden">
                                <details className="duration-300">
                                    <summary className="dark:text-white text-black font-semibold border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0">Các chỉ số đánh giá hiệu suất là gì?</summary>
                                    <div className='ml-5 mr-3'>
                                        <ul className='text-justify dark:text-white text-black mt-2'>
                                            <li>Chỉ báo ROC (The Rate of Change) hay còn gọi là tỷ lệ thay đổi, là công cụ dựa vào giá nhằm đo lường tốc độ biến thiên giá cả trong hai thời điểm khác nhau. Chỉ báo này đồng thời được tính toán thông qua việc so sánh sự biến đổi giá tại giai đoạn đó.</li>
                                            <li className='mt-[2px]'>EBITDA được viết tắt theo cụm từ Earning Before Interest, Taxes, Depreciation and Amortization, có nghĩa là lợi nhuận trước thuế, khấu hao và lãi vay. Đây là thuật ngữ dùng để lợi nhuận trước thuế của một doanh nghiệp, tổ chức nào đó. Phần lợi nhuận này vẫn bao gồm thuế, các khoản vay và chưa trừ khấu hao.</li>
                                            <li className='mt-px'>Tính thanh khoản, một khái niệm trong tài chính, chỉ mức độ mà một tài sản bất kì có thể được mua hoặc bán trên thị trường mà không làm ảnh hưởng nhiều đến giá thị trường của tài sản đó. Một tài sản có tính thanh khoản cao nếu nó có thể được bán nhanh chóng mà giá bán không giảm đáng kể , thường được đặc trưng bởi số lượng giao dịch lớn.</li>
                                            <li className='mt-[2px]'>EPS hay còn được gọi là Earning Per Share, chỉ số tài chính này là tỷ suất thu nhập dựa trên cổ phần. Như vậy chỉ số EPS sẽ cho thấy phần lợi nhuận thu được dựa vào một cổ phiếu. Trên mỗi khoản đầu tư từ ban đầu, EPS chính là phần lợi nhuận thu được vì vậy mà nó còn được xem là chỉ số giúp xác định khả năng của một công ty hoặc dự án đầu tư sinh lợi. EPS cũng chính là lợi nhuận mà công ty phân bổ dành cho một cổ phiếu bình thường và đang được lưu hành tại thị trường.</li>
                                            <li className='mt-px'>Cổ tức là khoản lợi nhuận ròng được trả cho mỗi cổ phần bằng tiền mặt hoặc bằng tài sản khác từ nguồn lợi nhuận còn lại của công ty cổ phần sau khi đã thực hiện nghĩa vụ tài chính. </li>
                                        </ul>
                                    </div>
                                </details>
                            </div>
                            <div className='md:block sm:hidden xs:hidden xxs:hidden'>
                                <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                                    <span className='dark:text-white text-black font-semibold'>Các chỉ số đánh giá hiệu suất là gì?</span>
                                </div>
                                <div className="overflow-auto xl:h-[240px] lg:h-auto">
                                    <div className='ml-5 mr-3'>
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
                </div>
            </div>
            {children}
        </div >
    );
};

export default Checkbox;
