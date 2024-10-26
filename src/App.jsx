import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import { Footer } from "./components/Footer";
import Loading from "./components/Loading";
import { loading } from "./store/slices/Loading/slice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import NotFound404 from "./pages/NotFound404";
import { APP_ROUTES } from "./data/appRoute";
import AppBreadcrumb from "./components/CustomBreadcrumb";

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
        <AppBreadcrumb/>
        <Routes>
          <Route path="*" element={<NotFound404 />} />
          {APP_ROUTES.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
