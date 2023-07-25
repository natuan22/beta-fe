import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { hashTb } from './utils/hashTb';
import Loading from '../../../../Chart/utils/Loading';
import FilterIndusty from "../../../utils/components/FilterIndusty";

const EquityTurnover = () => {
    const { dataChartAssetTurnoverRatio } = useSelector(state => state.market)
    const [data, setData] = useState()
    const [category, setCategory] = useState()
    const [industryQuery, setIndustryQuery] = useState([])
    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);


    useEffect(() => {
        setColorText(color);
    }, [color])

    useEffect(() => {
        if (dataChartAssetTurnoverRatio?.length > 0) {
            const transformedData = dataChartAssetTurnoverRatio?.map(item => {
                const year = item.date.slice(0, 4);
                const transformedDate = `${year}`;
                return { ...item, date: transformedDate };
            });

            const uniqueIndustry = [...new Set(transformedData.filter(item => industryQuery.includes(item.industry)).map(item => item.industry))];
            const mappedData = [];

            transformedData?.forEach(item => {
                if (industryQuery.includes(item.industry)) {
                    const colorArr = ['#147DF5', '#E7C64F'];
                    const existingItem = mappedData.find(mappedItem => mappedItem.name === item.date);

                    if (existingItem) {
                        existingItem.data.push(+(item.CT).toFixed(2));
                    } else {
                        const uniqueColorIndex = mappedData.length % colorArr.length; // Lấy chỉ mục màu duy nhất
                        mappedData.push({
                            name: item.date,
                            data: [+(item.CT).toFixed(2)],
                            color: colorArr[uniqueColorIndex] // Lấy màu từ mảng colorArr bằng chỉ mục màu duy nhất
                        });
                    }
                }
            })
            setCategory(uniqueIndustry)
            setData(mappedData)
        }
    }, [dataChartAssetTurnoverRatio, industryQuery])
    // config chart
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
            align: 'center',
            itemStyle: {
                fontSize: '10px',
                color: localStorage.getItem('color')
            }
        },

        series: data,
    };
    const handleSelectedNamesChange = (selectedNames) => {
        setIndustryQuery(selectedNames)
    };
    return (
        <div>
            <div className='flex items-center justify-between border-solid border-[#436FB5] border-b-2 border-t-0 border-x-0'>
                <span className='dark:text-white text-black font-semibold xl:text-base lg:text-sm md:text-sm xs:text-base xxs:text-[13px]'>Vòng quay Vốn chủ sở hữu (Lần)</span>
                <FilterIndusty onSelectedNamesChange={handleSelectedNamesChange} />
            </div>
            {dataChartAssetTurnoverRatio?.length ? (
                <div className="h-[500px]">
                    <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                </div>
            ) : (
                <div className="h-[500px] flex items-center justify-center"><Loading /></div>
            )}
        </div>
    )
}

export default EquityTurnover