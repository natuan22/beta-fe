import React, { useEffect, useState } from 'react'
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Loading from '../../../../Chart/utils/Loading';
import FilterIndusty from '../../../utils/components/FilterIndusty';
import TableLiquidityGrowth from '../Table/TableLiquidityGrowth';
import { hashTb } from '../../utils/hashTb';
import { fetchDataTableLiquidityGrowth } from '../../../thunk';
const getIndustryValue = (query) => {
    return hashTb[query] || null;
};
const ChartLiquidityGrowth = (props) => {
    const dispatch = useDispatch()
    const { dataChartLiquidityGrowth, dataQuery } = useSelector(state => state.market)
    const { exchange } = dataQuery
    const [data, setData] = useState()
    const [timeLine, setTimeLine] = useState()
    const [industryQuery, setIndustryQuery] = useState([])
    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    useEffect(() => {
        if (dataQuery && industryQuery.length > 0) {
            const industryValues = industryQuery.map(query => getIndustryValue(query));
            dispatch(fetchDataTableLiquidityGrowth(exchange, industryValues.toString()))
        }
    }, [industryQuery, exchange])
    useEffect(() => {
        setColorText(color);
    }, [color])

    useEffect(() => {
        if (dataChartLiquidityGrowth?.length > 0) {
            const result = [];
            const uniqueDates = [...new Set(dataChartLiquidityGrowth?.map(item => moment(item.date).format('DD/MM/YYYY')))];
            setTimeLine(uniqueDates)
            dataChartLiquidityGrowth?.forEach(item => {
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
    }, [industryQuery, dataChartLiquidityGrowth])
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
            <div className='xs:flex xxs:block items-center justify-between border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold sm:text-sm xs:text-[12px] xxs:text-sm'>Tăng trưởng thanh khoản của các ngành (%)</span>
                <div className='flex items-center justify-center'>
                    <FilterIndusty onSelectedNamesChange={handleSelectedNamesChange} />
                </div>
            </div>
            {dataChartLiquidityGrowth.length ? (
                <div className="h-[450px] mt-3">
                    <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                </div>
            ) : (
                <div className="h-[450px] flex items-center justify-center"><Loading /></div>
            )}
            <div>
                <TableLiquidityGrowth />
            </div>
        </div>
    )
}

export default ChartLiquidityGrowth


