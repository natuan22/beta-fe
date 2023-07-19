import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import HighchartsReact from 'highcharts-react-official'
import Highcharts from "highcharts";
import Loading from '../../../Chart/utils/Loading';
import { fetchDataRetailValue } from '../../thunk';
import LegendBtn from '../../../../utils/Component/BtnLegend';

const RetailValue = () => {
    const dispatch = useDispatch();
    const { dataRetailValue } = useSelector(state => state.macro)
    const [timeLine, setTimeLine] = useState()
    const [data, setData] = useState()
    const [order, setOrder] = useState('2')

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
        dispatch(fetchDataRetailValue(2))
    }, [dispatch]);

    useEffect(() => {
        if (dataRetailValue?.length > 0) {
            let modifiedArray;
            let uniqueDates;

            if (order === '0') {
                modifiedArray = dataRetailValue.map(item => {
                    const modifiedName = item.name.replace('Bán lẻ: ', '').replace('(Tỷ VNĐ)', '');
                    const quarter = moment(item.date, 'YYYY/MM/DD').quarter(); // Lấy quý từ ngày
                    const year = moment(item.date, 'YYYY/MM/DD').year(); // Lấy năm từ ngày
                    return { ...item, name: modifiedName, date: `Quý ${quarter}/${year}` };
                });
            } else if (order === '1') {
                modifiedArray = dataRetailValue.map(item => {
                    const modifiedName = item.name.replace('Bán lẻ: ', '').replace('(Tỷ VNĐ)', '');
                    const year = moment(item.date, 'YYYY/MM/DD').year(); // Lấy năm từ ngày
                    return { ...item, name: modifiedName, date: `${year}` };
                });
            } else {
                modifiedArray = dataRetailValue.map(item => {
                    const modifiedName = item.name.replace('Bán lẻ: ', '').replace('(Tỷ VNĐ)', '');
                    const month = moment(item.date, 'YYYY/MM/DD').month() + 1 // Lấy tên tháng từ ngày
                    const year = moment(item.date, 'YYYY/MM/DD').year(); // Lấy năm từ ngày
                    return { ...item, name: modifiedName, date: `Tháng ${month}/${year}` };
                });
            }

            uniqueDates = [...new Set(modifiedArray?.map(item => item.date))];
            setTimeLine(uniqueDates);

            const result = modifiedArray.reduce((acc, item) => {
                const { name, value, color } = item;
                const existingObj = acc.find(obj => obj.name === name);

                if (existingObj) {
                    existingObj.data.push(value);
                } else {
                    acc.push({
                        name: name,
                        data: [value],
                        color
                    });
                }
                return acc;
            }, []);

            setData(result);
        }
    }, [dataRetailValue, order]);

    const options = {
        accessibility: {
            enabled: false,
        },
        credits: false,
        chart: {
            type: 'column',
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
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false,
                },
            },
        },
        series: data,
    };

    return (
        <div>
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold sm:text-base xs:text-sm xxs:text-xs'>Giá trị bán lẻ theo các lĩnh vực (Tỷ VNĐ)</span>
                <select className={`bg-[#1B496D] p-1 text-[1rem] text-white border-0 xl:ml-[330px] lg:ml-[520px] md:ml-[290px] sm:ml-[30px] xs:ml-[25px] xxs:ml-[3px]`}
                    onChange={(event) => {
                        setOrder(event.target.value)
                        dispatch(fetchDataRetailValue(event.target.value))
                    }}>
                    <option value='2'>Tháng</option>
                    <option value='0'>Quý</option>
                    <option value='1'>Năm</option>
                </select>
            </div>

            {dataRetailValue?.length > 0 ? (
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
        </div>
    )
}

export default RetailValue