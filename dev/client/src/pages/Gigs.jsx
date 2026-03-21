import { useEffect, useState } from "react";
import GigList from "../components/GigList";
import { Helmet } from "react-helmet";

export default function Gigs() {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    async function fetchGigs() {
      try {
        const res = await fetch("http://localhost:3000/gigs");
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

      <GigList gigs={gigs} />;
    </>
  )
}