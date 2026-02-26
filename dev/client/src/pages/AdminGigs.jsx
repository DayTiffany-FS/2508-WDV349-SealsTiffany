import { useState, useEffect } from "react";
import { createGig, updateGig, deleteGig, getGigs } from "../api";
import "../styles/Admin.css";

export default function AdminGigs({ token, onLogout }) {
  const [form, setForm] = useState({ date: "", time: "", venue: "", city: "" });
  const [gigs, setGigs] = useState([]);
  const [editingId, setEditingId] = useState(null);

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
    setForm({ date: gig.date, time: gig.time || "", venue: gig.venue, city: gig.city });
    setEditingId(gig._id);
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this gig?")) {
      await deleteGig(id, token);
      setGigs(gigs.filter(gig => gig._id !== id));
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    onLogout();
  }

  return (
    <div className="admin-container">
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
      
      <form onSubmit={handleSubmit} className="admin-form">
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
        <ul className="admin-gig-list">
          {gigs
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((gig, index) => (
              <li
                key={gig._id}
                className={index % 2 === 0 ? "gig-card even" : "gig-card odd"}
              >
                {gig.date} – {gig.venue} {gig.city && `• ${gig.city}`}
                <div className="gig-buttons">
                  <button onClick={() => handleEdit(gig)}>Edit</button>
                  <button onClick={() => handleDelete(gig._id)}>Delete</button>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}