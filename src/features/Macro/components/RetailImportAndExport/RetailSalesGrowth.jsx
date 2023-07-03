import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from "highcharts";
import Loading from '../../../Chart/utils/Loading';
import { fetchDataRetailSalesGrowth } from '../../thunk';
import LegendBtn from '../../../../utils/Component/BtnLegend';

const RetailSalesGrowth = () => {
    const dispatch = useDispatch();
    const { dataRetailSalesGrowth } = useSelector(state => state.marco)
    const [timeLine, setTimeLine] = useState()
    const [data, setData] = useState()
    const [order, setOrder] = useState('1')

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
        if (dataRetailSalesGrowth?.length > 0) {
            let modifiedArray;
            let uniqueDates;

            if (order === '1') {
                modifiedArray = dataRetailSalesGrowth.map(item => {
                    const modifiedName = item.name.replace('Bán lẻ: ', '').replace('(Tỷ VNĐ)', '');
                    const year = moment(item.date, 'YYYY/MM/DD').year(); // Lấy năm từ ngày
                    return { ...item, name: modifiedName, date: `${year}` };
                });
            } else {
                modifiedArray = dataRetailSalesGrowth.map(item => {
                    const modifiedName = item.name.replace('Bán lẻ: ', '').replace('(Tỷ VNĐ)', '');
                    const month = moment(item.date, 'YYYY/MM/DD').month() + 1 // Lấy tên tháng từ ngày
                    const year = moment(item.date, 'YYYY/MM/DD').year(); // Lấy năm từ ngày
                    return { ...item, name: modifiedName, date: `Tháng ${month}/${year}` };
                });
            }

            uniqueDates = [...new Set(modifiedArray?.map(item => item.date))];
            setTimeLine(uniqueDates)

            const result = modifiedArray.reduce((acc, item) => {
                const { name, value, color } = item;
                const roundedValue = +value.toFixed(2); // Làm tròn giá trị đến 2 chữ số thập phân
                const existingObj = acc.find(obj => obj.name === name);

                if (existingObj) {
                    existingObj.data.push(roundedValue);
                } else {
                    acc.push({
                        name: name,
                        data: [roundedValue],
                        color
                    });
                }
                return acc;
            }, []);

            setData(result);
        }
    }, [dataRetailSalesGrowth])

    const options = {
        accessibility: {
            enabled: false,
        },
        credits: false,
        chart: {
            type: 'line',
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
        <div>
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold xs:text-base xxs:text-[13px]'>Tăng trưởng doanh số bán lẻ tại các lĩnh vực (%)</span>
                <select className={`bg-[#1B496D] p-1 text-[1rem] text-white border-0 xl:ml-[140px] lg:ml-[330px] md:ml-[105px] sm:ml-[100px] xs:ml-[80px] xxs:ml-[50px]`}
                    onChange={(event) => {
                        setOrder(event.target.value)
                        dispatch(fetchDataRetailSalesGrowth(event.target.value))
                    }}>
                    <option value='1'>Cùng kỳ (YoY)</option>
                    <option value='2'>Tháng trên tháng (MoM)</option>
                </select>
            </div>
            {dataRetailSalesGrowth?.length > 0 ? (
                <>
                    <div className='flex justify-center mt-1'>
                        <LegendBtn chart={chartRef.current} data={data} />
                    </div>
                    <div className='h-[300px]'>
                        <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                    </div>
                </>
            ) : (
                <div className="mt-16 mb-52 grid place-content-center"><Loading /></div>
            )}
        </div>
    )
}

export default RetailSalesGrowth