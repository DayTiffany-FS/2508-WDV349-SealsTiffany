import "./GigList.css";

const gigs = [
  {
    id: 1,
    date: "February 28, 2026",
    venue: "Wild Wing Cafe",
    city: "Columbus, GA"
  },
  {
    id: 2,
    date: "March 17, 2026",
    venue: "Private Party",
    city: "Private Event"
  },
  {
    id: 3,
    date: "April 18, 2026",
    venue: "Sissy's Place",
    city: "Phenix City, AL"
  },
  {
    id: 4,
    date: "April 25, 2026",
    venue: "Downtown LaGrange",
    city: "LaGrange, GA"
  },
  {
    id: 5,
    date: "June 6, 2026",
    venue: "The Loft",
    city: "Columbus, GA"
  },
  {
    id: 6,
    date: "July 18, 2026",
    venue: "Tavern on 74",
    city: "Peachtree City, GA"
  }
];

export default function GigList() {
  return (
    <section className="gig-list">
      {gigs.map((gig) => (
        <div key={gig.id} className="gig-card">
          <h2>{gig.venue}</h2>
          <p>{gig.city}</p>
          <p className="gig-date">{gig.date}</p>
        </div>
      ))}
    </section>
  );
}