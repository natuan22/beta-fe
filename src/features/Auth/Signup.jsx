import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Button from "@mui/material/Button";
import { Form, Input, message } from "antd";
import clsx from "clsx";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { object, ref, string } from "yup";
import { apiUrl } from "../../services/config";
import { userRegisterAction } from "./thunk";
import "./utils/authen.css";
import PopUpOTP from "./utils/PopUpOTP";
import "./utils/styleInput.css";

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
    console.log("Failed:", errorInfo);
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
        <div className="container mx-auto h-auto pt-[90px] pb-[118px] w-[80%] relative">
          {/* phone */}
          <div
            className="signUp xxs:flex xs:flex lg:hidden flex-col items-center relative mt-8 h-[650px] rounded-[20px]"
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
                      type="submit"
                      variant="contained"
                      sx={{
                        height: "40px",
                        backgroundImage:
                          " linear-gradient(45deg,#312A7F 0%, #4C318E 35%, #6C3CA0 100%)",
                      }}
                      className="md:w-[450px] sm:w-[280px] xs:w-[250px] xxs:w-[200px]"
                    >
                      <span className="normal-case">Đăng ký</span>
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
          <div className="mt-8 flex bg-signinColor xxs:hidden xs:hidden lg:flex rounded-[20px]">
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
              className="w-[40%] flex flex-col items-center relative signUp pb-20 rounded-r-[20px]"
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
                        type="submit"
                        variant="contained"
                        sx={{
                          height: "40px",
                          backgroundImage:
                            " linear-gradient(45deg,#312A7F 0%, #4C318E 35%, #6C3CA0 100%)",
                        }}
                        className="2xl:w-[400px] xl:w-[350px] lg:w-[250px]"
                      >
                        <span className="normal-case">Đăng ký</span>
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
