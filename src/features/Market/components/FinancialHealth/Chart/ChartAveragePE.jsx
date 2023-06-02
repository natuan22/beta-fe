

import { memo } from "react";
import { https } from '../../../../../services/config';


import Highcharts from "highcharts";
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import Loading from "../../../../Chart/utils/Loading";
import { fetchDataChartAveragePE } from '../../../thunk';


const exchange = 'all'
const industryQuery = ['baoHiem', 'batDongSan', 'congNghe', 'dauKhi', 'banLe', 'taiChinh', 'tienIch', 'doGiaDung', 'duLich', 'hangHoa', 'hoaChat', 'nganHang', 'oto', 'truyenThong', 'thucPham', 'vienThong', 'xayDung', 'taiNguyen', 'yTe']
const industry = industryQuery.join(',')
const type = '4'
const order = '0'
const hashTb = {
    'Bảo hiểm': 'baoHiem',
    'Bất động sản': 'batDongSan',
    'Công nghệ': 'congNghe',
    'Dầu khí': 'dauKhi',
    'Dịch vụ bán lẻ': 'banLe',
    'Dịch vụ tài chính': 'taiChinh',
    'Dịch vụ tiện ích': 'tienIch',
    'Đồ dùng cá nhân và đồ gia dụng': 'doGiaDung',
    'Du lịch & Giải trí': 'duLich',
    'Hàng hóa và dịch vụ công nghiệp': 'hangHoa',
    'Hóa chất': 'hoaChat',
    'Ngân hàng': 'nganHang',
    'Ôtô & linh kiện phụ tùng ': 'oto',
    'Phương tiện truyền thông': 'truyenThong',
    'Thực phẩm & Đồ uống': 'thucPham',
    'Viễn thông': 'vienThong',
    'Xây dựng & Vật liệu': 'xayDung',
    'Tài nguyên': 'taiNguyen',
    'Y tế': 'yTe',
}
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