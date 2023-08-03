import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { fetchDataChartStatementsCashFlows } from '../../../../thunk';
import BusinessActivities from './ChartNH/BusinessActivities';
import CashFlowPeriod from './ChartNH/CashFlowPeriod';
import EndCurrency from './ChartNH/EndCurrency';
import FirstCurrency from './ChartNH/FirstCurrency';
import InterestIncomeReceived from './ChartNH/InterestIncomeReceived';
import InvestmentActivities from './ChartNH/InvestmentActivities';

const ChartNH = ({ queryApiBusinessFinance }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchDataChartStatementsCashFlows(queryApiBusinessFinance.stock, queryApiBusinessFinance.order));
    }, [dispatch, queryApiBusinessFinance]);

    return (
        <div>
            <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-3'>
                <div>
                    <div className='dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5'>Thu nhập lãi và các khoản thu nhập nhận được</div>
                    <InterestIncomeReceived queryApiBusinessFinance={queryApiBusinessFinance} />
                </div>
                <div>
                    <div className='dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5'>Lưu chuyển tiền thuần từ hoạt động kinh doanh</div>
                    <BusinessActivities queryApiBusinessFinance={queryApiBusinessFinance} />
                </div>
                <div>
                    <div className='dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5'>Lưu chuyển tiền thuần từ hoạt động đầu tư</div>
                    <InvestmentActivities queryApiBusinessFinance={queryApiBusinessFinance} />
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

export default ChartNH