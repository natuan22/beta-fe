import React from 'react'
import { NavLink } from 'react-router-dom'
import './style/navLinkStyle.css'
const MacroTabs = () => {
    return (
        <div className="flex justify-around mb-3">
            <NavLink
                className={(params) => {
                    if (params.isActive) {
                        return "no-underline dark:text-white text-black xs:text-[0.9rem] md:text-[1rem] lg:text-[1rem] xl:text-[1.2rem] 2xl:text-[1.2rem] font-bold w-[30%] text-center tabUnderline relative";
                    } else {
                        return "no-underline dark:text-white text-black xs:text-[0.9rem] md:text-[1rem] lg:text-[1rem] xl:text-[1.2rem] 2xl:text-[1.2rem] font-bold w-[30%] text-center";
                    }
                }}
                to="/vi-mo/vi-mo-trong-nuoc" >
                Vĩ mô trong nước
            </NavLink>
            <NavLink
                className={(params) => {
                    if (params.isActive) {
                        return "no-underline dark:text-white text-black xs:text-[0.9rem] md:text-[1rem] lg:text-[1rem] xl:text-[1.2rem] 2xl:text-[1.2rem] font-bold w-[30%] text-center tabUnderline relative";
                    } else {
                        return "no-underline dark:text-white text-black xs:text-[0.9rem] md:text-[1rem] lg:text-[1rem] xl:text-[1.2rem] 2xl:text-[1.2rem] font-bold w-[30%] text-center";
                    }
                }}
                to="/vi-mo/vi-mo-quoc-te">
                Vĩ mô quốc tế
            </NavLink>
        </div>
    )
}

export default MacroTabs