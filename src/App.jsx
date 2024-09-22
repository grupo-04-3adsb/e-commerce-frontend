import { BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { Footer } from "./components/Footer";
import Loading from "./components/Loading";
import { loading } from "./store/slices/Loading/slice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
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
        <Routes></Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
