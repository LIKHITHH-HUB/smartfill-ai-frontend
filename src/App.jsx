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
  });

  const handleAutoFill = async () => {
    if (!rawText.trim()) return;

    try {
      const res = await fetch(
        "https://smartfill-ai-backend.onrender.com/api/parse",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: rawText }),
        }
      );

      const data = await res.json();
      setForm({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        event: data.event || "",
        organization: data.organization || "",
        place: data.place || "",
        date: data.date || "",
      });
    } catch (err) {
      alert("Auto-fill failed. Try again.");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h1>SmartFill AI</h1>
        <p className="subtitle">
          Paste any event / college / office message below.
          <br />
          The form will auto-fill intelligently.
        </p>

        <textarea
          placeholder={`Example:
Freshers event at abc  College of Engineering and Technology,
Hyderabad on 25 Jan 2026.
Contact: abc@gmail.com, 8712756716`}
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
        />

        <button onClick={handleAutoFill}>Auto-Fill Form</button>

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
          <input placeholder="Location / Place" value={form.place} readOnly />
          <input placeholder="Event Date" value={form.date} readOnly />
        </div>
      </div>
    </div>
  );
}
