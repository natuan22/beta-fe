import React from 'react'
import { Outlet } from 'react-router-dom';
import LayOut from '../../HOCs/Layout'
import NewsCenterNavTab from './utils/component/NewsCenterNavTab'
import InternationalIndex from '../Chart/components/InternationalIndex';

const NewsCenter = () => {
    return (
        <LayOut>
            <div>
                <InternationalIndex />
            </div>
            <div>
                <div>
                    <NewsCenterNavTab />
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </LayOut>
    )
}

export default NewsCenter