import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Error404 from '../../../Navigation/Error404';
import { fetchDataChartStatementsCashFlows } from '../../thunk';
import ChartBH from './ChartStatementsCashFlows/ChartBH';
import ChartCK from './ChartStatementsCashFlows/ChartCK';
import ChartCTCP from './ChartStatementsCashFlows/ChartCTCP';
import ChartNH from './ChartStatementsCashFlows/ChartNH';

const ChartStatementsCashFlows = ({ queryApiBusinessFinance }) => {
    const dispatch = useDispatch()
    const { dataChartStatementsCashFlows } = useSelector(state => state.stock)
    
    useEffect(() => {
        dispatch(fetchDataChartStatementsCashFlows(queryApiBusinessFinance.stock, queryApiBusinessFinance.order));
    }, [dispatch, queryApiBusinessFinance]);

    const typeComponentMap = {
        'BH': ChartBH,
        'CTCP': ChartCTCP,
        'CK': ChartCK,
        'NH': ChartNH,
    };

    const ChartComponent = typeComponentMap[queryApiBusinessFinance.type] || Error404;

    return (
        <div>
            <ChartComponent />
        </div>
    );
}

export default ChartStatementsCashFlows