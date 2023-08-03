import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { fetchDataChartStatementsCashFlows } from '../../../../thunk';
import EndMoney from './ChartCK/EndMoney';
import NetCashFlow from './ChartCK/NetCashFlow';
import StartMoney from './ChartCK/StartMoney';

const ChartCK = ({ queryApiBusinessFinance }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchDataChartStatementsCashFlows(queryApiBusinessFinance.stock, queryApiBusinessFinance.order));
    }, [dispatch, queryApiBusinessFinance]);

    return (
        <div>
            <div>
                <div className='dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5'>Lưu chuyển tiền thuần</div>
                <NetCashFlow queryApiBusinessFinance={queryApiBusinessFinance} />
            </div>
            <div className='grid xl:grid-cols-2 lg:grid-cols-none gap-3'>
                <div>
                    <div className='dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5'>Tiền và các khoản tương đương tiền đầu kỳ</div>
                    <StartMoney queryApiBusinessFinance={queryApiBusinessFinance} />
                </div>
                <div>
                    <div className='dark:text-white text-black font-semibold uppercase mt-10 mb-5 mx-5'>Tiền và các khoản tương đương tiền cuối kỳ</div>
                    <EndMoney queryApiBusinessFinance={queryApiBusinessFinance} />
                </div>
            </div>
        </div>
    )
}

export default ChartCK