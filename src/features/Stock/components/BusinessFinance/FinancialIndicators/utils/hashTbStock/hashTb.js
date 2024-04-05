import SlideProfit from "../components/SlideComponent/SlideProfit";
import SlideLiquidity from "../components/SlideComponent/SlideLiquidity";
import SlideAbilityToPay from "../components/SlideComponent/SlideAbilityToPay";
import SlideEfficiency from "../components/SlideComponent/SlideEfficiency";
import SlideValuation from "../components/SlideComponent/SlideValuation";
import SlideAsset from "../components/SlideComponent/SlideAsset";
import SlideCreditQuality from "../components/SlideComponent/SlideCreditQuality";

export const hashTbToFilterData = {
  "P/E": "P/E cổ phiếu",
  "P/B": "P/B cổ phiếu",
  EPS: "Thu nhập trên mỗi cổ phần (EPS)",
  "Giá trị sổ sách của cổ phiếu (BVPS)": "Giá trị sổ sách mỗi cổ phiếu (BVPS)",

  "Vòng quay tài sản cố định": "Vòng quay tài sản cố định",
  "Vòng quay tổng tài sản": "Vòng quay tổng tài sản",
  "Vòng quay tiền": "Vòng quay tiền",
  "Vòng quay vốn chủ sở hữu": "Vòng quay VCSH",

  "Chỉ số khả năng trả nợ": "Chỉ số khả năng trả nợ (DSCR)",
  "Tỷ lệ nợ hiện tại trên tổng tài sản": "Tỷ lệ Nợ hiện tại/TTS",
  "Tỷ lệ nợ trên vốn chủ sở hữu": "Tỷ lệ Nợ hiện tại/VCSH",
  "Tỷ lệ đảm bảo trả nợ bằng tài sản": "Tỷ lệ đảm bảo trả nợ bằng tài sản",

  "Tỷ số thanh toán hiện hành": "Tỷ số thanh toán hiện hành",
  "Tỷ số thanh toán nhanh": "Tỷ số thanh toán nhanh",
  "Tỷ số thanh toán tiền mặt": "Tỷ số thanh toán tiền mặt",
  "Khả năng thanh toán lãi vay": "Khả năng thanh toán lãi vay",

  "Tỷ suất lợi nhuận gộp biên": "Tỷ suất lợi nhuận gộp biên",
  "Tỷ suất lợi nhuận ròng": "Tỷ suất lợi nhuận ròng",
  ROE: "Tỷ suất sinh lợi trên vốn chủ sở hữu (ROE)",
  ROA: "Tỷ suất sinh lợi trên tổng tài sản (ROA)",
};

export const hashTbToFilterDataNH = {
  "P/E": "P/E cổ phiếu",
  "P/B": "P/B cổ phiếu",
  EPS: "Thu nhập trên mỗi cổ phần (EPS)",
  "Giá trị sổ sách của cổ phiếu (BVPS)": "Giá trị sổ sách mỗi cổ phiếu (BVPS)",

  ROE: "Tỷ suất sinh lợi trên VCSH (ROE)",
  ROA: "Tỷ suất sinh lợi trên Tổng tài sản (ROA)",
  "Tỷ lệ thu nhập lãi thuần (NIM)": "Tỷ lệ thu nhập lãi thuần (NIM)",
  "Tỷ suất sinh lợi của tài sản có sinh lãi":
    "Tỷ suất sinh lợi của tài sản có sinh lãi",

  "Cho vay/Tài sản sinh lãi": "Cho vay/Tài sản sinh lãi",
  "Cho vay/Tổng tài sản": "Cho vay/Tổng tài sản",
  "Tiền gửi khách hàng/Tài sản sinh lãi":
    "Tiền gửi khách hàng/Tài sản sinh lãi",
  "Cho vay/Tiền gửi khách hàng": "Cho vay/Tiền gửi khách hàng",

  "Dư nợ cho vay khách hàng/Tổng vốn huy động":
    "Dư nợ cho vay khách hàng/Tổng vốn huy động",
  "Dư nợ cho vay khách hàng/Tổng tài sản":
    "Dư nợ cho vay khách hàng/Tổng tài sản",
  "Vốn chủ sở hữu/Tổng tài sản": "Vốn chủ sở hữu/Tổng tài sản",
  "Tài sản thanh khoản/Nợ phải trả": "Tài sản thanh khoản/Nợ phải trả",

  "Tỷ lệ nợ xấu": "Tỷ lệ nợ xấu",
  "Tỷ lệ xóa nợ": "Tỷ lệ xóa nợ",
  "Dự phòng/Nợ xấu": "Dự phòng/Nợ xấu",
  "Nợ xấu/Tổng tài sản": "Nợ xấu/Tổng tài sản",
};

