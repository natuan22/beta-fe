import Signin from "../features/Auth/Signin";
import Signup from "../features/Auth/Signup";
import Home from "../features/Chart/Home";
import Nav1 from "../features/Navigation/Nav1";
import Nav2 from "../features/Navigation/Nav2";
import Nav3 from "../features/Navigation/Nav3";
import Nav4 from "../features/Navigation/Nav4";
import Nav5 from "../features/Navigation/Nav5";

export const routes = [
  { path: "/", component: Home },

  // navigation tab
  { path: "/thi-truong", component: Nav1 },
  { path: "/nganh", component: Nav2 },
  { path: "/vi-mo", component: Nav3 },
  { path: "/cong-cu-dau-tu", component: Nav4 },
  { path: "/trung-tam-tin-tuc", component: Nav5 },

  // authen
  { path: "/signin", component: Signin },
  { path: "/singup", component: Signup },
];
