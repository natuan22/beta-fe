import { removeDiacritics } from "../../../../../helper/removeDiacritics";

export const hashTbStockFilter = {
  "Thông tin cơ bản": [
    { name: "Sàn niêm yết", key: "floor", selectCondition: false, parametersType: 0 },
    { name: "Watchlist", key: "watchlist", selectCondition: false, parametersType: 1 },
    { name: "Ngành nghề kinh doanh", key: "LV4", selectCondition: false, parametersType: 2 },
  ],
  "Thông tin cổ đông": [
    { name: "Tỷ lệ sở hữu của nhà đầu tư nước ngoài", key: "TyleNDTNNdangnamgiu", selectCondition: true, parametersType: 3, select: [{value: 5, label: "5%"}, {value: 10, label: "10%"}, {value: 20, label: "20%"}, {value: 30, label: "30%"}, {value: 40, label: "40%"}] },
  ],
  "Thống kê giá": [
    { name: "Giá hiện tại", key: "closePrice", selectCondition: true, parametersType: 4 },
    { name: "Giá tăng vượt đỉnh", key: "max_", selectCondition: false, parametersType: 5, select: [{value: "1_week", label: "1 tuần"}, {value: "1_month", label: "1 tháng"}, {value: "3_month", label: "3 tháng"}, {value: "6_month", label: "6 tháng"}, {value: "1_year", label: "1 năm"}] },
    { name: "Giá giảm thủng đáy", key: "min_", selectCondition: false, parametersType: 5, select: [{value: "1_week", label: "1 tuần"}, {value: "1_month", label: "1 tháng"}, {value: "3_month", label: "3 tháng"}, {value: "6_month", label: "6 tháng"}, {value: "1_year", label: "1 năm"}] },
    { name: "Thay đổi giá hôm nay (%)", key: "perChange1D", selectCondition: true, parametersType: 4 },
    { name: "Thay đổi giá 1 tuần (%)", key: "perChange5D", selectCondition: true, parametersType: 4 },
    { name: "Thay đổi giá 1 tháng (%)", key: "perChange1M", selectCondition: true, parametersType: 4 },
    { name: "Thay đổi giá 3 tháng (%)", key: "perChange3M", selectCondition: true, parametersType: 4 },
    { name: "Thay đổi giá 6 tháng (%)", key: "perChange6M", selectCondition: true, parametersType: 4 },
    { name: "Thay đổi giá 1 năm (%)", key: "perChange1Y", selectCondition: true, parametersType: 4 },
    { name: "Beta", key: "beta", selectCondition: true, parametersType: 4 },
  ],
  "Khối lượng giao dịch": [
    { name: "Khối lượng giao dịch (cp)", key: "totalVol", selectCondition: true, parametersType: 3, select: [{value: 50000, label: "50.000"}, {value: 100000, label: "100.000"}, {value: 200000, label: "200.000"}, {value: 500000, label: "500.000"}, {value: 1000000, label: "1.000.000"}], defaultConditions: "about" },
    { name: "Tỷ lệ khối lượng Mua chủ động/Bán chủ động", key: "TyLeKLMBCD", selectCondition: true, parametersType: 3, select: [{value: 0.3, label: "0.3"}, {value: 0.5, label: "0.5"}, {value: 0.7, label: "0.7"}, {value: 1, label: "1"}, {value: 1.2, label: "1.2"}, {value: 1.3, label: "1.3"}, {value: 1.5, label: "1.5"}, {value: 1.8, label: "1.8"}, {value: 2, label: "2"}] },
    { name: "Khối lượng khớp lệnh vượt TB các ngày giao dịch (%)", key: "perChangeOmVol_", selectCondition: false, parametersType: 6, select1: [{value: "5d", label: "5 ngày"}, {value: "10d", label: "10 ngày"}, {value: "20d", label: "20 ngày"}, {value: "60d", label: "60 ngày"}], select: [{value: 20, label: "20%"}, {value: 30, label: "30%"}, {value: 50, label: "50%"}, {value: 100, label: "100%"}, {value: 150, label: "150%"}, {value: 200, label: "200%"}] },
    { name: "Khối lượng trung bình (cp)", key: "avg_totalVol_", selectCondition: true, parametersType: 6, select1: [{value: "5d", label: "5 ngày"}, {value: "10d", label: "10 ngày"}, {value: "20d", label: "20 ngày"}, {value: "60d", label: "60 ngày"}], select: [{value: 100000, label: "100.000"}, {value: 200000, label: "200.000"}, {value: 500000, label: "500.000"}, {value: 1000000, label: "1.000.000"}] },
    { name: "Khối lượng nước ngoài mua ròng (cp)", key: "KNnetVal", selectCondition: true, parametersType: 3, select1: [{value: -1000000, label: "-1.000.000"}, {value: -500000, label: "-500.000"}, {value: -200000, label: "-200.000"}, {value: -100000, label: "-100.000"}, {value: 100000, label: "100.000"}, {value: 200000, label: "200.000"}, {value: 500000, label: "500.000"}, {value: 1000000, label: "1.000.000"}] },
    { name: "Giá trị nước ngoài mua ròng (tỷ đồng)", key: "KNnetVol", selectCondition: true, parametersType: 3, select: [{value: -100, label: "-100"}, {value: -50, label: "-50"}, {value: -20, label: "-20"}, {value: -10, label: "-10"}, {value: -5, label: "-5"}, {value: 5, label: "5"}, {value: 10, label: "10"}, {value: 20, label: "20"}, {value: 50, label: "50"}, {value: 100, label: "100"}] },
  ],
  "Tín hiệu đường trung bình (MA)": [
    { name: "Giá hiện tại cắt lên đường SMA", key: "gia_hien_tai_cat_len_ma", selectCondition: false, parametersType: 7, select: [{value: "MA5", label: "MA5"}, {value: "MA10", label: "MA10"}, {value: "MA20", label: "MA20"}, {value: "MA50", label: "MA50"}, {value: "MA100", label: "MA100"}, {value: "MA200", label: "MA200"}], defaultValue: "MA5" },
    { name: "Giá hiện tại cắt xuống đường SMA", key: "gia_hien_tai_cat_xuong_ma", selectCondition: false, parametersType: 7, select: [{value: "MA5", label: "MA5"}, {value: "MA10", label: "MA10"}, {value: "MA20", label: "MA20"}, {value: "MA50", label: "MA50"}, {value: "MA100", label: "MA100"}, {value: "MA200", label: "MA200"}] },
    { name: "Giá hiện tại cắt lên đường EMA", key: "gia_hien_tai_cat_len_ema", selectCondition: false, parametersType: 7, select: [{value: "EMA5", label: "EMA5"}, {value: "EMA10", label: "EMA10"}, {value: "EMA20", label: "EMA20"}, {value: "EMA50", label: "EMA50"}, {value: "EMA100", label: "EMA100"}, {value: "EMA200", label: "EMA200"}] },
    { name: "Giá hiện tại cắt xuống đường EMA", key: "gia_hien_tai_cat_xuong_ema", selectCondition: false, parametersType: 7, select: [{value: "EMA5", label: "EMA5"}, {value: "EMA10", label: "EMA10"}, {value: "EMA20", label: "EMA20"}, {value: "EMA50", label: "EMA50"}, {value: "EMA100", label: "EMA100"}, {value: "EMA200", label: "EMA200"}] },
    { name: "SMA ngắn hạn cắt lên SMA dài hạn", key: "sma_ngan_han_cat_len_sma_dai_han", selectCondition: false, parametersType: 5, select: [{value: "ma5_ma20", label: "MA5 - MA20"}, {value: "ma10_ma50", label: "MA10 - MA50"}] },
    { name: "SMA ngắn hạn cắt xuống SMA dài hạn", key: "sma_ngan_han_cat_xuong_sma_dai_han", selectCondition: false, parametersType: 5, select: [{value: "ma5_ma20", label: "MA5 - MA20"}, {value: "ma10_ma50", label: "MA10 - MA50"}] },
  ],
  "Tín hiệu chỉ số sức mạnh tương đối (RSI)": [
    { name: "RSI(14) đi vào vùng quá mua", key: "rsi_di_vao_vung_qua_mua_", selectCondition: false, parametersType: 5, select: [{value: 70, label: "70"}, {value: 80, label: "80"}] },
    { name: "RSI(14) thoát khỏi vùng quá mua", key: "rsi_thoat_khoi_vung_qua_mua_", selectCondition: false, parametersType: 5, select: [{value: 70, label: "70"}, {value: 80, label: "80"}] },
    { name: "RSI(14) đang ở vùng quá mua", key: "rsi_dang_o_vung_qua_mua_", selectCondition: false, parametersType: 5, select: [{value: 70, label: "70"}, {value: 80, label: "80"}] },
    { name: "RSI(14) đi vào vùng quá bán", key: "rsi_di_vao_vung_qua_ban_", selectCondition: false, parametersType: 5, select: [{value: 20, label: "20"}, {value: 30, label: "30"}] },
    { name: "RSI(14) thoát khỏi vùng quá bán", key: "rsi_thoat_khoi_vung_qua_ban_", selectCondition: false, parametersType: 5, select: [{value: 20, label: "20"}, {value: 30, label: "30"}] },
    { name: "RSI(14) đang ở vùng quá bán", key: "rsi_dang_o_vung_qua_ban_", selectCondition: false, parametersType: 5, select: [{value: 20, label: "20"}, {value: 30, label: "30"}] },
  ],
  "Tín hiệu dải băng Bollinger (Bollinger Bands)": [
    { name: "Giá thoát ra ngoài biên trên Bollinger Band (20)", key: "gia_thoat_ra_bien_tren_bollinger_band", selectCondition: false, parametersType: 8 },
    { name: "Giá cắt xuống từ ngoài biên trên Bollinger Band (20)", key: "gia_cat_xuong_tu_ngoai_bien_tren_bollinger_band", selectCondition: false, parametersType: 8 },
    { name: "Giá đang ở ngoài biên trên Bollinger Band (20)", key: "gia_dang_o_ngoai_bien_tren_bollinger_band", selectCondition: false, parametersType: 8 },
    { name: "Giá thoát ra ngoài biên dưới Bollinger Band (20)", key: "gia_thoat_ra_bien_duoi_bollinger_band", selectCondition: false, parametersType: 8 },
    { name: "Giá cắt lên từ ngoài biên dưới Bollinger Band (20)", key: "gia_cat_len_tu_ngoai_bien_duoi_bollinger_band", selectCondition: false, parametersType: 8 },
    { name: "Giá đang ở ngoài biên dưới Bollinger Band (20)", key: "gia_dang_o_ngoai_bien_duoi_bollinger_band", selectCondition: false, parametersType: 8 },
  ],
  "Tín hiệu MACD": [
    { name: "MACD cắt lên đường tín hiệu", key: "macd_cat_len_duong_tin_hieu", selectCondition: false, parametersType: 8 },
    { name: "MACD đang ở trên đường tín hiệu", key: "macd_dang_o_tren_duong_tin_hieu", selectCondition: false, parametersType: 8 },
    { name: "MACD cắt xuống đường tín hiệu", key: "macd_cat_xuong_duong_tin_hieu", selectCondition: false, parametersType: 8 },
    { name: "MACD đang ở dưới đường tín hiệu", key: "macd_dang_o_duoi_duong_tin_hieu", selectCondition: false, parametersType: 8 },
    { name: "MACD cắt lên đường 0", key: "macd_cat_len_duong_0", selectCondition: false, parametersType: 8 },
    { name: "MACD đang ở trên đường 0", key: "macd_dang_o_tren_duong_0", selectCondition: false, parametersType: 8 },
    { name: "MACD cắt xuống đường 0", key: "macd_cat_xuong_duong_0", selectCondition: false, parametersType: 8 },
    { name: "MACD đang ở dưới đường 0", key: "macd_dang_o_duoi_duong_0", selectCondition: false, parametersType: 8 },
  ],
  "Kết quả kinh doanh": [
    { name: "Doanh thu thuần 4 quý gần nhất (tỷ đồng)", key: "doanh_thu_4_quy", selectCondition: true, parametersType: 4 },
    { name: "Lợi nhuận ròng 4 quý gần nhất (tỷ đồng)", key: "loi_nhuan_4_quy", selectCondition: true, parametersType: 4 },
    { name: "Tăng trưởng doanh thu quý gần nhất (% yoy)", key: "yoy_doanh_thu", selectCondition: true, parametersType: 4 },
    { name: "Tăng trưởng doanh thu quý gần nhất (% qoq)", key: "qoq_doanh_thu", selectCondition: true, parametersType: 4 },
    { name: "Tăng trưởng doanh thu 4 quý gần nhất (%)", key: "tang_truong_doanh_thu_4_quy", selectCondition: true, parametersType: 4 },
    { name: "Tăng trưởng lợi nhuận quý gần nhất (% yoy)", key: "yoy_loi_nhuan", selectCondition: true, parametersType: 4 },
    { name: "Tăng trưởng lợi nhuận quý gần nhất (% qoq)", key: "qoq_loi_nhuan", selectCondition: true, parametersType: 4 },
    { name: "Tăng trưởng lợi nhuận 4 quý gần nhất (%)", key: "tang_truong_loi_nhuan_4_quy", selectCondition: true, parametersType: 4 },
  ],
  "Định giá": [
    { name: "EPS (đồng/cp)", key: "EPS", selectCondition: true, parametersType: 4 },
    { name: "BVPS (đồng/cp)", key: "BVPS", selectCondition: true, parametersType: 4 },
    { name: "P/E (lần)", key: "PE", selectCondition: true, parametersType: 4, defaultConditions: "less"},
    { name: "P/S (lần)", key: "PS", selectCondition: true, parametersType: 4 },
    { name: "P/B (lần)", key: "PB", selectCondition: true, parametersType: 4 },
    { name: "Tăng trưởng EPS 4 quý gần nhất (%)", key: "perEPS", selectCondition: true, parametersType: 4 },
    { name: "Vốn hóa (tỷ đồng)", key: "marketCap", selectCondition: true, parametersType: 3, select: [{value: 100, label: "100"}, {value: 200, label: "200"}, {value: 500, label: "500"}, {value: 1000, label: "1.000"}, {value: 5000, label: "5.000"}, {value: 10000, label: "10.000"}, {value: 50000, label: "50.000"}] },
  ],
  "Khả năng sinh lợi": [
    { name: "Tỷ lệ lãi gộp quý gần nhất (%)", key: "grossProfitMargin", selectCondition: true, parametersType: 4 },
    { name: "Tỷ lệ lãi gộp 4 quý gần nhất (%)", key: "grossProfitMargin4Q", selectCondition: true, parametersType: 4 },
    { name: "Tỷ lệ lãi ròng quý gần nhất (%)", key: "netProfitMargin", selectCondition: true, parametersType: 4 },
    { name: "Tỷ lệ lãi ròng 4 quý gần nhất (%)", key: "netProfitMargin4Q", selectCondition: true, parametersType: 4 },
    { name: "Tỷ lệ EBIT quý gần nhất (%)", key: "EBITDAMargin", selectCondition: true, parametersType: 4 },
    { name: "Tỷ lệ EBIT 4 quý gần nhất (%)", key: "EBITDAMargin4Q", selectCondition: true, parametersType: 4 },
  ],
  "Sức mạnh tài chính": [
    { name: "Thanh toán hiện hành", key: "currentRatio", selectCondition: true, parametersType: 4 },
    { name: "Thanh toán nhanh", key: "quickRatio", selectCondition: true, parametersType: 4 },
    { name: "Khả năng thanh toán lãi vay", key: "interestCoverageRatio", selectCondition: true, parametersType: 4 },
    { name: "Nợ/Vốn chủ sở hữu", key: "DE", selectCondition: true, parametersType: 4 },
    { name: "Nợ trả lãi/Vốn chủ sở hữu", key: "NoTraLaiDivVonChuSoHuu", selectCondition: true, parametersType: 4 },
    { name: "Nợ/Tổng tài sản", key: "totalDebtToTotalAsset", selectCondition: true, parametersType: 4 },
    { name: "Nợ trả lãi/Tổng tài sản", key: "NoTraLaiDivTongTaiSan", selectCondition: true, parametersType: 4 },
  ],
  "Hiệu quả quản lý": [
    { name: "ROA (%)", key: "ROA", selectCondition: true, parametersType: 4 },
    { name: "ROE (%)", key: "ROE", selectCondition: true, parametersType: 4 },
  ],
  "Khả năng hoạt động": [
    { name: "Vòng quay tổng tài sản", key: "ATR", selectCondition: true, parametersType: 4 },
    { name: "Vòng quay hàng tồn kho", key: "VongQuayHangTonKho", selectCondition: true, parametersType: 4 },
    { name: "Vòng quay các khoản phải thu", key: "VongQuayCacKhoanPhaiThu", selectCondition: true, parametersType: 4 },
    { name: "Vòng quay tài sản ngắn hạn", key: "VongQuayTaiSanNganHan", selectCondition: true, parametersType: 4 },
  ],
  "Bộ lọc mẫu": [
    { name: "Bộ lọc 1", key: "", selectCondition: false },
    { name: "Bộ lọc 2", key: "", selectCondition: false },
    { name: "Bộ lọc 3", key: "", selectCondition: false },
    { name: "Bộ lọc 4", key: "", selectCondition: false },
    { name: "Bộ lọc 5", key: "", selectCondition: false },
  ],
  "Bộ lọc theo tín hiệu kỹ thuật BETA": [
    { name: "Tín hiệu đường xu hướng", key: "trendSignal", selectCondition: false, parametersType: 9, select: [{value: "Rất tiêu cực", label: "Rất tiêu cực"}, {value: "Tiêu cực", label: "Tiêu cực"}, {value: "Trung lập", label: "Trung lập"}, {value: "Tích cực", label: "Tích cực"}, {value: "Rất tích cực", label: "Rất tích cực"}] },
    { name: "Tín hiệu chỉ báo kỹ thuật", key: "technicalSignal", selectCondition: false, parametersType: 9, select: [{value: "Rất tiêu cực", label: "Rất tiêu cực"}, {value: "Tiêu cực", label: "Tiêu cực"}, {value: "Trung lập", label: "Trung lập"}, {value: "Tích cực", label: "Tích cực"}, {value: "Rất tích cực", label: "Rất tích cực"}] },
    { name: "Tín hiệu kỹ thuật tổng hợp", key: "generalSignal", selectCondition: false, parametersType: 9, select: [{value: "Rất tiêu cực", label: "Rất tiêu cực"}, {value: "Tiêu cực", label: "Tiêu cực"}, {value: "Trung lập", label: "Trung lập"}, {value: "Tích cực", label: "Tích cực"}, {value: "Rất tích cực", label: "Rất tích cực"}] },
    { name: "Tín hiệu đường xu hướng: chuyển trạng thái", key: "changeStatusTrend", selectCondition: false, parametersType: 10, select: [{value: "Rất tiêu cực sang tiêu cực", label: "Rất tiêu cực sang tiêu cực"}, {value: "Tiêu cực sang trung lập", label: "Tiêu cực sang trung lập"}, {value: "Trung lập sang Tích cực", label: "Trung lập sang Tích cực"}, {value: "Tích cực sang rất tích cực", label: "Tích cực sang rất tích cực"}, {value: "Rất tích cực sang tích cực", label: "Rất tích cực sang tích cực"}, {value: "Tích cực sang trung lập", label: "Tích cực sang trung lập"}, {value: "Trung lập sang tiêu cực", label: "Trung lập sang tiêu cực"}, {value: "Tiêu cực về rất tiêu cực", label: "Tiêu cực về rất tiêu cực"}, {value: "Không chuyển trạng thái", label: "Không chuyển trạng thái"}] },
    { name: "Tín hiệu chỉ báo kỹ thuật: chuyển trạng thái", key: "changeStatusTech", selectCondition: false, parametersType: 10, select: [{value: "Rất tiêu cực sang tiêu cực", label: "Rất tiêu cực sang tiêu cực"}, {value: "Tiêu cực sang trung lập", label: "Tiêu cực sang trung lập"}, {value: "Trung lập sang Tích cực", label: "Trung lập sang Tích cực"}, {value: "Tích cực sang rất tích cực", label: "Tích cực sang rất tích cực"}, {value: "Rất tích cực sang tích cực", label: "Rất tích cực sang tích cực"}, {value: "Tích cực sang trung lập", label: "Tích cực sang trung lập"}, {value: "Trung lập sang tiêu cực", label: "Trung lập sang tiêu cực"}, {value: "Tiêu cực về rất tiêu cực", label: "Tiêu cực về rất tiêu cực"}, {value: "Không chuyển trạng thái", label: "Không chuyển trạng thái"}] },
    { name: "Tín hiệu kỹ thuật tổng hợp: chuyển trạng thái", key: "changeStatusGeneral", selectCondition: false, parametersType: 10, select: [{value: "Rất tiêu cực sang tiêu cực", label: "Rất tiêu cực sang tiêu cực"}, {value: "Tiêu cực sang trung lập", label: "Tiêu cực sang trung lập"}, {value: "Trung lập sang Tích cực", label: "Trung lập sang Tích cực"}, {value: "Tích cực sang rất tích cực", label: "Tích cực sang rất tích cực"}, {value: "Rất tích cực sang tích cực", label: "Rất tích cực sang tích cực"}, {value: "Tích cực sang trung lập", label: "Tích cực sang trung lập"}, {value: "Trung lập sang tiêu cực", label: "Trung lập sang tiêu cực"}, {value: "Tiêu cực về rất tiêu cực", label: "Tiêu cực về rất tiêu cực"}, {value: "Không chuyển trạng thái", label: "Không chuyển trạng thái"}]  },
  ],
};

