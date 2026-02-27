import { useState } from "react";
import "./ContactForm.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    eventDate: "",
    eventTime: "",
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
      console.log(res.status, await res.text());

      if (res.ok) {
        setSubmitted(true);

        setFormData({
          name: "",
          email: "",
          eventDate: "",
          eventTime: "",
          message: ""
        });

        setTimeout(() => setSubmitted(false), 5000);

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
          Event Time
          <input
            type="time"
            name="eventTime"
            value={formData.eventTime}
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