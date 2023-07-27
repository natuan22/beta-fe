import React from 'react'
import LayOut from '../../HOCs/Layout'
import StockInfo from './components/StockInfo'

const StockDetail = () => {

    return (
        <LayOut>
            <div className="container mx-auto">
                <StockInfo />
            </div>
        </LayOut>
    )
}

export default StockDetail