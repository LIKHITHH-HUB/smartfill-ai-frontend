import { useState } from "react";
import "./App.css";

export default function App() {
  // Textarea input
  const [rawText, setRawText] = useState("");

  // Form state
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

  // 🔹 AUTO FILL FUNCTION (THIS WAS YOUR MAIN ISSUE)
  const handleAutoFill = () => {
    console.log("Auto Fill clicked"); // DEBUG LINE

    const text = rawText;

    // Name (supports multiple formats)
    const name =
      text.match(/my name is\s+([a-zA-Z ]+)/i)?.[1] ||
      text.match(/name[:\-]?\s*([a-zA-Z ]+)/i)?.[1] ||
      "";

    // Email
    const email =
      text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/)?.[0] || "";

    // Phone (10 digits, allows +91 or spaces)
    const phone =
      text.match(/(\+91[\s-]?)?\d{10}/)?.[0] || "";

    // Event keywords
    const event =
      text.match(
        /(freshers|workshop|seminar|conference|meeting|event)/i
      )?.[0] || "";

    // Organization (college / office / institute)
    const organization =
      text.match(
        /(college|institute|university|office)[a-zA-Z .,&]+/i
      )?.[0] || "";

    // Place (simple city match)
    const place =
      text.match(
        /(hyderabad|bangalore|chennai|delhi|mumbai)/i
      )?.[0] || "";

    // Date (25 Jan 2026 format)
    const date =
      text.match(
        /\b\d{1,2}\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{4}\b/i
      )?.[0] || "";

    console.log({ name, email, phone, event, organization, place, date });

    // 🔹 UPDATE FORM (THIS FILLS UI)
    setForm({
      name,
      email,
      phone,
      event,
      organization,
      place,
      date,
      interested: false,
    });
  };

  return (
    <div className="page">
      <div className="card">
        <h1>SmartFill AI</h1>
        <p className="subtitle">
          Paste any event, college, or office message.  
          Details will be auto-filled instantly.
        </p>

        {/* TEXTAREA */}
        <textarea
          placeholder="Example:
Freshers event at G. Pullaiah College of Engineering and Technology,
Hyderabad on 25 Jan 2026.
My name is Likith.
Email likith15@gmail.com
Phone 8712756716"
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
        />

        {/* BUTTON */}
        <button className="primary-btn" onClick={handleAutoFill}>
          Auto Fill Details
        </button>

        {/* FORM */}
        <div className="form">
          <input placeholder="Name" value={form.name} readOnly />
          <input placeholder="Email" value={form.email} readOnly />
          <input placeholder="Phone" value={form.phone} readOnly />
          <input placeholder="Event / Function" value={form.event} readOnly />
          <input placeholder="Organization" value={form.organization} readOnly />
          <input placeholder="Place" value={form.place} readOnly />
          <input placeholder="Date" value={form.date} readOnly />

          <label className="checkbox">
            <input
              type="checkbox"
              checked={form.interested}
              onChange={(e) =>
                setForm({ ...form, interested: e.target.checked })
              }
            />
            I am interested in this event
          </label>

          <button
            className="submit-btn"
            disabled={!form.interested}
          >
            Submit Interest
          </button>
        </div>
      </div>
    </div>
  );
}