const industriesList = [
  "Toàn bộ", "Bạch kim & Kim loại quý hiếm khác", "Bán lẻ dụng cụ gia đình", "Bán lẻ dược phẩm", "Bán lẻ thực phẩm", "Bán lẻ tổng hợp", "Bao bì & đóng gói",
  "Bảo hiểm đa ngành", "Bảo hiểm tài sản & thương vong", "Các hãng truyền thông", "Các sản phẩm gia dụng lâu bền", "Chế phẩm từ gỗ", "Công nghiệp đa ngành",
  "Cửa hàng chuyên dụng", "Cung ứng", "Dầu khí tổng hợp", "Đầu tư và phát triển bất động sản", "Dịch vụ bất động sản", "Dịch vụ cung ứng lao động và đào tạo",
  "Dịch vụ đầu tư", "Dịch vụ giao nhận", "Dịch vụ hỗ trợ kinh doanh", "Dịch vụ máy tính", "Dịch vụ tiện ích tổng hợp", "Dịch vụ tiêu dùng chuyên dụng",
  "Dịch vụ và Thiết bị dầu khí", "Dịch vụ vận tải", "Dịch vụ viễn thông cố định", "Dịch vụ viễn thông di động", "Dịch vụ vui chơi giải trí",
  "Dịch vụ xử lý phế liệu phế thải", "Dịch vụ y tế", "Điện", "Điện tái tạo", "Đồ chơi các loại", "Đồ đạc, nội thất", "Đồ điện tử", "Đồ may mặc, trang sức, phụ kiện",
  "Du lịch", "Dược phẩm", "Đường sắt", "Gas", "Giấy", "Giầy dép", "Hàng không", "Hóa chất cơ bản", "Hóa chất đặc biệt", "Hoạt động xuất bản", "Khách sạn",
  "Khai khoáng nói chung", "Khai thác và sản xuất dầu khí", "Kim loại màu", "Máy công nghiệp", "Ngân hàng", "Nhà hàng & quầy bar", "Nhôm", "Nông sản và thủy hải sản",
  "Nước", "Nước ngọt", "Ôtô", "Phần cứng", "Phần mềm", "Phụ tùng ô tô", "Quản lý tài sản", "Quỹ mở", "Quỹ tín thác bất động sản đa dạng", "Rượu, đồ uống có cồn",
  "Săm lốp", "Sản phẩm gia dụng không lâu bền", "Sản phẩm sinh hóa", "Sản xuất bia", "Sản xuất thực phẩm", "Sòng bạc", "Tái bảo hiểm", "Tài chính cá nhân",
  "Tài chính chuyên biệt", "Than đá", "Thép", "Thiết bị điện", "Thiết bị điện tử", "Thiết bị điện tử văn phòng", "Thiết bị viễn thông", "Thiết bị y tế",
  "Thiết bị, đồ dùng phục vụ mục đích vui chơi giải trí", "Thuốc lá", "Vận tải biển", "Vận tải xe tải", "Vật dụng cá nhân", "Vật dụng y tế", "Vật liệu xây dựng",
  "Xây dựng công trình", "Xe tải và phương tiện vận chuyển thương mại"
];

export const industriesArray = industriesList.map(industry => ({ value:  removeDiacritics(industry), label:  industry }));