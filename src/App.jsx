import { BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { Footer } from "./components/Footer";
import Loading from "./components/Loading";

function App() {
  return (
    <div className="app">
      <Router>
        <Loading/>
        <Header />
        <Routes>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
