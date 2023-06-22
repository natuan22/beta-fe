import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';
import Loading from '../../../Chart/utils/Loading';

const PerGDPGrowth = () => {
    const { dataPerGDPGrowth } = useSelector(state => state.marco)
    const [data, setData] = useState()
    const [timeLine, setTimeLine] = useState()

    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    useEffect(() => {
        setColorText(color);
    }, [color])

    useEffect(() => {
        if (dataPerGDPGrowth?.length > 0) {
            const transformedData = dataPerGDPGrowth?.map(item => {
                const quarter = moment(item.date, 'YYYY/MM/DD').quarter(); // Lấy quý từ ngày
                const year = moment(item.date, 'YYYY/MM/DD').year(); // Lấy năm từ ngày

                return { ...item, date: `Quý ${quarter}/${year}` };
            });

            const result = [];
            const uniqueDates = [...new Set(transformedData?.map(item => item.date))];
            setTimeLine(uniqueDates)

            transformedData?.forEach(item => {
                const name = item.name;
                const value = +item.value.toFixed(2);

                const existingObj = result.find(obj => obj.name === name);

                if (existingObj) {
                    existingObj.data.push(value);
                } else {
                    result.push({
                        name: name,
                        data: [value],
                    });
                }
            });
            setData(result)
        }
    }, [dataPerGDPGrowth])

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
        <>
            {dataPerGDPGrowth?.length > 0 ? (
                <div className="h-[263px] mt-2">
                    <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                </div>
            ) : (
                <div className="mt-14 mb-40"><Loading /></div>
            )}
        </>
    )
}

export default PerGDPGrowth