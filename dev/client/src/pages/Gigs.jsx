import { useEffect, useState } from "react";
import GigList from "../components/GigList";
import { Helmet } from "react-helmet";

export default function Gigs() {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    async function fetchGigs() {
      try {
        const res = await fetch("https://two508-wdv349-sealstiffany.onrender.com/gigs");
        const data = await res.json();
        setGigs(data);
      } catch (err) {
        console.error("Error fetching gigs:", err);
      }
    }

    fetchGigs();
  }, []);

  return (
    <>
      <Helmet>
        <title>Upcoming Shows | Off Ramp</title>
        <meta
          name="description"
          content="Check out upcoming Off Ramp shows and live performances in Western Georgia and Eastern Alabama."
        />
      </Helmet>

      <h1>Upcoming Live Shows by Off Ramp</h1>
      <p>
        Check out upcoming Off Ramp performances across Georgia and Alabama, including festivals, private events, and local venues.
      </p>

      <GigList gigs={gigs} />
    </>
  )
}