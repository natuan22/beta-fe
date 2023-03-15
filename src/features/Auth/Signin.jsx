import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { userLoginAction } from "./thunk";
import "./utils/authen.css";
const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({ phone: "", password: "" });
  const handleChange = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(userLoginAction(loginInfo)); // gửi thông tin đăng nhập
    console.log(loginInfo);
    setLoginInfo({ phone: "", password: "" }); // clear form
  };

  const isLogin = useSelector((state) => state.authen.userData);
  const loginMessage = useSelector((state) => state.authen.loginMessage);
  useEffect(() => {
    !isLogin?.data ? navigate("/signin") : navigate("/");
  }, [isLogin, navigate]);
 
  return (
    <div className="bg-signinBackground bg-auto bg-no-repeat h-[764px]">
      <div className="container mx-auto h-auto p-[30px] w-[80%] relative">
        <nav className="flex justify-around xs:text-[10px] sm:text-base md:text-base lg:text-base xl:text-base">
          <NavLink className="text-white no-underline">Trang chủ</NavLink>
          <NavLink className="text-white no-underline">
            Giới thiệu dịch vụ
          </NavLink>
          <NavLink className="text-white no-underline">Liên hệ</NavLink>
          <NavLink className="text-white no-underline">Về chúng tôi</NavLink>
          <NavLink className="text-white no-underline">Pháp lý</NavLink>
        </nav>
        {/* phone */}
        <div
          className="signIn xs:flex lg:hidden flex-col items-center relative mt-8 xs:w-[250px] w-[60%] h-[600px] sm:w-[70%] md:left-[96px] sm:left-[76px] xxs:left-[46px] xs:left-[26px]"
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
          <form className="flex flex-col justify-center items-center w-[60%]">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="tel"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={handleChange}
                value={loginInfo.phone}
              />
              <label
                htmlFor="floating_email"
                className="text-white peer-focus:font-medium absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Số ĐT
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="password"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={handleChange}
                value={loginInfo.password}
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Mật khẩu
              </label>
            </div>
            <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  className=" w-5 h-5 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                />
              </div>
              <label
                htmlFor="remember"
                className="ml-2  text-sm font-medium text-white dark:text-gray-300"
              >
                Ghi nhớ đăng nhập
              </label>
            </div>
            <p className="my-2 text-start text-amber-500 absolute">
              {loginMessage}
            </p>
            <button
              type="submit"
              className="border-none mb-6 text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-12 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              style={{
                backgroundImage:
                  " linear-gradient(45deg,#312A7F 0%, #4C318E 35%, #6C3CA0 100%)",
              }}
              onClick={handleSubmit}
            >
              Đăng nhập
            </button>
          </form>
          <a className="text-white mb-6" href="bsi.com.vn">
            <i>Quên mật khẩu ?</i>
          </a>
          <div className="w-[50%] flex justify-around">
            <img
              src="http://192.168.15.181:3001/resources/images/google-logo.png"
              alt="logo"
              className="w-8 h-8 sm:mx-7 xs:mx-2"
            />
            <img
              src="http://192.168.15.181:3001/resources/images/fb-logo.png"
              alt="logo"
              className="w-8 h-8 sm:mx-7 xs:mx-2"
            />
            <span className="bg-white h-[28px] sm:mx-7 xs:mx-2 rounded-t-md">
              <img
                src="http://192.168.15.181:3001/resources/images/zalo-logo.png"
                alt="zaloIcon"
                className="w-8 h-8"
              />
            </span>

            <img
              src="http://192.168.15.181:3001/resources/images/beta-logo.png"
              alt="betaIcon"
              className="w-8 h-8 sm:mx-7 xs:mx-2"
            />
          </div>
          <div className="absolute sm:bottom-[10%] xs:bottom-[5%] w-[80%] bg-backgroundBtn h-auto mt-5 flex justify-around items-center rounded-full">
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
        {/* tablet , desktop */}
        <div className="bg-signinColor xs:hidden lg:flex lg:w-[825px] lg:h-[600px] xl:w-[1190px] xl:h-[600px] mt-8 flex">
          <div className="relative w-[60%] z-10">
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
            className="w-[40%] flex flex-col items-center relative signIn md:translate-x-[75%] lg:translate-x-0"
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
            <form className="flex flex-col justify-center items-center w-[60%]">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="tel"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  name="phone"
                  onChange={handleChange}
                  value={loginInfo.phone}
                />
                <label
                  htmlFor="floating_email"
                  className="text-white peer-focus:font-medium absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Số ĐT
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="password"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  name="password"
                  onChange={handleChange}
                  value={loginInfo.password}
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Mật khẩu
                </label>
              </div>
              <div className="flex items-start mb-6 mt-3">
                <div className="flex items-center h-5 ">
                  <input
                    id="remember"
                    type="checkbox"
                    className=" w-5 h-5 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  />
                </div>
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                >
                  Ghi nhớ đăng nhập
                </label>
              </div>
              {!isLogin?.data ? (
                <p className="my-2 text-start text-amber-500 absolute">
                  {loginMessage}
                </p>
              ) : (
                ""
              )}

              <button
                type="submit"
                className="border-none mb-6 text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-12 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                style={{
                  backgroundImage:
                    " linear-gradient(45deg,#312A7F 0%, #4C318E 35%, #6C3CA0 100%)",
                }}
                onClick={handleSubmit}
              >
                Đăng nhập
              </button>
            </form>
            <a className="text-white mb-6" href="bsi.com.vn">
              <i>Quên mật khẩu ?</i>
            </a>
            <div className="w-[50%] flex justify-around ">
              <img
                src="http://192.168.15.181:3001/resources/images/google-logo.png"
                alt="logo"
                className="w-8 h-8 mx-7"
              />
              <img
                src="http://192.168.15.181:3001/resources/images/fb-logo.png"
                alt="logo"
                className="w-8 h-8 mx-7"
              />
              <span className="bg-white h-[28px] mx-7 rounded-t-md">
                <img
                  src="http://192.168.15.181:3001/resources/images/zalo-logo.png"
                  alt="zaloIcon"
                  className="w-8 h-8"
                />
              </span>

              <img
                src="http://192.168.15.181:3001/resources/images/beta-logo.png"
                alt="betaIcon"
                className="w-8 h-8 mx-7"
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

export default Signin;
