import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataCashFlowInvestor, fetchDataTotalMarket } from '../../thunk'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from "highcharts";
import Loading from '../../../Chart/utils/Loading';
import moment from 'moment';
const buttonStyle = {
    backgroundColor: 'transparent',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    padding: '0.375rem 0.5rem'
}

const activeButtonStyle = {
    backgroundColor: '#275F88',
    color: '#fff',
}
const InvestorCashFlow = () => {
    const { dataCashFlowInvestor, dataTotalMarket } = useSelector(state => state.market)
    console.log("dataTotalMarket", dataTotalMarket)
    const [data, setData] = useState()
    const [dataToMap, setDataToMap] = useState()
    const [dataAbs, setDataAbs] = useState()
    const [timeLine, setTimeLine] = useState()
    const [isAllMarket, setIsAllMarket] = useState(false)
    const dispatch = useDispatch()
    const [activeButton, setActiveButton] = useState('all');
    const [activeButton2, setActiveButton2] = useState(1)
    const [activeButton3, setActiveButton3] = useState(5)
    const [canTouch, setCanTouch] = useState(false)
    const [param, setParam] = useState('buyVal')
    const [queryApi, setQueryApi] = useState({
        type: 2,
        investorType: 1,
        exchange: 'all'
    })
    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    useEffect(() => {
        dispatch(fetchDataCashFlowInvestor(queryApi.type, queryApi.investorType, queryApi.exchange))
        dispatch(fetchDataTotalMarket(queryApi.exchange, queryApi.type))
        setColorText(color);
    }, [queryApi, dispatch])

    useEffect(() => {
        if (!isAllMarket && dataCashFlowInvestor?.length > 0) {
            setDataToMap(dataCashFlowInvestor)
            const uniqueDates = [...new Set(dataToMap?.map(item => moment(item.date).format('DD/MM')))];
            setTimeLine(uniqueDates)
            // Khởi tạo đối tượng kết quả là một mảng rỗng
            const result = [];
            const resultAbs = []
            // Lặp qua mảng dữ liệu
            dataToMap?.forEach(item => {
                const industry = item.industry;
                const value = (item[param] / 1000000000);
                const color = item.color
                // Tạo đối tượng mới với key "name" và value là tên ngành
                // cùng key "data" và value là mảng giá trị của ngành
                const newObj = {
                    name: industry,
                    data: [value],
                    color
                };
                const newObjAbs = {
                    name: industry,
                    data: [Math.abs(value)],
                    color
                };
                // Tìm xem ngành đã tồn tại trong đối tượng kết quả hay chưa
                const existingObj = result.find(obj => obj.name === industry);
                const existingObjAbs = resultAbs.find(obj => obj.name === industry);

                if (existingObj) {
                    // Nếu ngành đã tồn tại, thêm giá trị vào mảng "data" của ngành đó
                    existingObjAbs.data.push(Math.abs(value));
                    existingObj.data.push(value);
                } else {
                    // Nếu ngành chưa tồn tại, thêm đối tượng mới vào mảng kết quả
                    resultAbs.push(newObjAbs);
                    result.push(newObj);
                }
            });
            // Gán mảng kết quả vào biến "output"
            const output = result;
            const outputAbs = resultAbs

            setData(output)
            setDataAbs(outputAbs)
        } else if (isAllMarket && dataTotalMarket.length > 0) {
            setDataToMap(dataTotalMarket)
            const uniqueDates = [...new Set(dataToMap?.map(item => item.date))];
            setTimeLine(uniqueDates)
            // Khởi tạo đối tượng kết quả là một mảng rỗng
            const result = [];
            const resultAbs = []
            // Lặp qua mảng dữ liệu
            dataToMap?.forEach(item => {
                const industry = item.industry;
                const value = (item[param] / 1000000000);
                const color = item.color
                // Tạo đối tượng mới với key "name" và value là tên ngành
                // cùng key "data" và value là mảng giá trị của ngành
                const newObj = {
                    name: industry,
                    data: [value],
                    color
                };
                const newObjAbs = {
                    name: industry,
                    data: [Math.abs(value)],
                    color
                };
                // Tìm xem ngành đã tồn tại trong đối tượng kết quả hay chưa
                const existingObj = result.find(obj => obj.name === industry);
                const existingObjAbs = resultAbs.find(obj => obj.name === industry);

                if (existingObj) {
                    // Nếu ngành đã tồn tại, thêm giá trị vào mảng "data" của ngành đó
                    existingObjAbs.data.push(Math.abs(value));
                    existingObj.data.push(value);
                } else {
                    // Nếu ngành chưa tồn tại, thêm đối tượng mới vào mảng kết quả
                    resultAbs.push(newObjAbs);
                    result.push(newObj);
                }
            });
            // Gán mảng kết quả vào biến "output"
            const output = result;
            const outputAbs = resultAbs

            setData(output)
            setDataAbs(outputAbs)
        }
    }, [param, dataCashFlowInvestor, queryApi, dataToMap, dataTotalMarket, isAllMarket])

    // hàm xử lý nút
    console.log('data', dataCashFlowInvestor)
    const handleClick = (button) => { setActiveButton(button) }
    const handleClick2 = (button) => { setActiveButton2(button) }
    const handleClick3 = (button) => {
        setActiveButton3(button)
        if (button === 8) {
            setActiveButton2(4)
            setParam('transVal')
        }
    }
    // config chart
    const options = {
        accessibility: {
            enabled: false,
        },
        credits: false,
        chart: {
            type: 'column',
            backgroundColor: 'transparent'
        },
        title: {
            text: '',
        },
        xAxis: {
            categories: timeLine,
            labels: {
                style: {
                    color: localStorage.getItem('color'),
                },
            },
        },
        yAxis: {
            // min: minValue ,
            title: {
                text: 'Giá trị (tỷ VND)',
                style: {
                    color: localStorage.getItem('color'),
                },
            },
            stackLabels: {
                enabled: false,
            },
            labels: {
                style: {
                    color: localStorage.getItem('color'),
                },
            },
        },
        legend: {
            enabled: true,
            itemStyle: {
                color: localStorage.getItem('color'),
                fontWeight: 'bold'
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false,
                },
            },
        },

        series: data,
    };
    // config area chart 
    // Cấu hình biểu đồ area stacking
    const optionAreaChart = {
        accessibility: {
            enabled: false,
        },
        credits: false,
        chart: {
            min: 0,
            type: 'area',
            backgroundColor: 'transparent'
        },
        legend: {
            enabled: true,
            itemStyle: {
                color: localStorage.getItem('color'),
                fontWeight: 'bold'
            }
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: timeLine,
            labels: {
                style: {
                    color: localStorage.getItem('color'),
                },
            },
        },
        yAxis: {
            max: 100,
            min: 0,
            title: {
                text: '',
                style: {
                    color: localStorage.getItem('color'),
                },
            },
            labels: {
                style: {
                    color: localStorage.getItem('color'),
                },
                formatter: function () {
                    return this.value + "%";
                },
            },
        },
        plotOptions: {
            area: {
                stacking: 'percent', // Thay đổi giá trị stacking thành 'percent'
                dataLabels: {
                    enabled: false,
                },
            },
            series: {
                marker: {
                    radius: 2, // Giá trị bán kính marker
                },
                tooltip: {
                    headerFormat: "<span style='font-size: 10px'>{point.key}</span><br/>",
                    pointFormat: "<span style='color:black'>{series.name}: <b>{point.percentage:.1f}%</b></span><br/>", // Thay đổi format để hiển thị phần trăm
                    valueDecimals: 3,
                },
            }
        },
        series: dataAbs
    };

    return (
        <div>
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black sm:text-base xs:text-[14px] xxs:text-[11px] font-semibold'>Dòng tiền nhà đầu tư theo các nhóm ngành</span>
                <select className={`bg-[#1B496D] p-1 text-[1rem] text-white border-0 xl:ml-[1019px] lg:ml-[603px] md:ml-[347px] sm:ml-[4px] xs:ml-[1px] xxs:ml-[1px]`}
                    onChange={(event) => {
                        setQueryApi({ ...queryApi, type: event.target.value })
                    }}>
                    <option value='2'>1 tháng</option>
                    <option value='4'>3 tháng</option>
                    <option value='5'>1 năm</option>

                </select>
            </div>
            <div className="pt-3 mb-3 dark:text-white text-black">
                <span>
                    <button
                        onClick={() => {
                            handleClick('all')
                            setQueryApi({ ...queryApi, exchange: "all" })
                        }}
                        className={activeButton === 'all'
                            ? 'border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>Toàn thị trường
                    </button>
                </span>
                <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10 xxs:pl-5">
                    <button
                        onClick={() => {
                            handleClick('HSX')
                            setQueryApi({ ...queryApi, exchange: "hose" })
                        }}
                        className={activeButton === 'HSX'
                            ? 'border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>HSX
                    </button>
                </span>
                <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10 xxs:pl-5">
                    <button
                        onClick={() => {
                            handleClick('HNX')
                            setQueryApi({ ...queryApi, exchange: "hnx" })
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
                            setQueryApi({ ...queryApi, exchange: "upcom" })
                        }}
                        className={activeButton === 'UPCOM'
                            ? 'border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>UPCOM
                    </button>
                </span>
            </div>
            <div className='md:flex xxs:block'>
                <div>
                    <div className="dark:bg-[#2D303A] bg-gray-400 flex justify-around items-center rounded-full mb-2 mr-4">
                        <button
                            disabled={canTouch}
                            style={activeButton2 === 1 ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                            onClick={() => {
                                handleClick2(1)
                                setParam('buyVal')
                            }}
                            className='rounded-tl-xl rounded-bl-xl lg:text-[16px] md:text-[13px] sm:text-sm xs:text-[12px] xxs:text-[10px]'>Giá trị mua</button>
                        <button
                            disabled={canTouch}
                            style={activeButton2 === 2 ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                            onClick={() => {
                                handleClick2(2)
                                setParam('sellVal')
                            }}
                            className='lg:text-[16px] md:text-[13px] sm:text-sm xs:text-[12px] xxs:text-[10px]'>Giá trị bán</button>
                        <button
                            disabled={canTouch}
                            style={activeButton2 === 3 ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                            onClick={() => {
                                handleClick2(3)
                                setParam('netVal')
                            }}
                            className='lg:text-[16px] md:text-[13px] sm:text-sm xs:text-[12px] xxs:text-[10px]'>Giá trị ròng</button>
                        <button
                            style={activeButton2 === 4 ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                            onClick={() => {
                                handleClick2(4)
                                setParam('transVal')
                            }}
                            className='rounded-tr-xl rounded-br-xl lg:text-[16px] md:text-[13px] sm:text-sm xs:text-[12px] xxs:text-[10px]'>Tổng giá trị GD</button>
                    </div>
                </div>
                <div>
                    <div className="dark:bg-[#2D303A] bg-gray-400 flex justify-around items-center rounded-full mb-2">
                        <button
                            style={activeButton3 === 5 ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                            onClick={() => {
                                handleClick3(5)
                                setIsAllMarket(false)
                                setCanTouch(false)
                                setQueryApi({ ...queryApi, investorType: 1 })
                            }}
                            className='rounded-tl-xl rounded-bl-xl lg:text-[16px] md:text-[13px] sm:text-sm xs:text-[12px] xxs:text-[10px]'>Tự doanh</button>
                        <button
                            style={activeButton3 === 6 ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                            onClick={() => {
                                handleClick3(6)
                                setIsAllMarket(false)
                                setCanTouch(false)
                                setQueryApi({ ...queryApi, investorType: 0 })
                            }}
                            className='lg:text-[16px] md:text-[13px] sm:text-sm xs:text-[12px] xxs:text-[10px]'>Khối ngoại</button>
                        <button
                            style={activeButton3 === 7 ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                            onClick={() => {
                                handleClick3(7)
                                setIsAllMarket(false)
                                setCanTouch(false)
                                setQueryApi({ ...queryApi, investorType: 2 })
                            }}
                            className='lg:text-[16px] md:text-[13px] sm:text-sm xs:text-[12px] xxs:text-[10px]'>Cá nhân & TC</button>
                        <button
                            style={activeButton3 === 8 ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                            onClick={() => {
                                handleClick3(8)
                                setIsAllMarket(true)
                                setCanTouch(true)
                                setDataToMap(dataTotalMarket)
                            }}
                            className='rounded-tr-xl rounded-br-xl lg:text-[16px] md:text-[13px] sm:text-sm xs:text-[12px] xxs:text-[10px]'>Toàn thị trường</button>
                    </div>
                </div>
            </div>
            <div>
                {dataCashFlowInvestor?.length > 0 && dataTotalMarket?.length > 0 ? (
                    <>
                        <div className='h-[450px]'>
                            <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                        </div>
                        <div className='h-[450px]'>
                            <HighchartsReact highcharts={Highcharts} options={optionAreaChart} containerProps={{ style: { height: '100%', width: '100%' } }} />
                        </div>
                    </>
                ) : (
                    <div className="mt-12 mb-12"><Loading /></div>
                )}

            </div>
        </div>
    )
}

export default InvestorCashFlow