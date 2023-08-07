import React from 'react'
import Error404 from '../../../../Navigation/Error404';
import ChartBHBusinessReport from './ChartBusinessReport/ChartBHBusinessReport';
import ChartCTCPBusinessReport from './ChartBusinessReport/ChartCTCPBusinessReport';
import ChartCKBusinessReport from './ChartBusinessReport/ChartCKBusinessReport';
import ChartNHBusinessReport from './ChartBusinessReport/ChartNHBusinessReport';

const ChartBusinessReport = ({ queryApiBusinessFinance }) => {
    const typeComponentMap = {
        'BH': ChartBHBusinessReport,
        'CTCP': ChartCTCPBusinessReport,
        'CK': ChartCKBusinessReport,
        'NH': ChartNHBusinessReport,
    };

    const ChartComponent = typeComponentMap[queryApiBusinessFinance.type] || Error404;

    return (
        <div>
            <ChartComponent queryApiBusinessFinance={queryApiBusinessFinance} />
        </div>
    );
}

export default ChartBusinessReport