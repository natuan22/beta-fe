import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { fetchDataChartStatementsCashFlows } from '../../../thunk';
import NetCashFlow from './ChartCK/NetCashFlow'

const ChartCK = ({ queryApiBusinessFinance }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchDataChartStatementsCashFlows(queryApiBusinessFinance.stock, queryApiBusinessFinance.order));
    }, [dispatch, queryApiBusinessFinance]);

    return (
        <div>
            <div><NetCashFlow queryApiBusinessFinance={queryApiBusinessFinance} /></div>
            <div className='grid grid-cols-2 gap-3'>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default ChartCK