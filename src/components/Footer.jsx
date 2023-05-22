import { DoubleRightOutlined, EnvironmentOutlined, FacebookOutlined, GlobalOutlined, MailOutlined, PhoneOutlined, YoutubeOutlined } from "@ant-design/icons";
import React from "react";
import { FaTiktok } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const apiUrl = process.env.REACT_APP_BASE_URL;

const Footer = () => {
    return (
        <>
            <footer className='relative z-10 bg-footerBackground pt-10 pb-10 px-10 mr-2 ml-1 my-2.5 bg-cover xl:h-[260px] lg:h-[300px]'>
                <div className="container mx-auto">
                    <div className="mb-1 xl:translate-x-28 lg:translate-x-16 md:translate-x-8 sm:translate-x-20 xs:translate-x-16 xxs:translate-x-12">
                        <a href="http://www.bsi.com.vn"
                            target="_blank"
                            rel="noopener noreferrer">
                            <img
                                className="w-[125px] h-[45px]"
                                src={`${apiUrl}/resources/icons/logo-beta-reverse.png`}
                                alt="Beta logo"
                            />
                        </a>
                    </div>
                    <div className="md:flex sm:block">
                        <div className="md:w-[30%] sm:w-full">
                            <div className="w-full">
                                <h4 className="text-[#FFD300] lg:mb-3 md:mb-1 font-semibold uppercase xs:text-xl sm:text-base md:text-sm lg:text-[14px] xl:text-xl">
                                    Công ty cổ phần chứng khoán BETA
                                </h4>
                                <div className="text-white text-justify md:text-xs lg:text-[15px] xl:text-base">Công ty Cổ phần Chứng khoán BETA được thành lập vào ngày 06/12/2007, sau hơn 15 năm phát triển không ngừng, BETA từng bước khẳng định vị thế của mình trên thị trường chứng khoán Việt Nam. BETA hướng tới sự ổn định và phát triển bền vững nguồn tài chính cho từng khách hàng.</div>

                                <div className="mb-10 w-full">
                                    <div className="mb-3 mt-3 flex items-center xs:translate-x-[35px] sm:translate-x-[65px] mb:translate-x-[60px] lg:translate-x-[35px] xl:translate-x-[75px]">
                                        <a href="https://www.facebook.com/congtychungkhoanbeta" target="_blank" rel="noopener noreferrer" className="text-white mx-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5]">
                                            <FacebookOutlined style={{ fontSize: '35px' }} />
                                        </a>
                                        <a href="https://www.youtube.com/channel/UCEDt7r9WgLDjUeM_PRdQB7g" target="_blank" rel="noopener noreferrer" className="text-white mx-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5]">
                                            <YoutubeOutlined style={{ fontSize: '35px' }} />
                                        </a>
                                        <a href="https://www.bsi.com.vn" target="_blank" rel="noopener noreferrer" className="text-white mx-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5]">
                                            <GlobalOutlined style={{ fontSize: '35px' }} />
                                        </a>
                                        <a href="/" target="_blank" rel="noopener noreferrer" className="text-white mx-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5]">
                                            <FaTiktok style={{ fontSize: '35px' }} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-[70%] sm:w-full">
                            <div className="grid sm:grid-cols-2 xs:grid-cols-none">
                                <div className="md:pl-14 sm:pl-0">
                                    <h4 className="text-[#FFD300] mb-3 font-semibold uppercase xs:text-xl sm:text-base md:text-sm lg:text-[14px] xl:text-xl">Trụ sở chính</h4>
                                    <div>
                                        <ul className="list-none text-white">
                                            <li className="mb-2">
                                                <EnvironmentOutlined /> <span className="lg:text-sm xl:text-base md:text-xs xs:text-[15px] xxs:text-[11px]">55 Nam Kỳ Khởi Nghĩa, Quận 1, TP.HCM</span>
                                            </li>
                                            <li className="mb-2">
                                                <PhoneOutlined /> <a href="tel:02839142929" className="no-underline text-white sm:text-sm lg:text-base md:text-xs">Điện thoại: 02839142929</a>
                                            </li>
                                            <li className="mb-2">
                                                <MailOutlined /> <a href="mailto:support@bsi.com.vn" className="no-underline text-white sm:text-sm lg:text-base md:text-xs">support@bsi.com.vn</a>
                                            </li>
                                            <li className="mb-2">
                                                <a href="https://www.bsi.com.vn" target="_blank"
                                                    rel="noopener noreferrer" className="no-underline text-white mb-2 inline-block text-base leading-loose sm:text-sm lg:text-base md:text-xs">
                                                    <GlobalOutlined /> https://www.bsi.com.vn
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="sm:px-3 xs:px-0">
                                    <div className="mb-6 w-full">
                                        <h4 className="text-[#FFD300] mb-3 font-semibold uppercase xs:text-xl sm:text-base md:text-sm lg:text-[14px] xl:text-xl">Truy cập nhanh</h4>
                                        <div className="grid md:grid-cols-2 sm:grid-cols-none xs:grid-cols-2">
                                            <ul className="list-none">
                                                <li>
                                                    <NavLink
                                                        to="/"
                                                        className="no-underline text-white inline-block leading-loose"
                                                    >
                                                        <DoubleRightOutlined /> <span className="lg:text-base md:text-sm">Trang chủ</span>
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                        to="/thi-truong"
                                                        className="no-underline text-white inline-block leading-loose"
                                                    >
                                                        <DoubleRightOutlined /> <span className="lg:text-base md:text-sm">Thị trường</span>
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                        to="/nganh"
                                                        className="no-underline text-white inline-block leading-loose"
                                                    >
                                                        <DoubleRightOutlined /> <span className="lg:text-base md:text-sm">Ngành</span>
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                        to="/co-phieu"
                                                        className="no-underline text-white inline-block leading-loose"
                                                    >
                                                        <DoubleRightOutlined /> <span className="lg:text-base md:text-sm">Cổ phiếu</span>
                                                    </NavLink>
                                                </li>
                                            </ul>

                                            <ul className="list-none">
                                                <li>
                                                    <NavLink
                                                        to="/vi-mo"
                                                        className="no-underline text-white inline-block leading-loose"
                                                    >
                                                        <DoubleRightOutlined /> <span className="lg:text-base md:text-sm">Vĩ mô</span>
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                        to="/cong-cu-dau-tu"
                                                        className="no-underline text-white inline-block leading-loose"
                                                    >
                                                        <DoubleRightOutlined /> <span className="lg:text-base md:text-xs">Công cụ đầu tư</span>
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                        to="/trung-tam-tin-tuc"
                                                        className="no-underline text-white inline-block leading-loose"
                                                    >
                                                        <DoubleRightOutlined /> <span className="lg:text-base md:text-[11px] xs:text-[14px]">Trung tâm tin tức</span>
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
