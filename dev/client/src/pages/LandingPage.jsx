import Spotlight from "../components/Spotlight";
import About from "../components/About";
import GigsPreview from "../components/GigsPreview";
import ContactCTA from "../components/ContactCTA";

export default function LandingPage() {
  return (
    <main>
      <Spotlight />
      <About />
      <GigsPreview />
      <ContactCTA />
    </main>
  );
}