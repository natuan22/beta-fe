import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataInterestRateVolatility } from '../../thunk';
import HighchartsReact from 'highcharts-react-official'
import Highcharts from "highcharts";
import Loading from '../../../Chart/utils/Loading';

const InterestRateVolatility = () => {
    const dispatch = useDispatch();
    const { dataInterestRateVolatility } = useSelector(state => state.macro)
    const [timeLine, setTimeLine] = useState()
    const [data, setData] = useState()
    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    useEffect(() => {
        setColorText(color);
    }, [color])

    useEffect(() => {
        dispatch(fetchDataInterestRateVolatility(0))
    }, [dispatch]);

    useEffect(() => {
        if (dataInterestRateVolatility?.length > 0) {
            const uniqueDates = [...new Set(dataInterestRateVolatility?.map(item => moment(item.date).format('DD/MM/YYYY')))];
            setTimeLine(uniqueDates)

            const result = [];

            dataInterestRateVolatility?.forEach(item => {
                const name = item.name;
                const value = +item.value.toFixed(2);
                const color = item.color;

                const existingObj = result.find(obj => obj.name === name);

                if (existingObj) {
                    existingObj.data.push(value);
                } else {
                    result.push({
                        name: name,
                        data: [value],
                        color
                    });
                }
            })
            const updatedData = result.map((item, index) => {
                // Nếu name là 'VNINDEX', thêm key yAxis với giá trị là 1, ngược lại là 0
                const yAxisValue = item.name === "VN-Index" ? 1 : 0;

                // Trả về một đối tượng mới với key yAxis đã được thêm
                return { ...item, yAxis: yAxisValue };
            });
            setData(updatedData)
        }
    }, [dataInterestRateVolatility])

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
                },
                gridLineWidth: 0.5,
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
                gridLineWidth: 0.5,
            },
        ],
        legend: {
            align: 'center',
            verticalAlign: 'top',
            enabled: true,
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
            <div className='flex items-center justify-between border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold'>Biến động lãi suất với thị trường</span>
                <div>
                    <select className={`bg-[#1B496D] p-1 text-[1rem] text-white border-0`}
                        onChange={(event) => {
                            dispatch(fetchDataInterestRateVolatility(event.target.value))
                        }}>
                        <option value='0'>Chỉ số VN-INDEX</option>
                        <option value='1'>% VN-INDEX</option>
                    </select>
                </div>
            </div>
            {dataInterestRateVolatility?.length > 0 ? (
                <div className='h-[300px]'>
                    <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                </div>
            ) : (
                <div className="h-[300px] flex items-center justify-center"><Loading /></div>
            )}
        </div>
    )
}

export default InterestRateVolatility