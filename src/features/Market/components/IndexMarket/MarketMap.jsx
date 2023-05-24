import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../Chart/utils/Loading";
import HighchartsReact from "highcharts-react-official";
import treemap from "highcharts/modules/treemap";
import Highcharts from "highcharts";
import { fetchDataMarketMap } from "../../thunk";

treemap(Highcharts);

const ENUM = {
    vonhoa: '0',
    gtGD: '1',
    klGD: '2',
    gtNNGD: '3',
}
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

const MarketMap = () => {
    const { dataMarketMap } = useSelector(state => state.market)
    console.log(dataMarketMap)
    const [queryApi, setQueryApi] = useState({
        exchange: 'all',
        order: '0'
    })
    const dispatch = useDispatch()
    const [activeButton, setActiveButton] = useState('all')
    const [activeButton2, setActiveButton2] = useState(ENUM.vonhoa)
    const handleClick = (button) => { setActiveButton(button) }
    const handleClick2 = (button) => { setActiveButton2(button) }


    const [data, setData] = useState([]);
    const [dataTreeMap, setDataTreeMap] = useState([])
    useEffect(() => {
        dispatch(fetchDataMarketMap(queryApi.exchange, queryApi.order))
    }, [dispatch, queryApi])
    useEffect(() => {
        if (dataMarketMap?.length > 0) {
            setData(dataMarketMap)
            const resultMap = {};
            data?.forEach(item => {
                const { LV2, ticker, value, color } = item;
                if (!resultMap.hasOwnProperty(LV2)) {
                    resultMap[LV2] = { color: color, data: {} };
                }
                if (queryApi.order === '2') {

                    resultMap[LV2].data[ticker] = (value / 1000000).toFixed(2);
                } else {

                    resultMap[LV2].data[ticker] = (value / 1000000000).toFixed(2);
                }
            });
            setDataTreeMap(resultMap)
        }
    }, [data, queryApi, dataMarketMap])

    const points = [];
    let sectorIndex = 0;

    for (const [sector, sectorData] of Object.entries(dataTreeMap)) {
        let sectorValue = 0;
        const sectorPoint = {
            id: `sector_${sectorIndex}`,
            name: sector,
            color: sectorData.color,
            dataLabels: {
                enabled: true,
                style: {
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "black",
                },
                verticalAlign: "top",
                align: "left",
            },
        };

        const stockPoints = Object.entries(sectorData.data)?.map(([stock, value], stockIndex) => {
            const stockPoint = {
                id: `${sectorPoint.id}_${stockIndex}`,
                name: stock,
                parent: sectorPoint.id,
                value: parseFloat(value),
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        return '<b>' + this.point.name + '</b>: ' + this.point.value;
                    },
                    style: {
                        fontSize: "11px",
                        fontWeight: "semibold",
                        color: "  white",
                        style: {
                            textOutline: "none",
                        },
                    },
                    align: "center",
                },
            };
            sectorValue += stockPoint.value;
            return stockPoint;
        });

        sectorPoint.value = Math.round(sectorValue);
        points.push(sectorPoint);
        points.push(...stockPoints);
        sectorIndex++;
    }

    const options = {

        accessibility: {
            enabled: false,
        },
        credits: false,
        tooltip: {
            formatter: function () {
                return (
                    (queryApi.order === '2' ? `<b>${this.point.name}</b>: ${this.point.value} (triệu CP)` : `<b>${this.point.name}</b>: ${this.point.value} (tỷ VNĐ)`)
                );
            }
        },
        chart: {
            type: "treemap",
            backgroundColor: "transparent",

        },
        title: {
            text: "",
            align: "center"
        },
        series: [
            {
                type: "treemap",
                name: localStorage.getItem('nameMarketMap'),
                layoutAlgorithm: "squarified",
                allowDrillToNode: true,
                animationLimit: 2000,
                dataLabels: {
                    enabled: true,
                },
                levelIsConstant: false,
                levels: [
                    {
                        level: 1,
                        dataLabels: {
                            enabled: true
                        },
                        borderWidth: 3
                    }
                ],
                data: points,
                drillUpButton: {
                    enabled: true,
                    relativeTo: 'spacingBox',
                    position: {
                        y: 10,
                        x: 5
                    },
                    theme: {
                        fill: 'red',
                        'stroke-width': 1,
                        stroke: 'blue',
                        r: 0,
                        states: {
                            hover: {
                                fill: 'yellow'
                            },
                            select: {
                                stroke: '#039',
                                fill: '#a4edba'
                            }
                        }
                    },
                },
            }
        ]
    };
    return (
        <>
            <div className='grid md:grid-cols-2 pt-3 xs:grid-cols-none'>
                <div className="mb-3 dark:text-white text-black">
                    <span>
                        <button
                            onClick={() => {
                                handleClick('all')
                                setQueryApi({ ...queryApi, exchange: 'all' })
                            }}
                            className={activeButton === 'all'
                                ? 'border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                                : 'border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>Toàn thị trường
                        </button>
                    </span>
                    <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10 xxs:pl-5">
                        <button
                            onClick={() => {
                                setQueryApi({ ...queryApi, exchange: 'hose' })
                                handleClick('HOSE')
                            }}
                            className={activeButton === 'HOSE'
                                ? 'border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                                : 'border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>HSX
                        </button>
                    </span>
                    <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10 xxs:pl-5">
                        <button
                            onClick={() => {
                                setQueryApi({ ...queryApi, exchange: 'hnx' })
                                handleClick('HNX')
                            }}
                            className={activeButton === 'HNX'
                                ? 'border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                                : 'border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>HNX
                        </button>
                    </span>
                    <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10 xxs:pl-5">
                        <button
                            onClick={() => {
                                setQueryApi({ ...queryApi, exchange: 'upcom' })
                                handleClick('UPCOM')
                            }}
                            className={activeButton === 'UPCOM'
                                ? 'border-none bg-transparent relative dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                                : 'border-none bg-transparent dark:text-white text-black md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>UPCOM
                        </button>
                    </span>
                </div>
                <div>
                    <div className="dark:bg-[#2D303A] bg-gray-400 flex justify-around items-center rounded-full mb-2">
                        <button
                            style={activeButton2 === ENUM.vonhoa ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                            onClick={() => {
                                handleClick2(ENUM.vonhoa)
                                localStorage.setItem('nameMarketMap', 'Vốn hóa')

                                setQueryApi({ ...queryApi, order: ENUM.vonhoa })
                            }}
                            className='rounded-tl-xl rounded-bl-xl md:text-[0.8rem] lg:text-[0.9rem]'>Vốn hoá</button>
                        <button
                            style={activeButton2 === ENUM.gtGD ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                            onClick={() => {
                                localStorage.setItem('nameMarketMap', 'Giá trị GD')
                                handleClick2(ENUM.gtGD)
                                setQueryApi({ ...queryApi, order: ENUM.gtGD })
                            }}
                            className='md:text-[0.8rem] lg:text-[0.9rem]'>Giá trị GD</button>
                        <button
                            style={activeButton2 === ENUM.klGD ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                            onClick={() => {
                                handleClick2(ENUM.klGD)
                                localStorage.setItem('nameMarketMap', 'Khối lượng GD')
                                setQueryApi({ ...queryApi, order: ENUM.klGD })
                            }}
                            className='md:text-[0.8rem] lg:text-[0.9rem]'>Khối lượng GD</button>
                        <button
                            style={activeButton2 === ENUM.gtNNGD ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                            onClick={() => {
                                localStorage.setItem('nameMarketMap', 'Giá trị NN GD')
                                handleClick2(ENUM.gtNNGD)
                                setQueryApi({ ...queryApi, order: ENUM.gtNNGD })
                            }}
                            className='rounded-tr-xl rounded-br-xl md:text-[0.8rem] lg:text-[0.9rem]'>Giá trị NN GD</button>
                    </div>
                </div>
            </div>
            <div className="pt-1.5">
                {dataMarketMap?.length > 0 ? <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} /> : <div><Loading /></div>}
            </div>
        </>
    );
};

export default MarketMap;