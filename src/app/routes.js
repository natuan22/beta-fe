import Signin from "../features/Auth/Signin";
import Signup from "../features/Auth/Signup";
import Detail from "../features/Booking/Detail";
import Home from "../features/Booking/Home";
import Seats from "../features/Booking/Seats";

export const routes = [
  { path: "/:id", component: Home },
  { path: "/", component: Home },

  { path: "/detail", component: Detail, children:[
    {path:'/a', component: ""},
    {path:'/b', component: ""},
    {path:'/c', component: ""}, // ví dụ có thêm route con từ component 
  ]},
  { path: "/seats", component: Seats },
  { path: "/signin", component: Signin },
  { path: "/singup", component: Signup },
];
