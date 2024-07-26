import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Button from "@mui/material/Button";
import { Form, Input } from "antd";
import clsx from "clsx";
import React, { useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { apiUrl } from "../../services/config";
import { userLoginAction } from "./thunk";
import "./utils/authen.css";
import "./utils/styleInput.css";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginMessage = useSelector((state) => state.authen.loginMessage);
  const isLogin = useSelector((state) => state.authen.userData);

  const onFinish = async (values) => {
    // Thay thế số 0 đầu tiên thành 84 trong số điện thoại khi gửi yêu cầu API
    const modifiedPhone = values.phone.replace(/^0/, "84");

    // Gửi yêu cầu API với số điện thoại đã được sửa đổi
    await dispatch(userLoginAction({ ...values, phone: modifiedPhone }));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    !isLogin?.data ? navigate("/signin") : navigate("/");
  }, [isLogin, navigate]);

  return (
    <div
      className="bg-no-repeat bg-cover h-auto"
      style={{
        backgroundImage: `url('${apiUrl}/resources/images/login-background.png')`,
      }}
    >
      <div className="container mx-auto h-auto pt-[90px] pb-[118px] w-[80%] relative">
        {/* phone */}
        <div
          className="signIn xxs:flex xs:flex lg:hidden flex-col items-center relative mt-8 h-[600px] rounded-[20px]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(59, 24, 130, 0.75) 0%, rgba(102, 58, 130, 0.75) 35%, rgba(158, 24, 99, 0.75) 100%)",
          }}
        >
          <a href="/">
            <img
              className="w-[100px] h-[45px] mt-[70px] mb-[40px]"
              src={`${apiUrl}/resources/icons/logo-beta-color.png`}
              alt="Beta logo"
            />
          </a>
          <div className="flex flex-col justify-center items-center w-[60%] form-auth">
            <Form
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              size="large"
            >
              <div className="mt-6">
                <Form.Item
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số điện thoại!",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Số điện thoại"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu!",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Mật khẩu"
                    prefix={<LockOutlined className="site-form-item-icon" />}
                  />
                </Form.Item>
              </div>
              <div className="flex items-start justify-center mb-6">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    className="xs:w-3 xs:h-3 md:w-5 md:h-5 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  />
                </div>
                <label
                  htmlFor="remember"
                  className="ml-2 xs:text-xs md:text-sm font-medium text-white dark:text-gray-300"
                >
                  Ghi nhớ đăng nhập
                </label>
              </div>
              <p className="my-2 text-start text-amber-500 absolute">
                {loginMessage}
              </p>
              <Form.Item>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    height: "40px",
                    backgroundImage:
                      " linear-gradient(45deg,#312A7F 0%, #4C318E 35%, #6C3CA0 100%)",
                  }}
                  className="md:w-[370px] sm:w-[250px] xs:w-[230px] xxs:w-[200px]"
                >
                  <span className="normal-case">Đăng nhập</span>
                </Button>
              </Form.Item>
            </Form>
          </div>
          <a
            className="text-white xxs:mb-8 xs:mb-14 md:mb-6 "
            href="/trang-khong-ton-tai"
          >
            <i>Quên mật khẩu ?</i>
          </a>
          <div className="absolute xxs:bottom-[5%] xs:bottom-[5%] w-[80%] bg-backgroundBtn h-auto mt-5 flex justify-around items-center rounded-full">
            <NavLink
              to="/signin"
              className={(params) => {
                const classes =
                  "w-[60%] text-white rounded-full text-xs no-underline text-center leading-6";
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
        <div className="mt-8 flex bg-signinColor xxs:hidden xs:hidden lg:flex rounded-[20px]">
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
              src={`${apiUrl}/resources/images/img6.png`}
              width="100%"
              height="80%"
              alt="imgSignin"
              className=" translate-y-[20%]"
            />
          </div>
          <div
            className="w-[40%] pb-20 flex flex-col items-center relative signIn md:translate-x-[75%] lg:translate-x-0 rounded-r-[20px]"
            style={{
              backgroundImage:
                " linear-gradient(90deg, rgba(59, 24, 130, 0.75) 0%, rgba(102, 58, 130, 0.75) 35%, rgba(158, 24, 99, 0.75) 100%)  ",
            }}
          >
            <a href="/">
              <img
                className="w-[100px] h-[45px] mt-[70px] mb-[40px]"
                src={`${apiUrl}/resources/icons/logo-beta-color.png`}
                alt="Beta logo"
              />
            </a>
            <div className="flex flex-col justify-center items-center w-[60%] form-auth">
              <Form
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="w"
                size="large"
              >
                <div className="mt-6">
                  <Form.Item
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Số điện thoại"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mật khẩu!",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="Mật khẩu"
                      prefix={<LockOutlined className="site-form-item-icon" />}
                    />
                  </Form.Item>
                </div>
                <div className="flex items-start justify-center mb-6">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      className="xs:w-3 xs:h-3 md:w-5 md:h-5 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    />
                  </div>
                  <label
                    htmlFor="remember"
                    className="ml-2 xs:text-xs md:text-sm font-medium text-white dark:text-gray-300"
                  >
                    Ghi nhớ đăng nhập
                  </label>
                </div>
                <p className="my-2 text-start text-amber-500 absolute">
                  {loginMessage}
                </p>
                <Form.Item>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      height: "40px",
                      backgroundImage:
                        " linear-gradient(45deg,#312A7F 0%, #4C318E 35%, #6C3CA0 100%)",
                    }}
                    className="2xl:w-[350px] xl:w-[300px] lg:w-[250px]"
                  >
                    <span className="normal-case">Đăng nhập</span>
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <a className="text-white mb-6" href="/trang-khong-ton-tai">
              <i>Quên mật khẩu ?</i>
            </a>
            <div className="absolute bottom-[4%] w-[80%] bg-backgroundBtn h-auto mt-5 flex justify-around items-center rounded-full">
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
