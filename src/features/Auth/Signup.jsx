import clsx from "clsx";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { object, string, ref } from "yup";
import { useDispatch, useSelector } from "react-redux";
import "./utils/authen.css";
import { userRegister } from "./thunk";

const Signup = () => {
  const resStt = useSelector((state) => state.authen.registerStatus);
  const dispatch = useDispatch();
  const userSchema = object({
    phone: string().required("Vui lòng nhập số điện thoại"),
    password: string()
      .required("Vui lòng nhập mật khẩu")
      .min(8, "Mật khẩu phải nhiều hơn 8 ký tự")
      .max(16, "Mật khẩu không được quá 16 ký tự")
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9a-z]).{8,16}$/,
        "Mật khẩu phải có ít nhất 1 chữ in hoa, 1 ký tự đặc biệt và 1 số"
      ),
    confirm_password: string()
      .required("Vui lòng nhập mật khẩu xác nhận")
      .oneOf([ref("password"), null], "Mật khẩu xác nhận không khớp"),
    first_name: string().required("Vui lòng nhập tên"),
    last_name: string().required("Vui lòng nhập họ"),
  });

  const { handleChange, handleSubmit, handleBlur, errors, touched } = useFormik(
    {
      initialValues: {
        phone: "",
        password: "",
        confirm_password: "",
        first_name: "",
        last_name: "",
      },
      onSubmit: (values) => {
        console.log(values);
        dispatch(userRegister(values));
      },
      validationSchema: userSchema,
      validateOnBlur: false,
    }
  );
  useEffect(() => { }, [touched]);
  return (
    <div className="bg-signinBackground bg-auto bg-no-repeat bg-cover">
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
          className="signUp xs:flex lg:hidden flex-col items-center relative mt-8 xs:w-[250px] w-[60%] h-[600px] sm:w-[70%] md:left-[96px] sm:left-[76px] xxs:left-[46px] xs:left-[26px]"
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
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center translate-y-[-10%] w-[60%]"
          >
            <div className="relative z-0 w-full mb-6 group">
              <input
                name="phone"
                type="tel"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label
                htmlFor="phone"
                className="text-white peer-focus:font-medium absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Số điện thoại
              </label>
              {errors.phone && touched.phone && (
                <p className="text-xs absolute text-yellow-300">
                  {errors.phone}
                </p>
              )}
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                name="password"
                type="password"
                id="floating_password"
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label
                htmlFor="password"
                className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Mật khẩu
              </label>
              {errors.password && touched.password && (
                <p className="absolute text-xs text-yellow-300">
                  {errors.password}
                </p>
              )}
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                name="confirm_password"
                type="password"
                id="floating_repeat_password"
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label
                htmlFor="confirm_password"
                className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Xác nhận mật khẩu
              </label>
              {errors.confirm_password && touched.confirm_password && (
                <p className="absolute text-xs text-yellow-300">
                  {errors.confirm_password}
                </p>
              )}
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  name="last_name"
                  type="text"
                  id="floating_last_name"
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label
                  htmlFor="last_name"
                  className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Họ
                </label>
                {errors.last_name && touched.last_name && (
                  <p className="absolute text-xs w-full text-yellow-300">
                    {errors.last_name}
                  </p>
                )}
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  name="first_name"
                  type="text"
                  id="floating_first_name"
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label
                  htmlFor="first_name"
                  className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Tên
                </label>
                {errors.first_name && touched.first_name && (
                  <p className="absolute text-xs w-full text-yellow-300">
                    {errors.first_name}
                  </p>
                )}
              </div>
            </div>
            <button
              style={{
                backgroundImage:
                  " linear-gradient(45deg,#312A7F 0%, #4C318E 35%, #6C3CA0 100%)",
              }}
              className="text-white border-none hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-7 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Đăng ký
            </button>
          </form>
          <div className="w-[50%] flex justify-around mt-5 absolute sm:bottom-[20%] xs:bottom-[11%]">
            <img
              src="http://192.168.15.181:3001/resources/images/google-logo.png"
              className="w-8 h-8 sm:mx-7 xs:mx-2"
              alt="logo"
            />
            <img
              src="http://192.168.15.181:3001/resources/images/fb-logo.png"
              className="w-8 h-8 sm:mx-7 xs:mx-2"
              alt="logo"
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

        {/* desktop, tablet */}
        <div className="bg-signinColor xs:hidden lg:flex lg:w-[825px] lg:h-[600px] xl:w-[1190px] xl:h-[600px] 2xl:w-[1240px] 2xl:h-[90vh] 3xl:w-[1540px] 3xl:h-[100vh] mt-8 flex">
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
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center h-auto translate-y-[-10%] w-[60%]"
            >
              <div className="relative z-0 w-full mb-6 group">
                <input
                  name="phone"
                  type="tel"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label
                  htmlFor="phone"
                  className="text-white peer-focus:font-medium absolute text-sm  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Số điện thoại
                </label>
                {errors.phone && touched.phone && (
                  <p className="text-xs absolute text-yellow-300">
                    {errors.phone}
                  </p>
                )}
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  name="password"
                  type="password"
                  id="floating_password"
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label
                  htmlFor="password"
                  className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Mật khẩu
                </label>
                {errors.password && touched.password && (
                  <p className="absolute text-xs text-yellow-300">
                    {errors.password}
                  </p>
                )}
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  name="confirm_password"
                  type="password"
                  id="floating_repeat_password"
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label
                  htmlFor="confirm_password"
                  className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Xác nhận mật khẩu
                </label>
                {errors.confirm_password && touched.confirm_password && (
                  <p className="absolute text-xs text-yellow-300">
                    {errors.confirm_password}
                  </p>
                )}
              </div>
              <div className="grid md:grid-cols-2 md:gap-2">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    name="last_name"
                    type="text"
                    id="floating_last_name"
                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label
                    htmlFor="last_name"
                    className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Họ
                  </label>
                  {errors.last_name && touched.last_name && (
                    <p className="absolute text-xs w-full text-yellow-300">
                      {errors.last_name}
                    </p>
                  )}
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    name="first_name"
                    type="text"
                    id="floating_first_name"
                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label
                    htmlFor="first_name"
                    className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Tên
                  </label>
                  {errors.first_name && touched.first_name && (
                    <p className="absolute text-xs w-full text-yellow-300">
                      {errors.first_name}
                    </p>
                  )}
                </div>
              </div>
              <button
                style={{
                  backgroundImage:
                    " linear-gradient(45deg,#312A7F 0%, #4C318E 35%, #6C3CA0 100%)",
                }}
                className="text-white border-none hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-7 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Đăng ký
              </button>
            </form>
            <div className="w-[50%] flex justify-around">
              <img
                src="http://192.168.15.181:3001/resources/images/google-logo.png"
                className="w-8 h-8 mx-7"
                alt="logo"
              />
              <img
                src="http://192.168.15.181:3001/resources/images/fb-logo.png"
                className="w-8 h-8 mx-7"
                alt="logo"
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

export default Signup;
