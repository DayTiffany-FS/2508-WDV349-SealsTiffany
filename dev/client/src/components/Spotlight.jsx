import { Link } from "react-router-dom";

export default function Spotlight() {
  return (
    <section>
      <h1>Off Ramp</h1>
      <p>Variety cover band • West-Central Georgia</p>

      <Link to="/gigs">
        <button>Gigs</button>
      </Link>

      <Link to="/contact">
        <button>Contact</button>
      </Link>
    </section>
  );
}