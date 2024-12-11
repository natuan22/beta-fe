import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Form, Input, message } from "antd";
import clsx from "clsx";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { object, ref, string } from "yup";
import bgImage from "../../app/asset/img/bg-image.jpg";
import { apiUrl } from "../../services/config";
import { userRegisterAction } from "./thunk";
import "./utils/authen.css";
import PopUpOTP from "./utils/PopUpOTP";
import "./utils/styleInput.css";

const theme = createTheme({
  palette: {
    signup: {
      light: "#ffb446",
      main: "#e29f3e",
      dark: "#9f702b",
    },
  },
});

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

  const warning = (text) => {
    messageApi.open({
      type: "warning",
      content: text,
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

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
      .required("Vui lòng nhập lại mật khẩu xác nhận")
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
      onSubmit: async (values) => {
        // Chuẩn hóa số điện thoại trước khi gửi đi
        const normalizedValues = {
          ...values,
          phone: normalizePhone(values.phone),
        };
        try {
          const response = await dispatch(userRegisterAction(normalizedValues));
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
      <ThemeProvider theme={theme}>
        <div className="bg-gray-500 h-full">
          <div className="container mx-auto h-auto py-[103px] lg:w-[50%] md:w-[70%] sm:w-[80%] xs:w-[80%] xxs:w-[80%] relative">
            {/* phone */}
            <div className="signUp xxs:flex xs:flex lg:hidden flex-col items-center relative mt-8 h-[650px] rounded-[20px] bg-[#272831]">
              <a href="/">
                <img
                  className="w-[100px] h-[45px] mt-[70px] mb-[40px]"
                  src={`${apiUrl}/resources/icons/logo-beta-color.png`}
                  alt="Beta logo"
                />
              </a>
              <div className="flex flex-col items-center translate-y-[-10%] w-[60%] form-auth">
                <Form
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={handleSubmit}
                  onFinishFailed={onFinishFailed}
                  size="large"
                >
                  <div className="mt-6">
                    <div className="relative">
                      <Form.Item name="phone">
                        <Input
                          autoFocus
                          tabIndex={1}
                          prefix={
                            <UserOutlined className="site-form-item-icon" />
                          }
                          placeholder="Số điện thoại"
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </Form.Item>
                      {errors.phone && touched.phone && (
                        <p className="absolute top-[42px] m-0 text-sm text-red-500">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div className="relative">
                      <Form.Item name="password">
                        <Input.Password
                          tabIndex={2}
                          placeholder="Mật khẩu"
                          prefix={
                            <LockOutlined className="site-form-item-icon" />
                          }
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </Form.Item>
                      {errors.password && touched.password && (
                        <p className="absolute top-[42px] m-0 text-sm text-red-500">
                          {errors.password}
                        </p>
                      )}
                    </div>
                    <div className="relative">
                      <Form.Item name="confirm_password">
                        <Input.Password
                          tabIndex={3}
                          placeholder="Xác nhận lại mật khẩu"
                          prefix={
                            <LockOutlined className="site-form-item-icon" />
                          }
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </Form.Item>
                      {errors.confirm_password && touched.confirm_password && (
                        <p className="absolute top-[42px] m-0 text-sm text-red-500">
                          {errors.confirm_password}
                        </p>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <div className="relative">
                        <Form.Item name="last_name">
                          <Input
                            tabIndex={4}
                            placeholder="Họ"
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </Form.Item>
                        {errors.last_name && touched.last_name && (
                          <p className="absolute top-[42px] m-0 text-sm text-red-500">
                            {errors.last_name}
                          </p>
                        )}
                      </div>
                      <div className="w-[10px]"></div>
                      <div className="relative">
                        <Form.Item name="first_name">
                          <Input
                            tabIndex={5}
                            placeholder="Tên"
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </Form.Item>
                        {errors.first_name && touched.first_name && (
                          <p className="absolute top-[42px] m-0 text-sm text-red-500">
                            {errors.first_name}
                          </p>
                        )}
                      </div>
                    </div>
                    <Form.Item>
                      <Button
                        tabIndex={6}
                        type="submit"
                        variant="contained"
                        color="signup"
                        sx={{
                          height: "40px",
                        }}
                        className="md:w-[400px] sm:w-[250px] xs:w-[250px] xxs:w-[200px]"
                      >
                        <span className="normal-case text-white">Đăng ký</span>
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
              </div>
              <div className="absolute xxs:bottom-[5%] xs:bottom-[5%] w-[80%] bg-backgroundBtn h-auto mt-5 flex justify-around items-center rounded-full">
                <NavLink
                  to="/signin"
                  className={(params) => {
                    const classes =
                      " w-[60%] text-white rounded-full text-xs no-underline text-center leading-6";
                    if (params.isActive) {
                      return clsx("bg-[#e29f3e]", classes);
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
                      return clsx("bg-[#e29f3e]", classes);
                    }
                    return clsx("bg-transparent", classes);
                  }}
                >
                  Đăng ký
                </NavLink>
              </div>
            </div>

            {/* desktop, tablet */}
            <div className="mt-8 flex bg-signinColor xxs:hidden xs:hidden lg:flex rounded-[20px]">
              <div
                className="relative w-[50%] z-10 rounded-l-[20px] bg-cover bg-center h-[687px]"
                style={{
                  backgroundImage: `url(${bgImage})`,
                }}
              ></div>
              <div className="w-[50%] flex flex-col items-center relative signUp pb-20 rounded-r-[20px] bg-[#272831]">
                <a href="/">
                  <img
                    className="w-[100px] h-[45px] mt-[70px] mb-[40px]"
                    src={`${apiUrl}/resources/icons/logo-beta-color.png`}
                    alt="Beta logo"
                  />
                </a>
                <div className="flex flex-col items-center translate-y-[-10%] w-[60%] form-auth">
                  <Form
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={handleSubmit}
                    onFinishFailed={onFinishFailed}
                    size="large"
                  >
                    <div className="mt-6">
                      <div className="relative">
                        <Form.Item name="phone">
                          <Input
                            autoFocus
                            tabIndex={1}
                            prefix={
                              <UserOutlined className="site-form-item-icon" />
                            }
                            placeholder="Số điện thoại"
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </Form.Item>
                        {errors.phone && touched.phone && (
                          <p className="absolute top-[42px] m-0 text-sm text-red-500">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                      <div className="relative">
                        <Form.Item name="password">
                          <Input.Password
                            tabIndex={2}
                            placeholder="Mật khẩu"
                            prefix={
                              <LockOutlined className="site-form-item-icon" />
                            }
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </Form.Item>
                        {errors.password && touched.password && (
                          <p className="absolute top-[42px] m-0 text-sm text-red-500">
                            {errors.password}
                          </p>
                        )}
                      </div>
                      <div className="relative">
                        <Form.Item name="confirm_password">
                          <Input.Password
                            tabIndex={3}
                            placeholder="Xác nhận lại mật khẩu"
                            prefix={
                              <LockOutlined className="site-form-item-icon" />
                            }
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </Form.Item>
                        {errors.confirm_password &&
                          touched.confirm_password && (
                            <p className="absolute top-[42px] m-0 text-sm text-red-500">
                              {errors.confirm_password}
                            </p>
                          )}
                      </div>
                      <div className="flex justify-between">
                        <div className="relative">
                          <Form.Item name="last_name">
                            <Input
                              tabIndex={4}
                              placeholder="Họ"
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Item>
                          {errors.last_name && touched.last_name && (
                            <p className="absolute top-[42px] m-0 text-sm text-red-500">
                              {errors.last_name}
                            </p>
                          )}
                        </div>
                        <div className="w-[10px]"></div>
                        <div className="relative">
                          <Form.Item name="first_name">
                            <Input
                              tabIndex={5}
                              placeholder="Tên"
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </Form.Item>
                          {errors.first_name && touched.first_name && (
                            <p className="absolute top-[42px] m-0 text-sm text-red-500">
                              {errors.first_name}
                            </p>
                          )}
                        </div>
                      </div>
                      <Form.Item>
                        <Button
                          tabIndex={6}
                          type="submit"
                          variant="contained"
                          color="signup"
                          sx={{
                            height: "40px",
                          }}
                          className="2xl:w-[350px] xl:w-[250px] lg:w-[200px]"
                        >
                          <span className="normal-case text-white">
                            Đăng ký
                          </span>
                        </Button>
                      </Form.Item>
                    </div>
                  </Form>
                </div>
                <div className="absolute bottom-[5%] w-[80%] bg-backgroundBtn h-auto mt-5 flex justify-around items-center rounded-full">
                  <NavLink
                    to="/signin"
                    className={(params) => {
                      const classes =
                        " w-[60%] text-white rounded-full text-xs no-underline text-center leading-6";
                      if (params.isActive) {
                        return clsx("bg-[#e29f3e]", classes);
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
                        return clsx("bg-[#e29f3e]", classes);
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
    </>
  );
};

export default Signup;
