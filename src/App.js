import {
  BrowserRouter,
  Routes,
  Route,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import { marketRoute, routes } from "./app/routes";
import Header from "./components/Header";
// import DemoQuery from './demo/DemoQuery';

import { createBrowserHistory } from "history";
import CashFlow from "./features/Market/Component/CashFlow";
import Market from "./features/Market/Market";
import IdentifyCash from "./features/Market/Component/IdentifyCash";
let history = createBrowserHistory();
// history.push("/signin")
function App() {
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
      <Header />
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
