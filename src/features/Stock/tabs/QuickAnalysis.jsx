import React, { useEffect, useState } from 'react'
import Loading from '../../Chart/utils/Loading'
import useQueryApi from '../components/Overview/utils/custom/useQueryApi/useQueryApi'
import BasicPrice from '../components/QuickAnalysis/BasicPrice'
import BusinessPosition from '../components/QuickAnalysis/BusinessPosition'
import BussinessAnalysis from '../components/QuickAnalysis/BussinessAnalysis'
import FinancialHealthAnalysis from '../components/QuickAnalysis/FinancialHealthAnalysis'
import IndividualInvestorBenefits from '../components/QuickAnalysis/IndividualInvestorBenefits'
import SpiderWebChart from '../components/QuickAnalysis/SpiderWebChart'
import TechnicalAnalysis from '../components/QuickAnalysis/TechnicalAnalysis'
import { fetchDataBasicPrice, fetchDataBusinessPosition, fetchDataBussinessAnalysis, fetchDataFinancialHealthAnalysis, fetchDataIndividualInvestorBenefits, fetchDataTechnicalAnalysis, gatherTotalStars } from '../thunk'
import { useDispatch } from "react-redux";

const QuickAnalysis = ({ codeUrl }) => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const { queryApi } = useQueryApi(codeUrl);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true)
    }, 700)
  }, [])

  useEffect(() => {
    dispatch(fetchDataFinancialHealthAnalysis(queryApi.stock));
    dispatch(fetchDataBussinessAnalysis(queryApi.stock));
    dispatch(fetchDataBusinessPosition(queryApi.stock));
    dispatch(fetchDataBasicPrice(queryApi.stock));
    dispatch(fetchDataTechnicalAnalysis(queryApi.stock));
    dispatch(fetchDataIndividualInvestorBenefits(queryApi.stock));
  }, [dispatch, queryApi.stock]);


  return (
    <div className='container mx-auto'>
      {isLoading ? (
        <>
          <div>
            <div className='flex'>
              <div className='w-[40%]'>
                <SpiderWebChart queryApi={queryApi} />
              </div>

              <div className='w-[60%] h-[200px]'>
                <div className='grid grid-cols-2 gap-3'>
                  <div>

                  </div>

                  <div>

                  </div>
                </div>
              </div>
            </div>

            <div className='grid xl:grid-cols-3 lg:grid-cols-none gap-5'>
              <div><FinancialHealthAnalysis queryApi={queryApi} /></div>
              <div><BussinessAnalysis queryApi={queryApi} /></div>
              <div><BusinessPosition queryApi={queryApi} /></div>
              <div><BasicPrice queryApi={queryApi} /></div>
              <div><TechnicalAnalysis queryApi={queryApi} /></div>
              <div><IndividualInvestorBenefits queryApi={queryApi} /></div>
            </div>
          </div>
        </>
      ) : (
        <div className='h-[300px] flex items-center justify-center'><Loading /></div>
      )}
    </div>
  )
}

export default QuickAnalysis