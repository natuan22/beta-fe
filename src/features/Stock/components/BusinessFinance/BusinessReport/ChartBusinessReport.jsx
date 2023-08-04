import React from 'react'
import Error404 from '../../../../Navigation/Error404';
import ChartBH from './ChartBusinessReport/ChartBH';
import ChartCK from './ChartBusinessReport/ChartCK';
import ChartCTCP from './ChartBusinessReport/ChartCTCP';
import ChartNH from './ChartBusinessReport/ChartNH';

const ChartBusinessReport = ({ queryApiBusinessFinance }) => {
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

export default ChartBusinessReport