import Spotlight from "../components/Spotlight";
import { Helmet } from "react-helmet";

export default function LandingPage() {
  return (
    <>
      <Helmet>
        <title>Off Ramp | Official Website</title>
        <meta
          name="description"
          content="Official website for the Off Ramp band."
        />
      </Helmet>

      <main>
        <Spotlight />
      </main>
    </>
  );
}