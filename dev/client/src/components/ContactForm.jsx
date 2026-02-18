import { useState } from "react";
import "./ContactForm.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    eventDate: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setSubmitted(true);

        // reset form
        setFormData({
          name: "",
          email: "",
          eventDate: "",
          message: ""
        });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Server error. Please try again later.");
    }

    setLoading(false);
  }

  return (
    <section className="contact-form">
      <h2>Book Off Ramp</h2>

      {submitted && (
        <p className="success">Thanks! We’ll be in touch soon.</p>
      )}

      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Event Date
          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
          />
        </label>

        <label>
          Event Details
          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Booking Request"}
        </button>
      </form>
    </section>
  );
}