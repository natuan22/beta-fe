import { BrowserRouter, Routes, Route, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { routes } from './app/routes';
import Header from './components/Header';
// import DemoQuery from './demo/DemoQuery';


import { createBrowserHistory } from 'history';
import Footer from './components/Footer';
let history = createBrowserHistory()
// history.push("/signin")
function App() {
  return (
    // <HistoryRouter history={history}>
    <BrowserRouter>
      <Header />
      <Routes>
        {routes.map(({ path, component: Component }, children) => {
          return (
            <Route key={path} path={path} element={< Component />} >
             
            </Route>
          )
        })}
        
      </Routes>
    </BrowserRouter>
    // </HistoryRouter>
  );
}

export default App;
