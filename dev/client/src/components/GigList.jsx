import "./GigList.css";

export default function GigList({ gigs }) {
  if (!gigs || gigs.length === 0) return <p>No upcoming gigs yet.</p>;

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  }

  return (
    <section className="gig-list">
      {gigs
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map((gig) => (
          <div key={gig._id} className="gig-card">
            <h2>{gig.venue}</h2>
            <p>{gig.city}</p>
            <p className="gig-date">{formatDate(gig.date)}</p>
            <p>{gig.time}</p>
          </div>
        ))}
    </section>
  );
}