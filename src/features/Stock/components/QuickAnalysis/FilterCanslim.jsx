import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataFilterCanslim } from '../../thunk'

const FilterCanslim = ({ queryApi }) => {
    const { stock } = queryApi
    const dispatch = useDispatch()
    const { dataFilterCanslim } = useSelector(state => state.stock)
    useEffect(() => {
        dispatch(fetchDataFilterCanslim(stock))
    }, [stock])
    return (

        <div className='text-white'>
            <div>

            </div>

        </div>
    )
}

export default FilterCanslim