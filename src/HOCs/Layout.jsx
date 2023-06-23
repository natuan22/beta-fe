import React from "react";
import Header from "../components/Header";
import { BsArrow90DegUp } from "react-icons/bs";
const LayOut = (props) => {
  return (
    <div className="relative">
      <header>
        <Header />
      </header>
      <section>
        {props.children}
      </section>
      <div className="sticky bottom-[10%]">
        <button className="text-white p-2 rounded-full border-none  absolute right-[5%] text-2xl bg-slate-400"><BsArrow90DegUp /></button>
      </div>
    </div>
  );
};

export default LayOut;
