import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';
import moment from "moment";
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from "../../../Chart/utils/Loading";
import { fetchDataExchangeableValue } from '../../thunk';

const ExchangeableValue = () => {
    const dispatch = useDispatch();
    const { dataExchangeableValue } = useSelector((state) => state.market);
    const [data, setData] = useState([])
    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    useEffect(() => {
        dispatch(fetchDataExchangeableValue());
        setColorText(color);
    }, [dispatch, color]);

    useEffect(() => {
        if (dataExchangeableValue) {
            setData(dataExchangeableValue)
        }
    }, [dataExchangeableValue]);

    const uniqueDates = [];

    const datesSet = new Set();
    Array.isArray(data) && data.map(item => {
        const date = item.date
        if (!datesSet.has(date)) {
            datesSet.add(date);
            uniqueDates.push(moment(date).format('DD/MM'));
        }
    })

    let hoseTotalVal = [];
    let hnxTotalVal = [];
    let upcomTotalVal = [];

    for (let i = 0; i < data.length; i++) {
        let floor = data[i].floor;
        let totalVal = data[i].totalVal;

        switch (floor) {
            case 'HOSE':
                hoseTotalVal.push(+(totalVal / 1000000000).toFixed(2));
                break;
            case 'HNX':
                hnxTotalVal.push(+(totalVal / 1000000000).toFixed(2));
                break;
            case 'UPCOM':
                upcomTotalVal.push(+(totalVal / 1000000000).toFixed(2));
                break;
            default:
                break;
        }
    }

    const options = {
        accessibility: {
            enabled: false,
        },
        credits: false,
        chart: {
            type: "column",
            backgroundColor: "transparent",
        },
        title: {
            text: null,
        },
        legend: {
            enabled: true,
            itemStyle: {
                color: localStorage.getItem('color'),
                fontWeight: 'bold'
            }
        },
        xAxis: [{
            categories: uniqueDates,
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
                stacking: 'normal',
            }
        },
        series: [{
            name: 'UPCOM',
            data: upcomTotalVal,
            color: '#2D8BBA'
        }, {
            name: 'HNX',
            data: hnxTotalVal,
            color: '#41B8D5'
        }, {
            name: 'HOSE',
            data: hoseTotalVal,
            color: '#6CE5E8'
        }]
    }

    return (
        <>
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0 dark:text-white text-black'>
                Giá trị giao dịch toàn thị trường qua 20 phiên gần nhất
            </div>
            {dataExchangeableValue.length ? (
                <div id="chart-container">
                    <div className="h-[333px] mt-3">
                        <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                    </div>
                </div>
            ) : (
                <div id="chart-container">
                    <div className="h-[333px]">
                        <div className="mt-14"><Loading /></div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ExchangeableValue