import About from "../components/About";

export default function AboutPage() {
  return (
    <main>
      <section>
        <div className="info-part">
          <h1>About Off Ramp</h1>
          <p>
            Off Ramp formed in 2014 in west-central Georgia. Over the years,
            we've played everything from classic rock and pop to country hits,
            bringing energy and fun to every stage we hit. We’ve performed at 
            local festivals, private events, and bars across the state, 
            and we’re always looking for new venues and audiences to
            share our music with.
          </p>
        </div>
        <div className="member-part">
          <h3>
            Band members:
          </h3>
          <ul className="centered-list">
            <li>Chris – Lead vocals / guitar</li>
            <li>Drew – Lead vocals / guitar</li>
            <li>Marc – Lead Guitar / backup vocals</li>
            <li>Mike – Drums</li>
            <li>Phil – Bass / keyboard / backup vocals</li>
          </ul>
        </div>
        <div className="influence-part">
          <p>
            <h4>Influences include:</h4> The Beatles, Fleetwood Mac, Bruno Mars, and
            local Georgia legends. Our goal is always to get the crowd moving
            and singing along.
          </p>
        </div>
      </section>
    </main>
  );
}