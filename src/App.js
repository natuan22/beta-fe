import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { macroRoutes, marketRoute, newsCenterRoutes, routes, stockRoutes } from "./app/routes";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { autoLoginWithToken } from "./features/Auth/thunk";
import { generateMAC } from "./utils/generateMac";
function App() {

  useEffect(() => {
    const deviceId = JSON.parse(localStorage.getItem(localStorage.getItem('DeviceId')))

    if (!deviceId) {
      localStorage.setItem('DeviceId', JSON.stringify(generateMAC())
      )
    }
  }, [])
  const dispatch = useDispatch()
  useEffect(() => {
    // data local để giữ trạng thái user để call api ở chỉ số thị trường
    localStorage.setItem('userTabStockDetail', 1)
    localStorage.setItem('userTabCurrent', 0)
    localStorage.setItem('userNewsCenterMacroTabCurrent', 0)
    localStorage.setItem('userAnalyzeReportTabCurrent', 0)
    localStorage.setItem('typeTime', 'HH:mm')
    localStorage.setItem('exchange', 'VNINDEX')
    localStorage.setItem('typeApi', '0')
    localStorage.setItem('nameMarketMap', 'Vốn hóa')
    localStorage.setItem('typeTransfer', '0')
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
  const mapMacroRoute = macroRoutes.map(({ path, component: Component, children }) => {
    return <Route path={path} element={<Component />} key={path}>
      {children?.map(Item => {
        return <Route path={Item.path} key={Item.path} element={<Item.component />} />
      })}
    </Route>
  })
  const mapStockRoute = stockRoutes.map(({ path, component: Component, children }) => {
    return <Route path={path} element={<Component />} key={path}>
      {children?.map(Item => {
        return <Route path={Item.path} key={Item.path} element={<Item.component />} />
      })}
    </Route>
  })
  const mapNewsCenterRoute = newsCenterRoutes.map(({ path, component: Component, children }) => {
    return <Route path={path} element={<Component />} key={path}>
      {children?.map(Item => {
        return <Route path={Item.path} key={Item.path} element={<Item.component />} />
      })}
    </Route>
  })
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, component: Component }) => {
          return <Route key={path} path={path} element={<Component />}></Route>;
        })}
        {mapMarketRoute}
        {mapMacroRoute}
        {mapNewsCenterRoute}
        {mapStockRoute}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
