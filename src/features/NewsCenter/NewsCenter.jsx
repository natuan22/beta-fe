import React from 'react'
import { Outlet } from 'react-router-dom';
import LayOut from '../../HOCs/Layout'
import NewsCenterNavTab from './utils/component/NewsCenterNavTab'
import InternationalIndex from '../Chart/components/InternationalIndex';
import Error404 from '../Navigation/Error404';

const NewsCenter = () => {
    return (
        <LayOut>
            {/* <div>
                <InternationalIndex />
            </div>
            <div>
                <div>
                    <NewsCenterNavTab />
                </div>
                <div>
                    <Outlet />
                </div>
            </div> */}
            <Error404 />
        </LayOut>
    )
}

export default NewsCenter