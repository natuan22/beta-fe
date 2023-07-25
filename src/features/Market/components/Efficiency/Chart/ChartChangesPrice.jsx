import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../../Chart/utils/Loading';
import FilterIndusty from "../../../utils/components/FilterIndusty";
import TableChangesPrice from "../Table/TableChangesPrice";
import { fetchDataTableChangesPrice } from "../../../thunk";
import { hashTb } from "../../utils/hashTb";


const ChartChangesPrice = () => {
    const dispatch = useDispatch()
    const { dataChartChangesPrice, dataQuery } = useSelector(state => state.market)
    const { exchange } = dataQuery
    const [data, setData] = useState()
    const [timeLine, setTimeLine] = useState()
    const [industryQuery, setIndustryQuery] = useState([])
    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    useEffect(() => {
        if (dataQuery && industryQuery.length > 0) {
            const industryValues = industryQuery.map(query => getIndustryValue(query));
            dispatch(fetchDataTableChangesPrice(exchange, industryValues.toString()))
        }
    }, [industryQuery, exchange])
    useEffect(() => {
        setColorText(color);
    }, [color])
    const getIndustryValue = (query) => {
        return hashTb[query] || null;
    };
    useEffect(() => {
        if (dataChartChangesPrice?.length > 0) {
            const result = [];
            const uniqueDates = [...new Set(dataChartChangesPrice?.map(item => moment(item.date).format('DD/MM/YYYY')))];
            setTimeLine(uniqueDates)
            dataChartChangesPrice?.forEach(item => {
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
    }, [industryQuery, dataChartChangesPrice])
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
        <>
            <div >
                <div className='flex items-center justify-between border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0 mt-1'>
                    <span className='dark:text-white text-black font-semibold'>Thay đổi giá của các ngành (%)</span>
                    <FilterIndusty onSelectedNamesChange={handleSelectedNamesChange} />
                </div>
                {dataChartChangesPrice.length ? (
                    <div id="chart-container">
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
                    <TableChangesPrice />
                </div>
            </div>
        </>
    )
}

export default ChartChangesPrice