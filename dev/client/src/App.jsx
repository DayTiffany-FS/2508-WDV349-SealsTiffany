import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Gigs from "./pages/Gigs";
import Contact from "./pages/Contact";


export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/gigs" element={<Gigs />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Layout>
  );
}