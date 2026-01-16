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
        "https://YOUR-RENDER-BACKEND-URL.onrender.com/api/parse",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: rawText }),
        }
      );

      const data = await res.json();
      setForm(data);
    } catch (err) {
      alert("Auto-fill failed");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>SmartFill – AI Auto Form</h2>
        <p className="subtitle">
          Paste text → AI extracts structured details
        </p>

        <textarea
          placeholder="Example: Freshers event at G. Pullaiah College, Hyderabad on 25 Jan 2026. Contact: likith15@gmail.com 8712756716"
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
        />

        <button onClick={handleAutoFill}>Auto Fill</button>

        <input placeholder="Name" value={form.name} readOnly />
        <input placeholder="Email" value={form.email} readOnly />
        <input placeholder="Phone" value={form.phone} readOnly />
        <input placeholder="Event / Function" value={form.event} readOnly />
        <input
          placeholder="College / Office / Organization"
          value={form.organization}
          readOnly
        />
        <input placeholder="Place" value={form.place} readOnly />
        <input placeholder="Date" value={form.date} readOnly />
      </div>
    </div>
  );
}
