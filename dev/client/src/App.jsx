import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Gigs from "./pages/Gigs";
import Contact from "./pages/Contact";
import AboutPage from "./pages/About"; // <-- new import

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/gigs" element={<Gigs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<AboutPage />} /> {/* new route */}
    </Routes>
  );
}