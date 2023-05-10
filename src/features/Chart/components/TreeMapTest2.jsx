import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import treemap from "highcharts/modules/treemap";
import { useSelector } from "react-redux";
import '../utils/treemapStyleDrillBtn.css'
import Loading from "../utils/Loading";
// Khởi tạo module treemap
treemap(Highcharts);

const TreeMapTest2 = () => {
    const { dataTreemapSell } = useSelector(state => state.chart)
    const [dataTreeMap, setDataTreeMap] = useState()
    useEffect(() => {
        if (dataTreemapSell?.length > 0) {
            const resultMap = {};
            dataTreemapSell.forEach(item => {
                const { LV2, ticker, total_value_sell } = item;

                if (!resultMap.hasOwnProperty(LV2)) {
                    resultMap[LV2] = {};
                }

                resultMap[LV2][ticker] = (total_value_sell / 1000000000).toFixed(2);
            });

            console.log('resultMap', resultMap);
            setDataTreeMap(resultMap)
        }
    }, [dataTreemapSell])
    const points = [];
    let sectorIndex = 0;

    for (let sector in dataTreeMap) {
        let sectorValue = 0;
        let sectorPoint = {
            id: `sector_${sectorIndex}`,
            name: `${sector}`,
            color: Highcharts.getOptions().colors[sectorIndex],
            dataLabels: {
                enabled: true,

                style: {
                    fontSize: "12px", // Chỉnh kích thước font size
                    fontWeight: "bold", // Chỉnh độ đậm
                    color: "black", // Chỉnh màu chữ
                },
                verticalAlign: "top", // Chỉnh vị trí theo chiều dọc
                align: "left", // Chỉnh vị trí theo chiều ngang
            },
        };
        let stockIndex = 0;

        for (let stock in dataTreeMap[sector]) {
            let stockPoint = {
                id: `${sectorPoint.id}_${stockIndex}`,
                name: stock,
                parent: sectorPoint.id,
                value: parseFloat(dataTreeMap[sector][stock]),
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        return '<b>' + this.point.name + '</b>: ' + this.point.value;
                    },
                    style: {
                        fontSize: "11px", // Chỉnh kích thước font size
                        fontWeight: "semibold", // Chỉnh độ đậm
                        color: "white", // Chỉnh màu chữ
                        style: {
                            textOutline: "none", // Loại bỏ viền chữ
                        },
                    },
                    align: "center", // Chỉnh vị trí theo chiều ngang
                },
            };
            sectorValue += stockPoint.value;
            points.push(stockPoint);
            stockIndex++;
        }

        sectorPoint.value = Math.round(sectorValue);
        points.push(sectorPoint);
        sectorIndex++;
    }

    const options = {

        chart: {
            type: "treemap",
            backgroundColor: "transparent",
            borderWidth: 2,
            borderColor: "#000",
            borderRadius: 6
        },
        title: {
            text: "Khối ngoại bán ròng theo sàn",
            align: "center"
        },

        series: [
            {
                type: "treemap",
                name: "Khối ngoại bán ròng",
                layoutAlgorithm: "squarified",
                allowDrillToNode: true,
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
                    relativeTo: 'spacingBox',
                    position: {
                        y: 50,
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
        (dataTreemapSell.length > 0 ? <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '654px', width: '100%' } }} /> : <div><Loading /></div>)
    );
};

export default TreeMapTest2;
