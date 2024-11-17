import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { Footer } from "./components/Footer";
import Loading from "./components/Loading";
import { loading } from "./store/slices/Loading/slice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import NotFound404 from "./pages/NotFound404";
import Home from "./pages/Home/Home";
import Produtos from "./pages/Produtos/Produtos";
import ProdutoDetalhes from "./pages/ProdutoDetalhes/ProdutoDetalhes"; // Importa o componente ProdutoDetalhes
import UserInfo from "./pages/UserInfo/UserInfo";
import { APP_ROUTES } from "./data/models/appRoute";
import AppBreadcrumb from "./components/CustomBreadCrumbs/BreadCrumbs";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loading(false));
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        <Loading />
        <Header />
        <AppBreadcrumb />
        <Routes>
              {APP_ROUTES.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
            </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
