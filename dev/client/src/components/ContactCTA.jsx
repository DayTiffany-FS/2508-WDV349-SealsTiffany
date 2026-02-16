import { Link } from "react-router-dom";

export default function ContactCTA() {
  return (
    <section>
      <h2>Book Off Ramp</h2>
      <p>Looking for live music for your venue or event?</p>

      <Link to="/contact">
        <button>Contact the Band</button>
      </Link>
    </section>
  );
}