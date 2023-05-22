import {
  BrowserRouter,
  Routes,
  Route,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import { marketRoute, routes } from "./app/routes";
// import DemoQuery from './demo/DemoQuery';

import { createBrowserHistory } from "history";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { autoLoginWithToken } from "./features/Auth/thunk";
import { generateMAC } from "./utils/generateMac";
let history = createBrowserHistory();
// history.push("/signin")
function App() {
  useEffect(() => {
    const deviceId = JSON.parse(localStorage.getItem(localStorage.getItem('DeviceId')))

    if (!deviceId) {
      localStorage.setItem('DeviceId',JSON.stringify(generateMAC())
      )
    }
  }, [])
  const dispatch = useDispatch()
  useEffect(() => {
    // data local để giữ trạng thái user để call api ở chỉ số thị trường
    localStorage.setItem('typeTime', 'HH:mm')
    localStorage.setItem('exchange', 'VNINDEX')
    localStorage.setItem('typeApi', '0')
    localStorage.setItem('nameMarketMap', 'Vốn hóa')
    const token = localStorage.getItem('betaToken')
    dispatch(autoLoginWithToken(token))
  }, [dispatch])
  const mapMarketRoute = marketRoute.map(({ path, component: Component, children }) => {
    return (
      <Route path={path} element={<Component />} key={path}>
        {children?.map(({ path, component: ChildComponent, children1: GrandChildren }) => {
          return (
            <Route path={path} element={<ChildComponent />} key={path}>
              {GrandChildren?.map(({ path, component: GrandChildComponent }) => {
                return (
                  <Route
                    key={path}
                    path={path}
                    element={<GrandChildComponent />}
                  />
                );
              })}
            </Route>
          );
        })}
      </Route>
    );
  });

  return (
    // <HistoryRouter history={history}>
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, component: Component }) => {
          return <Route key={path} path={path} element={<Component />}></Route>;
        })}
        {mapMarketRoute}
      </Routes>
    </BrowserRouter>
    // </HistoryRouter>
  );
}

export default App;
