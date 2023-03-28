import Signin from "../features/Auth/Signin";
import Signup from "../features/Auth/Signup";
import Home from "../features/Chart/Home";
import CashFlow from "../features/Market/tabs/CashFlow";
import CryptocurrencyMarket from "../features/Market/tabs/CryptocurrencyMarket";
import Efficiency from "../features/Market/tabs/Efficiency";
import Evaluation from "../features/Market/tabs/Evaluation";
import ForeignIndex from "../features/Market/tabs/ForeignIndex";
import GoodsMarket from "../features/Market/tabs/GoodsMarket";
import IdentifyCash from "../features/Market/tabs/IdentifyCash";
import MarketForeign from "../features/Market/tabs/MarketForeign";
import NonIdentifyCash from "../features/Market/tabs/NonIdentifyCash";
import TechAndValuation from "../features/Market/tabs/TechAndValuation";
import Technical from "../features/Market/tabs/Technical";
import Market from "../features/Market/Market";
import Nav1 from "../features/Navigation/Nav1";
import Nav2 from "../features/Navigation/Nav2";
import Nav3 from "../features/Navigation/Nav3";
import Nav4 from "../features/Navigation/Nav4";
import IndexMarket from "../features/Market/tabs/IndexMarket";

export const routes = [
  { path: "/", component: Home },

  // navigation tab
  { path: "/nganh", component: Nav1 },
  { path: "/vi-mo", component: Nav2 },
  { path: "/cong-cu-dau-tu", component: Nav3 },
  { path: "/trung-tam-tin-tuc", component: Nav4 },

  // authen
  { path: "/signin", component: Signin },
  { path: "/signup", component: Signup },
  // market
  // { path: "/thi-truong", component: Market },
];

export const marketRoute = [
  // market
  {
    path: "/thi-truong",
    component: Market,
    children: [
      { path: "/thi-truong", component: IndexMarket },
      { path: "/thi-truong/chi-so-thi-truong", component: IndexMarket },
      {
        path: "/thi-truong/dong-tien-thi-truong",
        component: CashFlow,
        children: [
          {
            path: "/thi-truong/dong-tien-thi-truong/dong-tien-dinh-danh",
            component: IdentifyCash,
          },
          {
            path: "/thi-truong/dong-tien-thi-truong/dong-tien-phi-dinh-danh",
            component: NonIdentifyCash,
          },
        ]
      },
      { path: "/thi-truong/ky-thuat-va-dinh-gia", component: TechAndValuation },
      { path: "/thi-truong/thi-truong-quoc-te", component: MarketForeign },
      {
        path: "/thi-truong/dong-tien-thi-truong/dong-tien-dinh-danh",
        component: IdentifyCash,
      },

      {
        path: "/thi-truong/dong-tien-thi-truong/dong-tien-phi-dinh-danh",
        component: NonIdentifyCash,
      },
    ],
  },
];


