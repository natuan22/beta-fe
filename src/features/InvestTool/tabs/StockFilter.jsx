import React from 'react'
import '../utils/styles/btnFilterStyle.css'
const StockFilter = () => {

    return (
        <div>
            <div className='grid grid-cols-2 gap-4 pt-2'>
                <div>
                    <div className='grid grid-cols-12 gap-1 pb-2'>
                        <div className='col-span-2 flex items-center'>
                            <button className='bg-[#2790BD] rounded-lg text-white font-semibold text-xs px-[9px] py-1 btnInfoFilter'>Bộ lọc nâng cao</button>
                        </div>
                        <div className='col-span-10 grid grid-cols-4 gap-2'>
                            <button className='bg-[#2790BD] text-white font-bold flex items-center justify-evenly px-2 py-1 rounded-lg btnInfoFilter'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                    <path d="M1.00879 13.8333V2.16667C1.00879 1.24619 1.75498 0.5 2.67546 0.5H11.9851C12.4271 0.5 12.851 0.675592 13.1636 0.988158L15.5206 3.34517C15.8332 3.65774 16.0088 4.08166 16.0088 4.52369V13.8333C16.0088 14.7538 15.2626 15.5 14.3421 15.5H2.67546C1.75498 15.5 1.00879 14.7538 1.00879 13.8333Z" stroke="white" />
                                    <path d="M5.67548 5.5H11.3421C11.6183 5.5 11.8421 5.27614 11.8421 5V1C11.8421 0.723858 11.6183 0.5 11.3421 0.5H5.67548C5.39933 0.5 5.17548 0.723858 5.17548 1V5C5.17548 5.27614 5.39933 5.5 5.67548 5.5Z" stroke="white" />
                                    <path d="M3.50879 9.33333V15.5H13.5088V9.33333C13.5088 9.05716 13.285 8.83333 13.0088 8.83333H4.00879C3.73265 8.83333 3.50879 9.05716 3.50879 9.33333Z" stroke="white" />
                                </svg>
                                <span>Lưu bộ lọc</span>
                            </button>
                            <button className='bg-[#2790BD] text-white font-bold flex items-center justify-evenly px-2 py-1 rounded-lg btnInfoFilter'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                    <path d="M1.57841 2.64286H16.0088L13.7303 11.2143H3.85689L1.57841 2.64286ZM1.57841 2.64286L1.00879 0.5" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M6.88892 6.92856H8.40791M8.40791 6.92856H9.9269M8.40791 6.92856V5.21428M8.40791 6.92856V8.64285" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M7.65446 14.2143C7.65446 14.9243 7.14438 15.5 6.51522 15.5C5.88603 15.5 5.37598 14.9243 5.37598 14.2143" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M12.2113 14.2143C12.2113 14.9243 11.7013 15.5 11.0721 15.5C10.4429 15.5 9.93286 14.9243 9.93286 14.2143" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <span>Thêm vào<br /> Watchlist</span>
                            </button>
                            <select className='bg-[#2790BD] btnInfoFilter text-white font-bold'>
                                <option value="none" selected disabled hidden>Bộ lọc của bạn</option>
                                <option>Bộ lọc 1</option>
                                <option>Bộ lọc 2</option>
                                <option>Bộ lọc 3</option>
                                <option>Bộ lọc 4</option>
                                <option>Bộ lọc 5</option>
                            </select>
                            <select className='bg-[#2790BD] btnInfoFilter text-white font-bold'>
                                <option value="none" selected disabled hidden>Sàn giao dịch</option>
                                <option>HOSE</option>
                                <option>HNX</option>
                                <option>UPCOM</option>
                            </select>
                            <button className='bg-[#2790BD] text-white font-bold flex items-center justify-evenly px-2 py-1 rounded-lg btnInfoFilter'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                    <path d="M10.0088 14.7105H2.50879C1.68036 14.7105 1.00879 14.0036 1.00879 13.1316V2.07895C1.00879 1.20692 1.68036 0.5 2.50879 0.5H14.5088C15.3372 0.5 16.0088 1.20692 16.0088 2.07895V9.18421" stroke="white" stroke-linecap="round" />
                                    <path d="M1.00879 3.6579H16.0088" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M3.25879 2.08684L3.26629 2.07806" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M5.50879 2.08684L5.51629 2.07806" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M7.75879 2.08684L7.76629 2.07806" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M14.1338 10.7632V15.5M14.1338 15.5L12.2588 13.5263M14.1338 15.5L16.0088 13.5263" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <span>Tải xuống<br /> kết quả</span>
                            </button>
                            <button className='bg-[#2790BD] text-white font-bold flex items-center justify-evenly px-2 py-1 rounded-lg btnInfoFilter'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                    <path d="M15.3832 5C14.2229 2.35114 11.5733 0.5 8.49017 0.5C4.59158 0.5 1.38601 3.46001 1.00879 7.25" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M12.2494 5H15.5575C15.8067 5 16.0087 4.79853 16.0087 4.55V1.25" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M1.63437 11C2.79457 13.6488 5.44422 15.5 8.52732 15.5C12.4259 15.5 15.6315 12.54 16.0087 8.75" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M4.76806 11H1.4599C1.21076 11 1.00879 11.2015 1.00879 11.45V14.75" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <span>Tạo mới bộ lọc</span>
                            </button>
                            <select className='bg-[#2790BD] btnInfoFilter text-white font-bold text-[11px]'>
                                <option value="none" selected disabled hidden>Bộ lọc mẫu của BETA</option>
                                <option></option>
                                <option></option>
                                <option></option>
                                <option></option>
                            </select>
                            <select className='bg-[#2790BD] btnInfoFilter text-white font-bold text-[10px]'>
                                <option value="none" selected disabled hidden>Ngành nghề kinh doanh</option>
                                <option></option>
                                <option></option>
                                <option></option>
                                <option></option>
                            </select>
                        </div>
                    </div>
                    <hr />
                    <div className='text-white'>
                        Yếu tố cần lọc
                    </div>
                </div>
                <div className='text-white border border-white border-solid'>
                    <div className='bg-[#154162] text-center font-semibold border border-white border-solid'>
                        Tương tác các chỉ tiêu đã chọn
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default StockFilter