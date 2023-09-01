import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import ViewProduct from "./components/ViewProduct";
import AddProduct from "./components/AddProduct";

const routes = [
  { path: "/", element: <Products /> },
  { path: "/new/:id", element: <AddProduct /> },
  { path: "/product/:id", element: <ViewProduct /> }
];

function App() {
  return (
    <div>
      <Router>
        <div className="container">
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
