import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataFinancialIndicators } from '../../thunk'

const FinancialIndicators = (codeUrl) => {
  console.log(codeUrl)
  const dispatch = useDispatch()
  const { dataFinancialIndicator } = useSelector(state => state.stock)

  useEffect(() => {
    dispatch(fetchDataFinancialIndicators(codeUrl))
  }, [codeUrl])
  return (
    <div>FinancialIndicators</div>
  )
}

export default FinancialIndicators