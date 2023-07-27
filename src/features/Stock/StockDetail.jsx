
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

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