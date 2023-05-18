import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from "../../../Chart/utils/Loading";
import { fetchDataLiquidityGrowth } from '../../thunk';

const LiquidityGrowth = () => {
    const dispatch = useDispatch();
    const { dataLiquidityGrowth } = useSelector((state) => state.market);
    const [data, setData] = useState([])
    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    useEffect(() => {
        dispatch(fetchDataLiquidityGrowth(1));
        setColorText(color);
    }, [dispatch, color]);

    useEffect(() => {
        if (dataLiquidityGrowth) {
            setData(dataLiquidityGrowth)
        }
    }, [dataLiquidityGrowth]);

    const uniqueDates = [];

    const datesSet = new Set();
    Array.isArray(data) && data.map(item => {
        const date = item.date
        if (!datesSet.has(date)) {
            datesSet.add(date);
            uniqueDates.push(moment(date).format('DD/MM'));
        }
    })

    let hosePerChange = [];
    let hnxPerChange = [];
    let upcomPerChange = [];

    for (let i = 0; i < data.length; i++) {
        let floor = data[i].floor;
        let perChange = data[i].perChange;

        switch (floor) {
            case 'HOSE':
                hosePerChange.push(+perChange.toFixed(2))
                break;
            case 'HNX':
                hnxPerChange.push(+perChange.toFixed(2))
                break;
            case 'UPCOM':
                upcomPerChange.push(+perChange.toFixed(2))
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
            type: "line",
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
                marker: {
                  radius: 2, // Giá trị bán kính marker
                },
        }, 
    },
        series: [{
            name: 'UPCOM',
            data: upcomPerChange,
            color: '#2D8BBA',
        }, {
            name: 'HNX',
            data: hnxPerChange,
            color: '#41B8D5',
        }, {
            name: 'HOSE',
            data: hosePerChange,
            color: '#6CE5E8',
        }]
    }

    return (
        <>
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black'>Mức tăng trưởng thanh khoản (%)</span>
                <select className={`bg-[#1B496D] p-1 text-[1rem] text-white border-0`}
                    onChange={(event) => {
                        dispatch(fetchDataLiquidityGrowth(event.target.value))
                    }}>
                    <option value='1'>5 phiên</option>
                    <option value='2'>1 tháng</option>
                    <option value='3'>YtD</option>
                    <option value='5'>YoY</option>
                </select>
            </div>
            {dataLiquidityGrowth.length ? (
                <div id="chart-container">
                    <div className="h-[464px] mt-3">
                        <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                    </div>
                </div>
            ) : (
                <div id="chart-container">
                    <div className="">
                        <div className="mt-14"><Loading /></div>
                    </div>
                </div>
            )}
        </>
    )
}

export default LiquidityGrowth