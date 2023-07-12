import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataCreditBalanceGrowth } from '../../thunk';
import HighchartsReact from 'highcharts-react-official'
import Highcharts from "highcharts";
import Loading from '../../../Chart/utils/Loading';

const CreditBalanceGrowth = () => {
    const dispatch = useDispatch();
    const { dataCreditBalanceGrowth } = useSelector(state => state.marco)
    const [timeLine, setTimeLine] = useState()
    const [data, setData] = useState()
    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    useEffect(() => {
        setColorText(color);
    }, [color])

    useEffect(() => {
        dispatch(fetchDataCreditBalanceGrowth)
    }, [dispatch]);

    useEffect(() => {
        if (dataCreditBalanceGrowth?.length > 0) {
            const modifiedArray = dataCreditBalanceGrowth.map(item => {
                const modifiedName = item.name.replace(' (%)', '');
                const quarter = moment(item.date, 'YYYY/MM/DD').quarter(); // Lấy quý từ ngày
                const year = moment(item.date, 'YYYY/MM/DD').year(); // Lấy năm từ ngày

                return { ...item, name: modifiedName, date: `Quý ${quarter}/${year}` };
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
    }, [dataCreditBalanceGrowth])

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
        <div>
            {dataCreditBalanceGrowth?.length > 0 ? (
                <div className='h-[300px]'>
                    <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                </div>
            ) : (
                <div className="mt-16 mb-52 grid place-content-center"><Loading /></div>
            )}
        </div>
    )
}

export default CreditBalanceGrowth