export const hashTbStockFilter = {
    "Thông tin doanh nghiệp": [
        { name: "Vốn hóa (tỷ VNĐ)", key: "marketCap" },
        { name: "Thị giá ( x1000 vnđ)", key: "closePrice" },
        { name: "KL cổ phiếu lưu hành (triệu CP)", key: "shareout" },

    ],
    "Dữ liệu giao dich": [
        { name: "Tổng KLGD trong phiên (triệu)", key: "totalVol" },
        { name: "KLGD trung bình 5 phiên (triệu)", key: "totalVol_AVG_5" },
        { name: "KLGD trung bình 10 phiên (triệu)", key: "totalVol_AVG_10" },
        { name: "KLGD thấp nhất 5 phiên (triệu)", key: "totalVol_MIN_5" },
        { name: "KLGD thấp nhất 10 phiên (triệu)", key: "totalVol_MIN_10" },
        { name: "KLGD cao nhất 5 phiên (triệu)", key: "totalVol_MAX_5" },
        { name: "KLGD cao nhất 10 phiên (triệu)", key: "totalVol_MAX_10" },
    ],

    "Kết quả kinh doanh": [
        {
            name: "Tăng trưởng Doanh thu (Quý gần nhất so với cùng kỳ) ",
            key: "growthRevenueSamePeriod",
        },
        {
            name: "Tăng trưởng Doanh thu (Quý gần nhất so kỳ liền kề) ",
            key: "growthRevenue",
        },
        {
            name: "Tăng trưởng LNST (Quý gần nhất so với cùng kỳ) ",
            key: "growthProfitBeforeRevenueSamePeriod",
        },
        {
            name: "Tăng trưởng LNST (Quý gần nhất so kỳ liền kề) ",
            key: "growthProfitBeforeRevenue",
        },
        {
            name: "Tăng trưởng EPS (Quý gần nhất so với cùng kỳ) ",
            key: "growthEPSSamePeriod",
        },
        {
            name: "Tăng trưởng EPS (Quý gần nhất so kỳ liền kề) ",
            key: "growthEPS",
        },
    ],

    "Các đường xu hướng": [{ name: "Swing high", key: "" }],
    "Chỉ số tài chính": [
        { name: "P/E", key: "PE" },
        { name: "P/B", key: "PB" },
        { name: "EPS", key: "EPS" },
        { name: "BVPS", key: "BVPS" },
        { name: "Lợi nhuận trên tài sản (ROA)", key: "ROA" },
        { name: "Lợi nhuận trên vốn chủ sở hữu (ROE)", key: "ROE" },
    ],

    "Chỉ báo kỹ thuật": [
        { name: "MA5", key: "ma5" },
        { name: "MA10", key: "ma10" },
        { name: "EMA5", key: "ema5" },
        { name: "EMA10", key: "ema10" },
        { name: "RSI(14)", key: "rsi" },
    ],
};

export const hashTbIndustry = {
    'Bảo hiểm': 'baoHiem',
    'Bất động sản': 'batDongSan',
    'Công nghệ': 'congNghe',
    'Dầu khí': 'dauKhi',
    'Dịch vụ bán lẻ': 'banLe',
    'Dịch vụ tài chính': 'taiChinh',
    'Dịch vụ tiện ích': 'tienIch',
    'Đồ dùng cá nhân và đồ gia dụng': 'doGiaDung',
    'Du lịch & Giải trí': 'duLich',
    'Hàng hóa và dịch vụ công nghiệp': 'hangHoa',
    'Hóa chất': 'hoaChat',
    'Ngân hàng': 'nganHang',
    'Ôtô & linh kiện phụ tùng ': 'oto',
    'Phương tiện truyền thông': 'truyenThong',
    'Thực phẩm & Đồ uống': 'thucPham',
    'Viễn thông': 'vienThong',
    'Xây dựng & Vật liệu': 'xayDung',
    'Tài nguyên': 'taiNguyen',
    'Y tế': 'yTe',
}

export const hashTbExchange = {
    'HOSE': 'HOSE',
    'HNX': 'HNX',
    'UPCOM': 'UPCOM',
}