import React from "react";
import Error404 from "../../../../Navigation/Error404";
import ChartBHStatementsCashFlows from "./ChartStatementsCashFlows/ChartBHStatementsCashFlows";
import ChartCKStatementsCashFlows from "./ChartStatementsCashFlows/ChartCKStatementsCashFlows";
import ChartCTCPStatementsCashFlows from "./ChartStatementsCashFlows/ChartCTCPStatementsCashFlows";
import ChartNHStatementsCashFlows from "./ChartStatementsCashFlows/ChartNHStatementsCashFlows";

const ChartStatementsCashFlows = ({ queryApiBusinessFinance }) => {
  const typeComponentMap = {
    BH: ChartBHStatementsCashFlows,
    CTCP: ChartCTCPStatementsCashFlows,
    CK: ChartCKStatementsCashFlows,
    NH: ChartNHStatementsCashFlows,
  };

  const ChartComponent =
    typeComponentMap[queryApiBusinessFinance.type] || Error404;

  return (
    <div>
      <ChartComponent queryApiBusinessFinance={queryApiBusinessFinance} />
    </div>
  );
};

export default ChartStatementsCashFlows;
