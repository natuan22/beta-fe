import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import './style/backToTop.scss'
import { FaAngleUp } from "react-icons/fa";
const apiUrl = process.env.REACT_APP_BASE_URL;

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
        <div className="z-40 btnBackToTop-container ">
          <span
            onClick={handleScrollToTop}
            className="btnBackToTop flex flex-col justify-between items-center fixed cursor-pointer bottom-[10%] right-[1%] z-20 border-none rounded-full transition-all 500ms "
          >
            <div className="img-container ">
              <img src={`${apiUrl}/resources/icons/rocket.png`} className="  w-[115px] h-[135px] animationBtn bg-transparent   " alt="btnBackToTop" />
            </div>
            <div className="icon-container text-white flex flex-col justify-center items-center  absolute bottom-[25px]  ">
              <FaAngleUp className="icon-1 text-xl translate-y-[20px] " />
              <FaAngleUp className="icon-2 text-2xl" />
              <FaAngleUp className="icon-3 text-3xl translate-y-[-20px]" />
            </div>
          </span>
        </div>
      )}
    </div>
  );
};

export default LayOut;
