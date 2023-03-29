import { DoubleRightOutlined, EnvironmentOutlined, FacebookOutlined, GlobalOutlined, MailOutlined, PhoneOutlined, YoutubeOutlined } from "@ant-design/icons";
import React from "react";
import { FaTiktok } from "react-icons/fa";

const Footer = () => {
    return (
        <>
            <footer className="relative z-10 bg-gradient-to-r from-[#113362] to-[#385E69] pt-10 pb-10 px-10 mr-2 ml-1 my-4">
                <div className="container mx-auto">
                    <div className="grid xs:grid-cols-none md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                        <div className="w-full">
                            <div className="mb-10 w-full">
                                <h4 className="text-[#38B6FF] mb-6 uppercase xs:text-xl md:text-sm lg:text-xl">
                                    Công ty cổ phần chứng khoán BETA
                                </h4>
                                <div>
                                    <ul className="list-none text-[#19D216]">
                                        <li className="xs:text-lg md:text-base lg:text-lg xl:text-lg">
                                            <EnvironmentOutlined /> 55 Nam Kỳ Khởi Nghĩa, Quận 1, TP.HCM
                                        </li>
                                        <li className="xs:text-lg md:text-base lg:text-lg xl:text-lg">
                                            <PhoneOutlined /> <a href="tel:02839142929" className="no-underline text-[#19D216]">Điện thoại: (028) 3914.2929</a>
                                        </li>
                                        <li className="xs:text-lg md:text-base lg:text-lg xl:text-lg">
                                            <MailOutlined /> <a href="mailto:support@bsi.com.vn" className="no-underline text-[#19D216]">support@bsi.com.vn</a>
                                        </li>
                                        <li className="xs:text-lg md:text-base lg:text-lg xl:text-lg">
                                            <a href="https://www.bsi.com.vn" className="no-underline text-[#19D216] mb-2 inline-block text-base leading-loose">
                                                <GlobalOutlined /> https://www.bsi.com.vn
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mb-10 w-full">
                                    <h4 className="text-[#38B6FF] text-lg font-semibold xs:text-xl uppercase xs:translate-x-[30px] mb:translate-x-[60px] lg:translate-x-[60px] xl:translate-x-[70px]">Kết nối với chúng tôi</h4>
                                    <div className="mb-6 mt-3 flex items-center xs:translate-x-[35px] mb:translate-x-[60px] lg:translate-x-[65px] xl:translate-x-[75px]">
                                        <a href="https://www.facebook.com/bsi.com.vn" className="text-white mx-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5]">
                                            <FacebookOutlined style={{ fontSize: '40px' }} />
                                        </a>
                                        <a href="https://www.youtube.com/channel/UCEDt7r9WgLDjUeM_PRdQB7g" className="text-white mx-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5]">
                                            <YoutubeOutlined style={{ fontSize: '40px' }} />
                                        </a>
                                        <a href="https://www.bsi.com.vn" className="text-white mx-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5]">
                                            <GlobalOutlined style={{ fontSize: '40px' }} />
                                        </a>
                                        <a href="/" className="text-white mx-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5]">
                                            <FaTiktok style={{ fontSize: '40px' }} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="w-full px-3">
                                <div className="mb-6 w-full">
                                    <h4 className="text-[#38B6FF] mb-6 xs:mb-[23px] md:mb-[45px] lg:mb-6 xl:mb-6 mb:text-base lg:text-lg font-semibold">Truy cập nhanh</h4>
                                    <ul className="list-none">
                                        <li>
                                            <a href="/" className="no-underline text-white mb-2 inline-block mb:text-base lg:text-base xl:text-base leading-loose">
                                                <DoubleRightOutlined style={{ color: '#D42428' }} /> Trang chủ
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/thi-truong" className="no-underline text-white mb-2 inline-block mb:text-base lg:text-base xl:text-base leading-loose">
                                                <DoubleRightOutlined style={{ color: '#D42428' }} /> Thị trường
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/vi-mo" className="no-underline text-white mb-2 inline-block mb:text-base lg:text-base xl:text-base leading-loose">
                                                <DoubleRightOutlined style={{ color: '#D42428' }} /> Vĩ mô
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/quoc-te" className="no-underline text-white mb-2 inline-block mb:text-base lg:text-base xl:text-base leading-loose">
                                                <DoubleRightOutlined style={{ color: '#D42428' }} /> Quốc tế
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="w-full px-3">
                                <div className="mb-6 w-full">
                                    <h4 className="text-[#38B6FF] mb-6 mb:text-base lg:text-lg font-semibold">Danh mục sản phẩm</h4>
                                    <ul className="list-none">
                                        <li>
                                            <a href="B-Signal" className="no-underline text-white mb-2 inline-block mb:text-base lg:text-base xl:text-base leading-loose">
                                                <DoubleRightOutlined style={{ color: '#D42428' }} /> B-Signal
                                            </a>
                                        </li>
                                        <li>
                                            <a href="E-Market" className="no-underline text-white mb-2 inline-block mb:text-base lg:text-base xl:text-base leading-loose">
                                                <DoubleRightOutlined style={{ color: '#D42428' }} /> E-Market
                                            </a>
                                        </li>
                                        <li>
                                            <a href="T-Info" className="no-underline text-white mb-2 inline-block mb:text-base lg:text-base xl:text-base leading-loose">
                                                <DoubleRightOutlined style={{ color: '#D42428' }} /> T-Info
                                            </a>
                                        </li>
                                        <li>
                                            <a href="A-Report" className="no-underline text-white mb-2 inline-block mb:text-base lg:text-base xl:text-base leading-loose">
                                                <DoubleRightOutlined style={{ color: '#D42428' }} /> A-Report
                                            </a>
                                        </li>
                                    </ul>
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
