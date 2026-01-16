import { useState } from "react";
import "./App.css";

export default function App() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    event: "",
    organization: "",
    place: "",
    date: "",
  });

  async function handleAutoFill() {
    if (!text.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(
        "https://YOUR-BACKEND-URL.onrender.com/api/parse",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        }
      );

      const data = await res.json();
      setForm(data);
    } catch (e) {
      alert("Auto-fill failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="card">
        <h1>SmartFill AI</h1>
        <p className="tagline">
          Paste any event, college, or office details — AI fills the form for you
        </p>

        {/* TEXT INPUT */}
        <textarea
          placeholder={`Example:
Freshers event at G Pullaiah College of Engineering and Technology,
Hyderabad on 25 Jan 2026.
Contact: likith15@gmail.com 8712756716`}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button onClick={handleAutoFill} disabled={loading}>
          {loading ? "Processing..." : "Auto Fill Form"}
        </button>

        {/* RESULT FORM */}
        <div className="form">
          <Field icon="👤" label="Name" value={form.name} />
          <Field icon="📧" label="Email" value={form.email} />
          <Field icon="📞" label="Phone" value={form.phone} />
          <Field icon="🎉" label="Event / Function" value={form.event} />
          <Field
            icon="🏫"
            label="College / Organization"
            value={form.organization}
          />
          <Field icon="📍" label="Place" value={form.place} />
          <Field icon="📅" label="Date" value={form.date} />
        </div>
      </div>
    </div>
  );
}

function Field({ icon, label, value }) {
  return (
    <div className="field">
      <span className="icon">{icon}</span>
      <div>
        <label>{label}</label>
        <input value={value} readOnly placeholder="—" />
      </div>
    </div>
  );
}
