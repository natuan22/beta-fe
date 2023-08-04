import React from 'react'
import Error404 from '../../../../Navigation/Error404';
import ChartBH from './ChartStatementsCashFlows/ChartBH';
import ChartCK from './ChartStatementsCashFlows/ChartCK';
import ChartCTCP from './ChartStatementsCashFlows/ChartCTCP';
import ChartNH from './ChartStatementsCashFlows/ChartNH';

const ChartStatementsCashFlows = ({ queryApiBusinessFinance }) => {
    const typeComponentMap = {
        'BH': ChartBH,
        'CTCP': ChartCTCP,
        'CK': ChartCK,
        'NH': ChartNH,
    };

    const ChartComponent = typeComponentMap[queryApiBusinessFinance.type] || Error404;

    return (
        <div>
            <ChartComponent queryApiBusinessFinance={queryApiBusinessFinance} />
        </div>
    );
}

export default ChartStatementsCashFlows