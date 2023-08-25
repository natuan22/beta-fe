import React, { useEffect, useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { userLoginAction } from "./thunk";
const SignIn1 = () => {
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
        await dispatch(userLoginAction(loginInfo));
        setLoginInfo({ phone: "", password: "" });
    };
    const isLogin = useSelector((state) => state.authen.userData);
    const loginMessage = useSelector((state) => state.authen.loginMessage);
    useEffect(() => {
        !isLogin?.data ? navigate("/signin") : navigate("/");
    }, [isLogin, navigate]);

    return (
        <div>SignIn1</div>
    )
}

export default SignIn1