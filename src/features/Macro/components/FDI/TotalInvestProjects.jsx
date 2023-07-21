import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataTotalInvestProjects } from '../../thunk';
import Loading from '../../../Chart/utils/Loading';
import HighchartsReact from 'highcharts-react-official'
import Highcharts from "highcharts";
import LegendBtn from '../../../../utils/Component/BtnLegend';

const TotalInvestProjects = () => {
    const dispatch = useDispatch();
    const { dataTotalInvestProjects } = useSelector(state => state.macro)
    const [data, setData] = useState([])
    const [timeLine, setTimeLine] = useState([])
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
        dispatch(fetchDataTotalInvestProjects(0));
    }, [dispatch]);

    useEffect(() => {
        if (dataTotalInvestProjects?.length > 0) {
            let modifiedArray;
            let uniqueDates;
            if (order === '0') {
                modifiedArray = dataTotalInvestProjects.map(item => {
                    const quarter = moment(item.date, 'YYYY/MM/DD').quarter(); // Lấy quý từ ngày
                    const year = moment(item.date, 'YYYY/MM/DD').year(); // Lấy năm từ ngày

                    return { ...item, date: `Quý ${quarter}/${year}` };
                });
            } else {
                modifiedArray = dataTotalInvestProjects.map(item => {
                    const month = moment(item.date, 'YYYY/MM/DD').month() + 1 // Lấy tên tháng từ ngày
                    const year = moment(item.date, 'YYYY/MM/DD').year(); // Lấy năm từ ngày
                    return { ...item, date: `Tháng ${month}/${year}` };
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
    }, [dataTotalInvestProjects, order])

    const options = {
        chart: {
            backgroundColor: "transparent", // màu nền của biểu đồ
            type: 'column'
        },
        accessibility: {
            enabled: false
        },
        credits: false,
        title: {
            text: "",
            style: {
                color: 'white'
            }
        },
        xAxis: {
            categories: timeLine,
            labels: {
                style: {
                    color: localStorage.getItem('color'), // màu cho các nhãn trục x
                    fontSize: '9px',
                }
            },
            title: {
                style: {
                    color: localStorage.getItem('color') // màu cho tiêu đề trục x
                }
            }
        },
        yAxis: [
            {
                title: {
                    text: "",
                    style: {
                        color: localStorage.getItem('color'),
                    },
                },
                labels: {
                    style: {
                        color: localStorage.getItem('color') // màu cho các nhãn trục y
                    },
                }
            },
            {
                title: {
                    text: "",
                    style: {
                        color: localStorage.getItem('color'),
                    },
                },
                labels: {
                    style: {
                        color: localStorage.getItem('color') // màu cho các nhãn trục y
                    }
                },
                opposite: true,
            },

        ],
        legend: {
            enabled: false,
            align: 'center',
            verticalAlign: 'top',
            itemStyle: {
                fontSize: '10px',
                color: localStorage.getItem('color')
            }
        },

        series: data,
    };

    return (
        <>
            <div className='flex items-center justify-between border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold'>Tổng số dự án đầu tư</span>
                <div>
                    <select className={`bg-[#1B496D] p-1 text-[1rem] text-white border-0`}
                        onChange={(event) => {
                            setOrder(event.target.value)
                            dispatch(fetchDataTotalInvestProjects(event.target.value))
                        }}>
                        <option value='0'>Quý</option>
                        <option value='2'>Tháng</option>
                    </select>
                </div>
            </div>
            {dataTotalInvestProjects?.length > 0 ? (
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

export default TotalInvestProjects