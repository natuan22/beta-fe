import React from "react";
import LayOut from "../../HOCs/Layout";

const TestFiinTrade = () => {
  return (
    <LayOut>
      <div className="container mx-auto">
        <div
          className="fiin-component h-[800px]"
          data-component="Charting"
          data-language="vi"
          data-theme="Light"
          data-group="1"
          data-code="FPT"
        ></div>
      </div>
    </LayOut>
  );
};

export default TestFiinTrade;
