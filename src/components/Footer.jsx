import { DoubleRightOutlined, EnvironmentOutlined, FacebookOutlined, GlobalOutlined, MailOutlined, PhoneOutlined, YoutubeOutlined } from "@ant-design/icons";
import React from "react";
import { FaTiktok } from "react-icons/fa";

const Footer = () => {
    return (
        <>
            <footer className="relative z-10 bg-gradient-to-r from-[#113362] to-[#385E69] pt-10 pb-10 px-10 mx-2 my-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-2">
                        <div className="w-full">
                            <div className="mb-10 w-full">
                                <h4 className="text-[#38B6FF] mb-6 uppercase lg:text-xl mb:text-sm">
                                    Công ty cổ phần chứng khoán BETA
                                </h4>
                                <div>
                                    <ul className="list-none text-[#19D216]">
                                        <li>
                                            <EnvironmentOutlined /> 55 Nam Kỳ Khởi Nghĩa, Quận 1, TP.HCM
                                        </li>
                                        <li>
                                            <PhoneOutlined /> Điện thoại: (028) 3914.2929
                                        </li>
                                        <li>
                                            <MailOutlined /> support@bsi.com.vn
                                        </li>
                                        <li>
                                            <a href="https://www.bsi.com.vn" className="no-underline text-[#19D216] mb-2 inline-block text-base leading-loose">
                                                <GlobalOutlined /> https://www.bsi.com.vn
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mb-10 w-full ">
                                    <h4 className="text-[#38B6FF] text-lg  font-semibold uppercase xl:translate-x-[70px] lg:translate-x-[60px] mb:translate-x-[60px] sm:translate-x-[40px]">Kết nối với chúng tôi</h4>
                                    <div className="mb-6 mt-3 flex items-center xl:translate-x-[80px] lg:translate-x-[70px] mb:translate-x-[60px] sm:translate-x-[50px]">
                                        <a href="javascript:void(0)" className="text-white mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5] sm:mr-4 lg:mr-3 xl:mr-4">
                                            <FacebookOutlined style={{ fontSize: '30px' }} />
                                        </a>
                                        <a href="javascript:void(0)" className="text-white mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5] sm:mr-4 lg:mr-3 xl:mr-4">
                                            <YoutubeOutlined style={{ fontSize: '30px' }} />
                                        </a>
                                        <a href="javascript:void(0)" className="text-white mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5] sm:mr-4 lg:mr-3 xl:mr-4">
                                            <GlobalOutlined style={{ fontSize: '30px' }} />
                                        </a>
                                        <a href="javascript:void(0)" className="text-white mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5] sm:mr-4 lg:mr-3 xl:mr-4">
                                            <FaTiktok style={{ fontSize: '30px' }} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="w-full px-3">
                                <div className="mb-6 w-full">
                                    <h4 className="text-[#38B6FF] mb-6 lg:text-lg mb:text-base sm:text-sm font-semibold">Truy cập nhanh</h4>
                                    <ul className="list-none">
                                        <li>
                                            <a href="javascript:void(0)" className="no-underline text-white mb-2 inline-block xl:text-base lg:text-base mb:text-base sm:text-sm leading-loose">
                                                <DoubleRightOutlined style={{ color: '#D42428' }} /> Trang chủ
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)" className="no-underline text-white mb-2 inline-block xl:text-base lg:text-base mb:text-base sm:text-sm leading-loose">
                                                <DoubleRightOutlined style={{ color: '#D42428' }} /> Thị trường
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)" className="no-underline text-white mb-2 inline-block xl:text-base lg:text-base mb:text-base sm:text-sm leading-loose">
                                                <DoubleRightOutlined style={{ color: '#D42428' }} /> Vĩ mô
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)" className="no-underline text-white mb-2 inline-block xl:text-base lg:text-base mb:text-base sm:text-sm leading-loose">
                                                <DoubleRightOutlined style={{ color: '#D42428' }} /> Quốc tế
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="w-full px-3">
                                <div className="mb-6 w-full">
                                    <h4 className="text-[#38B6FF] mb-6 lg:text-lg mb:text-base sm:text-sm font-semibold">Danh mục sản phẩm</h4>
                                    <ul className="list-none">
                                        <li>
                                            <a href="javascript:void(0)" className="no-underline text-white mb-2 inline-block xl:text-base lg:text-base mb:text-base sm:text-sm leading-loose">
                                                <DoubleRightOutlined style={{ color: '#D42428' }} /> B-Signal
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)" className="no-underline text-white mb-2 inline-block xl:text-base lg:text-base mb:text-base sm:text-sm leading-loose">
                                                <DoubleRightOutlined style={{ color: '#D42428' }} /> E-Market
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)" className="no-underline text-white mb-2 inline-block xl:text-base lg:text-base mb:text-base sm:text-sm leading-loose">
                                                <DoubleRightOutlined style={{ color: '#D42428' }} /> T-Info
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)" className="no-underline text-white mb-2 inline-block xl:text-base lg:text-base mb:text-base sm:text-sm leading-loose">
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
