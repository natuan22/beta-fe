import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import BusinessActivities from './ChartCTCP&BH/BusinessActivities';
import CashFlowPeriod from './ChartCTCP&BH/CashFlowPeriod';
import EndCurrency from './ChartCTCP&BH/EndCurrency';
import FirstCurrency from './ChartCTCP&BH/FirstCurrency';
import InvestmentActivities from './ChartCTCP&BH/InvestmentActivities';
import FinancialActivities from './ChartCTCP&BH/FinancialActivities';
import { fetchDataChartStatementsCashFlows } from '../../../../thunk';

const ChartCTCP = ({ queryApiBusinessFinance }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchDataChartStatementsCashFlows(queryApiBusinessFinance.stock, queryApiBusinessFinance.order));
  }, [dispatch, queryApiBusinessFinance]);

  return (
    <div>
      <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-3'>
        <div>
          <div className='dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5'>Lưu chuyển tiền thuần từ hoạt động kinh doanh</div>
          <BusinessActivities queryApiBusinessFinance={queryApiBusinessFinance} />
        </div>
        <div>
          <div className='dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5'>Lưu chuyển tiền thuần từ hoạt động đầu tư</div>
          <InvestmentActivities queryApiBusinessFinance={queryApiBusinessFinance} />
        </div>
        <div>
          <div className='dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5'>Lưu chuyển tiền thuần từ hoạt động tài chính</div>
          <FinancialActivities queryApiBusinessFinance={queryApiBusinessFinance} />
        </div>
        <div>
          <div className='dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5'>Lưu chuyển tiền thuần trong kỳ</div>
          <CashFlowPeriod queryApiBusinessFinance={queryApiBusinessFinance} />
        </div>
        <div>
          <div className='dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5'>Tiền và tương đương tiền đầu kỳ</div>
          <FirstCurrency queryApiBusinessFinance={queryApiBusinessFinance} />
        </div>
        <div>
          <div className='dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5'>Tiền và tương đương tiền cuối kỳ</div>
          <EndCurrency queryApiBusinessFinance={queryApiBusinessFinance} />
        </div>
      </div>
    </div>
  )
}

export default ChartCTCP