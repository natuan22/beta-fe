import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../../Chart/utils/Loading';
import TableAveragePB from "../Table/TableAveragePB";
import { hashTb } from "../../utils/hashTb";
import { fetchDataTableAveragePB } from "../../../thunk";
import FilterIndusty from "../../../utils/components/FilterIndusty";

const getIndustryValue = (query) => {
    return hashTb[query] || null;
};
const ChartAveragePB = () => {
    const dispatch = useDispatch()
    const { dataChartAveragePB, dataQuery } = useSelector(state => state.market)
    const { exchange } = dataQuery
    const [industryQuery, setIndustryQuery] = useState([])

    const [data, setData] = useState()
    const [timeLine, setTimeLine] = useState()
    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    useEffect(() => {
        if (dataQuery && industryQuery.length > 0) {
            const industryValues = industryQuery.map(query => getIndustryValue(query));
            dispatch(fetchDataTableAveragePB(exchange, industryValues.toString()))
        }
    }, [industryQuery, exchange])

    useEffect(() => {
        setColorText(color);
    }, [color])

    useEffect(() => {
        if (dataChartAveragePB?.length > 0) {
            const result = [];
            const transformedData = dataChartAveragePB?.map(item => {
                const year = item.date.slice(0, 4);
                const quarter = item.date.slice(4);
                const transformedDate = `Q${quarter} ${year}`;
                return { ...item, date: transformedDate };
            });
            const uniqueDates = [...new Set(transformedData?.map(item => item.date))];
            setTimeLine(uniqueDates)
            transformedData?.forEach(item => {
                if (industryQuery.includes(item.industry)) {
                    const foundItem = result.find(x => x.name === item.industry);
                    if (foundItem) {
                        foundItem.data.push(+item.PB.toFixed(2));
                    } else {
                        result.push({
                            name: item.industry,
                            color: item.color,
                            data: [+item.PB.toFixed(2)]
                        });
                    }
                }
            });
            setData(result)
        }
    }, [dataChartAveragePB, industryQuery])

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
            gridLineWidth: 0.5,
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
            <div className='xs:flex xxs:block items-center justify-between border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold md:text-base sm:text-sm xs:text-xs xxs:text-sm'>Diễn biến P/B bình quân các nhóm ngành (lần)</span>
                <div className='flex items-center justify-center'>
                    <FilterIndusty onSelectedNamesChange={handleSelectedNamesChange} />
                </div>
            </div>
            {dataChartAveragePB.length ? (
                <div className="h-[450px] mt-3">
                    <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                </div>
            ) : (
                <div className="h-[450px] flex items-center justify-center"><Loading /></div>
            )}
            <div>
                <TableAveragePB />
            </div>
        </div>
    )
}

export default ChartAveragePB