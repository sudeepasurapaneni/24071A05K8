// ...existing code...
import React, { useState } from "react";

function Contact() {
  // Simple controlled form state
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // small validation - required fields
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please provide your name, email and a short message.");
      return;
    }
    // basic email check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Simulate successful send
    setSuccess(`Thanks ${form.name.split(" ")[0] || ""}! We received your message and will get back soon.`);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="container">
      <div className="card" style={{ padding: 20, maxWidth: 980, margin: "36px auto" }}>
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: 0 }}>Get in touch</h1>
            <p style={{ color: "#6b7280", marginTop: 6 }}>Questions about events, group bookings or custom experiences? Drop us a note.</p>

            <form onSubmit={handleSubmit} aria-label="contact form" style={{ marginTop: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <label style={{ display: "block" }}>
                  <div style={{ fontSize: 13, color: "#374151", marginBottom: 6 }}>Full name</div>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid rgba(15,23,42,0.06)" }} required />
                </label>

                <label style={{ display: "block" }}>
                  <div style={{ fontSize: 13, color: "#374151", marginBottom: 6 }}>Email</div>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid rgba(15,23,42,0.06)" }} required />
                </label>

                <label style={{ display: "block" }}>
                  <div style={{ fontSize: 13, color: "#374151", marginBottom: 6 }}>Phone (optional)</div>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid rgba(15,23,42,0.06)" }} />
                </label>

                <label style={{ display: "block" }}>
                  <div style={{ fontSize: 13, color: "#374151", marginBottom: 6 }}>Subject (optional)</div>
                  <input name="subject" value={form.subject} onChange={handleChange} placeholder="Event enquiry, group booking, etc." style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid rgba(15,23,42,0.06)" }} />
                </label>
              </div>

              <label style={{ display: "block", marginTop: 10 }}>
                <div style={{ fontSize: 13, color: "#374151", marginBottom: 6 }}>Message</div>
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us a little about what you need" style={{ width: "100%", padding: 12, minHeight: 120, borderRadius: 8, border: "1px solid rgba(15,23,42,0.06)" }} required />
              </label>

              {error && <div style={{ color: "#b91c1c", marginTop: 10 }}>{error}</div>}
              {success && <div style={{ color: "#065f46", marginTop: 10 }}>{success}</div>}

              <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
                <button type="submit" style={{ padding: "10px 14px", background: "#4f46e5", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}>Send message</button>
                <button type="button" onClick={() => setForm({ name: "", email: "", phone: "", subject: "", message: "" })} style={{ padding: "10px 14px", background: "transparent", border: "1px solid rgba(15,23,42,0.06)", borderRadius: 8, cursor: "pointer" }}>Reset</button>
              </div>
            </form>
          </div>

          <aside style={{ width: 320, padding: 12, borderLeft: "1px solid rgba(15,23,42,0.04)", marginLeft: 12 }}>
            <h3 style={{ marginTop: 0 }}>Contact details</h3>
            <p style={{ color: "#6b7280" }}>EventHub customer support for bookings, partnerships and press.</p>

            <div style={{ marginTop: 12 }}>
              <div style={{ fontWeight: 700 }}>Email</div>
              <div style={{ color: "#6b7280" }}><a href="mailto:hello@eventhub.example">hello@eventhub.example</a></div>
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={{ fontWeight: 700 }}>Phone</div>
              <div style={{ color: "#6b7280" }}><a href="tel:+919876543210">+91 98765 43210</a></div>
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={{ fontWeight: 700 }}>Office</div>
              <div style={{ color: "#6b7280" }}>12 Event Lane, Film Nagar<br/>, Telangana 560001</div>
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={{ fontWeight: 700 }}>Hours</div>
              <div style={{ color: "#6b7280" }}>Mon–Sat, 9:00 — 18:00</div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Contact;