export const hashTb_CTCP_BH_CK = [
  {
    component: SlideValuation,
    labels: [
      "P/E cổ phiếu",
      "P/B cổ phiếu",
      "Thu nhập trên mỗi cổ phần (EPS)",
      "Giá trị sổ sách mỗi cổ phiếu (BVPS)",
    ],
  },
  {
    component: SlideEfficiency,
    labels: [
      "Vòng quay tài sản cố định",
      "Vòng quay tổng tài sản",
      "Vòng quay tiền",
      "Vòng quay VCSH",
    ],
  },
  {
    component: SlideAbilityToPay,
    labels: [
      "Chỉ số khả năng trả nợ (DSCR)",
      "Tỷ lệ Nợ hiện tại/TTS",
      "Tỷ lệ Nợ hiện tại/VCSH",
      "Tỷ lệ đảm bảo trả nợ bằng tài sản",
    ],
  },
  {
    component: SlideLiquidity,
    labels: [
      "Tỷ số thanh toán hiện hành",
      "Tỷ số thanh toán nhanh",
      "Tỷ số thanh toán tiền mặt",
      "Khả năng thanh toán lãi vay",
    ],
  },

  {
    component: SlideProfit,
    labels: [
      "Tỷ suất lợi nhuận gộp biên",
      "Tỷ suất lợi nhuận ròng",
      "Tỷ suất sinh lợi trên vốn chủ sở hữu (ROE)",
      "Tỷ suất sinh lợi trên tổng tài sản (ROA)",
    ],
  },
];

export const hashTbNH = [
  {
    component: SlideValuation,
    labels: [
      "P/E cổ phiếu",
      "P/B cổ phiếu",
      "Thu nhập trên mỗi cổ phần (EPS)",
      "Giá trị sổ sách mỗi cổ phiếu (BVPS)",
    ],
  },
  {
    component: SlideEfficiency,
    labels: [
      "Tỷ suất sinh lợi trên VCSH (ROE)",
      "Tỷ suất sinh lợi trên Tổng tài sản (ROA)",
      "Tỷ lệ thu nhập lãi thuần (NIM)",
      "Tỷ suất sinh lợi của tài sản có sinh lãi",
    ],
  },
  {
    component: SlideAsset,
    labels: [
      "Cho vay/Tài sản sinh lãi",
      "Cho vay/Tổng tài sản",
      "Tiền gửi khách hàng/Tài sản sinh lãi",
      "Cho vay/Tiền gửi khách hàng",
    ],
  },
  {
    component: SlideLiquidity,
    labels: [
      "Dư nợ cho vay khách hàng/Tổng vốn huy động",
      "Dư nợ cho vay khách hàng/Tổng tài sản",
      "Vốn chủ sở hữu/Tổng tài sản",
      "Tài sản thanh khoản/Nợ phải trả",
    ],
  },
  {
    component: SlideCreditQuality,
    labels: [
      "Tỷ lệ nợ xấu",
      "Tỷ lệ xóa nợ",
      "Dự phòng/Nợ xấu",
      "Nợ xấu/Tổng tài sản",
    ],
  },
];
