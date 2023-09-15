import { CaretDownOutlined, CaretRightOutlined, CaretUpOutlined } from "@ant-design/icons";

export function getColor(item) {
    let color = "";
    if (item === 0) color = "text-yellow-500";
    else if (item < '0') color = "text-red-500";
    else color = "text-green-500";

    return color;
}

export function getColorText(item) {
    let color = "";
    let nameArr = ['P/E', 'P/B', 'EPS', 'ROE', 'ROA']

    if (item === item.toUpperCase() && !nameArr.includes(item)) color = "text-[#13CCC1]";
    else color = "dark:text-white text-black";

    return color;
}

export function getColorWithValueReference(referenceIndex, item) {
    let color = "";
    if (item === referenceIndex) color = "text-yellow-500";
    else if (item < referenceIndex) color = "text-red-500";
    else color = "text-green-500";

    return color;
}

export function getIcon(item) {
    if (item === 0) return <CaretRightOutlined style={{ fontSize: "18px" }} />;
    else if (item < "0")
        return <CaretDownOutlined style={{ fontSize: "18px" }} />;
    else return <CaretUpOutlined style={{ fontSize: "18px" }} />;
}

export function getText(item) {
    let text = ''
    if (item === 0)
        text = 'Trung tính'
    else if (item < '0')
        text = 'Tiêu cực'
    else
        text = 'Tích cực'

    return text
}

export function getTextSellBuy(item) {
    let text = <span></span>;
    if (item < "0")
        text = <span className='text-red-500'>Bán ròng</span>;
    else
        text = <span className='text-green-500'>Mua ròng</span>;

    return text;
}

export function getTextColorRating(item) {
    let text = <span></span>;
    let color = ''

    switch (item) {
        case 1:
            text = <span className='text-[#FF0000]'>Rất tệ</span>;
            color = 'text-[#FF0000]'
            break;
        case 2:
            text = <span className='text-[#FF0000]'>Tệ</span>;
            color = 'text-[#FF0000]'
            break;
        case 3:
            text = <span className='text-[#FCFF71]'>Khá</span>;
            color = 'text-[#FCFF71]'
            break;
        case 4:
            text = <span className='text-[#05FF00]'>Tốt</span>;
            color = 'text-[#05FF00]'
            break;
        case 5:
            text = <span className='text-[#05FF00]'>Rất tốt</span>;
            color = 'text-[#05FF00]'
            break;
        default:
            break;
    }
    return { text, color };
}

export function getColorByIndex(index) {
    const colors = ['#65FFFF', '#F9F01B']; // xanh và vàng
    return colors[index % colors.length];
}

export function getColorForHeaderRating(item) {
    let color = ''

    switch (item) {
        case 'Đạt':
            color = 'text-[#05FF00]'
            break;
        case 'Không đạt':
            color = 'text-[#FF0000]'
            break;
        case 'Bình thường':
            color = 'text-[#FCFF71]'
            break;
        default:
            break;
    }
    return color
}
