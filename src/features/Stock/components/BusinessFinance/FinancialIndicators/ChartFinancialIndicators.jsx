import React from 'react'
import Error404 from '../../../../Navigation/Error404';
import ChartBHFinancialIndicators from './ChartFinancialIndicators/ChartBHFinancialIndicators';
import ChartCKFinancialIndicators from './ChartFinancialIndicators/ChartCKFinancialIndicators';
import ChartCTCPFinancialIndicators from './ChartFinancialIndicators/ChartCTCPFinancialIndicators';
import ChartNHFinancialIndicators from './ChartFinancialIndicators/ChartNHFinancialIndicators';

const ChartFinancialIndicators = ({ queryApiBusinessFinance }) => {
  const typeComponentMap = {
    'BH': ChartBHFinancialIndicators,
    'CTCP': ChartCTCPFinancialIndicators,
    'CK': ChartCKFinancialIndicators,
    'NH': ChartNHFinancialIndicators,
  };

  const ChartComponent = typeComponentMap[queryApiBusinessFinance.type] || Error404;

  return (
    <div>
      <ChartComponent queryApiBusinessFinance={queryApiBusinessFinance} />
    </div>
  );
}

export default ChartFinancialIndicators