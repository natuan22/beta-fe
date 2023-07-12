import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../Chart/utils/Loading';
import { BsArrowRepeat, BsCardList, BsFileEarmarkX, BsXOctagonFill } from "react-icons/bs";
import '../../utils/styles/buttonNews.css'
import { fetchNewsTool } from '../../thunk';
import { fetchDataStockInfo } from '../../thunk';

const ModalFilter = () => {
    const dispatch = useDispatch();
    const { newsTool, dataStockInfo } = useSelector(state => state.newsCenter);
    const [selectedExchange, setSelectedExchange] = useState(null);
    const [selectedLV2, setSelectedLV2] = useState([]);
    const [selectedLV4, setSelectedLV4] = useState([]);
    const [selectedCode, setSelectedCode] = useState([]);

    useEffect(() => {
        dispatch(fetchNewsTool);
        dispatch(fetchDataStockInfo);
    }, [dispatch]);

    const handleFilterExchange = (e) => {
        const exchangeName = e.target.value;
        setSelectedExchange(exchangeName);
        setSelectedLV2([]);
        setSelectedLV4([]);
    };

    const handleFilterLV2 = (lv2Name) => {
        if (selectedLV2.includes(lv2Name)) {
            setSelectedLV2(selectedLV2.filter(name => name !== lv2Name));
            setSelectedLV4([]);
        } else {
            setSelectedLV2([...selectedLV2, lv2Name]);
        }
    };

    const handleFilterLV4 = (lv4Name) => {
        if (selectedLV4.includes(lv4Name)) {
            setSelectedLV4(selectedLV4.filter(name => name !== lv4Name));
        } else {
            setSelectedLV4([...selectedLV4, lv4Name]);
        }
    };

    const handleBtnCode = (code) => {
        const stockCodes = dataStockInfo.filter(stock => stock.code === code);
        setSelectedCode([...selectedCode, ...stockCodes]);
    };
    const handleBtnDel = (code) => {
        setSelectedCode(selectedCode.filter(stock => stock.code !== code));
        setSelectedLV4([...selectedLV4, code]);
    };
    const handleBtnDelAll = () => {
        setSelectedLV4([...selectedLV4, ...selectedCode.map(stock => stock.code)]);
        setSelectedCode([]);
    };

    const isCodeSelected = (code) => {
        return selectedCode.some(stock => stock.code === code);
    };

    return (
        <div >
            {newsTool?.length > 0 ?
                <div className='  bg-[#151924] '>
                    <div className='h-[300px]  p-2 ' style={{ borderBottom: "solid 1px grey", display: 'grid', gridTemplateColumns: '0.5fr 1.5fr 1.5fr 1fr 2fr' }}>
                        <div className='exchange__tabs  flex flex-col justify-between   ' style={{ borderRight: 'solid 1px gray', borderTop: 'solid 3px #147df5' }}>
                            <div className='bg-[#04013d] w-[100%]' style={{ borderBottom: "solid 1px grey" }}>
                                <p className='text-white font-semibold text-base text-center '>Chọn sàn</p>
                            </div>
                            <div className='h-[100%]'>
                                {newsTool.map((exchange, index) => (
                                    <div key={index}>
                                        <label className="material-checkbox py-2 dark:text-white text-black">
                                            <input type="checkbox" name="exchange" value={exchange.name} id={exchange.name} checked={selectedExchange === exchange.name} onChange={handleFilterExchange} />
                                            <span className="checkmark"></span>
                                            <span className='text-sm'>{exchange.name}</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='relative industryLv2__tabs overflow-auto ml-1 ' style={{ borderRight: 'solid 1px gray', borderTop: 'solid 3px #147df5' }}>
                            <div className='sticky top-0 bg-[#04013d] z-10 ' style={{ borderBottom: "solid 1px grey" }}>
                                <p className='text-white text-base font-semibold  text-center'>
                                    Nhóm ngành (ICBID LV2)
                                </p>
                            </div>
                            {selectedExchange ? (
                                <div>
                                    {selectedExchange && newsTool.find(exchange => exchange.name === selectedExchange).LV2.map((lv2, index) => (
                                        <div key={index}>
                                            <label className="material-checkbox py-2 dark:text-white text-black">
                                                <input type="checkbox" name="exchange" value={lv2.name} id={lv2.name} checked={selectedLV2.includes(lv2.name)} onChange={() => handleFilterLV2(lv2.name)} />
                                                <span className="checkmark"></span>
                                                <span className='text-sm'>{lv2.name}</span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className='grid place-items-center mt-5'>
                                    <p className='text-white font-semibold text-base'>Vui lòng chọn sàn để tiếp tục</p>
                                </div>
                            )}
                        </div>
                        <div className='industryLv4__tabs overflow-auto ml-2' style={{ borderRight: 'solid 1px gray', borderTop: 'solid 3px #147df5' }}>
                            <div className='sticky top-0 bg-[#04013d] z-10 ' style={{ borderBottom: "solid 1px grey" }}>
                                <p className='text-white text-base font-semibold text-center '>
                                    Ngành nghề (ICBID LV4)
                                </p>
                            </div>

                            <div >
                                {selectedLV2.length > 0 &&
                                    newsTool
                                        .find(exchange => exchange.name === selectedExchange)
                                        .LV2.filter(lv2 => selectedLV2.includes(lv2.name))
                                        .map(lv2 => lv2.LV4)
                                        .flat()
                                        .map((lv4, index) => (
                                            <div key={index}>
                                                <label className="material-checkbox py-2 dark:text-white text-black">
                                                    <input type="checkbox" name="exchange" value={lv4.name} id={lv4.name} checked={selectedLV4.includes(lv4.name)} onChange={() => handleFilterLV4(lv4.name)} />
                                                    <span className="checkmark"></span>
                                                    <span className='text-sm'>{lv4.name}</span>
                                                </label>
                                            </div>
                                        ))
                                }
                            </div>
                        </div>
                        <div className='code__tabs overflow-auto  ml-2' style={{ borderRight: 'solid 1px gray', borderTop: 'solid 3px #147df5' }}>
                            <div className='sticky top-0 bg-[#04013d] z-10 ' style={{ borderBottom: "solid 1px grey" }}>
                                <p className='text-white text-base font-semibold text-center '>
                                    Mã cổ phiếu
                                </p>
                            </div>
                            {selectedLV4.length > 0 &&
                                newsTool
                                    .find(exchange => exchange.name === selectedExchange)
                                    .LV2.filter(lv2 => selectedLV2.includes(lv2.name))
                                    .flatMap(lv2 => lv2.LV4)
                                    .filter(lv4 => selectedLV4.includes(lv4.name))
                                    .map(lv4 => (
                                        <div key={lv4.name} className='flex flex-col '>
                                            {lv4.code.map((code, index) => (
                                                !isCodeSelected(code) && // Kiểm tra xem mã code đã được chọn chưa
                                                <div key={index} className='flex flex-col justify-center items-center'>
                                                    <button onClick={() => handleBtnCode(code)} type="button" className="buttonNews">
                                                        <span className="buttonNews__text">{code}</span>
                                                        <span className="buttonNews__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" height="24" fill="none" className="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    ))
                            }
                        </div>
                        <div className='relative watchList__tabs ml-2 overflow-auto' style={{ borderRight: 'solid 1px gray', borderTop: 'solid 3px #147df5' }}>
                            <div className='watchList__tabs-header sticky top-0 flex justify-around text-white bg-[#04013d] p-1' style={{ borderBottom: "solid 1px grey" }}>
                                <div className=''>
                                    <button className='text-xs px-2 py-1 flex items-center  cursor-pointer  rounded-full border-0 font-semibold'>
                                        <span>Lưu vào Watchlist</span>
                                        <BsCardList className='ml-1' />
                                    </button>
                                </div>
                                <div>
                                    <button className='text-xs px-2 py-1  flex items-center cursor-pointer  rounded-full border-0 font-semibold'>
                                        <span>Tải lại tin tức</span>
                                        <BsArrowRepeat className='ml-1' />
                                    </button>
                                </div>
                                <div>
                                    <button onClick={handleBtnDelAll} className='btnDelAll text-xs px-2 py-1 flex items-center  cursor-pointer  rounded-full border-0'>
                                        <span>Xóa tất cả  </span>
                                        <BsFileEarmarkX className='ml-1' />
                                    </button>
                                </div>
                            </div>
                            <div className='watchList__tabs-body p-2 '>
                                {selectedCode?.map((item, index) => {
                                    return (
                                        <div key={index} className={`${(index + 1) % 2 === 0 ? 'bg-[#04013d]' : 'bg-[#023e8a]'}  p-1 text-white`} style={{ display: 'grid', gridTemplateColumns: '0.5fr 2fr 0.5fr', gap: '5px' }}>
                                            <div className='code text-sm '>{item.code}</div>
                                            <div className='nameCompany ml-1 text-sm text-center'>{item.name}</div>
                                            <div onClick={() => handleBtnDel(item.code)} className='btnDel grid place-items-center text-center text-red-500 font-bold cursor-pointer'>
                                                <BsXOctagonFill />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                : (
                    <div className='h-[50%] flex flex-col justify-center'>
                        <Loading />
                    </div>
                )}
        </div>
    );
};

export default ModalFilter;
