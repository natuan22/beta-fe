import Signin from "../features/Auth/Signin";
import Signup from "../features/Auth/Signup";
import Home from "../features/Chart/Home";
import CashFlow from "../features/Market/tabs/CashFlow";
import MarketForeign from "../features/Market/tabs/MarketForeign";
import TechAndValuation from "../features/Market/tabs/TechAndValuation";
import Market from "../features/Market/Market";
import Nav1 from "../features/Navigation/Nav1";
import Nav2 from "../features/Navigation/Nav2";
import Nav4 from "../features/Navigation/Nav4";
import IndexMarket from "../features/Market/tabs/IndexMarket";
import NonIdentifyCash from "../features/Market/tabs/CashFlow/NonIdentifyCash";
import IdentifyCash from "../features/Market/tabs/CashFlow/IdentifyCash";
import Technical from "../features/Market/tabs/TechAndValuation/Technical";
import Efficiency from "../features/Market/tabs/TechAndValuation/Efficiency";
import ForeignIndex from "../features/Market/tabs/MarketForeign/ForeignIndex";
import GoodsMarket from "../features/Market/tabs/MarketForeign/GoodsMarket";
import CryptocurrencyMarket from "../features/Market/tabs/MarketForeign/CryptocurrencyMarket";
import FinancialHealth from "../features/Market/tabs/TechAndValuation/FinancialHealth";
import Macro from "../features/Macro/Macro";
import DomesticMacro from "../features/Macro/Tabs/DomesticMacro";
import ForeignMacro from "../features/Macro/Tabs/ForeignMacro";
import NewsCenter from "../features/NewsCenter/NewsCenter";
import NewsFilterTool from "../features/NewsCenter/tabs/NewsFilterTool";
import EnterpriseNews from "../features/NewsCenter/tabs/EnterpriseNews";
import AnalyzeReport from "../features/NewsCenter/tabs/AnalyzeReport";
import MacroNews from "../features/NewsCenter/tabs/MacroNews";
import Stock from "../features/Stock/Stock";
import StockDetail from "../features/Stock/StockDetail";
import AuthComponent from "../features/Auth/AuthComponent";

export const routes = [
  { path: "/", component: Home },

  // navigation tab
  { path: "/nganh", component: Nav1 },
  { path: "/vi-mo", component: Macro },
  { path: "/cong-cu-dau-tu", component: Nav4 },
  { path: "/trang-khong-ton-tai", component: Nav4 },


  // authen
  { path: "/signin", component: Signin },
  { path: "/signup", component: Signup },
  { path: "/auth", component: AuthComponent },
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

export const macroRoutes = [
  {
    path: "vi-mo",
    component: Macro,
    children: [
      {
        path: "vi-mo-trong-nuoc", component: DomesticMacro
      },
      {
        path: "vi-mo-quoc-te", component: ForeignMacro
      }
    ]
  }
]

export const newsCenterRoutes = [
  {
    path: "trung-tam-tin-tuc",
    component: NewsCenter,
    children: [
      {
        path: "bao-cao-phan-tich", component: AnalyzeReport
      },
      {
        path: "bo-loc-tin-tuc", component: NewsFilterTool
      },
      {
        path: "tin-doanh-nghiep", component: EnterpriseNews
      },
      {
        path: "tin-tuc-vi-mo", component: MacroNews
      }
    ]
  }
]


export const stockRoutes = [
  {
    path: "/co-phieu", component: Stock,
  },
  {
    path: "/co-phieu/:code", component: StockDetail
  },

]
