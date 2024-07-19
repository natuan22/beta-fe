import React, { useEffect } from "react";
import LayOut from "../../HOCs/Layout";

const resourceURL = process.env.REACT_APP_RESOURCE_URL;

const TestFiinTrade = () => {
  useEffect(() => {
    const scripts = [
      `${resourceURL}/resources/fintrade/jquery-3.5.1.slim.min.js`,
      `${resourceURL}/resources/fintrade/signalr.min.js`,
      `${resourceURL}/resources/fintrade/fiintrade-init.js`,
    ];

    // Tạo và thêm các script khác
    const scriptElements = scripts.map((src) => {
      const script = document.createElement("script");
      script.src = src;
      document.body.appendChild(script);
      return script;
    });

    // Tạo và thêm script fiintrade với type="text/javascript"
    const scriptFiintrade = document.createElement("script");
    scriptFiintrade.src = `${resourceURL}/resources/fintrade/fiintrade.js`;
    scriptFiintrade.type = "text/javascript";
    document.body.appendChild(scriptFiintrade);
    scriptElements.push(scriptFiintrade);

    // Clean up các script khi component bị unmount
    return () => {
      scriptElements.forEach((script) => {
        document.body.removeChild(script);
      });
    };
  }, []);

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
