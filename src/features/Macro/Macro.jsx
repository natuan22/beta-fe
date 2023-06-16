import React, { } from 'react'
import LayOut from '../../HOCs/Layout'
import MacroTabs from './utils/MacroTabs';
import { Outlet } from 'react-router-dom';

const Macro = () => {

    return (
        <LayOut>
            <MacroTabs />
            <Outlet />

        </LayOut>
    )
}

export default Macro