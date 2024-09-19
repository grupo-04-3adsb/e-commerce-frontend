import { BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Routes>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
