import React from 'react'
import LayOut from '../../HOCs/Layout'
import InternationalIndex from '../Chart/components/InternationalIndex'
import News from '../Chart/components/News'
import InvestToolTab from './utils/InvestToolTab'
import { Outlet } from 'react-router-dom'

const InvestTool = () => {
    return (
        <div>
            <LayOut />
            <InternationalIndex />
            <News />

            <div className='nav_bar'>
                <InvestToolTab />
            </div>

            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default InvestTool