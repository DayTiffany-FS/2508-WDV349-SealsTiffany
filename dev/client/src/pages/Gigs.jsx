import GigList from "../components/GigList";

export default function Gigs() {
  return (
    <main className="page">
      <h1>All Gigs</h1>
      <p>Here is the full list of upcoming shows.</p>

      <GigList />
    </main>
  );
}