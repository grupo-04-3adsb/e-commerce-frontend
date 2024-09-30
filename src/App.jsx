import { BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { Footer } from "./components/Footer";
import Loading from "./components/Loading";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="app">
      <Router>
        <Loading/>
        <Header />
        <Home />
        <Routes>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
