import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  authenRoute,
  macroRoutes,
  marketRoute,
  newsCenterRoutes,
  routes,
  stockRoutes,
  investToolRoutes,
  analysisCenterRoutes,
} from "./app/routes";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { autoLoginWithToken } from "./features/Auth/thunk";
import { generateMAC } from "./utils/generateMac";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Error404 from "./features/Navigation/Error404";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const deviceId = JSON.parse(localStorage.getItem("deviceId"));
    if (!deviceId) {
      localStorage.setItem("deviceId", JSON.stringify(generateMAC()));
    }

    const _il = localStorage.getItem(process.env.REACT_APP_IS_LG);
    if (!_il) {
      localStorage.setItem(
        process.env.REACT_APP_IS_LG,
        process.env.REACT_APP_LG_F
      );
    }
  }, []);

  useEffect(() => {
    // data local để giữ trạng thái user để call api ở chỉ số thị trường
    localStorage.setItem("userTabCurrent", 0);
    localStorage.setItem("userNewsCenterMacroTabCurrent", 0);
    localStorage.setItem("userAnalyzeReportTabCurrent", 0);
    localStorage.setItem("typeTime", "HH:mm");
    localStorage.setItem("exchange", "VNINDEX");
    localStorage.setItem("typeApi", "0");
    localStorage.setItem("nameMarketMap", "Vốn hóa");
    localStorage.setItem("typeTransfer", "0");
    const token = localStorage.getItem("betaToken");
    dispatch(autoLoginWithToken(token));
  }, [dispatch]);

  const mapMarketRoute = marketRoute.map(
    ({ path, component: Component, children }) => {
      return (
        <Route path={path} element={<Component />} key={path}>
          {children?.map(
            ({ path, component: ChildComponent, children1: GrandChildren }) => {
              return (
                <Route path={path} element={<ChildComponent />} key={path}>
                  {GrandChildren?.map(
                    ({ path, component: GrandChildComponent }) => {
                      return (
                        <Route
                          key={path}
                          path={path}
                          element={<GrandChildComponent />}
                        />
                      );
                    }
                  )}
                </Route>
              );
            }
          )}
        </Route>
      );
    }
  );
  const mapMacroRoute = macroRoutes.map(
    ({ path, component: Component, children }) => {
      return (
        <Route path={path} element={<Component />} key={path}>
          {children?.map((Item) => {
            return (
              <Route
                path={Item.path}
                key={Item.path}
                element={<Item.component />}
              />
            );
          })}
        </Route>
      );
    }
  );
  const mapStockRoute = stockRoutes.map(
    ({ path, component: Component, children }) => {
      return (
        <Route path={path} element={<Component />} key={path}>
          {children?.map((Item) => {
            return (
              <Route
                path={Item.path}
                key={Item.path}
                element={<Item.component />}
              />
            );
          })}
        </Route>
      );
    }
  );
  const mapNewsCenterRoute = newsCenterRoutes.map(
    ({ path, component: Component, children }) => {
      return (
        <Route path={path} element={<Component />} key={path}>
          {children?.map((Item) => {
            return (
              <Route
                path={Item.path}
                key={Item.path}
                element={<Item.component />}
              />
            );
          })}
        </Route>
      );
    }
  );
  const mapInvestToolRoutes = investToolRoutes.map(
    ({ path, component: Component, children }) => {
      return (
        <Route path={path} element={<Component />} key={path}>
          {children?.map((Item) => {
            return (
              <Route
                path={Item.path}
                key={Item.path}
                element={<Item.component />}
              />
            );
          })}
        </Route>
      );
    }
  );

  const mapAnalysisCenterRoutes = analysisCenterRoutes.map(
    ({ path, component: Component, children }) => {
      return (
        <Route path={path} element={<Component />} key={path}>
          {children?.map((Item) => {
            return (
              <Route
                path={Item.path}
                key={Item.path}
                element={<Item.component />}
              />
            );
          })}
        </Route>
      );
    }
  );

  const mapAuthenRoute = authenRoute.map(({ path, component: Component }) => {
    return <Route key={path} path={path} element={<Component />}></Route>;
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Routes>
          {routes.map(({ path, component: Component }) => {
            return (
              <Route key={path} path={path} element={<Component />}></Route>
            );
          })}
          {mapMarketRoute}
          {mapMacroRoute}
          {mapNewsCenterRoute}
          {mapStockRoute}
          {mapAuthenRoute}
          {mapInvestToolRoutes}
          {mapAnalysisCenterRoutes}

          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
