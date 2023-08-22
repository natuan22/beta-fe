import { useEffect } from "react";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../Chart/utils/Loading";
import HighchartsReact from "highcharts-react-official";
import treemap from "highcharts/modules/treemap";
import Highcharts from "highcharts";
import { fetchDataMarketMap } from "../../thunk";

treemap(Highcharts);

const hashTb = {
    "Vốn hoá": "Vốn hoá",
    "Giá trị GD": "Giá trị GD",
    "Khối lượng GD": "Khối lượng GD",
    "Giá trị NN GD": "Giá trị NN GD",
};

const MarketMap = () => {
    const { dataMarketMap } = useSelector(state => state.market)
    const [queryApi, setQueryApi] = useState({
        exchange: 'all',
        order: '0'
    })

    const dispatch = useDispatch()
    const [activeButton, setActiveButton] = useState('all')
    const [activeButton2, setActiveButton2] = useState('0')
    const handleClick = (button) => { setActiveButton(button) }
    const [data, setData] = useState([]);
    const [dataTreeMap, setDataTreeMap] = useState([])
    const buttonRef2 = useRef([]);

    const handleActiveButton = (index) => {
        setActiveButton2(index);
    };

    useEffect(() => {
        const activeBtn = buttonRef2.current[activeButton2]
        const movingBackground = document.querySelector('.moving-background2')
        if (activeBtn && movingBackground) {
            movingBackground.style.left = `${activeBtn.offsetLeft}px`;
            movingBackground.style.width = `${activeBtn.offsetWidth}px`;
        }
    }, [activeButton2])

    useEffect(() => {
        dispatch(fetchDataMarketMap(queryApi.exchange, queryApi.order))
    }, [dispatch, queryApi])

    useEffect(() => {
        if (dataMarketMap?.length > 0) {
            setData(dataMarketMap)
            const resultMap = {};
            dataMarketMap.forEach((item) => {
                const { LV2, color, ticker, value } = item;
                let modifiedValue = value
                if (queryApi.order === '2') {
                    modifiedValue /= 1000000;
                } else {
                    modifiedValue /= 1000000000;
                }
                // Nếu chưa tồn tại thuộc tính LV2 trong đối tượng kết quả, tạo mới
                if (!resultMap.hasOwnProperty(LV2)) {
                    resultMap[LV2] = {
                        color: color,
                        data: {}
                    };
                }
                // Nếu ticker đã tồn tại trong mảng data của thuộc tính LV2, cộng giá trị
                if (resultMap[LV2].data.hasOwnProperty(ticker)) {
                    resultMap[LV2].data[ticker] += modifiedValue;
                } else {
                    // Nếu ticker chưa tồn tại, gán giá trị mới
                    resultMap[LV2].data[ticker] = modifiedValue;
                }
            });
            setDataTreeMap(resultMap)
        }
    }, [data, queryApi, dataMarketMap,])

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
                        return '<b>' + this.point.name + '</b>: ' + (this.point.value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
                    (queryApi.order === '2' ? `<b>${this.point.name}</b>: ${this.point.value} (triệu CP)` : `<b>${this.point.name}</b>: ${(this.point.value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (tỷ VNĐ)`)
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
                animationLimit: 3000,
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
                    <div className="relative dark:bg-[#2D303A] bg-gray-400 flex justify-around items-center rounded-full mb-2">
                        <div className="moving-background2 absolute h-full top-0 bg-[#275F88] transition-all duration-500 rounded-full z-0"></div>
                        {Object.entries(hashTb).map(([label], index) => (
                            <button
                                ref={el => buttonRef2.current[index] = el}
                                key={index}
                                onClick={() => {
                                    handleActiveButton(index)
                                    localStorage.setItem('nameMarketMap', label)
                                    setQueryApi({ ...queryApi, order: index })
                                }}
                                className="md:text-[0.8rem] lg:text-[0.9rem] z-10 bg-transparent text-white border-none px-[0.85rem] py-[0.5rem] cursor-pointer"
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="pt-1.5">
                {dataMarketMap?.length > 0 ? <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} /> : <div className="mt-24"><Loading /></div>}
            </div>
        </>
    );
};

export default MarketMap;