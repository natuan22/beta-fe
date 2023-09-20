import React from 'react'
import { useSelector } from 'react-redux'
import RenderTableStockFilter from '../../utils/RenderTableStockFilter';

const TableStockFilter = ({ arrSliderCheckbox }) => {
    const { dataStockFilter } = useSelector(state => state.investTool)
    const { count, data } = dataStockFilter

    return (
        <div>
            <RenderTableStockFilter arrSliderCheckbox={arrSliderCheckbox} data={data} />
        </div>
    )
}

export default TableStockFilter