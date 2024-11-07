import React, { useEffect, useState } from "react";
import useLegendAllToggle from "../Custom/useLegendAllToggle";

const LegendBtn = ({ chart, data, handleLastLegend }) => {
  const [selectedLegend, setSelectedLegend] = useState([]);
  const [allLegends, setAllLegends] = useState(true);
  const { title, toggleLegend } = useLegendAllToggle(true);

  useEffect(() => {
    if (data?.length > 0) setSelectedLegend(new Array(data?.length).fill(true));
  }, [data]);

  const handleClickLegend = (index) => {
    const newSelectedLegend = [...selectedLegend];
    newSelectedLegend[index] = !newSelectedLegend[index];
    setSelectedLegend(newSelectedLegend);
    chart.series[index].setVisible(newSelectedLegend[index]);

    handleLastLegend(newSelectedLegend.filter(Boolean).length)
  };

  const handleClickAll = () => {
    toggleLegend();
    setAllLegends(!allLegends);
    setSelectedLegend(new Array(data?.length).fill(!allLegends));
    chart.series.forEach((item, index) => { item.setVisible(!allLegends) });
  };

  return (
    <div>
      {data?.map((item, index) => {
        return (
          <button
            className={`font-semibold btnLegend m-1 py-1.5 px-3.5 rounded-lg border-none cursor-pointer xxs:text-[6px] xs:text-[9px] sm:text-[11px] md:text-[13px] lg:text-[11px] xl:text-[13px] 2xl:text-[13px] ${
              selectedLegend[index] ? "" : "opacity-40"
            }`}
            key={item.name}
            style={{ backgroundColor: item.color }}
            onClick={() => handleClickLegend(index)}
          >
            {item.name}
          </button>
        );
      })}
      <button
        className={`font-semibold btnLegendAll m-1 py-1.5 px-3.5 rounded-lg border-none cursor-pointer xxs:text-[6px] xs:text-[9px] sm:text-[11px] md:text-[13px] lg:text-[11px] xl:text-[13px] 2xl:text-[13px] ${
          allLegends ? "" : "opacity-40"
        }`}
        onClick={handleClickAll}
      >
        {title}
      </button>
    </div>
  );
};

export default LegendBtn;
