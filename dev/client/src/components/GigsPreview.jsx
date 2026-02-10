import { Link } from "react-router-dom";

const gigs = [
  { id: 1, date: "Feb 28", venue: "Wild Wing Cafe", city: "Columbus, GA" },
  { id: 2, date: "Mar 17", venue: "Private Event", city: "" },
  { id: 3, date: "Apr 18", venue: "Sissy's Place", city: "Phenix City, AL" },
];

export default function GigsPreview() {
  return (
    <section>
      <h2>Upcoming Gigs</h2>

      <ul>
        {gigs.slice(0, 3).map((gig) => (
          <li key={gig.id}>
            {gig.date} – {gig.venue}
            {gig.city && ` • ${gig.city}`}
          </li>
        ))}
      </ul>

      <Link to="/gigs">View All Gigs</Link>
    </section>
  );
}