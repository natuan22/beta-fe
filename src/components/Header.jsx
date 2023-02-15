import React from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
const Header = () => {
  return (
    <header className="bg-slate-700  py-5 px-6 ">
      <div className="container mx-auto flex justify-between">
        <NavLink to="/" className="text-white text-4xl ">
          Cyber Moive
        </NavLink>
        <nav>
          <NavLink
            to="/signin"
            className={(params) => {
              if (params.isActive) {
                return "text-yellow-300 mr-5 text-xl font-semibold";
              }
              return "text-white mr-5 text-xl font-semibold";
            }}
          >
            Sign in
          </NavLink>
          <NavLink
            to="/signup"
            className={(params) => {
                const classes = '  text-xl font-semibold'
              if (params.isActive) {
                return clsx('text-yellow-300', classes);
              }
              return clsx('text-white', classes);

            }}
          >
            Sign up
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
