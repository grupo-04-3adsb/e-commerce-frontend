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
        <Routes>
          <Route path="*" element={<NotFound404 />} />
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produtos/:productName" element={<ProdutoDetalhes />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
