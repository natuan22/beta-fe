import React, { useEffect } from 'react';
import { Chart } from 'react-google-charts';
import { useSelector } from 'react-redux';
import _ from 'lodash'

const TreemapChart = () => {
    const dataKhoaNgoaiMuaRong = useSelector(state => state.chart.dataKhoaNgoaiMuaRong);
    console.log(dataKhoaNgoaiMuaRong.recordset)

    return (
        <Chart
            chartType="TreeMap"
            data={dataKhoaNgoaiMuaRong}
            options={{
                highlightOnMouseOver: true,
                maxDepth: 1,
                maxPostDepth: 2,
                minHighlightColor: '#8c6bb1',
                midHighlightColor: '#9ebcda',
                maxHighlightColor: '#edf8fb',
                headerHeight: 15,
                showScale: true,
                height: 500,
                useWeightedAverageForAggregation: true
            }}
            graph_id="treemap-chart"
            width={'100%'}
            height={'500px'}
        />
    );
}

export default TreemapChart;