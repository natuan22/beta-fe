import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { FaArrowUp, FaAngleUp } from "react-icons/fa";
import './utils/backToTop.scss'
const LayOut = (props) => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
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

  return (
    <div className="relative">
      <header>
        <Header />
      </header>
      <section className="relative">
        {props.children}
      </section>
      {showScrollButton && (
        <div className="btnBackToTop-container fixed bottom-[10%] right-[2%] z-30  xxs:right-[50%] xxs:bottom-[-4%] xxs:translate-x-[50%] xxs:hover:translate-y-[-20px] opacity-80 transition-all duration-500 hover:opacity-100 ">
          <button
            className=" bg-orange-400  text-xl text-white rounded-full border-0  z-30 px-2 py-1  bg-transparent  "
            onClick={handleScrollToTop} >
            <FaArrowUp />
          </button>
          <div className="icon-container text-white z-[-1] absolute right-[10%]  xxs:hidden ">
            <div className="flex flex-col justify-center items-center relative translate-x-[-14px] ">
              <FaAngleUp className="icon-1 text-xl absolute bottom-0  " />
              <FaAngleUp className="icon-2 text-2xl absolute bottom-0   " />
              <FaAngleUp className="icon-3 text-3xl absolute bottom-0   " />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LayOut;
