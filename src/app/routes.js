import Signin from "../features/Auth/Signin";
import Signup from "../features/Auth/Signup";
import Home from "../features/Chart/Home";
import CashFlow from "../features/Market/Component/CashFlow";
import IndexMarket from "../features/Market/Component/IndexMarket";
import MarketForeign from "../features/Market/Component/MarketForeign";
import TechAndValuation from "../features/Market/Component/TechAndValuation";
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
  // market
  { path: "/thi-truong", component: Market },
  
];

export const marketRoute = [
  // market
  {
    path: "/thi-truong", component: Market,
    children: [
      {path: "/thi-truong", component: IndexMarket },
      { path: "/thi-truong/chi-so-thi-truong", component: IndexMarket },
      { path: "/thi-truong/dong-tien-thi-truong", component: CashFlow },
      // {path: "/thi-truong/dong-tien-thi-truong/dong-tien-dinh-danh",},
      // {path: "/thi-truong/dong-tien-thi-truong/dong-tien-phi-dinh-danh"},
      { path: "/thi-truong/ky-thuat-va-dinh-gia", component: TechAndValuation },
      { path: "/thi-truong/thi-truong-quoc-te", component: MarketForeign },
    ],
  },
];
