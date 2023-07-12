import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataRateOfInformalEmployment } from '../../thunk';
import Highcharts from "highcharts/highstock";
import drilldow from "highcharts/modules/drilldown";
import PieChart from "highcharts-react-official";
import Loading from '../../../Chart/utils/Loading';
drilldow(Highcharts);

const RateOfInformalEmployment = () => {
    const dispatch = useDispatch();
    const { dataRateOfInformalEmployment } = useSelector(state => state.marco)
    const [data, setData] = useState()

    useEffect(() => {
        dispatch(fetchDataRateOfInformalEmployment)
    }, [dispatch]);

    useEffect(() => {
        if (dataRateOfInformalEmployment?.length > 0) {
            const danhSachMoi = dataRateOfInformalEmployment.map(item => ({
                name: item.name,
                y: item.value,
                color: '#2CC8DD'
            }));
            const newItem = {
                name: 'Khác',
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
        series: [
            {
                name: "Tỷ lệ",
                data: data,
                size: '80%',
                innerSize: '50%',
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


