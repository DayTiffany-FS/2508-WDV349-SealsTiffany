import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function GigsPreview() {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const res = await fetch("http://localhost:3000/gigs");
        const data = await res.json();

        // sort by date (string format YYYY-MM-DD)
        const sorted = data.sort((a, b) => new Date(a.date) - new Date(b.date));

        // only take the first 3 upcoming gigs
        setGigs(sorted.slice(0, 3));
      } catch (err) {
        console.error("Error fetching gigs:", err);
      }
    };

    fetchGigs();
  }, []);

  function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
  }

  return (
    <section>
      <h2>Upcoming Gigs</h2>

      {gigs.length === 0 ? (
        <p>No upcoming gigs yet.</p>
      ) : (
        <ul>
          {gigs.map((gig) => (
            <li key={gig._id}>
              {formatDate(gig.date)} – {gig.venue}
              {gig.city && ` • ${gig.city}`}
            </li>
          ))}
        </ul>
      )}

      <Link to="/gigs">View All Gigs</Link>
    </section>
  );
}