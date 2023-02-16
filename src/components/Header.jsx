import React from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { Input } from "antd";
import { BellOutlined, MessageOutlined } from "@ant-design/icons";
const { Search } = Input;
const Header = () => {
  return (
    <header className="bg-slate-700  py-5 px-6 ">
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
          <BellOutlined className='ml-2'  style={{ fontSize: '20px', color: '#fff' }}/>
          <MessageOutlined className='ml-2'  style={{ fontSize: '20px', color: '#fff' }} />;
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
    </header>
  );
};

export default Header;
