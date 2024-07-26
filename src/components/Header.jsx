import { BellOutlined, MessageOutlined } from "@ant-design/icons";
import { Transition } from "@headlessui/react";
import { Popover } from "antd";
import React, { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { userLogoutAction } from "../features/Auth/thunk";
import SearchDialog from "../features/Search/utils/UIcomponent/SearchDialog";
import Switcher from "../services/switcher";
import { apiUrl } from "../services/config";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(localStorage.getItem("2ZW79"));
  const [isLogin, setIsLogin] = useState(localStorage.getItem("_il"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const handleUserLogout = () => {
    if (isLogin) {
      setIsLogin(null);
      setRole(null);
      setUser(null);
      dispatch(userLogoutAction());
      localStorage.setItem("_il", "4E8WL");
      localStorage.removeItem("2ZW79");
      localStorage.removeItem("user");
      navigate(0);
    }
  };

  return (
    <>
      <div className=" relative">
        <nav className="dark:bg-black bg-white shadow-md mb-1">
          {/* max-w-[85.5rem] */}
          <div className="max-w-[87rem] mx-auto px-4 xl:px-7 lg:px-8">
            <div className="flex items-center justify-between w-full h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <a
                    href="http://www.bsi.com.vn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className="w-[87px] h-[33px]"
                      src={`${apiUrl}/resources/icons/logo-beta-color.png`}
                      alt="Beta logo"
                    />
                  </a>
                </div>
                {/* phone */}
                <div className="xl:hidden w-max">
                  <div className="ml-4 flex items-center justify-between lg:w-[800px] md:w-[575px] sm:w-[227px] space-x-0">
                    <NavLink
                      onClick={() => {
                        if (isOpen) setIsOpen(!isOpen);
                      }}
                      to="/"
                      className={({ isActive }) =>
                        isActive
                          ? "no-underline text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium "
                          : "no-underline dark:text-gray-300 text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                      }
                    >
                      Trang chủ
                    </NavLink>
                    <div className="xl:flex items-center flex">
                      <div className="flex sm:flex xs:hidden xxs:hidden">
                        <Switcher />
                        <BellOutlined className="ml-2 mt-1 text-[20px] dark:text-white text-black" />
                        <MessageOutlined className="ml-2 mr-2 mt-1 text-[20px] dark:text-white text-black" />
                        <span className="grid place-items-center">
                          <SearchDialog />
                        </span>
                      </div>
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
                    {/* <NavLink
                      to="/nganh"
                      className={({ isActive }) =>
                        isActive
                          ? "no-underline text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium "
                          : "no-underline dark:text-gray-300 text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                      }
                    >
                      Ngành
                    </NavLink> */}
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
                    {/* <NavLink
                      to="/vi-mo"
                      className={({ isActive }) =>
                        isActive
                          ? "no-underline text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                          : "no-underline dark:text-gray-300 text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                      }
                    >
                      Vĩ mô
                    </NavLink> */}
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
                    <NavLink
                      to="/trung-tam-phan-tich"
                      className={({ isActive }) =>
                        isActive
                          ? "no-underline text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                          : "no-underline dark:text-gray-300 text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                      }
                    >
                      Trung tâm phân tích
                    </NavLink>
                  </div>
                </div>
                {/* login */}
                <div className="hidden xl:flex items-center ml-3 xl:ml-[245px]">
                  <div className="flex">
                    <Switcher />
                    <BellOutlined className="ml-2 mt-1 text-[20px] dark:text-white text-black" />
                    <MessageOutlined className="ml-2 mr-2 mt-1 text-[20px] dark:text-white text-black" />
                  </div>

                  <span>
                    <SearchDialog />
                  </span>
                </div>
                <div className="hidden xl:block cursor-pointer">
                  {isLogin === "7MEvU" ? (
                    <div className="relative">
                      <Popover
                        content={
                          <div className="flex flex-col justify-around h-[100px]">
                            <button className="bg-transparent font-semibold border-0 cursor-pointer hover:text-blue-500 duration-500">
                              Thông tin cá nhân
                            </button>
                            <span className="flex items-center justify-evenly hover:text-red-500 duration-500">
                              <button
                                onClick={handleUserLogout}
                                className="bg-transparent border-0 cursor-pointer hover:text-red-500 duration-500  "
                              >
                                Đăng xuất{" "}
                              </button>
                              <BiLogOut />
                            </span>
                          </div>
                        }
                        trigger="click"
                        open={open}
                        onOpenChange={handleOpenChange}
                      >
                        <span className="dark:text-gray-300 text-black ml-2 text-sm flex items-center font-medium">
                          <FaUserCircle className="dark:text-gray-300 text-black mr-2 text-xl" />
                          {user.name}
                        </span>
                        <div className="absolute w-2 h-2 rounded-full bg-green-400 bottom-0 left-[18%]"></div>
                      </Popover>
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
                        Đăng nhập
                      </NavLink>
                      <NavLink
                        to="/signup"
                        className={({ isActive }) =>
                          isActive
                            ? "ml-2 no-underline text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                            : "ml-2 no-underline dark:text-gray-300 text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                        }
                      >
                        Đăng ký
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
                    onClick={() => {
                      if (isOpen) setIsOpen(!isOpen);
                    }}
                    to="/thi-truong"
                    className={({ isActive }) =>
                      isActive
                        ? "no-underline block text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                        : "no-underline block dark:text-gray-300 text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                    }
                  >
                    Thị trường
                  </NavLink>

                  {/* <NavLink
                    onClick={() => {
                      if (isOpen) setIsOpen(!isOpen);
                    }}
                    to="/nganh"
                    className={({ isActive }) =>
                      isActive
                        ? "no-underline block text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                        : "no-underline block dark:text-gray-300 text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                    }
                  >
                    Ngành
                  </NavLink> */}

                  <NavLink
                    onClick={() => {
                      if (isOpen) setIsOpen(!isOpen);
                    }}
                    to="/co-phieu"
                    className={({ isActive }) =>
                      isActive
                        ? "no-underline block text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                        : "no-underline block dark:text-gray-300 text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                    }
                  >
                    Cổ phiếu
                  </NavLink>

                  {/* <NavLink
                    onClick={() => {
                      if (isOpen) setIsOpen(!isOpen);
                    }}
                    to="/vi-mo"
                    className={({ isActive }) =>
                      isActive
                        ? "no-underline block text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                        : "no-underline block dark:text-gray-300 text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                    }
                  >
                    Vĩ mô
                  </NavLink> */}

                  <NavLink
                    onClick={() => {
                      if (isOpen) setIsOpen(!isOpen);
                    }}
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
                    onClick={() => {
                      if (isOpen) setIsOpen(!isOpen);
                    }}
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
                    onClick={() => {
                      if (isOpen) setIsOpen(!isOpen);
                    }}
                    to="/trung-tam-phan-tich"
                    className={({ isActive }) =>
                      isActive
                        ? "no-underline block text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                        : "no-underline dark:text-gray-300 text-black block hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                    }
                  >
                    Trung tâm phân tích
                  </NavLink>
                  <div className="relative mb-5">
                    {isLogin === "7MEvU" ? (
                      <Popover
                        placement="bottom"
                        content={
                          <div className="flex flex-col justify-around h-[100px]">
                            <button className="bg-transparent font-semibold border-0 cursor-pointer hover:text-blue-500 duration-500">
                              Thông tin cá nhân
                            </button>
                            <span className="flex items-center justify-evenly hover:text-red-500 duration-500">
                              <button
                                onClick={handleUserLogout}
                                className="bg-transparent border-0 cursor-pointer hover:text-red-500 duration-500"
                              >
                                Đăng xuất{" "}
                              </button>
                              <BiLogOut />
                            </span>
                          </div>
                        }
                        trigger="click"
                        open={open}
                        onOpenChange={handleOpenChange}
                      >
                        <div className="dark:text-gray-300 text-black text-sm flex items-center font-medium px-2 py-2 cursor-pointer">
                          <FaUserCircle className="dark:text-gray-300 text-black mr-2 text-xl" />
                          {user.name}
                        </div>
                      </Popover>
                    ) : (
                      <>
                        <NavLink
                          onClick={() => {
                            if (isOpen) setIsOpen(!isOpen);
                          }}
                          to="/signin"
                          className={({ isActive }) =>
                            isActive
                              ? "no-underline block text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                              : "no-underline block dark:text-gray-300 text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                          }
                        >
                          Đăng nhập
                        </NavLink>
                        <NavLink
                          onClick={() => {
                            if (isOpen) setIsOpen(!isOpen);
                          }}
                          to="/signup"
                          className={({ isActive }) =>
                            isActive
                              ? "no-underline block text-white bg-[#1E5D8B] hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                              : "no-underline block dark:text-gray-300 text-black hover:bg-[#1E5D8B] hover:text-white px-2 py-2 rounded-md text-base font-medium"
                          }
                        >
                          Đăng ký
                        </NavLink>
                      </>
                    )}
                  </div>

                  <div className="flex sm:hidden xs:flex xxs:flex px-2 py-2">
                    <Switcher />
                    <BellOutlined className="ml-2 mt-1 text-[20px] dark:text-white text-black" />
                    <MessageOutlined className="ml-2 mr-2 mt-1 text-[20px] dark:text-white text-black" />
                    <span className="grid place-items-center">
                      <SearchDialog />
                    </span>
                  </div>
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
