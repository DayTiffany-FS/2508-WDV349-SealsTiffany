import { useState, useEffect } from "react";
import { createGig, updateGig, deleteGig, getGigs } from "../api";

export default function AdminGigs() {
  const [form, setForm] = useState({
    date: "",
    time: "",
    venue: "",
    city: ""
  });
  const [gigs, setGigs] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchGigs();
  }, []);

  async function fetchGigs() {
    const data = await getGigs(token);
    setGigs(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (editingId) {
      await updateGig(editingId, form, token);
      setEditingId(null);
    } else {
      await createGig(form, token);
    }
    setForm({ date: "", time: "", venue: "", city: "" });
    fetchGigs();
  }

  function handleEdit(gig) {
    setForm({
      date: gig.date,
      time: gig.time || "",
      venue: gig.venue,
      city: gig.city
    });
    setEditingId(gig._id);
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this gig?")) {
      await deleteGig(id, token);
      setGigs(gigs.filter(gig => gig._id !== id));
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>{editingId ? "Edit Gig" : "Create Gig"}</h2>

        <input
          placeholder="Date (YYYY-MM-DD)"
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
        />
        <input
          placeholder="Time"
          value={form.time}
          onChange={e => setForm({ ...form, time: e.target.value })}
        />
        <input
          placeholder="Venue"
          value={form.venue}
          onChange={e => setForm({ ...form, venue: e.target.value })}
        />
        <input
          placeholder="City"
          value={form.city}
          onChange={e => setForm({ ...form, city: e.target.value })}
        />

        <button type="submit">{editingId ? "Update Gig" : "Add Gig"}</button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setForm({ date: "", time: "", venue: "", city: "" });
              setEditingId(null);
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <h2>Existing Gigs</h2>
      {gigs.length === 0 ? (
        <p>No gigs posted yet.</p>
      ) : (
        <ul>
          {gigs
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map(gig => (
              <li key={gig._id}>
                {gig.date} – {gig.venue} {gig.city && `• ${gig.city}`}
                <button onClick={() => handleEdit(gig)}>Edit</button>
                <button onClick={() => handleDelete(gig._id)}>Delete</button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}