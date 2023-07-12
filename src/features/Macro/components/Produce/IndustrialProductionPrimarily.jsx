import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../Chart/utils/Loading';
import HighchartsReact from 'highcharts-react-official'
import Highcharts from "highcharts";
import { optionsSelect3 } from './utils/optionsSelect';
import { fetchDataIndustrialProductionPrimarily } from '../../thunk';

const IndustrialProductionPrimarily = () => {
    const dispatch = useDispatch();
    const { dataIndustrialProductionPrimarily } = useSelector(state => state.marco)
    const [timeLine, setTimeLine] = useState()
    const [data, setData] = useState()

    useEffect(() => {
        dispatch(fetchDataIndustrialProductionPrimarily('acQuyDienCacLoai'))
    }, [dispatch]);

    useEffect(() => {
        if (dataIndustrialProductionPrimarily?.length > 0) {
            const uniqueDates = [...new Set(dataIndustrialProductionPrimarily?.map(item => moment(item.date, 'YYYY/MM/DD').year()))];
            setTimeLine(uniqueDates)

            const result = [];

            dataIndustrialProductionPrimarily?.forEach(item => {
                const colorArr = ['#38B6FF'];
                const name = item.name;
                const value = item.value;

                const existingObj = result.find(obj => obj.name === name);

                if (existingObj) {
                    existingObj.data.push(value);
                } else {
                    const uniqueColorIndex = result.length % colorArr.length; // Lấy chỉ mục màu duy nhất
                    result.push({
                        name: name,
                        data: [value],
                        color: colorArr[uniqueColorIndex] // Lấy màu từ mảng colorArr bằng chỉ mục màu duy nhất
                    });
                }
            })
            setData(result)
        }
    }, [dataIndustrialProductionPrimarily])

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
            <div className='border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold xs:text-base xxs:text-[14px]'>Sản lượng công nghiệp các sản phẩm chủ yếu</span>
                <select className={`bg-[#1B496D] p-1 text-[1rem] text-white border-0 xl:ml-[780px] lg:ml-[260px] md:ml-[35px] sm:ml-[54px] xs:ml-[30px] xxs:ml-[2px]`}
                    onChange={(event) => {
                        dispatch(fetchDataIndustrialProductionPrimarily(event.target.value))
                    }}>
                    {optionsSelect3.map((item, index) => {
                        return (
                            <option key={index} value={`${item.value}`}>{`${item.label}`}</option>
                        )
                    })}
                </select>
            </div>
            {dataIndustrialProductionPrimarily?.length > 0 ? (
                <div className='h-[350px] mt-2'>
                    <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                </div>
            ) : (
                <div className="mt-16 mb-52"><Loading /></div>
            )}
        </>
    )
}

export default IndustrialProductionPrimarily