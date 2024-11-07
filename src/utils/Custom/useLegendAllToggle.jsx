import { useState, useEffect } from "react";

const useLegendAllToggle = (initialState) => {
  const [isAllLegendSelected, setIsAllLegendSelected] = useState(initialState);
  const [title, setTitle] = useState(
    initialState ? "Bỏ tất cả" : "Chọn tất cả",
  );

  useEffect(() => {
    if (!isAllLegendSelected) {
      setTitle("Chọn tất cả");
    } else {
      setTitle("Bỏ tất cả");
    }
  }, [isAllLegendSelected]);

  const toggleLegend = () => {
    setIsAllLegendSelected(
      (prevIsAllLegendSelected) => !prevIsAllLegendSelected,
    );
  };

  return {
    isAllLegendSelected,
    title,
    toggleLegend,
  };
};

export default useLegendAllToggle;
