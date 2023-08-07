import React from 'react'
import Error404 from '../../../../Navigation/Error404';
import ChartBH from './ChartBalanceSheet/ChartBH';
import ChartCK from './ChartBalanceSheet/ChartCK';
import ChartCTCP from './ChartBalanceSheet/ChartCTCP';
import ChartNH from './ChartBalanceSheet/ChartNH';

const ChartBalanceSheet = ({ queryApiBusinessFinance }) => {
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

export default ChartBalanceSheet