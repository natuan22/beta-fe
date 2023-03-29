import Signin from "../features/Auth/Signin";
import Signup from "../features/Auth/Signup";
import Home from "../features/Chart/Home";
import CashFlow from "../features/Market/Component/CashFlow";
import CryptocurrencyMarket from "../features/Market/Component/CryptocurrencyMarket";
import Efficiency from "../features/Market/Component/Efficiency";
import Evaluation from "../features/Market/Component/Evaluation";
import ForeignIndex from "../features/Market/Component/ForeignIndex";
import GoodsMarket from "../features/Market/Component/GoodsMarket";
import IdentifyCash from "../features/Market/Component/IdentifyCash";
import IndexMarket from "../features/Market/Component/IndexMarket";
import MarketForeign from "../features/Market/Component/MarketForeign";
import NonIdentifyCash from "../features/Market/Component/NonIdentifyCash";
import TechAndValuation from "../features/Market/Component/TechAndValuation";
import Technical from "../features/Market/Component/Technical";
import Market from "../features/Market/Market";
import Nav1 from "../features/Navigation/Nav1";
import Nav2 from "../features/Navigation/Nav2";
import Nav3 from "../features/Navigation/Nav3";
import Nav4 from "../features/Navigation/Nav4";
import Nav5 from "../features/Navigation/Nav5";

export const routes = [
  { path: "/", component: Home },

  // navigation tab
  { path: "/nav-1", component: Nav1 },
  { path: "/nganh", component: Nav2 },
  { path: "/vi-mo", component: Nav3 },
  { path: "/cong-cu-dau-tu", component: Nav4 },
  { path: "/trung-tam-tin-tuc", component: Nav5 },

  // authen
  { path: "/signin", component: Signin },
  { path: "/signup", component: Signup },
];

export const marketRoute = [
  // market
  {
    path: "thi-truong",
    component: Market,
    children: [
      { path: "", component: IndexMarket },
      { path: "chi-so-thi-truong", component: IndexMarket },
      {
        path: "dong-tien-thi-truong",
        component: CashFlow,
        children1: [
          { path: "dong-tien-dinh-danh", component: IdentifyCash },
          { path: "dong-tien-phi-dinh-danh", component: NonIdentifyCash },
        ],
      },
      { path: "ky-thuat-va-dinh-gia", component: TechAndValuation, children1:[
        { path: "hieu-suat", component: Efficiency },
        { path: "dinh-gia", component: Evaluation },
        { path: "ky-thuat", component: Technical },
      ] },
      { path: "thi-truong-quoc-te", component: MarketForeign, children1: [
        { path: "chi-so-the-gioi", component: ForeignIndex },
        { path: "thi-truong-hang-hoa", component: GoodsMarket },
        { path: "thi-truong-tien-so", component: CryptocurrencyMarket },
      ] },
    ],
  },
];

// export const cashFlowRoutes = [
//   {
//     path: "dong-tien-thi-truong",
//     component: CashFlow,
//     children: [
//       { path: "dong-tien-dinh-danh", component: IdentifyCash },
//       { path: "dong-tien-phi-dinh-danh", component: NonIdentifyCash },
//     ],
//   },
// ];
