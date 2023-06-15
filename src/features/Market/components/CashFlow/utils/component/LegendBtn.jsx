import React, { useEffect, useState } from "react";

const LegendBtn = ({ chart, sortedDataArray }) => {
    const [selectedLegend, setSelectedLegend] = useState([]);
    const [allLegends, setAllLegends] = useState(true);
    useEffect(() => {
        if (sortedDataArray?.length > 0)
            setSelectedLegend(new Array(sortedDataArray?.length).fill(true))
    }, [sortedDataArray])
    const handleClickLegend = (index) => {
        const newSelectedLegend = [...selectedLegend];
        newSelectedLegend[index] = !newSelectedLegend[index];
        setSelectedLegend(newSelectedLegend);
        chart.series[index].setVisible(newSelectedLegend[index]);
    }

    const handleClickAll = () => {
        setAllLegends(!allLegends);
        setSelectedLegend(new Array(sortedDataArray?.length).fill(!allLegends));
        chart.series.forEach((item, index) => {
            item.setVisible(!allLegends);
        });
    }

    return (
        <div>
            {sortedDataArray?.map((item, index) => {
                return (
                    <button
                        className={`btnLegend m-1 py-1.5 px-3 rounded-lg border-none cursor-pointer xxs:text-[6px] xs:text-[9px] sm:text-[11px] md:text-[13.5px] lg:text-[11px] xl:text-[13.5px] 2xl:text-[13.5px] ${selectedLegend[index] ? '' : 'opacity-50'}`}
                        key={item.name}
                        style={{ backgroundColor: item.color }}
                        onClick={() => handleClickLegend(index)}
                    >
                        {item.name}
                    </button>
                )
            })}
            <button
                className={`btnLegendAll m-1 py-1.5 px-3 rounded-lg border-none cursor-pointer xxs:text-[6px] xs:text-[9px] sm:text-[11px] md:text-[13.5px] lg:text-[11px] xl:text-[13.5px] 2xl:text-[13.5px] ${allLegends ? '' : 'opacity-50'}`}
                onClick={handleClickAll}
            >
                Chọn tất cả
            </button>
        </div>
    );
}

export default LegendBtn;
