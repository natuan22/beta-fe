import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Input } from "antd";
import { BellOutlined, MessageOutlined } from "@ant-design/icons";
import { Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import Switcher from "../services/switcher";
const { Search } = Input;

const Header = () => {
  const isLogin = useSelector((state) => state.authen.userData);
  const [isOpen, setIsOpen] = useState(false);
  const [bgPosition, setBgPosition] = useState({
    left: 0,
    width: 0
  })
  function handleNavLinkClick(e) {
    const rect = e.target.getBoundingClientRect();
    setBgPosition({
      left: rect.left + window.pageXOffset,
      width: rect.width,
    });
    console.log(bgPosition)
  }
  return (
    <>
      <div className=" relative">
        <nav className="dark:bg-black bg-white shadow-md mb-1">
          <div className="max-w-[85rem] mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <a href="http://www.bsi.com.vn">
                    <img
                      className="w-[87px] h-[33px]"
                      src="https://trading.bsi.com.vn/static/media/075_login_logo.4ad0d1515acb4e3474cf.png"
                      alt="Beta logo"
                    />
                  </a>
                </div>
                {/* phone */}
                <div className="xl:hidden w-max">
                  <div className="ml-4 flex items-baseline space-x-0">
                    <NavLink
                      onClick={() => { if (isOpen) setIsOpen(!isOpen) }}
                      to="/"
                      className={({ isActive }) =>
                        isActive
                          ? "no-underline text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium "
                          : "no-underline dark:text-gray-300 text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                      }
                    >
                      Trang chủ
                    </NavLink>
                    <div className="xl:flex items-center flex xxs:translate-x-1 xs:translate-y-0 xs:translate-x-2 md:translate-y-[11%] md:translate-x-[55%] lg:translate-y-[11%] lg:translate-x-[124%]">
                      <div className="flex md:flex xs:hidden xxs:hidden">
                        <Switcher />
                        <BellOutlined
                          className="ml-2 mt-1 text-[20px] dark:text-white text-black"
                        />
                        <MessageOutlined
                          className="ml-2 mr-2 mt-1 text-[20px] dark:text-white text-black"
                        />
                      </div>

                      <Search
                        placeholder="Tìm mã chứng khoán"
                        className="xxs:hidden xs:block xs:w-[100px] sm:w-[150px] md:w-[200px] lg:w-[200px]"
                      />
                    </div>
                  </div>
                </div>
                {/* desktop */}
                <div className="hidden xl:block w-max">
                  <div className="ml-4 flex items-baseline space-x-3">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive
                          ? "no-underline text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium "
                          : "no-underline dark:text-gray-300 text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                      }
                    >
                      Trang chủ
                    </NavLink>

                    <NavLink
                      to="/thi-truong"

                      className={({ isActive }) =>
                        isActive
                          ? "no-underline text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium "
                          : "no-underline dark:text-gray-300 text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                      }
                    >
                      Thị trường
                    </NavLink>

                    <NavLink
                      to="/nganh"

                      className={({ isActive }) =>
                        isActive
                          ? "no-underline text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium "
                          : "no-underline dark:text-gray-300 text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                      }

                    >
                      Ngành
                    </NavLink>

                    <NavLink
                      to="/co-phieu"

                      className={({ isActive }) =>
                        isActive
                          ? "no-underline text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                          : "no-underline dark:text-gray-300 text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                      }
                    >
                      Cổ phiếu
                    </NavLink>

                    <NavLink
                      to="/vi-mo"

                      className={({ isActive }) =>
                        isActive
                          ? "no-underline text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                          : "no-underline dark:text-gray-300 text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                      }
                    >
                      Vĩ mô
                    </NavLink>

                    <NavLink
                      to="/cong-cu-dau-tu"

                      className={({ isActive }) =>
                        isActive
                          ? "no-underline text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                          : "no-underline dark:text-gray-300 text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                      }
                    >
                      Công cụ đầu tư
                    </NavLink>

                    <NavLink
                      to="/trung-tam-tin-tuc"

                      className={({ isActive }) =>
                        isActive
                          ? "no-underline text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                          : "no-underline dark:text-gray-300 text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                      }
                    >
                      Trung tâm tin tức
                    </NavLink>
                  </div>
                  {/* login */}
                </div>
                <div className="hidden xl:flex items-center ml-3 lg:ml-72 xl:ml-16">
                  <div className="flex">
                    <Switcher />
                    <BellOutlined
                      className="ml-2 mt-1 text-[20px] dark:text-white text-black"
                    />
                    <MessageOutlined
                      className="ml-2 mr-2 mt-1 text-[20px] dark:text-white text-black"
                    />
                  </div>

                  <Search
                    placeholder="Tìm mã chứng khoán"
                    className=""
                    style={{
                      width: 200,
                    }}
                  />
                </div>
                <div className="hidden xl:block">
                  {isLogin?.data ? (
                    <div className="relative">
                      <span className="text-white ml-2 text-sm flex items-center font-medium">
                        <FaUserCircle className="text-white mr-2 text-xl" />
                        {isLogin?.data?.name}
                      </span>
                      <div className="absolute w-2 h-2 rounded-full bg-green-400 bottom-0 left-[18%]"></div>
                    </div>
                  ) : (
                    <div>
                      <NavLink
                        to="/signin"
                        className={({ isActive }) =>
                          isActive
                            ? "ml-2 no-underline text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                            : "ml-2 no-underline dark:text-gray-300 text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                        }
                      >
                        Sign in
                      </NavLink>
                      <NavLink
                        to="/signup"
                        className={({ isActive }) =>
                          isActive
                            ? "ml-2 no-underline text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                            : "ml-2 no-underline dark:text-gray-300 text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                        }
                      >
                        Sign up
                      </NavLink>
                    </div>
                  )}
                </div>
              </div>
              <div className="-mr-2 flex xl:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {!isOpen ? (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <Transition
            show={isOpen}
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {(ref) => (
              <div className="xl:hidden" id="mobile-menu">
                <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-2">
                  <NavLink
                    onClick={() => { if (isOpen) setIsOpen(!isOpen) }}
                    to="/thi-truong"
                    className={({ isActive }) =>
                      isActive
                        ? "no-underline block text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                        : "no-underline block dark:text-gray-300 text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                    }
                  >
                    Thị trường
                  </NavLink>

                  <NavLink
                    onClick={() => { if (isOpen) setIsOpen(!isOpen) }}
                    to="/nganh"
                    className={({ isActive }) =>
                      isActive
                        ? "no-underline block text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                        : "no-underline block dark:text-gray-300 text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                    }
                  >
                    Ngành
                  </NavLink>

                  <NavLink
                    onClick={() => { if (isOpen) setIsOpen(!isOpen) }}
                    to="/co-phieu"
                    className={({ isActive }) =>
                      isActive
                        ? "no-underline block text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                        : "no-underline block dark:text-gray-300 text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                    }
                  >
                    Cổ phiếu
                  </NavLink>

                  <NavLink
                    onClick={() => { if (isOpen) setIsOpen(!isOpen) }}
                    to="/vi-mo"
                    className={({ isActive }) =>
                      isActive
                        ? "no-underline block text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                        : "no-underline block dark:text-gray-300 text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                    }
                  >
                    Vĩ mô
                  </NavLink>

                  <NavLink
                    onClick={() => { if (isOpen) setIsOpen(!isOpen) }}
                    to="/cong-cu-dau-tu"
                    className={({ isActive }) =>
                      isActive
                        ? "no-underline block text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                        : "no-underline block dark:text-gray-300 text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                    }
                  >
                    Công cụ đầu tư
                  </NavLink>

                  <NavLink
                    onClick={() => { if (isOpen) setIsOpen(!isOpen) }}
                    to="/trung-tam-tin-tuc"
                    className={({ isActive }) =>
                      isActive
                        ? "no-underline block text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                        : "no-underline dark:text-gray-300 text-black block hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                    }
                  >
                    Trung tâm tin tức
                  </NavLink>
                  <NavLink
                    onClick={() => { if (isOpen) setIsOpen(!isOpen) }}
                    to="/signin"
                    className={({ isActive }) =>
                      isActive
                        ? "no-underline block text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                        : "no-underline block dark:text-gray-300 text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                    }
                  >
                    Sign in
                  </NavLink>
                  <NavLink
                    onClick={() => { if (isOpen) setIsOpen(!isOpen) }}
                    to="/signup"
                    className={({ isActive }) =>
                      isActive
                        ? "no-underline block text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                        : "no-underline block dark:text-gray-300 text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                    }
                  >
                    Sign up
                  </NavLink>
                  <div className="flex md:hidden xs:flex">
                    <Switcher />
                    <BellOutlined
                      className="ml-2 mt-1 text-[20px] dark:text-white text-black"
                    />
                    <MessageOutlined
                      className="ml-2 mr-2 mt-1 text-[20px] dark:text-white text-black"
                    />
                  </div>
                  <Search
                    placeholder="Tìm mã chứng khoán"
                    className="xxs:block xs:hidden"
                  />
                </div>
              </div>
            )}
          </Transition>
        </nav>
      </div>
    </>
  );
};

export default Header;
