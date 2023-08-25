import React, { useEffect } from "react";
import { object, string, ref } from "yup";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { userRegisterAction } from "./thunk";
const SignIn1 = () => {
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
                dispatch(userRegisterAction(values));
            },
            validationSchema: userSchema,
            validateOnBlur: false,
        }
    );
    useEffect(() => { }, [touched]);
    return (
        <div >
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
        </div>
    );
};

export default SignIn1;
