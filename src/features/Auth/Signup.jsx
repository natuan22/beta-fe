import clsx from "clsx";
import React from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import './utils/authen.css'

const Signup = () => {
  return (
    <div className="bg-signinBackground bg-auto bg-no-repeat bg-center ">
      <div className="container mx-auto h-auto p-[18px] w-[80%]">
        <nav className="flex justify-around">
          <NavLink className="text-white no-underline">Trang chủ</NavLink>
          <NavLink className="text-white no-underline">
            Giới thiệu dịch vụ
          </NavLink>
          <NavLink className="text-white no-underline">Liên hệ</NavLink>
          <NavLink className="text-white no-underline">Về chúng tôi</NavLink>
          <NavLink className="text-white no-underline">Pháp lý</NavLink>
        </nav>
        <div className="bg-signinColor w-[1190px] h-[600px]  mt-8 flex">
          <div className="relative w-[60%] z-10 ">
            <div className="absolute top-0 left-0 translate-x-[10%] translate-y-[10%]">
              <h1 className="text-[#f2de59]">B-Market</h1>
              <span className="text-white translate-x-[10%] translate-y-[15%]">
                Báo cáo phân tích tùy biến tự
                <br /> động cung cấp thông tin định kỳ đến NĐT
              </span>
              <div className="flex items-center mt-2">
                <button className="bg-transparent border-none mr-2">
                  <a href="bsi.com.vn" className="text-yellow-300">
                    Xem chi tiết
                  </a>
                </button>
                <FaAngleDoubleRight className="text-yellow-300" />
              </div>
            </div>
            <img
              src="http://192.168.15.181:3001/resources/images/img6.png"
              width="100%"
              height="80%"
              alt="imgSignin"
              className=" translate-y-[20%]"
            />
          </div>
          <div
            className="w-[40%] flex flex-col items-center relative signUp"  
            style={{
              backgroundImage:
                " linear-gradient(90deg, rgba(59, 24, 130, 0.75) 0%, rgba(102, 58, 130, 0.75) 35%, rgba(158, 24, 99, 0.75) 100%)  ",
            }}
          >
            <img
              src="http://192.168.15.181:3001/resources/images/logo1.png"
              alt="logoImg"
              width="180px"
              height="160px"
            />
            <form className="flex flex-col items-center h-auto translate-y-[-10%]">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="email"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_email"
                  className="text-white peer-focus:font-medium absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Tài khoản
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="password"
                  name="floating_password"
                  id="floating_password"
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_password"
                  className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Mật khẩu
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="password"
                  name="repeat_password"
                  id="floating_repeat_password"
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_repeat_password"
                  className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Xác nhận mật khẩu
                </label>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="floating_first_name"
                    id="floating_first_name"
                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="floating_first_name"
                    className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Họ
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="floating_last_name"
                    id="floating_last_name"
                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="floating_last_name"
                    className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Tên
                  </label>
                </div>
              </div>
              <button
              style={{backgroundImage: ' linear-gradient(45deg,#312A7F 0%, #4C318E 35%, #6C3CA0 100%)'}}
               className="text-white border-none hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-7 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                
                Đăng ký
              </button>
            </form>
            <div className="w-[50%] flex justify-around mt-5 absolute bottom-[20%]">
              <img
                src="http://192.168.15.181:3001/resources/images/fb-logo.png"
                className="w-6 h-6"
                alt="logo"
              />
              <img
                src="http://192.168.15.181:3001/resources/images/google-logo.png"
                className="w-6 h-6"
                alt="logo"

              />

              <span className="bg-white h-[22px] rounded-t-md">
                <img
                  src="http://192.168.15.181:3001/resources/images/zalo-logo.png"
                  alt="zaloIcon"
                  className="w-6 h-6  "
                />
              </span>

              <img
                src="http://192.168.15.181:3001/resources/images/beta-logo.png"
                alt="betaIcon"
                className="w-6 h-6"
              />
            </div>
            <div className="absolute bottom-[10%] w-[80%] bg-backgroundBtn h-auto mt-5 flex justify-around items-center rounded-full">
              <NavLink
                to="/signin"
                className={(params) => {
                  const classes =
                    " w-[60%] text-white rounded-full text-xs no-underline text-center leading-6";
                  if (params.isActive) {
                    return clsx("bg-[#1d6096]", classes);
                  }
                  return clsx("bg-transparent", classes);
                }}
              >
                Đăng nhập
              </NavLink>
              <NavLink
                to="/signup"
                className={(params) => {
                  const classes =
                    " w-[60%] text-white rounded-full text-xs no-underline text-center leading-6";
                  if (params.isActive) {
                    return clsx("bg-[#1d6096]", classes);
                  }
                  return clsx("bg-transparent", classes);
                }}
              >
                Đăng ký
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

