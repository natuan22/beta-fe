import React from 'react'
import { NavLink } from 'react-router-dom'

const MacroTabs = () => {
    return (
        <div>
            <NavLink to="/vi-mo/vi-mo-trong-nuoc" >
                Vĩ mô trong nước
            </NavLink>
            <NavLink to="/vi-mo/vi-mo-quoc-te">
                Vĩ mô quốc tế
            </NavLink>
        </div>
    )
}

export default MacroTabs