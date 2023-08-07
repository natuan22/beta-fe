import SlideProfit from "../components/SlideComponent/SlideProfit";
import SlideLiquidity from "../components/SlideComponent/SlideLiquidity";
import SlideAbilityToPay from "../components/SlideComponent/SlideAbilityToPay";
import SlideEfficiency from "../components/SlideComponent/SlideEfficiency";
import SlideValuation from "../components/SlideComponent/SlideValuation";


export const hashTbCTCP = [
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
    }
];

// export const hashTbCTCP = [
//     {
//         [SlideProfit]: [
//             "Tỷ suất lợi nhuận gộp biên",
//             "Tỷ suất lợi nhuận ròng",
//             "Tỷ suất sinh lợi trên vốn chủ sở hữu (ROE)",
//             "Tỷ suất sinh lợi trên tổng tài sản (ROA)",
//         ],
//     },
//     {
//         [SlideLiquidity]: [
//             "Tỷ số thanh toán hiện hành",
//             "Tỷ số thanh toán nhanh",
//             "Tỷ số thanh toán tiền mặt",
//             "Khả năng thanh toán lãi vay",
//         ],
//     },
//     {
//         [SlideAbilityToPay]: [
//             "Chỉ số khả năng trả nợ (DSCR)",
//             "Tỷ lệ Nợ hiện tại/TTS",
//             "Tỷ lệ Nợ hiện tại/VCSH",
//             "Tỷ lệ đảm bảo trả nợ bằng tài sản",
//         ],
//     },
//     {
//         [SlideEfficiency]: [
//             "Vòng quay tài sản cố định",
//             "Vòn quay tổng tài sản",
//             "Vòng quay tiền",
//             "Vòng quay VCSH",
//         ],
//     },

//     {
//         [SlideValuation]: [
//             "P/E cổ phiếu",
//             "P/B cổ phiếu",
//             "Thu nhập trên mỗi cổ phần (EPS)",
//             "Giá trị sổ sách mỗi cổ phiếu (BVPS)",
//         ],
//     },
// ];

export const hashTbCK = {
    [SlideProfit]: [
        "Tỷ suất lợi nhuận gộp biên",
        "Tỷ suất lợi nhuận ròng",
        "Tỷ suất sinh lợi trên vốn chủ sở hữu (ROE)",
        "Tỷ suất sinh lợi trên tổng tài sản (ROA)",
    ],
};

export const hashTbNH = {
    [SlideProfit]: [
        "Tỷ suất lợi nhuận gộp biên",
        "Tỷ suất lợi nhuận ròng",
        "Tỷ suất sinh lợi trên vốn chủ sở hữu (ROE)",
        "Tỷ suất sinh lợi trên tổng tài sản (ROA)",
    ],
};
