import { Link } from "react-router-dom";
import { spotlightImages } from "../data/frontimages"
import "./Spotlight.css";

export default function Spotlight() {
  return (
    <section>
      <div className="intro-box">
        <h1>Off Ramp</h1>
        <p>Variety cover band • West-Central Georgia</p>
      </div>

      <div className="spotlight-images">
        {spotlightImages.map((url, i) => (
          <img
            key={i}
            src={url}
            alt={`Off Ramp band photo ${i + 1}`}
            loading="lazy"
          />
        ))}
      </div>
    </section>
  );
}