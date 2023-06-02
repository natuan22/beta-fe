

import { memo } from "react";
import { https } from '../../../../../services/config';
import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useState } from 'react'
import { hashTb } from "./utils/hashTb";



const exchange = 'all'
const industryQuery = ['baoHiem', 'batDongSan', 'congNghe', 'dauKhi', 'banLe', 'taiChinh', 'tienIch', 'doGiaDung', 'duLich', 'hangHoa', 'hoaChat', 'nganHang', 'oto', 'truyenThong', 'thucPham', 'vienThong', 'xayDung', 'taiNguyen', 'yTe']
const industry = industryQuery.join(',')
const type = '4'
const order = '0'

const ChartAveragePE = (props) => {

    const { exchange, industryQuery, order, timeFrame } = props
    const [data, setData] = useState()
    const checkIndustry = industryQuery.split(',')
    const mappedKeys = checkIndustry.map((query) => Object.keys(hashTb).find((key) => hashTb[key] === query));
    const result = [];

    data?.forEach(item => {
        if (mappedKeys.includes(item.industry)) {
            const foundItem = result.find(x => x.name === item.industry);
            if (foundItem) {
                foundItem.data.push(item.perChange);
            } else {
                result.push({
                    name: item.industry,
                    color: item.color,
                    data: [item.perChange]
                });
            }
        }
    });
    console.log(result)
    useEffect(() => {
        const fetchDataAPI = async () => {
            try {
                const res = await https.get('api/v1/market/hieu-suat-thay-doi-thanh-khoan-nganh', {
                    params: {
                        exchange,
                        industry,
                        type,
                        order
                    }
                })
                setData(res.data.data)
            } catch (err) {
                console.log(err)
            }
        };

        fetchDataAPI();
    }, [])


    return (
        <>
            <div id="chart-container">
                <div className="h-[450px] mt-3">
                    <HighchartsReact highcharts={Highcharts} containerProps={{ style: { height: '100%', width: '100%' } }} />
                </div>
            </div>

        </>

    )
}

export default memo(ChartAveragePE)