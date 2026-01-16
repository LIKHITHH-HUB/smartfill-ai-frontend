import { useState } from "react";
import "./App.css";

export default function App() {
  const [text, setText] = useState("");
  const [interested, setInterested] = useState(false);

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
    if (!text.trim()) return;

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
  };

  const handleSubmit = () => {
    if (!interested) {
      alert("Please confirm your interest before submitting.");
      return;
    }
    alert("Form submitted successfully ✅");
  };

  return (
    <div className="page">
      <div className="card">
        <h1>SmartFill AI</h1>
        <p className="subtitle">
          Paste any event, college, or office message.
          AI extracts details instantly.
        </p>

        <textarea
          placeholder="Example:
Freshers event at G. Pullaiah College of Engineering & Technology,
Hyderabad on 25 Jan 2026.
Contact: 8712756716 | likith15@gmail.com"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button className="primary" onClick={handleAutoFill}>
          Auto Fill Details
        </button>

        <div className="form">
          <Field icon="👤" value={form.name} placeholder="Name" />
          <Field icon="📧" value={form.email} placeholder="Email" />
          <Field icon="📞" value={form.phone} placeholder="Phone" />
          <Field icon="🎉" value={form.event} placeholder="Event / Function" />
          <Field icon="🏫" value={form.organization} placeholder="Organization" />
          <Field icon="📍" value={form.place} placeholder="Place" />
          <Field icon="📅" value={form.date} placeholder="Date" />
        </div>

        {/* INTEREST CHECKBOX */}
        <label className="checkbox">
          <input
            type="checkbox"
            checked={interested}
            onChange={(e) => setInterested(e.target.checked)}
          />
          I am interested in this event
        </label>

        {/* SUBMIT BUTTON */}
        <button className="submit" onClick={handleSubmit}>
          Submit Interest
        </button>
      </div>
    </div>
  );
}

function Field({ icon, value, placeholder }) {
  return (
    <div className="field">
      <span>{icon}</span>
      <input value={value} placeholder={placeholder} readOnly />
    </div>
  );
}

