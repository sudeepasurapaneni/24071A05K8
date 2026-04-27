import React, { useState } from "react";

function Register() {
  // form state tuned for an event management registration
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    gmail: "",
    phone: "",
    gender: "",
    age: "",
    address: "",
    city: "",
    state: "",
    country: "",
    location: "", // preferred event location or venue
    interests: "",
    attendingAs: "attendee", // attendee | speaker | volunteer
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const setField = (name, value) => {
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.gmail.trim()) e.gmail = "Gmail address is required.";
    else if (!/^\S+@gmail\.com$/.test(form.gmail)) e.gmail = "Please provide a Gmail address (example@gmail.com).";
    if (!form.phone.trim()) e.phone = "Phone is required.";
    else if (!/^\+?[\d\s-]{7,15}$/.test(form.phone)) e.phone = "Enter a valid phone number.";
    if (!form.address.trim()) e.address = "Address is required.";
    if (!form.city.trim()) e.city = "City is required.";
    if (!form.country.trim()) e.country = "Country is required.";
    if (!form.age) e.age = "Age is required.";
    else {
      const age = Number(form.age);
      if (Number.isNaN(age) || age < 13 || age > 80) e.age = "Enter a valid age (13-80).";
    }
    if (!form.terms) e.terms = "You must accept the terms.";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setSuccess("");
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    const payload = { ...form };
    console.log("Register payload:", payload);
    setSuccess("Registration successful. Welcome, " + form.fullName + "!");
    setForm((s) => ({ ...s, fullName: "", email: "", gmail: "", phone: "", address: "", city: "", state: "", country: "", age: "", interests: "", location: "", attendingAs: "attendee", terms: false }));
  };

  const input = (props) => ({
    ...props,
    style: { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #e5e7eb", marginBottom: 6, fontSize: 14 },
  });

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 780, margin: "28px auto", padding: 24 }}>
        <h1 style={{ marginTop: 0 }}>Event Registration</h1>
        <p className="text-muted">Register to attend or participate in our events.</p>

        <form onSubmit={handleSubmit} aria-label="event registration form">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <label htmlFor="fullName">Full name</label>
              <input id="fullName" name="fullName" value={form.fullName} onChange={(e) => setField("fullName", e.target.value)} {...input({ placeholder: "Jane Doe" })} />
              {errors.fullName && <div style={{ color: "#b91c1c" }}>{errors.fullName}</div>}
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={form.email} onChange={(e) => setField("email", e.target.value)} {...input({ placeholder: "name@company.com" })} />
              {errors.email && <div style={{ color: "#b91c1c" }}>{errors.email}</div>}
            </div>

            <div>
              <label htmlFor="gmail">Gmail</label>
              <input id="gmail" name="gmail" type="email" value={form.gmail} onChange={(e) => setField("gmail", e.target.value)} {...input({ placeholder: "you@gmail.com" })} />
              {errors.gmail && <div style={{ color: "#b91c1c" }}>{errors.gmail}</div>}
            </div>

            <div>
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" value={form.phone} onChange={(e) => setField("phone", e.target.value)} {...input({ placeholder: "+1 555 555 5555" })} />
              {errors.phone && <div style={{ color: "#b91c1c" }}>{errors.phone}</div>}
            </div>

            <div>
              <label htmlFor="gender">Gender</label>
              <select id="gender" name="gender" value={form.gender} onChange={(e) => setField("gender", e.target.value)} style={{ padding: 10, borderRadius: 8, border: "1px solid #e5e7eb" }}>
                <option value="">Prefer not to say</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="nonbinary">Non-binary</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="age">Age</label>
              <input id="age" name="age" type="number" min={13} max={120} value={form.age} onChange={(e) => setField("age", e.target.value)} {...input({ placeholder: "Age" })} />
              {errors.age && <div style={{ color: "#b91c1c" }}>{errors.age}</div>}
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label htmlFor="address">Address</label>
              <input id="address" name="address" value={form.address} onChange={(e) => setField("address", e.target.value)} {...input({ placeholder: "123 Main St" })} />
              {errors.address && <div style={{ color: "#b91c1c" }}>{errors.address}</div>}
            </div>

            <div>
              <label htmlFor="city">City</label>
              <input id="city" name="city" value={form.city} onChange={(e) => setField("city", e.target.value)} {...input({ placeholder: "City" })} />
              {errors.city && <div style={{ color: "#b91c1c" }}>{errors.city}</div>}
            </div>

            <div>
              <label htmlFor="state">State / Region</label>
              <input id="state" name="state" value={form.state} onChange={(e) => setField("state", e.target.value)} {...input({ placeholder: "State" })} />
            </div>

            <div>
              <label htmlFor="country">Country</label>
              <input id="country" name="country" value={form.country} onChange={(e) => setField("country", e.target.value)} {...input({ placeholder: "Country" })} />
              {errors.country && <div style={{ color: "#b91c1c" }}>{errors.country}</div>}
            </div>

            <div>
              <label htmlFor="location">Preferred event location</label>
              <input id="location" name="location" value={form.location} onChange={(e) => setField("location", e.target.value)} {...input({ placeholder: "e.g. Downtown Hall" })} />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label htmlFor="interests">Interests / Notes</label>
              <textarea id="interests" name="interests" value={form.interests} onChange={(e) => setField("interests", e.target.value)} style={{ width: "100%", minHeight: 80, padding: 10, borderRadius: 8, border: "1px solid #e5e7eb" }} placeholder="Tell us what you're interested in or any accessibility needs" />
            </div>

            <div>
              <label>Registering as</label>
              <div style={{ display: "flex", gap: 8 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <input type="radio" name="attendingAs" checked={form.attendingAs === "attendee"} onChange={() => setField("attendingAs", "attendee")} /> Attendee
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <input type="radio" name="attendingAs" checked={form.attendingAs === "speaker"} onChange={() => setField("attendingAs", "speaker")} /> Speaker
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <input type="radio" name="attendingAs" checked={form.attendingAs === "volunteer"} onChange={() => setField("attendingAs", "volunteer")} /> Volunteer
                </label>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input id="terms" name="terms" type="checkbox" checked={form.terms} onChange={(e) => setField("terms", e.target.checked)} />
              <label htmlFor="terms">I agree to the terms and privacy policy</label>
              {errors.terms && <div style={{ color: "#b91c1c" }}>{errors.terms}</div>}
            </div>
          </div>

          {success && <div style={{ color: "#065f46", marginTop: 8 }}>{success}</div>}

          <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
            <button type="submit" className="btn btn-primary">Register</button>
            <button type="button" className="btn btn-outline" onClick={() => {
              setForm({ fullName: "", email: "", gmail: "", phone: "", gender: "", age: "", address: "", city: "", state: "", country: "", location: "", interests: "", attendingAs: "attendee", terms: false });
              setErrors({});
              setSuccess("");
            }}>Reset</button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default Register;