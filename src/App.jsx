import { useState } from "react";
import "./App.css";

export default function App() {
  const [rawText, setRawText] = useState("");
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
    const text = rawText.toLowerCase();

    setForm({
      name: rawText.match(/my name is\s+([a-zA-Z\s]+)/i)?.[1] || "",
      email:
        rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/)?.[0] || "",
      phone: rawText.match(/\b\d{10}\b/)?.[0] || "",
      event:
        rawText.match(
          /\b(freshers|workshop|seminar|conference|meeting)\b/i
        )?.[0] || "",
      organization:
        rawText.match(/college of [a-zA-Z\s]+/i)?.[0] || "",
      place:
        rawText.match(
          /\b(Hyderabad|Bangalore|Chennai|Delhi|Mumbai)\b/i
        )?.[0] || "",
      date:
        rawText.match(
          /\b\d{1,2}\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{4}\b/i
        )?.[0] || "",
      interested:
        /interested|i will attend|yes/i.test(text) &&
        !/not interested|no/i.test(text),
    });
  };

  return (
    <div className="page">
      <div className="card">
        <h1>SmartFill AI</h1>
        <p className="subtitle">
          Paste details below and auto-fill the form
        </p>

        <textarea
          placeholder={`Example:
Freshers event at College of Engineering, Hyderabad on 25 Jan 2026.
Contact: likith15@gmail.com 8712756716
I am interested`}
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
        />

        <button onClick={handleAutoFill}>Auto Fill</button>

        <div className="grid">
          <input placeholder="Name" value={form.name} readOnly />
          <input placeholder="Email" value={form.email} readOnly />
          <input placeholder="Phone" value={form.phone} readOnly />
          <input placeholder="Event" value={form.event} readOnly />
          <input placeholder="Organization" value={form.organization} readOnly />
          <input placeholder="Place" value={form.place} readOnly />
          <input placeholder="Date" value={form.date} readOnly />

          <label className="checkbox">
            <input type="checkbox" checked={form.interested} readOnly />
            Interested in this event
          </label>
        </div>
      </div>
    </div>
  );
}
