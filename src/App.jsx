import { useState } from "react";
import "./App.css";

export default function App() {
  const [rawText, setRawText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    event: "",
    organization: "",
    place: "",
    date: "",
    interested: false,
  });

  const handleAutoFill = () => {
    const text = rawText;

    setForm({
      name: text.match(/my name is\s+([a-zA-Z\s]+)/i)?.[1] || "",
      email:
        text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/)?.[0] || "",
      phone: text.match(/\b\d{10}\b/)?.[0] || "",
      event:
        text.match(
          /\b(freshers|workshop|seminar|conference|meeting)\b/i
        )?.[0] || "",
      organization:
        text.match(/college of [a-zA-Z\s]+/i)?.[0] || "",
      place:
        text.match(
          /\b(Hyderabad|Bangalore|Chennai|Delhi|Mumbai)\b/i
        )?.[0] || "",
      date:
        text.match(
          /\b\d{1,2}\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{4}\b/i
        )?.[0] || "",
      interested: false,
    });
    setSubmitted(false);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="page">
      <div className="card">
        <h1>SmartFill AI</h1>
        <p className="tagline">
          Paste event or message → Review details → Confirm interest
        </p>

        <textarea
          placeholder={`Example:
Freshers event at abcCollege of Engineering, kurnool on 25 Jan 2026.
Contact: abc5@gmail.com 8712756716`}
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
        />

        <button className="primary" onClick={handleAutoFill}>
          Auto Fill Details
        </button>

        <div className="form-grid">
          <input placeholder="Full Name" value={form.name} readOnly />
          <input placeholder="Email Address" value={form.email} readOnly />
          <input placeholder="Phone Number" value={form.phone} readOnly />
          <input placeholder="Event / Function" value={form.event} readOnly />
          <input
            placeholder="College / Office / Organization"
            value={form.organization}
            readOnly
          />
          <input placeholder="Location" value={form.place} readOnly />
          <input placeholder="Event Date" value={form.date} readOnly />

          <label className="interest-box">
            <input
              type="checkbox"
              checked={form.interested}
              onChange={(e) =>
                setForm({ ...form, interested: e.target.checked })
              }
            />
            I am interested in this event
          </label>
        </div>

        <button
          className="submit"
          disabled={!form.interested}
          onClick={handleSubmit}
        >
          Submit Interest
        </button>

        {submitted && (
          <p className="success">
            ✅ Your interest has been recorded successfully!
          </p>
        )}
      </div>
    </div>
  );
}
