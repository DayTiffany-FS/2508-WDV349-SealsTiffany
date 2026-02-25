import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Media from "./pages/Media";
import Gigs from "./pages/Gigs";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminGigs from "./pages/AdminGigs";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    let timeout;
    const logout = () => {
      localStorage.removeItem("token");
      setToken(null);
      navigate("/admin");
    };

    const resetTimer = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(logout, 5 * 60 * 1000); // 5 minutes
    };

    if (token) {
      resetTimer();
      window.addEventListener("mousemove", resetTimer);
      window.addEventListener("keydown", resetTimer);
    }

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, [token, navigate]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/media" element={<Media />} />
        <Route path="/gigs" element={<Gigs />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/admin"
          element={token ? <AdminGigs token={token} onLogout={() => setToken(null)} /> : <AdminLogin onLogin={setToken} />}
        />
      </Routes>
    </Layout>
  );
}