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
import { fetchDataBasicPrice, fetchDataBusinessPosition, fetchDataBussinessAnalysis, fetchDataFinancialHealthAnalysis, fetchDataIndividualInvestorBenefits, fetchDataTechnicalAnalysis, } from '../thunk'
import { useDispatch } from "react-redux";
import RatingHeader from '../components/QuickAnalysis/RatingHeader'
import FilterCanslim from '../components/QuickAnalysis/FilterCanslim'

const QuickAnalysis = ({ codeUrl }) => {
  const dispatch = useDispatch()
  const { queryApi } = useQueryApi(codeUrl);
  const [isLoading, setIsLoading] = useState(false)
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
            <div className='xl:flex lg:block py-2'>
              <div className='xl:w-[40%] lg:w-full'>
                <SpiderWebChart queryApi={queryApi} />
              </div>

              <div className='xl:w-[60%] lg:w-full'>
                <div className='grid md:grid-cols-2 sm:grid-cols-none gap-10'>
                  <div>
                    <RatingHeader queryApi={queryApi} />
                  </div>

                  <div>
                    <FilterCanslim queryApi={queryApi} />
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