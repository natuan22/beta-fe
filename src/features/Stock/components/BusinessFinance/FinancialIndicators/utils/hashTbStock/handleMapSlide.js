export const handleMapSlide = (hashTb) => {
    return hashTb.map((slideObj, index) => {
        console.log(index + 1)
        const Component = slideObj.component; // Lấy tên component từ slideObj
        const componentLabels = slideObj.labels;
        console.log(componentLabels)
        return <Component key={index} labels={componentLabels} />;
    });
};
