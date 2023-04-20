import { CaretDownOutlined, CaretRightOutlined, CaretUpOutlined, } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataGeneralIndustry } from "../../Chart/thunk";
import Loading from "../../Chart/utils/Loading";
import '../../Market/utils/tabStyle.css'

const GeneralIndustry = () => {
    const apiUrl = process.env.REACT_APP_BASE_URL;
    const dispatch = useDispatch()
    const [activeButton, setActiveButton] = useState('all');
    const dataGeneral = useSelector((state) => state.chart.dataGeneral);
    const [data, setData] = useState([]);
    const [buySellData, setBuySellData] = useState([])
    const [loading, setLoading] = useState(true);

    const [isHovering, setIsHovering] = useState(false);
    const handleMouseOver2 = () => {
        setIsHovering(true);
    };
    const handleMouseOut2 = () => {
        setIsHovering(false);
    };
    const [hoveredIndex, setHoveredIndex] = useState(-1);
    const handleMouseOver = (index) => {
        // setIsHovering(true);
        setHoveredIndex(index);
    };
    const handleMouseOut = () => {
        // setIsHovering(false);
        setHoveredIndex(-1);
    };

    useEffect(() => {
        if (dataGeneral?.data) {
            setLoading(false);
            setData(dataGeneral.data.data);
            setBuySellData(dataGeneral.data.buySellData)
        }
    }, [dataGeneral]);

    const handleClick = (button) => {
        setActiveButton(button);
    }

    return (
        <>
            <div className="pt-3 mb-3 text-white">
                <span>
                    <button
                        onClick={() => {
                            handleClick('all')
                            dispatch(dispatch(fetchDataGeneralIndustry('all')))
                        }}
                        className={activeButton === 'all'
                            ? 'border-none bg-transparent relative text-white text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent text-white text-[1.1rem] cursor-pointer'}>Toàn thị trường
                    </button>
                </span>
                <span className="pl-10">
                    <button
                        onClick={() => {
                            handleClick('HSX')
                            dispatch(dispatch(fetchDataGeneralIndustry('HSX')))
                        }}
                        className={activeButton === 'HSX'
                            ? 'border-none bg-transparent relative text-white text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent text-white text-[1.1rem] cursor-pointer'}>HSX
                    </button>
                </span>
                <span className="pl-10">
                    <button
                        onClick={() => {
                            handleClick('HNX')
                            dispatch(dispatch(fetchDataGeneralIndustry('HNX')))
                        }}
                        className={activeButton === 'HNX'
                            ? 'border-none bg-transparent relative text-white text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent text-white text-[1.1rem] cursor-pointer'}>HNX
                    </button>
                </span>
                <span className="pl-10">
                    <button
                        onClick={() => {
                            handleClick('UPCOM')
                            dispatch(dispatch(fetchDataGeneralIndustry('UPCOM')))
                        }}
                        className={activeButton === 'UPCOM'
                            ? 'border-none bg-transparent relative text-white text-[1.1rem] tabUnderline cursor-pointer'
                            : 'border-none bg-transparent text-white text-[1.1rem] cursor-pointer'}>UPCOM
                    </button>
                </span>
            </div>
            <section className="bg-blueGray-50 pt-1.5">
                <div className="w-full">
                    <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded">
                        <div className="block w-full scrollbar-thin scrollbar-thumb-[#217EBE] scrollbar-track-[#151924] overflow-y-scroll bg-transparent h-[313px]">
                            <table className="items-center w-full border-collapse bg-transparent">
                                <thead className="sticky top-0 bg-[#1E5D8B] z-10">
                                    <tr>
                                        <th className="text-center align-middle px-4 py-3 text-sm whitespace-nowrap font-semibold text-white">
                                            Phân ngành
                                        </th>
                                        <th className="text-center align-middle px-4 py-3 text-sm whitespace-nowrap font-semibold text-white">
                                            %D
                                        </th>
                                        <th className="text-center align-middle px-4 py-3 text-sm whitespace-nowrap font-semibold text-white">
                                            %W
                                        </th>
                                        <th className="text-center align-middle px-4 py-3 text-sm whitespace-nowrap font-semibold text-white">
                                            %M
                                        </th>
                                        <th className="text-center align-middle px-4 py-3 text-sm whitespace-nowrap font-semibold text-white">
                                            %YtD
                                        </th>
                                        <th className="text-center align-middle px-4 py-3 text-sm whitespace-nowrap font-semibold text-white">
                                            Độ rộng ngành
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {!loading ? (
                                        Array.isArray(data) &&
                                        data.map((item, index) => {
                                            let color = getColor(item.day_change_percent);
                                            let color2 = getColor(item.week_change_percent);
                                            let color3 = getColor(item.month_change_percent);

                                            if (item.industry === "#N/A") {
                                                return null;
                                            }
                                            let numOfHigh = item.high;
                                            let numOfLow = item.low;
                                            let numOfIncrease = item.increase;
                                            let numOfDecrease = item.decrease;
                                            let numOfEqual = item.equal;
                                            let total = numOfHigh + numOfLow + numOfIncrease + numOfDecrease + numOfEqual;
                                            return (
                                                <tr key={index} className="hover:bg-gray-800">
                                                    <th className={`${color} text-left align-middle lg:text-sm xl:text-xs px-2 py-2.5`}>
                                                        {item.industry}
                                                    </th>
                                                    <td className={`${color} align-middle lg:text-sm xl:text-xs whitespace-nowrap px-2 py-2.5 font-semibold`}>
                                                        <span className="text-left px-1.5">
                                                            {getIcon(item.day_change_percent)}
                                                        </span>
                                                        <span className="text-right px-px">
                                                            {item.day_change_percent.toFixed(2)}%
                                                        </span>
                                                    </td>
                                                    <td className={`${color2} align-middle lg:text-sm xl:text-xs whitespace-nowrap px-2 py-2 font-semibold`}>
                                                        <span className="text-left px-1.5">
                                                            {getIcon(item.week_change_percent)}
                                                        </span>
                                                        <span className="text-right px-px">
                                                            {item.week_change_percent.toFixed(2)}%
                                                        </span>
                                                    </td>
                                                    <td className={`${color3} align-middle lg:text-sm xl:text-xs whitespace-nowrap px-2 py-2 font-semibold`}>
                                                        <span className="text-left px-1.5">
                                                            {getIcon(item.month_change_percent)}
                                                        </span>
                                                        <span className="text-right px-px">
                                                            {item.month_change_percent.toFixed(2)}%
                                                        </span>
                                                    </td>
                                                    <td className={`${color3} align-middle lg:text-sm xl:text-xs whitespace-nowrap px-2 py-2 font-semibold`}>
                                                        <span className="text-left px-1.5">

                                                        </span>
                                                        <span className="text-right px-px">

                                                        </span>
                                                    </td>

                                                    <td className="align-middle whitespace-nowrap lg:text-sm xl:text-xs px-2 py-2  ">
                                                        <div
                                                            className="flex relative"
                                                            onMouseOver={() => handleMouseOver(index)}
                                                            onMouseOut={handleMouseOut}
                                                        >
                                                            {hoveredIndex === index && (
                                                                <div className="bg-white text-black text-xs font-medium p-1 rounded-md absolute top-0 translate-x-[-60%] translate-y-[-110%] z-40 ease-in-out duration-500">
                                                                    <span>Trần: {item.high}</span>
                                                                    <span className="ml-2">
                                                                        Tăng: {item.increase}
                                                                    </span>
                                                                    <span className="ml-2">
                                                                        Không đổi: {item.equal}
                                                                    </span>
                                                                    <span className="ml-2">
                                                                        Giảm: {item.decrease}
                                                                    </span>
                                                                    <span className="ml-2">Sàn: {item.low}</span>
                                                                </div>
                                                            )}
                                                            <div
                                                                className="bg-purple-500 h-2.5"
                                                                style={{
                                                                    width: `${(item.high / total) * 100}%`,
                                                                }}
                                                            ></div>
                                                            <div
                                                                className="h-2.5 bg-green-500"
                                                                style={{
                                                                    width: `${(item.increase / total) * 100}%`,
                                                                }}
                                                            ></div>
                                                            <div
                                                                className="bg-yellow-400 h-2.5"
                                                                style={{
                                                                    width: `${(item.equal / total) * 100}%`,
                                                                }}
                                                            ></div>
                                                            <div
                                                                className="bg-red-500 "
                                                                style={{
                                                                    width: `${(item.decrease / total) * 100}%`,
                                                                }}
                                                            ></div>
                                                            <div
                                                                className="bg-blue-400 h-2.5"
                                                                style={{
                                                                    width: `${(item.low / total) * 100}%`,
                                                                }}
                                                            ></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (<tr><td colSpan={6}><div className="mt-16"><Loading /></div></td></tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
            <hr />
            <div className='text-center py-2'>
                <span className='text-white'>Lực mua
                    {isHovering === true && (
                        <span className="text-green-500"> {((buySellData.buyPressure / 1000 / (buySellData.sellPressure / 1000 + buySellData.buyPressure / 1000)) * 100).toFixed(2)}%</span>
                    )} - bán
                    {isHovering === true && (
                        <span className="text-red-500"> {((buySellData.sellPressure / 1000 / (buySellData.sellPressure / 1000 + buySellData.buyPressure / 1000)) * 100).toFixed(2)}%</span>
                    )} hiện tại</span>
            </div>
            <div className='flex relative'
                onMouseOver={handleMouseOver2}
                onMouseOut={handleMouseOut2}>
                <div className='bg-green-500 h-9 text-right'
                    style={{
                        width: `${(buySellData.buyPressure / 1000 / (buySellData.sellPressure / 1000 + buySellData.buyPressure / 1000)) * 100}%`,
                    }}>
                    <img className="xs:w-[21.5%] md:w-[12.5%] lg:w-[9.5%] xl:w-[15.5%] 2xl:w-[15.5%] pr-[5px] translate-y-[-13px] " src={`${apiUrl}/resources/icons/buffalo.gif`} alt='buffalo' />
                </div>
                <div className='bg-red-500 h-9'
                    style={{
                        width: `${(buySellData.sellPressure / 1000 / (buySellData.sellPressure / 1000 + buySellData.buyPressure / 1000)) * 100}%`,
                    }}>
                    <img className="xs:w-[19%] md:w-[11%] lg:w-[8%] xl:w-[13%] 2xl:w-[13%] pl-[5px] pt-[1px]" src={`${apiUrl}/resources/icons/bear-karhu.gif`} alt='bear' />
                </div>
            </div>
        </>
    );
};

export default GeneralIndustry;

function getColor(item) {
    let color = "";
    if (item === 0) color = "text-yellow-500";
    else if (item < "0") color = "text-red-500";
    else color = "text-green-500";

    return color;
}

function getIcon(item) {
    if (item === 0) return <CaretRightOutlined style={{ fontSize: "18px" }} />;
    else if (item < "0")
        return <CaretDownOutlined style={{ fontSize: "18px" }} />;
    else return <CaretUpOutlined style={{ fontSize: "18px" }} />;
}
