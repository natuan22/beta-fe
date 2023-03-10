import React from "react";
import { NavLink } from "react-router-dom";

const Signin = () => {
  return (
    <div className="bg-signinBackground bg-auto bg-no-repeat bg-center ">
      <div className="container mx-auto h-screen w-[80%]">
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
          <div className="relative w-[60%] ">
            <div className="absolute top-0 left-0">
              <h1 className="text-[#f2de59]">B-Market</h1>
              <span className="text-white">
                Báo cáo phân tích tùy biến tự động cung cấp thông tin định kỳ
                đến NĐT
              </span>
              <br />
              <button className="bg-transparent border-none">
                Xem chi tiết
              </button>
            </div>
            <img
              src="http://192.168.15.181:3001/resources/images/img6.png"
              width="200px"
              height="150px"
              alt="imgSignin"
            />
          </div>
          <div
            className="w-[40%] flex flex-col items-center"
            style={{
              backgroundImage:
                " linear-gradient(90deg, rgba(59, 24, 130, 0.75) 0%, rgba(102, 58, 130, 0.75) 35%, rgba(158, 24, 99, 0.75) 100%)  ",
            }}
          >
            <img src="http://192.168.15.181:3001/resources/images/logo1.png" alt="logoImg" width='150px' height='150px' />
            <form className="flex flex-col justify-center items-center">
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tài khoản
                </label>
                <input
                  type="text"
                  id="email"
                  className="w-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Email/Số điện thoại"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mật khẩu
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    defaultValue
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    required
                  />
                </div>
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                >
                 Ghi nhớ đăng nhập
                </label>
              </div>
              <button
                type="submit"
                className="border-none  text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-12 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                style={{backgroundImage: 'linear-gradient(45deg,#312A7F 0%, #4C318E 35%, #6C3CA0 100%)'}}
              >
                Đăng nhập
              </button>
            </form>
            <div>
              <FaFacebookSquare />
              <FaGooglePlusSquare />
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
