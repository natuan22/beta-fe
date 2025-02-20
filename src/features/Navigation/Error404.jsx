import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { apiUrl } from "../../services/config";
import LayOut from "../../HOCs/Layout";

const Error404 = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const color = useSelector((state) => state.color.colorTheme);

  useEffect(() => {
    setTheme(color);
  }, [color]);

  return (
    <>
      <LayOut>
        <div className="dark:bg-black bg-white">
          <div className="flex flex-col justify-center items-center">
            <div>
              <img
                className="object-contain 3xl:w-[1000px] 3xl:h-[616px] 2xl:w-[1000px] 2xl:h-[616px] xl:w-[800px] xl:h-[500px] lg:w-[666px] lg:h-[410px] md:w-[666px] md:h-[410px] sm:w-[560px] sm:h-[345px] xxs:w-[425px] xxs:h-[222px] xs:w-[425px] xs:h-[222px]"
                src={`${apiUrl}/resources/images/404-${localStorage.getItem(
                  "theme"
                )}.gif`}
                alt={`error-404-${localStorage.getItem("theme")}`}
              />
            </div>
            <div>
              <button
                type="button"
                className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                <NavLink to="/" className="no-underline text-white ">
                  Quay về trang chủ
                </NavLink>
              </button>
            </div>
          </div>
        </div>
      </LayOut>
    </>
  );
};

export default Error404;
