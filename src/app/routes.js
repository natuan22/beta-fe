import AnalysisCenter from "../features/AnalysisCenter/AnalysisCenter";
import BusinessAnalysisReport from "../features/AnalysisCenter/tabs/BusinessAnalysisReport";
import IndustryReport from "../features/AnalysisCenter/tabs/IndustryReport";
import MacroeconomicReport from "../features/AnalysisCenter/tabs/MacroeconomicReport";
import MarketAssessment from "../features/AnalysisCenter/tabs/MarketAssessment";
import StrategicReport from "../features/AnalysisCenter/tabs/StrategicReport";
import TechnicalAnalysis from "../features/AnalysisCenter/tabs/TechnicalAnalysis";
import AuthComponent from "../features/Auth/AuthComponent";
import Signin from "../features/Auth/Signin";
import Signup from "../features/Auth/Signup";
import Home from "../features/Chart/Home";
import InvestTool from "../features/InvestTool/InvestTool";
import BetaSmart from "../features/InvestTool/tabs/BetaSmart";
import InvestKnowledge from "../features/InvestTool/tabs/InvestKnowledge";
import SignalWarning from "../features/InvestTool/tabs/SignalWarning";
import StockFilter from "../features/InvestTool/tabs/StockFilter";
import TradingStrategies from "../features/InvestTool/tabs/TradingStrategies";
import Watchlist from "../features/InvestTool/tabs/Watchlist";
import Macro from "../features/Macro/Macro";
import DomesticMacro from "../features/Macro/Tabs/DomesticMacro";
import ForeignMacro from "../features/Macro/Tabs/ForeignMacro";
import Market from "../features/Market/Market";
import CashFlow from "../features/Market/tabs/CashFlow";
import IdentifyCash from "../features/Market/tabs/CashFlow/IdentifyCash";
import NonIdentifyCash from "../features/Market/tabs/CashFlow/NonIdentifyCash";
import IndexMarket from "../features/Market/tabs/IndexMarket";
import MarketForeign from "../features/Market/tabs/MarketForeign";
import CryptocurrencyMarket from "../features/Market/tabs/MarketForeign/CryptocurrencyMarket";
import ForeignIndex from "../features/Market/tabs/MarketForeign/ForeignIndex";
import GoodsMarket from "../features/Market/tabs/MarketForeign/GoodsMarket";
import TechAndValuation from "../features/Market/tabs/TechAndValuation";
import Efficiency from "../features/Market/tabs/TechAndValuation/Efficiency";
import FinancialHealth from "../features/Market/tabs/TechAndValuation/FinancialHealth";
import Technical from "../features/Market/tabs/TechAndValuation/Technical";
import Nav1 from "../features/Navigation/Nav1";
import Nav4 from "../features/Navigation/Nav4";
import NewsCenter from "../features/NewsCenter/NewsCenter";
import AnalyzeReport from "../features/NewsCenter/tabs/AnalyzeReport";
import EnterpriseNews from "../features/NewsCenter/tabs/EnterpriseNews";
import MacroNews from "../features/NewsCenter/tabs/MacroNews";
import NewsFilterTool from "../features/NewsCenter/tabs/NewsFilterTool";
import Stock from "../features/Stock/Stock";
import StockDetail from "../features/Stock/StockDetail";

export const routes = [
  { path: "/", component: Home },

  // navigation tab
  { path: "/nganh", component: Nav1 },
  { path: "/vi-mo", component: Macro },
  { path: "/trang-khong-ton-tai", component: Nav4 },

  // authen
  { path: "/signin", component: Signin },
  { path: "/signup", component: Signup },
];

export const investToolRoutes = [
  {
    path: "/cong-cu-dau-tu",
    component: InvestTool,
    children: [
      { path: "danh-muc-theo-doi", component: Watchlist },
      { path: "bo-loc", component: StockFilter },
      { path: "canh-bao-tin-hieu", component: SignalWarning },
      { path: "chien-luoc-giao-dich", component: TradingStrategies },
      { path: "beta-smart", component: BetaSmart },
      { path: "kien-thuc-dau-tu", component: InvestKnowledge },
    ],
  },
];

export const authenRoute = [{ path: "/auth", component: AuthComponent }];
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
        path: "vi-mo-trong-nuoc",
        component: DomesticMacro,
      },
      {
        path: "vi-mo-quoc-te",
        component: ForeignMacro,
      },
    ],
  },
];

export const newsCenterRoutes = [
  {
    path: "trung-tam-tin-tuc",
    component: NewsCenter,
    children: [
      {
        path: "bao-cao-phan-tich",
        component: AnalyzeReport,
      },
      {
        path: "bo-loc-tin-tuc",
        component: NewsFilterTool,
      },
      {
        path: "tin-doanh-nghiep",
        component: EnterpriseNews,
      },
      {
        path: "tin-tuc-vi-mo",
        component: MacroNews,
      },
    ],
  },
];
export const analysisCenterRoutes = [
  {
    path: "trung-tam-phan-tich",
    component: AnalysisCenter,
    children: [
      {
        path: "nhan-dinh-thi-truong",
        component: MarketAssessment,
      },
      {
        path: "phan-tich-doanh-nghiep",
        component: BusinessAnalysisReport,
      },
      {
        path: "bao-cao-nganh",
        component: IndustryReport,
      },
      {
        path: "phan-tich-ky-thuat",
        component: TechnicalAnalysis,
      },
      {
        path: "bao-cao-vi-mo",
        component: MacroeconomicReport,
      },
      {
        path: "bao-cao-chien-luoc",
        component: StrategicReport,
      },
    ],
  },
];
export const stockRoutes = [
  {
    path: "/co-phieu",
    component: Stock,
  },
  {
    path: "/co-phieu/:code",
    component: StockDetail,
  },
];
