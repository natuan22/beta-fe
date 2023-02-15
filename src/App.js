import { BrowserRouter, Routes, Route, unstable_HistoryRouter as HistoryRouter  } from 'react-router-dom';
import { routes } from './app/routes';
import Header from './components/Header';
// import DemoQuery from './demo/DemoQuery';


import { createBrowserHistory } from 'history';
let history = createBrowserHistory()
// history.push("/signin")
function App() {
  return (
    // <HistoryRouter history={history}>
    <BrowserRouter> 
    <Header />
    <Routes>
    {routes.map(({path, component: Component}, children) => {
      return (
        <Route path={path} element={< Component />} > 
        {/* {children?.map( ({path, component: Component}) => {
          return (
            <Route path={path} element={< Component />}  />
          )
        })} */}
        </Route>
      )
    })}
    {/* component: Component (gọi là Alias) */} 
    {/* <Route path='/demoquery' element={<DemoQuery />} /> */}
    {/* <Route path='/demoquery:title' element={<DemoQuery />} /> */}
    </Routes>  
    
     </BrowserRouter> 
    // </HistoryRouter>
  );
}

export default App;
