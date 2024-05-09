import formatNumberCurrency from "./formatNumberCurrency";

export const checkUpperCaseAndValue = (name, value) => {
  let nameArr = ["P/E", "P/B", "EPS", "ROE", "ROA"];

  if (name === name.toUpperCase() && !nameArr.includes(name) && value === 0) {
    return <span></span>;
  } else if (name !== name.toUpperCase() && !nameArr.includes(name) && value === 0) {
    return <span>-</span>;
  } else if (name === "ROA" || name === "ROE") {
    return <span>{formatNumberCurrency(value)}%</span>;
  } else {
    return formatNumberCurrency(value);
  }
};
