import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataTotalRegisteredAndDisbursedCapital } from '../../thunk';
import Loading from '../../../Chart/utils/Loading';
import HighchartsReact from 'highcharts-react-official'
import Highcharts from "highcharts";
import LegendBtn from '../../../../utils/Component/BtnLegend';

const TotalRegisteredAndDisbursedCapital = () => {
    const dispatch = useDispatch();
    const { dataTotalRegisteredAndDisbursedCapital } = useSelector(state => state.macro)
    const [timeLine, setTimeLine] = useState()
    const [data, setData] = useState()
    const [order, setOrder] = useState('0')

    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    const chartRef = useRef(null)
    const callBackHighChart = (chart) => {
        chartRef.current = chart
    }

    useEffect(() => {
        setColorText(color);
    }, [color])

    useEffect(() => {
        dispatch(fetchDataTotalRegisteredAndDisbursedCapital(0));
    }, [dispatch]);

    useEffect(() => {
        if (dataTotalRegisteredAndDisbursedCapital?.length > 0) {
            let modifiedArray;
            let uniqueDates;
            if (order === '0') {
                modifiedArray = dataTotalRegisteredAndDisbursedCapital.map(item => {
                    const modifiedName = item.name.replace(' (triệu USD)', '');
                    const quarter = moment(item.date, 'YYYY/MM/DD').quarter(); // Lấy quý từ ngày
                    const year = moment(item.date, 'YYYY/MM/DD').year(); // Lấy năm từ ngày

                    return { ...item, name: modifiedName, date: `Quý ${quarter}/${year}` };
                });
            } else {
                modifiedArray = dataTotalRegisteredAndDisbursedCapital.map(item => {
                    const modifiedName = item.name.replace(' (triệu USD)', '');
                    const month = moment(item.date, 'YYYY/MM/DD').month() + 1 // Lấy tên tháng từ ngày
                    const year = moment(item.date, 'YYYY/MM/DD').year(); // Lấy năm từ ngày
                    return { ...item, name: modifiedName, date: `Tháng ${month}/${year}` };
                });
            }
            uniqueDates = [...new Set(modifiedArray?.map(item => item.date))];
            setTimeLine(uniqueDates)

            const result = [];

            modifiedArray?.forEach(item => {
                const name = item.name;
                const value = item.value;
                const color = item.color;

                const existingObj = result.find(obj => obj.name === name);

                if (existingObj) {
                    existingObj.data.push(value);
                } else {
                    result.push({
                        name: name,
                        data: [value],
                        color: color
                    });
                }
            })
            setData(result)
        }
    }, [dataTotalRegisteredAndDisbursedCapital, order])

    const options = {
        accessibility: {
            enabled: false,
        },
        credits: false,
        chart: {
            type: 'spline',
            backgroundColor: 'transparent',
        },
        title: {
            text: '',
        },
        xAxis: {
            categories: timeLine,
            labels: {
                style: {
                    color: localStorage.getItem('color'),
                    fontSize: '9px',
                },
            },
        },
        yAxis: {
            title: {
                text: null,
                style: {
                    color: localStorage.getItem('color'),
                },
            },
            stackLabels: {
                enabled: false,
            },
            labels: {
                style: {
                    color: localStorage.getItem('color'),
                },
            },
        },
        legend: {
            verticalAlign: 'top',
            enabled: false,
            itemStyle: {
                color: localStorage.getItem('color'),
                fontWeight: 'bold'
            },

        },
        plotOptions: {
            series: {
                marker: {
                    radius: 2, // Giá trị bán kính marker
                },
            },
        },
        series: data,
    };

    return (
        <>
            <div className='flex items-center justify-between border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold sm:text-base xs:text-xs xxs:text-[10px]'>Tổng vốn đăng ký và giải ngân (triệu USD)</span>
                <div>
                    <select className={`bg-[#1B496D] p-1 text-[1rem] text-white border-0`}
                        onChange={(event) => {
                            setOrder(event.target.value)
                        }}>
                        <option value='0'>Quý</option>
                        <option value='2'>Tháng</option>
                    </select>
                </div>
            </div>
            {dataTotalRegisteredAndDisbursedCapital?.length > 0 ? (
                <>
                    <div className='flex justify-center mt-1'>
                        <LegendBtn chart={chartRef.current} data={data} />
                    </div>
                    <div className='h-[300px]'>
                        <HighchartsReact callback={callBackHighChart} highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                    </div>
                </>
            ) : (
                <div className="h-[300px] flex items-center justify-center"><Loading /></div>
            )}
        </>
    )
}

export default TotalRegisteredAndDisbursedCapital