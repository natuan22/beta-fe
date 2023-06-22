import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';
import Loading from '../../../Chart/utils/Loading';
import { fetchDataChangeCPISectors } from '../../thunk';

const ChangeCPISectors = () => {
    const dispatch = useDispatch();
    const { dataChangeCPISectors } = useSelector(state => state.marco)
    const [data, setData] = useState()
    const [category, setCategory] = useState()
    const [colorText, setColorText] = useState(localStorage.getItem('color'));
    const color = useSelector((state) => state.color.colorText);

    useEffect(() => {
        setColorText(color);
    }, [color])

    useEffect(() => {
        if (dataChangeCPISectors?.length > 0) {
            const transformedData = dataChangeCPISectors?.map(item => {
                const modifiedName = item.name.replace('Tăng trưởng CPI :', '').replace('MoM (%)', '');
                const quarter = moment(item.date, 'YYYY/MM/DD').quarter(); // Lấy quý từ ngày
                const year = moment(item.date, 'YYYY/MM/DD').year(); // Lấy năm từ ngày

                return { ...item, name: modifiedName, date: `Quý ${quarter}/${year}` };
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
    }, [dataChangeCPISectors]);

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
            enabled: true,
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
                <span className='dark:text-white text-black font-semibold'>Thay đổi CPI các lĩnh vực của nền kinh tế </span>
                <select className={`bg-[#1B496D] p-1 text-[1rem] text-white border-0 xl:ml-[430px] lg:ml-[490px] md:ml-[260px] sm:ml-[150px] xs:ml-[120px] xxs:ml-[100px]`}
                    onChange={(event) => {
                        dispatch(fetchDataChangeCPISectors(event.target.value))
                    }}>
                    <option value='0'>Kỳ gần nhất</option>
                    <option value='1'>Cùng kỳ</option>
                </select>
            </div>
            {dataChangeCPISectors?.length > 0 ? (
                <div className=' mt-2'>
                    <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { height: '100%', width: '100%' } }} />
                </div>
            ) : (
                <div className="mt-16 mb-52"><Loading /></div>
            )}
        </>
    )
}

export default ChangeCPISectors