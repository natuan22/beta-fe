export const handleMapSlide = (hashTb) => {
  return hashTb.map((slideObj, index) => {
    const Component = slideObj.component; // Lấy tên component từ slideObj
    const componentLabels = slideObj.labels;
    return <Component key={index} labels={componentLabels} />;
  });
};
