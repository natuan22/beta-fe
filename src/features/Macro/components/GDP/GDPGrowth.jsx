import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataGDPGrowth } from '../../thunk';
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';
import Loading from '../../../Chart/utils/Loading';

const GDPGrowth = () => {
    const dispatch = useDispatch();
    const { dataGDPGrowth } = useSelector(state => state.macro)
    const [data, setData] = useState()
    const [category, setCategory] = useState()
    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    useEffect(() => {
        setColorText(color);
    }, [color])

    useEffect(() => {
        dispatch(fetchDataGDPGrowth(0))
    }, [dispatch]);

    useEffect(() => {
        if (dataGDPGrowth?.length > 0) {
            const transformedData = dataGDPGrowth?.map(item => {
                return { ...item, date: moment(item.date).format('DD/MM/YYYY') };
            });

            const uniqueIndustry = [...new Set(transformedData.map(item => item.name))];
            const mappedData = [];

            transformedData?.forEach(item => {
                const colorArr = ['#00B4D8', '#0077B6'];
                const existingItem = mappedData.find(mappedItem => mappedItem.name === item.date);

                if (existingItem) {
                    existingItem.data.push(+(item.value).toFixed(2));
                } else {
                    const uniqueColorIndex = mappedData.length % colorArr.length; // Lấy chỉ mục màu duy nhất
                    mappedData.push({
                        name: item.date,
                        data: [+(item.value).toFixed(2)],
                        color: colorArr[uniqueColorIndex] // Lấy màu từ mảng colorArr bằng chỉ mục màu duy nhất
                    });
                }
            })
            setCategory(uniqueIndustry)
            setData(mappedData)
        }
    }, [dataGDPGrowth]);

    const options = {
        chart: {
            backgroundColor: "transparent", // màu nền của biểu đồ
            type: 'bar'
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
            categories: category,
            labels: {
                style: {
                    color: localStorage.getItem('color') // màu cho các nhãn trục x
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
            itemStyle: {
                fontSize: '10px',
                color: localStorage.getItem('color')
            }
        },

        series: data,
    };

    return (
        <div>
            <div className='sm:flex xs:block items-center justify-between border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold md:text-base sm:text-xs xs:text-[15px] xxs:text-[13px]'>Tăng trưởng GDP theo từng ngành nghề (Tỷ đồng)</span>
                <div className="flex items-center justify-center">
                    <select className={`bg-[#1B496D] p-1 text-[1rem] text-white border-0`}
                        onChange={(event) => {
                            dispatch(fetchDataGDPGrowth(event.target.value));
                        }}>
                        <option value='0'>Kỳ gần nhất</option>
                        <option value='1'>Cùng kỳ</option>
                    </select>
                </div>
            </div>
            {dataGDPGrowth.length ? (
                <div className="h-[883px]">
                    <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                </div>
            ) : (
                <div className="h-[883px] flex items-center justify-center"><Loading /></div>
            )}
        </div>
    )
}

export default GDPGrowth