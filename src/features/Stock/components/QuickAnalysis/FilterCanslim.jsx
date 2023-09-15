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
            <table class="table-auto">
                <thead>
                    <tr>
                        <th>Tiêu chí</th>
                        <th>Đánh giá</th>
                    </tr>
                </thead>
                <tbody>
                    {dataFilterCanslim?.map((item, index) => (
                        <tr key={index}>
                            <td className={`${item.name === 'Tổng hợp tiêu chí' ? 'font-bold' : ''} p-3`}>{item.name}</td>
                            <td className={` p-3 text-center`}>{(item.value)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default FilterCanslim