import React, { useEffect, useState } from 'react'
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../../Chart/utils/Loading';
import FilterIndusty from '../../../utils/components/FilterIndusty';
import { hashTb } from '../../utils/hashTb';
import { fetchDataTableLiabilitiesGrowth } from '../../../thunk';
import TableLiabilitiesGrowth from '../Table/TableLiabilitiesGrowth';

const ChartLiabilitiesGrowth = (props) => {
    const dispatch = useDispatch()
    const { dataChartLiabilitiesGrowth, dataQuery } = useSelector(state => state.market)
    const { exchange } = dataQuery
    const [data, setData] = useState()
    const [timeLine, setTimeLine] = useState()
    const [industryQuery, setIndustryQuery] = useState([])
    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    useEffect(() => {
        if (dataQuery && industryQuery.length > 0) {
            const industryValues = industryQuery.map(query => getIndustryValue(query));
            dispatch(fetchDataTableLiabilitiesGrowth(exchange, industryValues.toString()))
        }
    }, [industryQuery, exchange])
    const getIndustryValue = (query) => {
        return hashTb[query] || null;
    };
    useEffect(() => {
        setColorText(color);
    }, [color])

    useEffect(() => {
        if (dataChartLiabilitiesGrowth?.length > 0) {
            const transformedData = dataChartLiabilitiesGrowth?.map(item => {
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
                        foundItem.data.push(+item.perChange.toFixed(2));
                    } else {
                        result.push({
                            name: item.industry,
                            color: item.color,
                            data: [+item.perChange.toFixed(2)]
                        });
                    }
                }
            });
            setData(result)
        }
    }, [dataChartLiabilitiesGrowth, industryQuery])
    const handleSelectedNamesChange = (selectedNames) => {
        setIndustryQuery(selectedNames)
    };
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
    return (
        <div>
            {dataChartLiabilitiesGrowth.length ? (
                <div>
                    <div className='xs:flex xxs:block items-center justify-between border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                        <span className='dark:text-white text-black font-semibold md:text-base sm:text-sm xs:text-[13px] xxs:text-sm'>Tăng trưởng nợ phải trả của các ngành (%)</span>
                        <div className='flex items-center justify-center'>
                            <FilterIndusty onSelectedNamesChange={handleSelectedNamesChange} />
                        </div>
                    </div>
                    <div className="h-[450px] mt-3">
                        <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                    </div>

                </div>
            ) : (
                <div id="chart-container">
                    <div className="mt-14 mb-[379px] flex flex-col justify-center"><Loading /></div>
                </div>
            )}
            <div>
                <TableLiabilitiesGrowth />
            </div>
        </div>
    )
}

export default ChartLiabilitiesGrowth