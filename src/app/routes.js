import Signin from "../features/Auth/Signin";
import Signup from "../features/Auth/Signup";
import Home from "../features/Chart/Home";
import CashFlow from "../features/Market/tabs/CashFlow";
import MarketForeign from "../features/Market/tabs/MarketForeign";
import TechAndValuation from "../features/Market/tabs/TechAndValuation";
import Market from "../features/Market/Market";
import Nav1 from "../features/Navigation/Nav1";
import Nav2 from "../features/Navigation/Nav2";
import Nav3 from "../features/Navigation/Nav3";
import Nav4 from "../features/Navigation/Nav4";
import Nav5 from "../features/Navigation/Nav5";
import IndexMarket from "../features/Market/tabs/IndexMarket";
import NonIdentifyCash from "../features/Market/tabs/CashFlow/NonIdentifyCash";
import IdentifyCash from "../features/Market/tabs/CashFlow/IdentifyCash";
import Technical from "../features/Market/tabs/TechAndValuation/Technical";
import Efficiency from "../features/Market/tabs/TechAndValuation/Efficiency";
import ForeignIndex from "../features/Market/tabs/MarketForeign/ForeignIndex";
import GoodsMarket from "../features/Market/tabs/MarketForeign/GoodsMarket";
import CryptocurrencyMarket from "../features/Market/tabs/MarketForeign/CryptocurrencyMarket";
import FinancialHealth from "../features/Market/tabs/TechAndValuation/FinancialHealth";

export const routes = [
  { path: "/", component: Home },

  // navigation tab
  { path: "/nganh", component: Nav1 },
  { path: "/co-phieu", component: Nav2 },
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
      
      { path: "chi-so-thi-truong", component: IndexMarket },
      {
        path: "dong-tien-thi-truong",
        component: CashFlow,
        children1: [
          { path: "dong-tien-dinh-danh", component: IdentifyCash },
          { path: "dong-tien-phi-dinh-danh", component: NonIdentifyCash },
        ],
      },
      {
        path: "hieu-suat-va-dinh-gia",
        component: TechAndValuation,
        children1: [
          { path: "hieu-suat", component: Efficiency },
          { path: "suc-khoe-tai-chinh", component: FinancialHealth },
          { path: "ky-thuat", component: Technical },
        ],
      },
      {
        path: "thi-truong-quoc-te",
        component: MarketForeign,
        children1: [
          { path: "chi-so-the-gioi", component: ForeignIndex },
          { path: "thi-truong-hang-hoa", component: GoodsMarket },
          { path: "thi-truong-tien-so", component: CryptocurrencyMarket },
        ],
      },
    ],
  },
];
