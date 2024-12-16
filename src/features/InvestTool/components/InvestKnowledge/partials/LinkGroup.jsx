import React, { useEffect, useState } from "react";

const LinkGroup = ({ children, activecondition, index, onActivate }) => {
  const [open, setOpen] = useState(activecondition);

  const handleClick = () => {
    setOpen(!open);
    onActivate(index);
  };

  useEffect(() => {
    setOpen(activecondition);
  }, [activecondition]);
  // bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${
  //   activecondition &&
  //   "from-[#0076ff]/[0.14] dark:from-[#0076ff]/[0.26] to-[#0076ff]/[0.06]"
  // }
  return (
    <li
      className={`list-none px-4 py-3 mb-3 last:mb-0 rounded-lg border-solid border-[1px] ${
        activecondition
          ? "text-[#faad14] border-[#faad14]"
          : "text-gray-800 dark:text-gray-100 border-[#12418d]"
      }`}
    >
      {children(handleClick, open)}
    </li>
  );
};

export default LinkGroup;
