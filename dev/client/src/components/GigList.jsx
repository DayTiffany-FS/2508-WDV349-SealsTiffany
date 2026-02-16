import { useEffect, useState } from "react";
import "./GigList.css";

export default function GigList() {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const res = await fetch("http://localhost:3000/gigs");
        const data = await res.json();
        setGigs(data);
      } catch (err) {
        console.error("Error fetching gigs:", err);
      }
    };

    fetchGigs();
  }, []);

  // ✅ format MongoDB date → "June 6, 2026"
  function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  }

  return (
    <section className="gig-list">
      {gigs.length === 0 ? (
        <p>No upcoming gigs yet.</p>
      ) : (
        gigs.map((gig) => (
          <div key={gig._id} className="gig-card">
            <h2>{gig.venue}</h2>
            <p>{gig.city}</p>

            {/* ✅ formatted date */}
            <p className="gig-date">{formatDate(gig.date)}</p>

            {gig.time && <p>{gig.time}</p>}
          </div>
        ))
      )}
    </section>
  );
}