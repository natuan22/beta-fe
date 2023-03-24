import React from "react";
import Header from "../components/Header";

const LayOut = (props) => {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
};

export default LayOut;
