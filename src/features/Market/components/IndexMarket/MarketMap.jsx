import { useEffect } from "react";
import { useState } from "react";
import { Chart } from "react-google-charts";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataMarketMap } from "../../../Chart/thunk";
import Loading from "../../../Chart/utils/Loading";

const ENUM = {
    vonhoa: '0',
    gtGD: '1',
    klGD: '2',
    gtNNGD: '3',
}

const MarketMap = () => {
    const dispatch = useDispatch()
    const [activeButton, setActiveButton] = useState('all')
    const [activeButton2, setActiveButton2] = useState(ENUM.vonhoa)
    const handleClick = (button) => { setActiveButton(button) }
    const handleClick2 = (button) => { setActiveButton2(button) }
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

    const dataMarketMap = useSelector((state) => state.chart.dataMarketMap);
    const [data, setData] = useState([]);
    useEffect(() => {
        if (dataMarketMap) {
            setData(dataMarketMap.data || [])
        }
    }, [dataMarketMap])

    const arrGlobal = [
        [
            "Location",
            "Parent",
            "Market trade volume (size)",
        ],
        ["Bản đồ thị trường", null, 0],
    ];
    // tạo 1 trường AddedLv2Value => chạy vòng lặp xét item.lv2 có trong addedValue chưa nếu chưa thì thực hiện arrGlobal.push([item.lv2, "Global", 0, 0]); và ngược lại
    const addedLv2Values = new Set();
    data.forEach((item) => {
        if (!addedLv2Values.has(item.industry)) {
            arrGlobal.push([item.industry, "Bản đồ thị trường", 0]);
            addedLv2Values.add(item.industry);
        }
    });
    const arrTicker = data.map((item) => {
        return [
            `${item.ticker}: ${item.value}`,
            item.industry,
            item.value,
        ];
    });

    const dataTreeMapRender = arrGlobal.concat(arrTicker)

    const options = {
        highlightOnMouseOver: true,
        maxDepth: 1,
        maxPostDepth: 2,
        minHighlightColor: "green",
        midHighlightColor: "green",
        maxHighlightColor: "#green",
        minColor: "green",
        midColor: "#green",
        maxColor: "#green",
        headerHeight: 0,
        showScale: false,
        height: 380,
        useWeightedAverageForAggregation: true,
        textStyle: {
            color: '#fff',
            fontSize: 14,
            fontWeight: 'semibold',
        },
        titleTextStyle: {
            color: '#fff',
            fontSize: 13,
        },
        generateTooltip: (row) => {
            const size = row[2];
            const color = row[3];
            const label = row[0];
            return `
                <div>
                <div style="font-weight: bold;>${label}</div>
                <div className='font-semibold'>Market trade volume: ${size}</div>
                <div>Market increase/decrease: ${color}</div>
                </div>
            `;
        },
        headerTemplate: (props) => {
            const { row, column, value } = props;
            const label = row.getFormattedValue(column);
            return `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 4px; background-color: #333;">
            <span style="color: black; font-size: 14px; margin-right: 8px;">${label}122</span>
            <span style="color: black; font-size: 14px;">${value}</span>
          </div>
        `;
        },

    };

    return (
        <>
            <div className='grid md:grid-cols-2 pt-3 xs:grid-cols-none'>
                <div className="mb-3 text-white">
                    <span>
                        <button
                            onClick={() => {
                                handleClick('all')
                                dispatch(dispatch(fetchDataMarketMap('all', activeButton2)))
                            }}
                            className={activeButton === 'all'
                                ? 'border-none bg-transparent relative text-white md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                                : 'border-none bg-transparent text-white md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>Toàn thị trường
                        </button>
                    </span>
                    <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10">
                        <button
                            onClick={() => {
                                handleClick('HSX')
                                dispatch(dispatch(fetchDataMarketMap('HSX', activeButton2)))
                            }}
                            className={activeButton === 'HSX'
                                ? 'border-none bg-transparent relative text-white md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                                : 'border-none bg-transparent text-white md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>HSX
                        </button>
                    </span>
                    <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10">
                        <button
                            onClick={() => {
                                handleClick('HNX')
                                dispatch(dispatch(fetchDataMarketMap('HNX', activeButton2)))
                            }}
                            className={activeButton === 'HNX'
                                ? 'border-none bg-transparent relative text-white md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                                : 'border-none bg-transparent text-white md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>HNX
                        </button>
                    </span>
                    <span className="lg:pl-10 md:pl-5 sm:pl-10 xs:pl-10">
                        <button
                            onClick={() => {
                                handleClick('UPCOM')
                                dispatch(dispatch(fetchDataMarketMap('UPCOM', activeButton2)))
                            }}
                            className={activeButton === 'UPCOM'
                                ? 'border-none bg-transparent relative text-white md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] tabUnderline cursor-pointer'
                                : 'border-none bg-transparent text-white md:text-[1rem] lg:text-[1.1rem] xl:text-[1.1rem] 2xl:text-[1.1rem] cursor-pointer'}>UPCOM
                        </button>
                    </span>
                </div>
                <div>
                    <div className="bg-[#2D303A] flex justify-around items-center rounded-full mb-2">
                        <button
                            style={activeButton2 === ENUM.vonhoa ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                            onClick={() => {
                                handleClick2(ENUM.vonhoa)
                                dispatch(dispatch(fetchDataMarketMap(activeButton, ENUM.vonhoa)))
                            }}
                            className='rounded-tl-xl rounded-bl-xl md:text-[0.8rem] lg:text-[0.9rem]'>Vốn hoá</button>
                        <button
                            style={activeButton2 === ENUM.gtGD ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                            onClick={() => {
                                handleClick2(ENUM.gtGD)
                                dispatch(dispatch(fetchDataMarketMap(activeButton, ENUM.gtGD)))
                            }}
                            className='md:text-[0.8rem] lg:text-[0.9rem]'>Giá trị GD</button>
                        <button
                            style={activeButton2 === ENUM.klGD ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                            onClick={() => {
                                handleClick2(ENUM.klGD)
                                dispatch(dispatch(fetchDataMarketMap(activeButton, ENUM.klGD)))
                            }}
                            className='md:text-[0.8rem] lg:text-[0.9rem]'>Khối lượng GD</button>
                        <button
                            style={activeButton2 === ENUM.gtNNGD ? { ...buttonStyle, ...activeButtonStyle } : buttonStyle}
                            onClick={() => {
                                handleClick2(ENUM.gtNNGD)
                                dispatch(dispatch(fetchDataMarketMap(activeButton, ENUM.gtNNGD)))
                            }}
                            className='rounded-tr-xl rounded-br-xl md:text-[0.8rem] lg:text-[0.9rem]'>Giá trị NN GD</button>
                    </div>
                </div>
            </div>
            <div className="pt-1.5">
                <Chart
                    chartType="TreeMap"
                    loader={<div className="mt-16"><Loading /></div>}
                    data={dataTreeMapRender}
                    options={options}
                    rootProps={{ "data-testid": "1" }}
                />
            </div>
        </>
    );
};

export default MarketMap;