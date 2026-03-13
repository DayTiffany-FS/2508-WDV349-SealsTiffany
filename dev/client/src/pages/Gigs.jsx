import { useEffect, useState } from "react";
import GigList from "../components/GigList";

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

  return <GigList gigs={gigs} />;
}