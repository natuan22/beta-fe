import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useDispatch, useSelector } from "react-redux";
import { fetchChartTickerContribute } from "../../thunk";
import Loading from "../../../Chart/utils/Loading";

const BarChart = () => {
    const dispatch = useDispatch();
    const { chartTickerContribute } = useSelector((state) => state.market);
    const [activeButton, setActiveButton] = useState('HOSE')
    const handleClick = (button) => { setActiveButton(button) }
    const [handleQueryType, setHandleQueryType] = useState(0)
    const [queryApi, setQueryApi] = useState({
        exchange: "HOSE",
        type: 0,
        order: 0,
    });
    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    useEffect(() => {
        setColorText(color);
    }, [color]);

    useEffect(() => {
        dispatch(fetchChartTickerContribute(queryApi.exchange, queryApi.type, queryApi.order));

    }, [dispatch, queryApi]);

    const handleQueryApiOrder = (order) => {
        setQueryApi((prev) => ({ ...prev, order }));
    };
    const handleQueryApiType = (type) => {
        setQueryApi((prev) => ({ ...prev, type }));
    };
    const handleQueryApiExchange = (exchange) => {
        setQueryApi((prev) => ({ ...prev, exchange }));
    };

    if (!chartTickerContribute.length) {
        return <>
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0 pt-[11px]'>
                <span className='dark:text-white text-black text-[0.9rem] pl-[2px]'>Top đóng góp điểm số theo: </span>
                <div className="sm:block md:inline text-center">
                    <select
                        onChange={(e) => {
                            handleQueryApiType(e.target.value);
                        }}
                        className={`bg-transparent text-[0.9rem] ml-1.5 text-[#0097B2] border-0`}>
                        <option value="0">Cổ phiếu</option>
                        <option value="1">Ngành LV1</option>
                        <option value="2">Ngành LV2</option>
                        <option value="3">Ngành LV3</option>
                    </select>
                    <select
                        onChange={(e) => {
                            handleQueryApiOrder(e.target.value);
                        }}
                        className={`bg-[#1B496D] ml-2 p-1 text-[0.9rem] text-white border-0`}
                    >
                        <option value="0">Phiên gần nhất</option>
                        <option value="1">5 phiên</option>
                        <option value="2">1 tháng</option>
                        <option value="3">YtD</option>
                    </select>
                </div>
            </div>
            <div className="mt-1 mb-3 dark:text-white text-black">
                <span>
                    <button
                        onClick={() => {
                            handleClick('HOSE')
                            handleQueryApiExchange('HOSE')
                        }}
                        className={activeButton === 'HOSE'
                            ? 'border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>HSX
                    </button>
                </span>
                <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10">
                    <button
                        onClick={() => {
                            handleClick('HNX')
                            handleQueryApiExchange('HNX')
                        }}
                        className={activeButton === 'HNX'
                            ? 'border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>HNX
                    </button>
                </span>
                <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10">
                    <button
                        onClick={() => {
                            handleClick('UPCOM')
                            handleQueryApiExchange('UPCOM')
                        }}
                        className={activeButton === 'UPCOM'
                            ? 'border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>UPCOM
                    </button>
                </span>
            </div>
            <div id="chart-container">
                <div className="h-[333px]">
                    <div className="mt-14"><Loading /></div>
                </div>
            </div>
        </>
    }

    if (chartTickerContribute.length && (handleQueryType === '1' || handleQueryType === '2' || handleQueryType === '3')) {
        const incr5 = chartTickerContribute.slice(0, 5)
        const decr5 = chartTickerContribute.slice(-5).sort(function () {
            return -1;
        })
        const data = incr5.concat(decr5)

        var options = {
            accessibility: {
                enabled: false,
            },
            credits: false,
            chart: {
                type: "column",
                backgroundColor: "transparent",
            },
            title: {
                text: "",
            },
            xAxis: {
                categories: data.sort((a, b) => b.contribute_price - a.contribute_price)?.map((item) => item.symbol),
                labels: {
                    step: 1,
                    rotation: 0,
                    align: 'center',
                    useHTML: true,
                    style: {
                        rotation: 0,
                        color: localStorage.getItem('color'),
                        fontSize: '10px',
                        whiteSpace: 'normal',
                    }
                },
                crosshair: true
            },
            yAxis: {
                title: {
                    text: "",
                },
                labels: {
                    enabled: false,
                    style: {
                        color: localStorage.getItem('color')
                    }
                },
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                column: {
                    colorByPoint: true, // enable per-point coloring
                    threshold: 0, // set the threshold at zero
                    borderWidth: 0
                },
                series: {
                    borderRadius: 2
                }
            },
            series: [
                {
                    data: data.sort((a, b) => b.contribute_price - a.contribute_price)?.map(item => {
                        return {
                            name: item.symbol,
                            y: +item.contribute_price.toFixed(2),
                            color: item.contribute_price > 0 ? "#15b313" : "#ff0000"
                        };
                    })
                },
            ],
        };
    } else {
        var options = {
            accessibility: {
                enabled: false,
            },
            credits: false,
            chart: {
                type: "column",
                backgroundColor: "transparent",
            },
            title: {
                text: "",
            },
            xAxis: {
                categories: chartTickerContribute?.map((item) => item.symbol),
                labels: {
                    step: 1,
                    rotation: -45,
                    align: 'center',
                    style: {
                        color: localStorage.getItem('color'),
                        fontSize: '11px'
                    }
                },
                crosshair: true
            },
            yAxis: {
                title: {
                    text: "",
                },
                labels: {
                    enabled: false,
                    style: {
                        color: localStorage.getItem('color')
                    }
                },
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                column: {
                    colorByPoint: true, // enable per-point coloring
                    threshold: 0, // set the threshold at zero
                    borderWidth: 0
                },
                series: {
                    borderRadius: 2
                }
            },
            series: [
                {
                    data: chartTickerContribute?.map(item => {
                        return {
                            name: item.symbol,
                            y: +item.contribute_price.toFixed(2),
                            color: item.contribute_price > 0 ? "#15b313" : "#ff0000"
                        };
                    })
                },
            ],
        };
    }

    return (
        <>
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0 pt-[11px]'>
                <span className='dark:text-white text-black text-[0.9rem] pl-[2px]'>Top đóng góp điểm số theo: </span>
                <div className="sm:block md:inline text-center">
                    <select
                        onChange={(e) => {
                            handleQueryApiType(e.target.value);
                            setHandleQueryType(e.target.value)
                        }}
                        className={`bg-transparent text-[0.9rem] ml-1.5 text-[#0097B2] border-0`}>
                        <option value="0">Cổ phiếu</option>
                        <option value="1">Ngành LV1</option>
                        <option value="2">Ngành LV2</option>
                        <option value="3">Ngành LV3</option>
                    </select>
                    <select
                        onChange={(e) => {
                            handleQueryApiOrder(e.target.value);
                        }}
                        className={`bg-[#1B496D] ml-1 p-1 text-[0.9rem] text-white border-0`}
                    >
                        <option value="0">Phiên gần nhất</option>
                        <option value="1">5 phiên</option>
                        <option value="2">1 tháng</option>
                        <option value="3">YtD</option>
                    </select>
                </div>
            </div>
            <div className="mt-1 mb-3 dark:text-white text-black">
                <span>
                    <button
                        onClick={() => {
                            handleClick('HOSE')
                            handleQueryApiExchange('HOSE')
                        }}
                        className={activeButton === 'HOSE'
                            ? 'border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>HSX
                    </button>
                </span>
                <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10">
                    <button
                        onClick={() => {
                            handleClick('HNX')
                            handleQueryApiExchange('HNX')
                        }}
                        className={activeButton === 'HNX'
                            ? 'border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>HNX
                    </button>
                </span>
                <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10">
                    <button
                        onClick={() => {
                            handleClick('UPCOM')
                            handleQueryApiExchange('UPCOM')
                        }}
                        className={activeButton === 'UPCOM'
                            ? 'border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>UPCOM
                    </button>
                </span>
            </div>
            <div id="chart-container">
                <div className="h-[333px]">
                    <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                </div>
            </div>
        </>
    );
};

export default BarChart;
