import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { Footer } from "./components/Footer";
import Loading from "./components/Loading";
import NotFound404 from "./pages/NotFound404";

function App() {
  return (
    <div className="app">
      <Router>
        <Loading />
        <Header />
        <Routes>
          <Route path="*" element={<NotFound404 />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
