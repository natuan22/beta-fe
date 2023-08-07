import React from 'react'
import Error404 from '../../../../Navigation/Error404';
import ChartBHBalanceSheet from './ChartBalanceSheet/ChartBHBalanceSheet';
import ChartCKBalanceSheet from './ChartBalanceSheet/ChartCKBalanceSheet';
import ChartCTCPBalanceSheet from './ChartBalanceSheet/ChartCTCPBalanceSheet';
import ChartNHBalanceSheet from './ChartBalanceSheet/ChartNHBalanceSheet';

const ChartBalanceSheet = ({ queryApiBusinessFinance }) => {
    const typeComponentMap = {
        'BH': ChartBHBalanceSheet,
        'CTCP': ChartCTCPBalanceSheet,
        'CK': ChartCKBalanceSheet,
        'NH': ChartNHBalanceSheet,
    };

    const ChartComponent = typeComponentMap[queryApiBusinessFinance.type] || Error404;

    return (
        <div>
            <ChartComponent queryApiBusinessFinance={queryApiBusinessFinance} />
        </div>
    );
}

export default ChartBalanceSheet