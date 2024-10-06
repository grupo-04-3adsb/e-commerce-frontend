import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { Footer } from "./components/Footer";
import Loading from "./components/Loading";
import Home from "./pages/Home/Home";
import Produtos from "./pages/Produtos/Produtos";

function App() {
  return (
    <div className="app">
      <Router>
        <Loading />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Produtos />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
