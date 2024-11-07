import React, { useState } from "react";
import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";
import { apiUrl } from "../../../services/config";

const Banner = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div style={{ height: "0px", position: "relative" }}>
      <div>
        <div className="text-center ">
          <button
            onClick={toggleSidebar}
            className={`fixed sm:top-[50%] xs:top-[65%] xxs:top-[65%] left-[-20px] text-white bg-[#0050AD] z-40 ${
              showSidebar ? "translate-x-[390%] ease-in-out duration-300" : ""
            } font-semibold rounded-lg text-base px-5 py-2.5 mr-2 bg-[#0050AD] text-white dark:text-white focus:outline-none focus:ring-blue-800`}
            type="button"
            data-drawer-target="drawer-navigation"
            data-drawer-show="drawer-navigation"
            aria-controls="drawer-navigation"
          >
            {showSidebar ? <BsArrowBarLeft /> : <BsArrowBarRight />}
          </button>
        </div>
        <div
          id="drawer-navigation"
          className={` dark:bg-[#151924] bg-gray-100 fixed top-0 left-0 z-40 w-auto h-screen p-4 overflow-y-auto transition-transform ${
            showSidebar ? "" : "translate-x-[-100%]  ease-in-out duration-300"
          }   flex flex-col items-center justify-center`}
          tabIndex={-1}
          aria-labelledby="drawer-navigation-label"
        >
          <div>
            <div className="relative translate-x-[-5px] translate-y-[-75px]">
              <img
                className="w-[100px] h-[45px] mt-[70px] mb-[40px]"
                src={`${apiUrl}/resources/icons/logo-beta-color.png`}
                alt="Beta logo"
              />
              {/* <div className="absolute bottom-[43%] right-0">
                <p className="text-[#c9a808] font-bold">ETA</p>
                <p className="text-[#2d567e] font-bold">Securities</p>
              </div> */}
            </div>
          </div>
          <div className="translate-y-[-75px]">
            <h5
              id="drawer-navigation-label"
              className="text-base font-semibold text-gray-500 uppercase"
            >
              Truy cập nhanh
            </h5>
            <div className="py-4 overflow-y-auto">
              <ul className="space-y-2">
                <li>
                  <a
                    href="bsi.com.vn"
                    className="no-underline flex items-center p-2 text-base font-normal text-gray-900 rounded-lg "
                  >
                    <img
                      src={`${apiUrl}/resources/icon-sidebar/icon-sidebar-1.png`}
                      alt="sidebarLogo1"
                      className="w-[25px] h-[25px]"
                    />
                    <span className="ml-3 dark:text-white text-black">
                      Danh mục cá nhân
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="bsi.com.vn"
                    className="no-underline flex items-center p-2 text-base font-normal text-gray-900 rounded-lg "
                  >
                    <img
                      src={`${apiUrl}/resources/icon-sidebar/icon-sidebar-2.png`}
                      alt="sidebarLogo1"
                      className="w-[25px] h-[25px]"
                    />
                    <span className="ml-3 dark:text-white text-black">
                      Dòng tiền thị trường
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="bsi.com.vn"
                    className="no-underline flex items-center p-2 text-base font-normal text-gray-900 rounded-lg "
                  >
                    <img
                      src={`${apiUrl}/resources/icon-sidebar/icon-sidebar-3.png`}
                      alt="sidebarLogo1"
                      className="w-[25px] h-[25px]"
                    />
                    <span className="ml-3 dark:text-white text-black">
                      Bộ lọc cổ phiếu
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="bsi.com.vn"
                    className="no-underline flex items-center p-2 text-base font-normal text-gray-900 rounded-lg "
                  >
                    <img
                      src={`${apiUrl}/resources/icon-sidebar/icon-sidebar-4.png`}
                      alt="sidebarLogo1"
                      className="w-[25px] h-[25px]"
                    />
                    <span className="ml-3 dark:text-white text-black">
                      Bảng giá cổ phiếu
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="bsi.com.vn"
                    className="no-underline flex items-center p-2 text-base font-normal text-gray-900 rounded-lg "
                  >
                    <img
                      src={`${apiUrl}/resources/icon-sidebar/icon-sidebar-5.png`}
                      alt="sidebarLogo1"
                      className="w-[25px] h-[25px]"
                    />
                    <span className="ml-3 dark:text-white text-black">
                      Chiến lược đầu tư
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="bsi.com.vn"
                    className="no-underline flex items-center p-2 text-base font-normal text-gray-900 rounded-lg "
                  >
                    <img
                      src={`${apiUrl}/resources/icon-sidebar/icon-sidebar-6.png`}
                      alt="sidebarLogo1"
                      className="w-[25px] h-[25px]"
                    />
                    <span className="ml-3 dark:text-white text-black">
                      Tài khoản giao dịch
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="bsi.com.vn"
                    className="no-underline flex items-center p-2 text-base font-normal text-gray-900 rounded-lg "
                  >
                    <img
                      src={`${apiUrl}/resources/icon-sidebar/icon-sidebar-7.png`}
                      alt="sidebarLogo1"
                      className="w-[25px] h-[25px]"
                    />
                    <span className="ml-3 dark:text-white text-black">
                      Danh mục cá nhân
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="bsi.com.vn"
                    className="no-underline flex items-center p-2 text-base font-normal text-gray-900 rounded-lg "
                  >
                    <img
                      src={`${apiUrl}/resources/icon-sidebar/icon-sidebar-8.png`}
                      alt="sidebarLogo1"
                      className="w-[25px] h-[25px]"
                    />
                    <span className="ml-3 dark:text-white text-black">
                      Tư vấn trực tiếp
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="bsi.com.vn"
                    className="no-underline flex items-center p-2 text-base font-normal text-gray-900 rounded-lg "
                  >
                    <img
                      src={`${apiUrl}/resources/icon-sidebar/icon-sidebar-9.png`}
                      alt="sidebarLogo1"
                      className="w-[25px] h-[25px]"
                    />
                    <span className="ml-3 dark:text-white text-black">
                      Liên hệ
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
