import React, { useEffect, useState } from 'react'
import variablePie from "highcharts/modules/variable-pie.js";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import Loading from '../../../Chart/utils/Loading';
import { fetchDataLaborRateBySector } from '../../thunk';
import { useDispatch, useSelector } from 'react-redux';

variablePie(Highcharts);

const LaborRateBySector = () => {
    const dispatch = useDispatch();
    const { dataLaborRateBySector } = useSelector(state => state.marco)
    const [data, setData] = useState()
    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    useEffect(() => {
        setColorText(color);
    }, [color])

    useEffect(() => {
        dispatch(fetchDataLaborRateBySector)
    }, [dispatch]);

    useEffect(() => {
        if (dataLaborRateBySector?.length > 0) {
            const danhSachMoi = [
                {
                    name: 'Tỷ lệ lao động',
                    data: dataLaborRateBySector.map((item) => ({
                        name: item.name,
                        y: item.value,
                    })),
                    colors: dataLaborRateBySector.map(item => item.color)
                },
            ];
            setData(danhSachMoi)
        }
    }, [dataLaborRateBySector])

    const options = {
        accessibility: {
            enabled: false,
            point: {
                valueSuffix: '%'
            }
        },
        credits: false,
        chart: {
            type: 'pie',
            backgroundColor: "transparent",
        },
        title: {
            text: null
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f}%',
                    distance: '1',
                    style: {
                        fontSize: '9px' // Kích thước font chữ nhỏ hơn
                    }
                }
            }
        },
        series: data
    }

    return (
        <>
            {dataLaborRateBySector.length ? (
                <div className="h-[348px]">
                    <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                </div>
            ) : (
                <div className="">
                    <div className="mt-16 mb-52 flex flex-col justify-center"><Loading /></div>
                </div>
            )}
        </>
    )
}

export default LaborRateBySector