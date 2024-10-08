import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { Footer } from "./components/Footer";
import Loading from "./components/Loading";
import { loading } from "./store/slices/Loading/slice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import NotFound404 from "./pages/NotFound404";
import Home from "./pages/Home/Home";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loading(false));
  }, []);

  return (
    <div className="app">
      <Router>
        <Loading />
        <Header />
        <Routes>
          <Route path="*" element={<NotFound404 />} />
          <Footer />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
