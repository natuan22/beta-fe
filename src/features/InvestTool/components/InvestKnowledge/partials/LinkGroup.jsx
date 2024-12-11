import React, { useState } from "react";

const LinkGroup = ({ children, activecondition }) => {
  const [open, setOpen] = useState(activecondition);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <li
      className={`list-none pl-4 pr-3 py-3 rounded-lg bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${
        activecondition &&
        "from-[#0076ff]/[0.14] dark:from-[#0076ff]/[0.26] to-[#0076ff]/[0.06]"
      }`}
    >
      {children(handleClick, open)}
    </li>
  );
};

export default LinkGroup;
