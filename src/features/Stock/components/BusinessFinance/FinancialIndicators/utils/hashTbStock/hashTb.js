import SlideProfit from "../components/SlideComponent/SlideProfit";
import SlideLiquidity from "../components/SlideComponent/SlideLiquidity";
import SlideAbilityToPay from "../components/SlideComponent/SlideAbilityToPay";
import SlideEfficiency from "../components/SlideComponent/SlideEfficiency";
import SlideValuation from "../components/SlideComponent/SlideValuation";
import SlideAsset from "../components/SlideComponent/SlideAsset";


export const hashTb_CTCP_BH_CK = [
    {
        component: SlideProfit,
        labels: [
            "Tỷ suất lợi nhuận gộp biên",
            "Tỷ suất lợi nhuận ròng",
            "Tỷ suất sinh lợi trên vốn chủ sở hữu (ROE)",
            "Tỷ suất sinh lợi trên tổng tài sản (ROA)",
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
        component: SlideAbilityToPay,
        labels: [
            "Chỉ số khả năng trả nợ (DSCR)",
            "Tỷ lệ Nợ hiện tại/TTS",
            "Tỷ lệ Nợ hiện tại/VCSH",
            "Tỷ lệ đảm bảo trả nợ bằng tài sản",
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
        component: SlideValuation,
        labels: [
            "P/E cổ phiếu",
            "P/B cổ phiếu",
            "Thu nhập trên mỗi cổ phần (EPS)",
            "Giá trị sổ sách mỗi cổ phiếu (BVPS)",
        ],
    },
];

export const hashTbNH = [
    {
        component: SlideProfit,
        labels: [
            "Tỷ lệ nợ xấu",
            "Tỷ lệ xóa nợ",
            "Dự phòng/Nợ xấu",
            "Nợ xấu/Tổng tài sản",
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
        component: SlideAbilityToPay,
        labels: [
            "Chỉ số khả năng trả nợ (DSCR)",
            "Tỷ lệ Nợ hiện tại/TTS",
            "Tỷ lệ Nợ hiện tại/VCSH",
            "Tỷ lệ đảm bảo trả nợ bằng tài sản",
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
        component: SlideValuation,
        labels: [
            "P/E cổ phiếu",
            "P/B cổ phiếu",
            "Thu nhập trên mỗi cổ phần (EPS)",
            "Giá trị sổ sách mỗi cổ phiếu (BVPS)",
        ],
    },
];
