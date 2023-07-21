import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import HighchartsReact from 'highcharts-react-official'
import Highcharts from "highcharts";
import Loading from '../../../Chart/utils/Loading';
import { fetchDataStatisticsCreditInstitution } from '../../thunk';

const StatisticsCreditInstitution = () => {
    const dispatch = useDispatch();
    const { dataStatisticsCreditInstitution } = useSelector(state => state.macro)
    const [timeLine, setTimeLine] = useState()
    const [data, setData] = useState()
    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    useEffect(() => {
        setColorText(color);
    }, [color])

    useEffect(() => {
        dispatch(fetchDataStatisticsCreditInstitution)
    }, [dispatch]);

    useEffect(() => {
        if (dataStatisticsCreditInstitution?.length > 0) {
            const modifiedArray = dataStatisticsCreditInstitution.map(item => {
                const modifiedName = item.name.replace(' (%)', '');
                const month = moment(item.date, 'YYYY/MM/DD').month() + 1 // Lấy tên tháng từ ngày
                const year = moment(item.date, 'YYYY/MM/DD').year(); // Lấy năm từ ngày

                return { ...item, name: modifiedName, date: `T${month}/${year}` };
            });
            const uniqueDates = [...new Set(modifiedArray?.map(item => item.date))];
            setTimeLine(uniqueDates)

            const result = [];

            modifiedArray?.forEach(item => {
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
            setData(result)
        }
    }, [dataStatisticsCreditInstitution])

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
                rotation: 0,
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
        <>
            <div className='sm:flex xs:block items-center justify-between border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold md:text-base sm:text-[13px]'>Thống kê theo loại hình tổ chức tín dụng</span>
                <div className="flex items-center justify-center">
                    <select className={`bg-[#1B496D] p-1 text-[1rem] text-white border-0`}
                        onChange={(event) => {
                        }}>
                        <option value='0'>Tỷ lệ an toàn vốn</option>
                    </select>
                </div>
            </div>
            {dataStatisticsCreditInstitution?.length > 0 ? (
                <div className='h-[200px]'>
                    <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                </div>
            ) : (
                <div className="h-[200px] flex items-center justify-center"><Loading /></div>
            )}
        </>
    )
}

export default StatisticsCreditInstitution