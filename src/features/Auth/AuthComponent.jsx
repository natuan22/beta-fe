import React from "react";
import { NavLink } from "react-router-dom";
import { FaAngleDoubleRight } from "react-icons/fa";
import { apiUrl } from "../../services/config";

const AuthComponent = () => {
  return (
    <div
      className="h-screen"
      style={{
        backgroundImage: `url('${apiUrl}/resources/images/login-background.png')`,
      }}
    >
      <div className="header container mx-auto   flex flex-col items-center  w-full">
        <header className=" container flex justify-around w-full py-10">
          <NavLink to="/" className="text-white no-underline">
            Trang chủ
          </NavLink>
          <NavLink className="text-white no-underline">
            Giới thiệu dịch vụ
          </NavLink>
          <NavLink className="text-white no-underline">Liên hệ</NavLink>
          <NavLink className="text-white no-underline">Về chúng tôi</NavLink>
          <NavLink className="text-white no-underline">Pháp lý</NavLink>
        </header>
      </div>
      <div className=" container mx-auto body grid grid-cols-3 place-content-center bg-signinColor">
        <div className="body__left col-span-2">
          <div className="w-[50%] ml-16 mt-10 ">
            <div>
              <h2 className="text-[#f2de59]">B-Market</h2>
              <span className="text-white ">
                Báo cáo phân tích tùy biến tự
                <br /> động cung cấp thông tin định kỳ đến NĐT
              </span>
            </div>
            <button className="bg-transparent border-none mr-2">
              <a
                href="bsi.com.vn"
                className="tex t-yellow-300 flex items-center"
              >
                Xem chi tiết
                <FaAngleDoubleRight className="text-yellow-300" />
              </a>
            </button>
          </div>
          <div className=" flex flex-col justify-center items-center">
            <img
              src={`${apiUrl}/resources/images/img6.png`}
              alt="imgSignin"
              width="90%"
              height="70%"
            />
          </div>
        </div>
        <div className="body__right mt-20 relative"></div>
      </div>
      <div className="btn__swap"></div>
    </div>
  );
};

export default AuthComponent;
