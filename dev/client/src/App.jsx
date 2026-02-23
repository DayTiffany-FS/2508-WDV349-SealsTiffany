import { useState } from "react";
import { Routes, Route } from "react-router-dom";
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
          element={token ? <AdminGigs /> : <AdminLogin onLogin={setToken} />}
        />
      </Routes>
    </Layout>
  );
}