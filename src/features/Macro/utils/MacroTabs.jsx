import React from "react";
import { NavLink } from "react-router-dom";
import "../../../utils/style/buttonStyle.css";

const MacroTabs = () => {
  return (
    <div className="flex justify-around mb-3">
      <NavLink
        className={(params) => {
          if (params.isActive) {
            return "buttonStyle no-underline mx-1 text-white font-bold w-[30%] text-center relative";
          } else {
            return "buttonStyle no-underline mx-1 text-white font-bold w-[30%] opacity-70 text-center";
          }
        }}
        to="/vi-mo/vi-mo-trong-nuoc"
      >
        Vĩ mô trong nước
      </NavLink>
      <NavLink
        className={(params) => {
          if (params.isActive) {
            return "buttonStyle no-underline mx-1 text-white font-bold w-[30%] text-center relative";
          } else {
            return "buttonStyle no-underline mx-1 text-white font-bold w-[30%] opacity-70 text-center";
          }
        }}
        to="/vi-mo/vi-mo-quoc-te"
      >
        Vĩ mô quốc tế
      </NavLink>
    </div>
  );
};

export default MacroTabs;
