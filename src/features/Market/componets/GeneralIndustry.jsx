import { CaretDownOutlined, CaretRightOutlined, CaretUpOutlined, } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../Chart/utils/Loading";
import socket from "../../Chart/utils/socket";

const GeneralIndustry = () => {
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
            setData(dataGeneral.data);
        }
    }, [dataGeneral]);

    useEffect(() => {
        if (dataGeneral?.data) {
            const oldData = dataGeneral?.data

            socket.on("listen-phan-nganh", (newData) => {
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
                    <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full  rounded ">
                        <div className="block w-full scrollbar-thin scrollbar-thumb-[#217EBE] scrollbar-track-[#151924] overflow-y-scroll xs:h-[438px] xxs:h-[430px] sm:h-[430px] md:h-[465px] lg:h-[450px] xl:h-[744px] 2xl:h-[745px] 3xl:h-[701px] bg-transparent">
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

                                <tbody><tr><td colSpan={6}><Loading /></td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
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
