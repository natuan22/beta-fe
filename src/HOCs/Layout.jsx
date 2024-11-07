import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { FaArrowUp, FaAngleUp } from "react-icons/fa";
import "./utils/backToTop.scss";
const LayOut = (props) => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // useEffect(() => {
  //   const scriptZalo = document.createElement("script");
  //   scriptZalo.src = "https://sp.zalo.me/plugins/sdk.js";
  //   document.body.appendChild(scriptZalo);

  //   return () => {
  //     document.body.removeChild(scriptZalo);
  //   };
  // }, []);

  return (
    <div className="relative">
      <header className="sticky top-0 z-40">
        <Header />
      </header>
      <section className="relative">{props.children}</section>
      {showScrollButton && (
        <div className="btnBackToTop-container z-30 fixed bottom-[120px] md:right-[66px] sm:right-[35px] xs:right-[30px] xxs:right-[30px] opacity-80 transition-all duration-500 hover:opacity-100">
          <button
            style={{ backgroundColor: "orange" }}
            className="cursor-pointer text-xl text-white rounded-full border-0 z-30 px-2 py-1 bg-transparent"
            onClick={handleScrollToTop}
          >
            <FaArrowUp />
          </button>
          <div className="icon-container text-white z-[-1] absolute right-[10%] xxs:hidden">
            <div className="flex flex-col justify-center items-center relative translate-x-[-14px] ">
              <FaAngleUp className="icon-1 text-xl absolute bottom-0" />
              <FaAngleUp className="icon-2 text-2xl absolute bottom-0" />
              <FaAngleUp className="icon-3 text-3xl absolute bottom-0" />
            </div>
          </div>
        </div>
      )}
      <div
        className="zalo-chat-widget !bottom-[52px] md:!right-[52px] sm:!right-[25px] xs:!right-[20px] xxs:!right-[20px]"
        data-oaid="1623670409453822014"
        data-welcome-message="Rất vui khi được hỗ trợ bạn!"
        data-autopopup="0"
        data-width="300"
        data-height="300"
      ></div>
    </div>
  );
};

export default LayOut;
