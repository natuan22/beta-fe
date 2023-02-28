import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Input } from "antd";
import { BellOutlined, MessageOutlined } from "@ant-design/icons";
import { Transition } from "@headlessui/react";

const { Search } = Input;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="z-50 relative">
        <nav className="bg-gray-800 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="w-20"
                    src="https://trading.bsi.com.vn/static/media/075_login_logo.4ad0d1515acb4e3474cf.png"
                    alt="Workflow"

                  />
                </div>
                <div className="xl:hidden w-max">
                  <div className="ml-4 flex items-baseline space-x-0">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive
                          ? "no-underline text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                          : "no-underline text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                      }
                    >
                      Trang chủ
                    </NavLink>
                    <div className="xl:flex items-center flex xs:translate-y-[11%] xs:translate-x-[-8%] xxs:translate-y-[11%] xxs:translate-x-[10%] sm:translate-y-[11%] sm:translate-x-[40%] md:translate-y-[11%] md:translate-x-[90%] lg:translate-y-[11%] lg:translate-x-[180%]">
                      <div className="flex">
                        <BellOutlined
                          className="ml-2"
                          style={{ fontSize: "20px", color: "#fff" }}
                        />
                        <MessageOutlined
                          className="ml-2 mr-2"
                          style={{ fontSize: "20px", color: "#fff" }}
                        />
                      </div>
                      <Search
                        placeholder="Tìm mã chứng khoán"
                        className="xs:w-[100px] xxs:w-[100px] sm:w-[200px] md:w-[200px] lg:w-[200px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="hidden xl:block w-max">
                  <div className="ml-4 flex items-baseline space-x-3">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive
                          ? "no-underline text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                          : "no-underline text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                      }
                    >
                      Trang chủ
                    </NavLink>

                    <NavLink
                      to="/thi-truong"
                      className={({ isActive }) =>
                        isActive
                          ? "no-underline text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                          : "no-underline text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                      }
                    >
                      Thị trường
                    </NavLink>

                    <NavLink
                      to="/nganh"
                      className={({ isActive }) =>
                        isActive
                          ? "no-underline text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                          : "no-underline text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                      }
                    >
                      Ngành
                    </NavLink>

                    <NavLink
                      to="/vi-mo"
                      className={({ isActive }) =>
                        isActive
                          ? "no-underline text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                          : "no-underline text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                      }
                    >
                      Vĩ mô
                    </NavLink>

                    <NavLink
                      to="/cong-cu-dau-tu"
                      className={({ isActive }) =>
                        isActive
                          ? "no-underline text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                          : "no-underline text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                      }
                    >
                      Công cụ đầu tư
                    </NavLink>

                    <NavLink
                      to="/trung-tam-tin-tuc"
                      className={({ isActive }) =>
                        isActive
                          ? "no-underline text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                          : "no-underline text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                      }
                    >
                      Trung tâm tin tức
                    </NavLink>
                  </div>
                </div>
                <div className="hidden xl:flex items-center flex ml-3 lg:ml-72 xl:ml-28 ">
                  <div className="flex">
                    <BellOutlined
                      className="ml-2"
                      style={{ fontSize: "20px", color: "#fff" }}
                    />
                    <MessageOutlined
                      className="ml-2 mr-2"
                      style={{ fontSize: "20px", color: "#fff" }}
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
                  <NavLink
                    to="/signin"
                    className={({ isActive }) =>
                      isActive
                        ? "ml-1 no-underline text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                        : "ml-1 no-underline text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                    }
                  >
                    Sign in
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                      isActive
                        ? "no-underline text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                        : "no-underline text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                    }
                  >
                    Sign up
                  </NavLink>
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
                <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  <NavLink
                    to="/thi-truong"
                    className={({ isActive }) =>
                      isActive
                        ? "no-underline block text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                        : "no-underline block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                    }
                  >
                    Thị trường
                  </NavLink>

                  <NavLink
                    to="/nganh"
                    className={({ isActive }) =>
                      isActive
                        ? "no-underline block text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                        : "no-underline block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                    }
                  >
                    Ngành
                  </NavLink>

                  <NavLink
                    to="/vi-mo"
                    className={({ isActive }) =>
                      isActive
                        ? "no-underline block text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                        : "no-underline block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                    }
                  >
                    Vĩ mô
                  </NavLink>

                  <NavLink
                    to="/cong-cu-dau-tu"
                    className={({ isActive }) =>
                      isActive
                        ? "no-underline block text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                        : "no-underline block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                    }
                  >
                    Công cụ đầu tư
                  </NavLink>

                  <NavLink
                    to="/trung-tam-tin-tuc"
                    className={({ isActive }) =>
                      isActive
                        ? "no-underline block text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                        : "no-underline text-gray-300 block hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                    }
                  >
                    Trung tâm tin tức
                  </NavLink>
                  <NavLink
                    to="/signin"
                    className={({ isActive }) =>
                      isActive
                        ? "no-underline block text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                        : "no-underline block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                    }
                  >
                    Sign in
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                      isActive
                        ? "no-underline block text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                        : "no-underline block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                    }
                  >
                    Sign up
                  </NavLink>
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
