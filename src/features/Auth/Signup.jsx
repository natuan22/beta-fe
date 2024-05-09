import clsx from "clsx";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { object, ref, string } from "yup";
import { userRegisterAction } from "./thunk";
import PopUpOTP from "./utils/PopUpOTP";
import { message } from "antd";
import "./utils/authen.css";
const apiUrl = process.env.REACT_APP_BASE_URL;

const Signup = () => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [openOTP, setOpenOTP] = useState(false);
  const [userID, setUserID] = useState(null);
  const normalizePhone = (value) => {
    // Chuẩn hóa số điện thoại: thêm '84' nếu bắt đầu bằng '0'
    if (value.startsWith("0")) {
      return `84${value.substring(1)}`;
    }
    return value;
  };
  // console.log({ openOTP })
  const userSchema = object({
    phone: string()
      .required("Vui lòng nhập số điện thoại")
      .transform(normalizePhone)
      .matches(
        /^(84|0[1-9])+([0-9]{8,9})\b/,
        "Vui lòng nhập số điện thoại hợp lệ"
      ),
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

  const warning = (value) => {
    messageApi.open({
      type: "warning",
      content: value,
    });
  };
  const { handleChange, handleSubmit, handleBlur, errors, touched } = useFormik(
    {
      initialValues: {
        phone: "",
        password: "",
        confirm_password: "",
        first_name: "",
        last_name: "",
      },
      onSubmit: async (values) => {
        // Chuẩn hóa số điện thoại trước khi gửi đi
        const normalizedValues = {
          ...values,
          phone: normalizePhone(values.phone),
        };
        try {
          const response = await dispatch(userRegisterAction(normalizedValues));
          // console.log(response)
          if (response.status === 201) {
            setUserID(response?.data.data.user_id);
            setOpenOTP(true);
          } else if (response.response.data.status === 400) {
            warning(response.response.data.message);
          }
        } catch (err) {
          console.error(err);
        }
      },
      validationSchema: userSchema,
      validateOnBlur: false,
    }
  );
  useEffect(() => {}, [touched]);
  return (
    <>
      <PopUpOTP open={openOTP} userID={userID} />
      {contextHolder}
      <div
        className="bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url('${apiUrl}/resources/images/login-background.png')`,
        }}
      >
        <div className="container mx-auto h-auto pt-[90px] pb-[136px] w-[80%] relative">
          <nav className="flex justify-around mb-[70px] xs:text-[10px] md:text-base lg:text-base xl:text-base ">
            <NavLink to="/" className="text-white no-underline">
              Trang chủ
            </NavLink>
            <NavLink className="text-white no-underline">
              Giới thiệu dịch vụ
            </NavLink>
            <NavLink className="text-white no-underline">Liên hệ</NavLink>
            <NavLink className="text-white no-underline">Về chúng tôi</NavLink>
            <NavLink className="text-white no-underline">Pháp lý</NavLink>
          </nav>
          {/* phone */}
          <div
            className="signUp xxs:flex xs:flex lg:hidden flex-col items-center relative mt-8 h-[650px]"
            style={{
              backgroundImage:
                " linear-gradient(90deg, rgba(59, 24, 130, 0.75) 0%, rgba(102, 58, 130, 0.75) 35%, rgba(158, 24, 99, 0.75) 100%)  ",
            }}
          >
            <img
              className="w-[100px] h-[45px] mt-[70px] mb-[40px]"
              src={`${apiUrl}/resources/icons/logo-beta-color.png`}
              alt="Beta logo"
            />
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center translate-y-[-10%] w-[60%]"
            >
              <div className="relative z-0 w-full mb-6 group mt-2">
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
              <div className="relative z-0 w-full mb-6 group mt-2">
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
              <div className="relative z-0 w-full mb-6 group mt-2">
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
                <div className="relative z-0 w-full mb-6 group mt-2">
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
                <div className="relative z-0 w-full mb-6 group mt-2">
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
                className="text-white border-none hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-7 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Đăng ký
              </button>
            </form>
            <div className="w-[50%] flex justify-around mt-5 absolute md:bottom-[15%] xs:bottom-[11%] xxs:bottom-[11%]">
              <img
                src={`${apiUrl}/resources/images/google-logo.png`}
                className="w-8 h-8 xs:mx-2 xxs:mx-2"
                alt="logo"
              />
              <img
                src={`${apiUrl}/resources/images/fb-logo.png`}
                className="w-8 h-8 xs:mx-2 xxs:mx-2"
                alt="logo"
              />
              <span className="bg-white h-[28px] xs:mx-2 xxs:mx-2 rounded-t-md">
                <img
                  src={`${apiUrl}/resources/images/zalo-logo.png`}
                  alt="zaloIcon"
                  className="w-8 h-8"
                />
              </span>
              <img
                src={`${apiUrl}/resources/images/beta-logo.png`}
                alt="betaIcon"
                className="w-8 h-8 xs:mx-2 xxs:mx-2"
              />
            </div>
            <div className="absolute xxs:bottom-[5%] xs:bottom-[5%] w-[80%] bg-backgroundBtn h-auto mt-5 flex justify-around items-center rounded-full">
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
          <div className="mt-8 flex bg-signinColor xxs:hidden xs:hidden lg:flex">
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
                src={`${apiUrl}/resources/images/img6.png`}
                width="100%"
                height="80%"
                alt="imgSignin"
                className=" translate-y-[20%]"
              />
            </div>
            <div
              className="w-[40%] flex flex-col items-center relative signUp pb-20"
              style={{
                backgroundImage:
                  " linear-gradient(90deg, rgba(59, 24, 130, 0.75) 0%, rgba(102, 58, 130, 0.75) 35%, rgba(158, 24, 99, 0.75) 100%)  ",
              }}
            >
              <img
                className="w-[100px] h-[45px] mt-[70px] mb-[40px]"
                src={`${apiUrl}/resources/icons/logo-beta-color.png`}
                alt="Beta logo"
              />
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center h-auto translate-y-[-10%] w-[60%]"
              >
                <div className="relative z-0 w-full mb-6 group mt-5">
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
                <div className="relative z-0 w-full mb-6 group mt-5">
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
                <div className="relative z-0 w-full mb-6 group mt-5">
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
                  <div className="relative z-0 w-full mb-6 group mt-5">
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
                  <div className="relative z-0 w-full mb-6 group mt-5">
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
                  src={`${apiUrl}/resources/images/google-logo.png`}
                  className="w-8 h-8 mx-7"
                  alt="logo"
                />
                <img
                  src={`${apiUrl}/resources/images/fb-logo.png`}
                  className="w-8 h-8 mx-7"
                  alt="logo"
                />
                <span className="bg-white h-[28px] mx-7 rounded-t-md">
                  <img
                    src={`${apiUrl}/resources/images/zalo-logo.png`}
                    alt="zaloIcon"
                    className="w-8 h-8"
                  />
                </span>

                <img
                  src={`${apiUrl}/resources/images/beta-logo.png`}
                  alt="betaIcon"
                  className="w-8 h-8 mx-7"
                />
              </div>
              <div className="absolute bottom-[5%] w-[80%] bg-backgroundBtn h-auto mt-5 flex justify-around items-center rounded-full">
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
    </>
  );
};

export default Signup;
