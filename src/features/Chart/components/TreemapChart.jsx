import { useState } from "react";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";

const TreeMapChart = () => {
  const dataTreemap = useSelector((state) => state.chart.dataTreemap);
  const [data = dataTreemap.recordset || [], setData] = useState();

  const arrGlobal = [
    [
      "Location",
      "Parent",
      "Market trade volume (size)",
      "Market increase/decrease (color)",
    ],
    ["Khối ngoại mua ròng", null, 0, 0],
  ];
  // tạo 1 trường AddedLv2Value => chạy vòng lặp xét item.lv2 có trong addedValue chưa nếu chưa thì thực hiện arrGlobal.push([item.lv2, "Global", 0, 0]); và ngược lại
  const addedLv2Values = new Set();
  data.forEach((item) => {
    if (!addedLv2Values.has(item.lv2)) {
      arrGlobal.push([item.lv2, "Khối ngoại mua ròng", 0, 0]);
      addedLv2Values.add(item.lv2);
    }
  });
  const arrTicker = data.map((item) => {
    return [

      `${item.ticker}: ${item.total_value_buy}`,
      item.lv2,
      item.total_value_buy,
      item.total_value_sell,

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
    headerHeight: 30,
    showScale: false,
    height: 680,
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
    <Chart
      width={"100%"}
      height={"500px"}
      chartType="TreeMap"
      loader={<div>Loading Chart</div>}
      data={dataTreeMapRender}
      options={options}
      rootProps={{ "data-testid": "1" }}
    />
  );
};

export default TreeMapChart;