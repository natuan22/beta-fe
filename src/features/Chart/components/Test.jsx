import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../utils/Loading";
import socket from "../utils/socket";
import { getColor, getIcon } from "../utils/utils";

const Test = () => {
    const dataGeneral = useSelector((state) => state.chart.dataGeneral);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // const [isHovering, setIsHovering] = useState(false);
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
        }
    }, [dataGeneral]);

    useEffect(() => {
        if (dataGeneral?.data) {
            const oldData = dataGeneral?.data.data

            socket.on("listen-phan-nganh-ALL", (newData) => {
                const newDataWithChanges = oldData.map(oldItem => {
                    const matchingItem = newData.find(newItem => newItem.industry === oldItem.industry)
                    if (matchingItem) {
                        return {
                            ...oldItem,
                            day_change_percent: matchingItem.day_change_percent,
                            month_change_percent: matchingItem.month_change_percent,
                            week_change_percent: matchingItem.week_change_percent
                        }
                    } else {
                        return oldItem
                    }
                })
                setData(newDataWithChanges)
            });
        }
    }, [dataGeneral]);

    return (
        <>
            <section className="bg-blueGray-50">
                <div className="w-full">
                    <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full rounded ">
                        <div className="block w-full scrollbar-thin scrollbar-thumb-[#436FB5] dark:scrollbar-track-[#151924] scrollbar-track-transparent overflow-y-scroll xs:h-[438px] md:h-[465px] lg:h-[450px] xl:h-[744px] 2xl:h-[745px] bg-transparent">
                            <table className="items-center w-full border-collapse bg-transparent">
                                <thead className="bg-[#1E5D8B] z-10" style={{ position: 'sticky', top: 0 }}>
                                    <tr>
                                        <th className="text-center align-middle xxs:text-[10px] px-4 py-3 text-sm whitespace-nowrap font-semibold text-white">
                                            Phân ngành
                                        </th>
                                        <th className="text-center align-middle xxs:text-[10px] px-4 py-3 text-sm whitespace-nowrap font-semibold text-white">
                                            %D
                                        </th>
                                        <th className="text-center align-middle xxs:text-[10px] px-4 py-3 text-sm whitespace-nowrap font-semibold text-white">
                                            %W
                                        </th>
                                        <th className="text-center align-middle xxs:text-[10px] px-4 py-3 text-sm whitespace-nowrap font-semibold text-white">
                                            %M
                                        </th>
                                        <th className="text-center align-middle xxs:text-[10px] px-4 py-3 text-sm whitespace-nowrap font-semibold text-white">
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
                                                <tr key={index} className="dark:hover:bg-gray-800 hover:bg-gray-300 duration-500">
                                                    <th className={`${color} text-left align-middle xxs:text-[10px] lg:text-sm xl:text-xs px-2 py-2.5`}>
                                                        {item.industry}
                                                    </th>
                                                    <td className={`${color} align-middle xxs:text-[10px] lg:text-sm xl:text-xs whitespace-nowrap px-2 py-2.5 font-semibold`}>
                                                        <span className="text-left px-1.5">
                                                            {getIcon(item.day_change_percent)}
                                                        </span>
                                                        <span className="text-right px-px">
                                                            {item.day_change_percent.toFixed(2)}%
                                                        </span>
                                                    </td>
                                                    <td className={`${color2} align-middle xxs:text-[10px] lg:text-sm xl:text-xs whitespace-nowrap px-2 py-2 font-semibold`}>
                                                        <span className="text-left px-1.5">
                                                            {getIcon(item.week_change_percent)}
                                                        </span>
                                                        <span className="text-right px-px">
                                                            {item.week_change_percent.toFixed(2)}%
                                                        </span>
                                                    </td>
                                                    <td className={`${color3} align-middle xxs:text-[10px] lg:text-sm xl:text-xs whitespace-nowrap px-2 py-2 font-semibold`}>
                                                        <span className="text-left px-1.5">
                                                            {getIcon(item.month_change_percent)}
                                                        </span>
                                                        <span className="text-right px-px">
                                                            {item.month_change_percent.toFixed(2)}%
                                                        </span>
                                                    </td>

                                                    <td className="align-middle xxs:text-[10px] whitespace-nowrap lg:text-sm xl:text-xs px-2 py-2  ">
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
                                    ) : (
                                        <tr>
                                            <td colSpan={5}>
                                                <div className="mt-16"><Loading /></div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Test;

