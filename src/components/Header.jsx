import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { Input } from "antd";
import { BellOutlined, MessageOutlined } from "@ant-design/icons";
import { Menu, Transition } from "@headlessui/react";
const { Search } = Input;
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* <header className="bg-slate-700  py-5 px-6 ">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex ">
          <NavLink
            to="/"
            className="text-white text-base mr-6 no-underline font-semibold "
          >
            Trang chủ
          </NavLink>
          <nav>
            <NavLink
              to="/thi-truong"
              className={(params) => {
                const classes = "  text-base mr-6 no-underline font-semibold";
                if (params.isActive) {
                  return clsx("text-yellow-300", classes);
                }
                return clsx("text-white", classes);
              }}
            >
              Thị trường
            </NavLink>
            <NavLink
              to="/nganh"
              className={(params) => {
                const classes = "  text-base mr-6 no-underline font-semibold";
                if (params.isActive) {
                  return clsx("text-yellow-300", classes);
                }
                return clsx("text-white", classes);
              }}
            >
              Ngành
            </NavLink>
            <NavLink
              to="/vi-mo"
              className={(params) => {
                const classes = "  text-base mr-6 no-underline font-semibold";
                if (params.isActive) {
                  return clsx("text-yellow-300", classes);
                }
                return clsx("text-white", classes);
              }}
            >
              Vĩ mô
            </NavLink>
            <NavLink
              to="/cong-cu-dau-tu"
              className={(params) => {
                const classes = "  text-base mr-6 no-underline font-semibold";
                if (params.isActive) {
                  return clsx("text-yellow-300", classes);
                }
                return clsx("text-white", classes);
              }}
            >
              Công cụ đầu tư
            </NavLink>
            <NavLink
              to="/trung-tam-tin-tuc"
              className={(params) => {
                const classes = "  text-base mr-6 no-underline font-semibold";
                if (params.isActive) {
                  return clsx("text-yellow-300", classes);
                }
                return clsx("text-white", classes);
              }}
            >
              Trung tâm tin tức
            </NavLink>
          </nav>
        </div>

        <div className=" flex">
          <div className="flex items-center">
            <BellOutlined className='ml-2' style={{ fontSize: '20px', color: '#fff' }} />
            <MessageOutlined className='ml-2' style={{ fontSize: '20px', color: '#fff' }} />;
            <Search
              placeholder="Tìm mã chững khoán"
              style={{
                width: 200,
              }}
            />
          </div>
          <nav>
            <NavLink
              to="/signin"
              className={(params) => {
                const classes = "  text-sm ml-3 mr-3 no-underline font-semibold";
                if (params.isActive) {
                  return clsx("text-yellow-300", classes);
                }
                return clsx("text-white", classes);
              }}
            >
              Sign in
            </NavLink>
            <NavLink
              to="/signup"
              className={(params) => {
                const classes = "  text-sm  no-underline font-semibold";
                if (params.isActive) {
                  return clsx("text-yellow-300", classes);
                }
                return clsx("text-white", classes);
              }}
            >
              Sign up
            </NavLink>
          </nav>
        </div>
      </div>
    </header> */}
      <div>
        <nav className="bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">

                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="xl:hidden w-max">
                  <div className="ml-4 flex items-baseline space-x-0">
                    <NavLink to="/" className={({ isActive }) =>
                      isActive ? 'no-underline text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium' : 'no-underline text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium'
                    }>
                      Trang chủ
                    </NavLink>
                  </div>

                </div>

                <div className="hidden xl:block w-max">
                  <div className="ml-4 flex items-baseline space-x-3">
                    <NavLink to="/" className={({ isActive }) =>
                      isActive ? 'no-underline text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium' : 'no-underline text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium'
                    }>
                      Trang chủ
                    </NavLink>

                    <NavLink to="/thi-truong" className={({ isActive }) =>
                      isActive ? 'no-underline text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium' : 'no-underline text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium'
                    }>
                      Thị trường
                    </NavLink>

                    <NavLink to="/nganh" className={({ isActive }) =>
                      isActive ? 'no-underline text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium' : 'no-underline text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium'
                    }>
                      Ngành
                    </NavLink>

                    <NavLink to="/vi-mo" className={({ isActive }) =>
                      isActive ? 'no-underline text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium' : 'no-underline text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium'
                    }>
                      Vĩ mô
                    </NavLink>

                    <NavLink to="/cong-cu-dau-tu" className={({ isActive }) =>
                      isActive ? 'no-underline text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium' : 'no-underline text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium'
                    }>
                      Công cụ đầu tư
                    </NavLink>

                    <NavLink to="/trung-tam-tin-tuc" className={({ isActive }) =>
                      isActive ? 'no-underline text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium' : 'no-underline text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium'
                    }>
                      Trung tâm tin tức
                    </NavLink>
                  </div>
                </div>
                <div className='hidden xl:flex items-center flex ml-3 xl:ml-28 lg:ml-72'>
                  <div className='flex'>
                    <BellOutlined className='ml-2' style={{ fontSize: '20px', color: '#fff' }} />
                    <MessageOutlined className='ml-2 mr-2' style={{ fontSize: '20px', color: '#fff' }} />
                  </div>
                  <Search
                    placeholder="Tìm mã chứng khoán"
                    className=""
                    style={{
                      width: 200,
                    }} />
                </div>
                <div className="hidden xl:block">
                  <NavLink to="/signin" className={({ isActive }) =>
                    isActive ? 'ml-1 no-underline text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium' : 'ml-1 no-underline text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium'
                  }>
                    Sign in
                  </NavLink>
                  <NavLink to="/signup" className={({ isActive }) =>
                    isActive ? 'no-underline text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium' : 'no-underline text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium'
                  }>
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
                  <NavLink to="/thi-truong" className={({ isActive }) =>
                    isActive ? 'no-underline block text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium' : 'no-underline block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium'
                  }>
                    Thị trường
                  </NavLink>

                  <NavLink to="/nganh" className={({ isActive }) =>
                    isActive ? 'no-underline block text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium' : 'no-underline block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium'
                  }>
                    Ngành
                  </NavLink>

                  <NavLink to="/vi-mo" className={({ isActive }) =>
                    isActive ? 'no-underline block text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium' : 'no-underline block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium'
                  }>
                    Vĩ mô
                  </NavLink>

                  <NavLink to="/cong-cu-dau-tu" className={({ isActive }) =>
                    isActive ? 'no-underline block text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium' : 'no-underline block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium'
                  }>
                    Công cụ đầu tư
                  </NavLink>

                  <NavLink to="/trung-tam-tin-tuc" className={({ isActive }) =>
                    isActive ? 'no-underline block text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium' : 'no-underline text-gray-300 block hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium'
                  }>
                    Trung tâm tin tức
                  </NavLink>
                  <NavLink to="/signin" className={({ isActive }) =>
                    isActive ? 'no-underline block text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium' : 'no-underline block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium'
                  }>
                    Sign in
                  </NavLink>
                  <NavLink to="/signup" className={({ isActive }) =>
                    isActive ? 'no-underline block text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium' : 'no-underline block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium'
                  }>
                    Sign up
                  </NavLink>
                  <div className='xl:flex items-center flex'>
                    <div className='flex'>
                      <BellOutlined className='ml-2' style={{ fontSize: '20px', color: '#fff' }} />
                      <MessageOutlined className='ml-2 mr-2' style={{ fontSize: '20px', color: '#fff' }} />
                    </div>
                    <Search
                      placeholder="Tìm mã chứng khoán"
                      className=""
                      style={{
                        width: 200,
                      }} />
                  </div>
                </div>
              </div>
            )}
          </Transition>
        </nav>


      </div >
    </>
  );
};

export default Header;
