import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataRateOfInformalEmployment } from '../../thunk';
import Highcharts from "highcharts/highstock";
import PieChart from "highcharts-react-official";
import Loading from '../../../Chart/utils/Loading';

const RateOfInformalEmployment = () => {
    const dispatch = useDispatch();
    const { dataRateOfInformalEmployment } = useSelector(state => state.marco)
    const [data, setData] = useState()
    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    useEffect(() => {
        setColorText(color);
    }, [color])

    useEffect(() => {
        dispatch(fetchDataRateOfInformalEmployment)
    }, [dispatch]);

    useEffect(() => {
        if (dataRateOfInformalEmployment?.length > 0) {
            const modifiedArray = dataRateOfInformalEmployment.map(item => {
                const modifiedName = item.name.replace(' (%)', '').replace('Tỉ ', 'Tỷ ');

                return { ...item, name: modifiedName };
            });
            const danhSachMoi = modifiedArray.map(item => ({
                name: item.name,
                y: item.value,
                color: '#2CC8DD'
            }));
            const newItem = {
                name: 'Tỷ lệ lao động chính thức',
                y: 100 - danhSachMoi[0].y,
                color: '#436FB5'
            };
            danhSachMoi.push(newItem)
            setData(danhSachMoi)
        }
    }, [dataRateOfInformalEmployment])

    // Create the chart
    const options = {
        accessibility: {
            enabled: false,
        },
        credits: false,
        chart: {
            type: "pie",
            backgroundColor: 'transparent',
        },
        title: {
            text: ""
        },
        subtitle: {
            text: ""
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: false
                },
                borderRadius: '50%'
            }
        },
        tooltip: {
            valueSuffix: "%"
        },
        legend: {
            align: 'center',
            verticalAlign: 'top',
            itemStyle: {
                fontSize: '10px',
                color: localStorage.getItem('color')
            }
        },
        series: [
            {
                name: "Tỷ lệ",
                data: data,
                size: '80%',
                innerSize: '50%',
                showInLegend: true // Hiển thị trong legend
            }
        ],
    };

    return (
        <>
            {dataRateOfInformalEmployment.length ? (
                <div className="h-[348px]">
                    <PieChart highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                </div>
            ) : (
                <div className="">
                    <div className="mt-16 mb-52 flex flex-col justify-center"><Loading /></div>
                </div>
            )}
        </>
    )
}

export default RateOfInformalEmployment


