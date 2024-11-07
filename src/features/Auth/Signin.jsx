import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Form, Input } from "antd";
import clsx from "clsx";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import bgImage from "../../app/asset/img/bg-image.jpg";
import { apiUrl } from "../../services/config";
import { userLoginAction } from "./thunk";
import "./utils/authen.css";
import "./utils/styleInput.css";

const theme = createTheme({
  palette: {
    signin: {
      light: "#03a2ff",
      main: "#007dc6",
      dark: "#015d93",
    },
  },
});

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
    console.error("Failed:", errorInfo);
  };

  useEffect(() => {
    !isLogin?.data ? navigate("/signin") : navigate("/");
  }, [isLogin, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <div className="bg-gray-500 h-full">
        <div className="container mx-auto h-auto py-[103px] lg:w-[50%] md:w-[70%] sm:w-[80%] xs:w-[80%] xxs:w-[80%] relative">
          {/* phone */}
          <div className="signIn xxs:flex xs:flex lg:hidden flex-col items-center relative mt-8 h-[650px] rounded-[20px] bg-[#272831]">
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
                      autoFocus
                      tabIndex={1}
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
                      tabIndex={2}
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
                    tabIndex={3}
                    type="submit"
                    variant="contained"
                    color="signin"
                    sx={{
                      height: "40px",
                    }}
                    className="md:w-[400px] sm:w-[250px] xs:w-[250px] xxs:w-[200px]"
                  >
                    <span className="normal-case text-white">Đăng nhập</span>
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
                    return clsx("bg-[#007dc6]", classes);
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
                    return clsx("bg-[#007dc6]", classes);
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
            <div
              className="relative w-[50%] z-10 rounded-l-[20px] bg-cover bg-center h-[687px]"
              style={{
                backgroundImage: `url(${bgImage})`,
              }}
            ></div>
            <div className="w-[50%] pb-20 flex flex-col items-center relative signIn md:translate-x-[75%] lg:translate-x-0 rounded-r-[20px] bg-[#272831]">
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
                        autoFocus
                        prefix={
                          <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Số điện thoại"
                        tabIndex={1}
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
                        prefix={
                          <LockOutlined className="site-form-item-icon" />
                        }
                        tabIndex={2}
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
                      tabIndex={3}
                      type="submit"
                      variant="contained"
                      color="signin"
                      sx={{
                        height: "40px",
                      }}
                      className="2xl:w-[350px] xl:w-[250px] lg:w-[200px]"
                    >
                      <span className="normal-case text-white">Đăng nhập</span>
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
                      return clsx("bg-[#007dc6]", classes);
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
                      return clsx("bg-[#007dc6]", classes);
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
    </ThemeProvider>
  );
};

export default Signin;
