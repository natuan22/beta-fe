import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../../Chart/utils/Loading';
import TableAveragePE from "../Table/TableAveragePE";
import { hashTb } from "../../utils/hashTb";
import { fetchDataTableAveragePE } from "../../../thunk";
import FilterIndusty from "../../../utils/components/FilterIndusty";


const ChartAveragePE = () => {
    const dispatch = useDispatch()
    const { dataChartAveragePE, dataQuery } = useSelector(state => state.market)
    const { exchange } = dataQuery
    const [industryQuery, setIndustryQuery] = useState([])
    const [data, setData] = useState()
    const [timeLine, setTimeLine] = useState()

    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    useEffect(() => {
        if (dataQuery && industryQuery.length > 0) {
            const industryValues = industryQuery.map(query => getIndustryValue(query));
            dispatch(fetchDataTableAveragePE(exchange, industryValues.toString()))
        }
    }, [industryQuery, exchange])
    const getIndustryValue = (query) => {
        return hashTb[query] || null;
    };
    useEffect(() => {
        setColorText(color);
    }, [color])

    useEffect(() => {
        if (dataChartAveragePE?.length > 0) {
            const transformedData = dataChartAveragePE?.map(item => {
                const year = item.date.slice(0, 4);
                const quarter = item.date.slice(4);
                const transformedDate = `Q${quarter} ${year}`;
                return { ...item, date: transformedDate };
            });
            const result = [];
            const uniqueDates = [...new Set(transformedData?.map(item => item.date))];
            setTimeLine(uniqueDates)
            transformedData?.forEach(item => {
                if (industryQuery.includes(item.industry)) {
                    const foundItem = result.find(x => x.name === item.industry);
                    if (foundItem) {
                        foundItem.data.push(+item.PE.toFixed(2));
                    } else {
                        result.push({
                            name: item.industry,
                            color: item.color,
                            data: [+item.PE.toFixed(2)]
                        });
                    }
                }
            });

            setData(result)
        }
    }, [dataChartAveragePE, industryQuery])
    const options = {

        accessibility: {
            enabled: false,
        },
        credits: false,
        chart: {

            type: "spline",
            backgroundColor: "transparent",
        },
        title: {
            text: null,
        },
        legend: {
            enabled: false,
            itemStyle: {
                color: localStorage.getItem('color'),
                fontWeight: 'bold'
            }
        },
        xAxis: [{
            categories: timeLine,
            title: {
                text: null,
                style: {
                    color: localStorage.getItem('color'),
                },
            },
            labels: {
                style: {
                    color: localStorage.getItem('color'),
                    fontSize: '9px',
                },
            },
        }],
        yAxis: {
            title: {
                text: null
            },
            labels: {
                style: {
                    color: localStorage.getItem('color'),
                },
            },
        },
        plotOptions: {
            series: {
                marker: {
                    radius: 2, // Giá trị bán kính marker
                },
            }
        },
        series: data
    }
    const handleSelectedNamesChange = (selectedNames) => {
        setIndustryQuery(selectedNames)
    };
    return (
        <div>
            {dataChartAveragePE?.length > 0 ? (
                <div id="chart-container">
                    <div className="h-[450px] mt-3">
                        <FilterIndusty onSelectedNamesChange={handleSelectedNamesChange} />
                        <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                    </div>
                </div>
            ) : (
                <div id="chart-container">
                    <div className="mt-14 mb-[379px] grid place-items-center"><Loading /></div>
                </div>
            )}
            <div>
                <TableAveragePE />
            </div>
        </div>
    )
}

export default ChartAveragePE