import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../../Chart/utils/Loading';
import { fetchDataChartChangesPrice } from '../../../thunk';

const ChartChangesPrice = (props) => {
    const dispatch = useDispatch()
    const { dataChartChangesPrice } = useSelector((state) => state.market);
    const [data, setData] = useState([]);

    useEffect(() => {
        dispatch(fetchDataChartChangesPrice(props.exchange, props.industryQuery, props.timeFrame, props.order));
    }, [dispatch, props]);

    useEffect(() => {
        if (dataChartChangesPrice) {
            setData(dataChartChangesPrice)
        }
    }, [dataChartChangesPrice])

    const uniqueDates = [];

    const datesSet = new Set();
    Array.isArray(data) && data.map(item => {
        const date = item.date
        if (!datesSet.has(date)) {
            datesSet.add(date);
            uniqueDates.push(moment(date).format('DD/MM/YYYY'));
        }
    })

    const result = [];

    Array.isArray(data) && data?.forEach(item => {
        const industry = item.industry;
        const value = +item.perChange.toFixed(2);
        const color = item.color
        // Tạo đối tượng mới với key "name" và value là tên ngành
        // cùng key "data" và value là mảng giá trị của ngành
        const newObj = {
            name: industry,
            data: [value],
            color
        };

        // Tìm xem ngành đã tồn tại trong đối tượng kết quả hay chưa
        const existingObj = result.find(obj => obj.name === industry);

        if (existingObj) {
            // Nếu ngành đã tồn tại, thêm giá trị vào mảng "data" của ngành đó
            existingObj.data.push(value);
        } else {
            // Nếu ngành chưa tồn tại, thêm đối tượng mới vào mảng kết quả
            result.push(newObj);
        }
    });
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
            }
        },
        series: result
    }
    return (
        <>
            {dataChartChangesPrice.length ? (
                <div id="chart-container">
                    <div className="h-[450px] mt-3">
                        <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                    </div>
                </div>
            ) : (
                <div id="chart-container">
                    <div className="mt-14 mb-24"><Loading /></div>
                </div>
            )}
        </>
    )
}

export default ChartChangesPrice